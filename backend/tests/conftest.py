"""
Test configuration with per-worker database isolation for pytest-xdist.

Each xdist worker gets its own database (e.g. app_gw0, app_gw1, ...)
so tests can run in parallel without interfering with each other.
Alembic migrations are run on each worker DB to ensure schema consistency.
"""

from collections.abc import Generator

import pytest
from alembic import command as alembic_command
from alembic.config import Config
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, text
from sqlmodel import Session, SQLModel

from app.core.config import settings
from app.core.db import init_db
from app.main import app as fastapi_app
from app.models import User  # noqa: F401 — ensure models are registered


def _run_migrations(connection_url: str) -> None:
    """Run Alembic migrations against the given database URL."""
    alembic_cfg = Config("alembic.ini")
    alembic_cfg.set_main_option("sqlalchemy.url", connection_url)
    alembic_command.upgrade(alembic_cfg, "head")


# Global reference to the worker-specific engine
_worker_engine = None


@pytest.fixture(scope="session", autouse=True)
def setup_test_db(worker_id: str) -> Generator[None]:
    """
    Create a unique database for each pytest-xdist worker.

    - worker_id is "gw0", "gw1", etc. for parallel runs, or "master" for sequential.
    - Creates a fresh DB, runs Alembic migrations, patches the engine everywhere.
    - Tears down the worker DB after all tests complete.
    """
    global _worker_engine

    base_db_name = settings.POSTGRES_DB
    worker_db_name = f"{base_db_name}_{worker_id}"

    # Connect to the default 'postgres' DB to create/drop worker databases
    admin_url = str(settings.SQLALCHEMY_DATABASE_URI).replace(
        f"/{base_db_name}", "/postgres"
    )
    admin_engine = create_engine(admin_url, isolation_level="AUTOCOMMIT")

    with admin_engine.connect() as conn:
        # Terminate any existing connections to the worker DB
        conn.execute(
            text(f"""
            SELECT pg_terminate_backend(pg_stat_activity.pid)
            FROM pg_stat_activity
            WHERE pg_stat_activity.datname = '{worker_db_name}'
              AND pid <> pg_backend_pid();
        """)
        )
        conn.execute(text(f'DROP DATABASE IF EXISTS "{worker_db_name}"'))
        conn.execute(text(f'CREATE DATABASE "{worker_db_name}"'))

    # Build the worker-specific connection URL and run migrations
    settings.POSTGRES_DB = worker_db_name
    worker_url = str(settings.SQLALCHEMY_DATABASE_URI)
    _run_migrations(worker_url)

    # Create the worker engine
    _worker_engine = create_engine(worker_url)

    # Patch the engine in all modules that reference it
    import app.api.deps
    import app.core.db

    app.core.db.engine = _worker_engine
    app.api.deps.engine = _worker_engine

    # Override the FastAPI DB dependency to use the worker engine
    def _get_db_override() -> Generator[Session]:
        with Session(_worker_engine) as session:
            yield session

    from app.api.deps import get_db

    fastapi_app.dependency_overrides[get_db] = _get_db_override

    yield

    # Cleanup: dispose engine and drop the worker database
    _worker_engine.dispose()
    with admin_engine.connect() as conn:
        conn.execute(
            text(f"""
            SELECT pg_terminate_backend(pg_stat_activity.pid)
            FROM pg_stat_activity
            WHERE pg_stat_activity.datname = '{worker_db_name}'
              AND pid <> pg_backend_pid();
        """)
        )
        conn.execute(text(f'DROP DATABASE IF EXISTS "{worker_db_name}"'))
    admin_engine.dispose()


@pytest.fixture(scope="module", autouse=True)
def db() -> Generator[Session]:
    """
    Module-scoped database session.

    - Seeds initial data (superuser) at the start of each test module.
    - Cleans up all tables at the end of each test module using metadata
      so we never have to manually list tables.
    """
    global _worker_engine
    with Session(_worker_engine) as session:
        init_db(session)
        yield session
        # Auto-scaling cleanup: iterates tables in reverse dependency order
        for table in reversed(SQLModel.metadata.sorted_tables):
            session.exec(table.delete())  # type: ignore[arg-type]
        session.commit()


@pytest.fixture(scope="module")
def client() -> Generator[TestClient]:
    with TestClient(fastapi_app) as c:
        yield c


@pytest.fixture(scope="module")
def superuser_token_headers(client: TestClient) -> dict[str, str]:
    from tests.utils.utils import get_superuser_token_headers

    return get_superuser_token_headers(client)


@pytest.fixture(scope="module")
def normal_user_token_headers(client: TestClient, db: Session) -> dict[str, str]:
    from tests.utils.user import authentication_token_from_email

    return authentication_token_from_email(
        client=client, email=settings.EMAIL_TEST_USER, db=db
    )
