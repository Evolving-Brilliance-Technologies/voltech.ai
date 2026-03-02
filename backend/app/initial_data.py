from sqlmodel import Session

from app.core.db import engine, init_db
from app.core.logging import get_logger

logger = get_logger(__name__)


def init() -> None:
    with Session(engine) as session:
        init_db(session)


def main() -> None:
    logger.info("creating_initial_data")
    init()
    logger.info("initial_data_created")


if __name__ == "__main__":
    main()
