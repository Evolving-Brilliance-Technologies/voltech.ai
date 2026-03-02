import logging

from sqlalchemy import Engine
from sqlmodel import Session, select
from tenacity import after_log, before_log, retry, stop_after_attempt, wait_fixed

from app.core.db import engine
from app.core.logging import get_logger

logger = get_logger(__name__)

# stdlib logger for tenacity callbacks (they require a stdlib logger)
_stdlib_logger = logging.getLogger(__name__)

max_tries = 60 * 5  # 5 minutes
wait_seconds = 1


@retry(
    stop=stop_after_attempt(max_tries),
    wait=wait_fixed(wait_seconds),
    before=before_log(_stdlib_logger, logging.INFO),
    after=after_log(_stdlib_logger, logging.WARN),
)
def init(db_engine: Engine) -> None:
    try:
        with Session(db_engine) as session:
            # Try to create session to check if DB is awake
            session.exec(select(1))
    except Exception as e:
        logger.error("db_connection_failed", error=str(e))
        raise e


def main() -> None:
    logger.info("initializing_service")
    init(engine)
    logger.info("service_initialized")


if __name__ == "__main__":
    main()
