# Stage 1: Builder — uv with Python 3.14 alpine
FROM ghcr.io/astral-sh/uv:python3.14-alpine AS builder

ENV PYTHONUNBUFFERED=1

RUN apk add --no-cache build-base python3-dev

WORKDIR /app/

# Place executables in the environment at the front of the path
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#using-the-environment
ENV PATH="/app/.venv/bin:$PATH"

# Compile bytecode for faster startup
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#compiling-bytecode
ENV UV_COMPILE_BYTECODE=1

# uv Cache — copy mode works better with Docker layer caching
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#caching
ENV UV_LINK_MODE=copy

# Install dependencies only first (better layer cache — only re-runs on lock/pyproject changes)
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#intermediate-layers
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    --mount=type=bind,source=backend/pyproject.toml,target=backend/pyproject.toml \
    uv sync --locked --no-install-workspace --no-dev

COPY ./backend/scripts /app/backend/scripts

COPY ./backend/pyproject.toml ./backend/alembic.ini /app/backend/

COPY ./backend/app /app/backend/app

COPY pyproject.toml uv.lock /app/

# Sync the project itself (installs the app package into the venv)
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --locked --no-dev --package app


# Stage 2: Runner — lean alpine image for production
FROM python:3.14-alpine

RUN apk add --no-cache curl

WORKDIR /app/backend/

COPY --from=builder /app /app

# Place executables in the environment at the front of the path
ENV PATH="/app/.venv/bin:$PATH"

ENV PYTHONPATH=/app/backend

ENV PORT=8000

HEALTHCHECK --interval=10s --timeout=5s --retries=5 \
    CMD curl -f http://127.0.0.1:${PORT}/api/v1/utils/health-check/

CMD ["fastapi", "run", "--workers", "4", "app/main.py"]
