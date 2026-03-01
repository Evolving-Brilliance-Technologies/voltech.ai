#! /usr/bin/env sh

set -e
set -x

# choose runner: uv if available, else plain
if command -v uv >/dev/null 2>&1; then
    RUNNER="uv run"
else
    RUNNER=""
fi

# Check backend
$RUNNER python app/backend_pre_start.py
# Migrate
$RUNNER alembic upgrade head
# Create Data
$RUNNER python app/initial_data.py
