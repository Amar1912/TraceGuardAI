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

def test_read_dashboard_summary():
    response = client.get("/api/v1/dashboard/summary")
    assert response.status_code == 200
    data = response.json()
    assert "total_cases" in data
    assert "active_cases" in data

def test_read_transactions():
    response = client.get("/api/v1/transactions/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_read_case_graph():
    response = client.get("/api/v1/graph/CASE-2026-001")
    assert response.status_code == 200
    data = response.json()
    assert "nodes" in data
    assert "edges" in data
