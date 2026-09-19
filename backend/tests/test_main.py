from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_read_cases():
    response = client.get("/api/v1/cases/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
