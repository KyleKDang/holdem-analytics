# Hold'Em Analytics API

FastAPI application server for Hold'Em Analytics: authentication, session and hand persistence, and the analytics engine.
Compute-heavy odds simulation is delegated to the [Go odds engine](https://github.com/KyleKDang/poker-odds-engine).

Setup, environment variables, API reference and testing instructions are in the [project README](../README.md).

## Quick reference

```bash
poetry install --with dev
poetry run alembic upgrade head
poetry run uvicorn app.main:app --reload --port 8000

poetry run pytest app/tests -v
poetry run black app
```

Interactive API docs are served at `/docs` once the server is running.
