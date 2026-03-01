#!/bin/sh
set -e

echo "Running prestart checks..."
sh scripts/prestart.sh

echo "Starting FastAPI application..."
exec fastapi run --workers 4 app/main.py
