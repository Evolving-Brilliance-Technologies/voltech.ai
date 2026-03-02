#!/bin/sh
set -e

# choose runner: uv if available, else plain
if command -v uv >/dev/null 2>&1; then
    RUNNER="uv run"
else
    RUNNER=""
fi

echo "Running prestart checks..."
sh scripts/prestart.sh

echo "Starting FastAPI application..."
exec $RUNNER fastapi run --workers 4 app/main.py
