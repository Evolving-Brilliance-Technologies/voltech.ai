
set -e
set -x

# choose runner: uv if available, else plain
if command -v uv >/dev/null 2>&1; then
    RUNNER="uv run"
else
    RUNNER=""
fi

$RUNNER mypy app
$RUNNER ruff check app
$RUNNER ruff format app --check
