# TraceGuardAI Backend

Central API layer for the TraceGuardAI Fraud Investigation Platform.

## Technology Stack

- **Python 3.11+**
- **FastAPI**: API framework
- **SQLAlchemy**: ORM for database access
- **SQLite**: Local development database
- **Pydantic v2**: Data validation and serialization

## Project Structure

- `app/api/`: API routes and routers
- `app/core/`: Configuration and global settings
- `app/database/`: Database connection and session management
- `app/integrations/`: Interfaces for TigerGraph, AI Agent, and GraphRAG
- `app/models/`: SQLAlchemy database models
- `app/schemas/`: Pydantic data schemas
- `app/services/`: Business logic layer

## Setup and Installation

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

4. Seed the database with mock data:
   ```bash
   python -m app.database.seed
   ```

## Running the Application

Start the FastAPI server:

```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.

## API Documentation

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## Testing

Run tests with pytest:

```bash
pytest
```
