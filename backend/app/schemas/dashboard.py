from pydantic import BaseModel
from typing import List

class DashboardSummary(BaseModel):
    active_cases: int
    high_risk_cases: int
    investigations_today: int
    pending_approvals: int
    total_cases: int

class RiskTrendItem(BaseModel):
    date: str
    risk_score: int
    alert_count: int

class CaseStatusItem(BaseModel):
    status: str
    count: int

class FraudPatternItem(BaseModel):
    pattern: str
    count: int
