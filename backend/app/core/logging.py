"""
Structured logging configuration using structlog.

- In production (STRUCTURED_LOGGING=true): outputs JSON for log aggregators (GCP, ELK, etc.)
- In development (STRUCTURED_LOGGING=false): outputs colorful, human-readable console logs.

Every log entry is automatically enriched with:
  - request_id: correlates all logs from a single HTTP request
  - user_id: the authenticated user (if any)
  - environment: local / staging / production
"""

import logging
import logging.config
import sys
from collections.abc import MutableMapping
from contextvars import ContextVar
from typing import Any, cast
from uuid import uuid4

import structlog
from pythonjsonlogger.json import JsonFormatter

from app.core.config import settings

# ── Context Variables (set per-request via middleware) ──────────────────────
request_id: ContextVar[str | None] = ContextVar("request_id", default=None)
user_id: ContextVar[str | None] = ContextVar("user_id", default=None)


def add_request_context(
    _logger: Any, _method_name: str, event_dict: MutableMapping[str, Any]
) -> MutableMapping[str, Any]:
    """Inject per-request context into every log entry."""
    if req_id := request_id.get():
        event_dict["request_id"] = req_id
    if usr_id := user_id.get():
        event_dict["user_id"] = usr_id
    return event_dict


def add_service_info(
    _logger: Any, _method_name: str, event_dict: MutableMapping[str, Any]
) -> MutableMapping[str, Any]:
    """Inject service metadata into every log entry."""
    event_dict["environment"] = settings.ENVIRONMENT
    return event_dict


# ── Public API ─────────────────────────────────────────────────────────────
def configure_logging() -> None:
    """Wire up stdlib logging + structlog.  Call once at app startup."""

    logging_config: dict[str, Any] = {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "json": {
                "()": JsonFormatter,
                "format": "%(asctime)s %(name)s %(levelname)s %(message)s",
                "datefmt": "%Y-%m-%dT%H:%M:%SZ",
            },
            "console": {
                "format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
            },
        },
        "handlers": {
            "default": {
                "class": "logging.StreamHandler",
                "stream": "ext://sys.stdout",
                "formatter": "json" if settings.STRUCTURED_LOGGING else "console",
            },
        },
        "root": {
            "level": settings.LOGGING_LEVEL,
            "handlers": ["default"],
        },
        "loggers": {
            # Reduce noise from third-party libraries
            "uvicorn": {"level": "WARNING"},
            "uvicorn.access": {"level": "WARNING"},
            "fastapi": {"level": "INFO"},
            "sqlalchemy.engine": {"level": "WARNING"},
        },
    }

    logging.config.dictConfig(logging_config)

    # ── structlog pipeline ─────────────────────────────────────────────
    processors: list[structlog.types.Processor] = [
        structlog.contextvars.merge_contextvars,
        add_service_info,
        add_request_context,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.add_log_level,
        structlog.processors.StackInfoRenderer(),
    ]

    if settings.STRUCTURED_LOGGING:
        processors.append(structlog.processors.JSONRenderer())
    else:
        processors.append(structlog.dev.ConsoleRenderer(colors=True))

    structlog.configure(
        processors=processors,
        wrapper_class=structlog.make_filtering_bound_logger(
            getattr(logging, settings.LOGGING_LEVEL)
        ),
        logger_factory=structlog.WriteLoggerFactory(file=sys.stdout),
        cache_logger_on_first_use=True,
    )


def get_logger(name: str) -> structlog.BoundLogger:
    """Return a named structlog logger."""
    return cast(structlog.BoundLogger, structlog.get_logger(name))


# ── Request-lifecycle helpers ──────────────────────────────────────────────
def set_request_context(
    *, req_id: str | None = None, usr_id: str | None = None
) -> None:
    """Set per-request context variables for log correlation."""
    if req_id:
        request_id.set(req_id)
    if usr_id:
        user_id.set(usr_id)


def generate_request_id() -> str:
    """Generate a unique request ID (UUID4)."""
    return str(uuid4())


def clear_request_context() -> None:
    """Clear all per-request context variables."""
    request_id.set(None)
    user_id.set(None)
