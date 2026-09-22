from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    APP_NAME: str = "TraceGuardAI Backend"
    APP_ENV: str = "development"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"

    DATABASE_URL: str = "sqlite:///./traceguard.db"
    
    FRONTEND_URL: str = "http://localhost:3000"
    CORS_ORIGINS: List[str] = ["http://localhost:3000"]

    TIGERGRAPH_HOST: str = ""
    TIGERGRAPH_USERNAME: str = ""
    TIGERGRAPH_PASSWORD: str = ""
    TIGERGRAPH_GRAPH_NAME: str = "TraceGuardGraph"
    TIGERGRAPH_SECRET: str = ""

    DATA_SOURCE: str = "tigergraph" # "tigergraph" or "mock"

    AGENT_API_URL: str = ""
    GRAPHRAG_API_URL: str = ""

settings = Settings()
