#!/bin/sh

set -e
set -x

# choose runner: uv if available, else plain
if command -v uv >/dev/null 2>&1; then
    RUNNER="uv run"
else
    RUNNER=""
fi

# pytest-cov is used instead of `coverage run` because it's compatible
# with pytest-xdist parallel execution. The -n auto flag from
# pyproject.toml will automatically use all CPU cores.
$RUNNER pytest tests/ --cov=app --cov-report=term-missing --cov-report=html --cov-report=xml
