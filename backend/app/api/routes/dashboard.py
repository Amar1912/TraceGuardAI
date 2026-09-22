from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.dashboard import DashboardSummary, RiskTrendItem, CaseStatusItem, FraudPatternItem
from sqlalchemy import func
from app.models.case import Case
from typing import List

router = APIRouter()

@router.get("/summary", response_model=DashboardSummary)
def read_dashboard_summary(db: Session = Depends(get_db)):
    total_cases = db.query(Case).count()
    active_cases = db.query(Case).filter(Case.status.in_(["OPEN", "INVESTIGATING", "PENDING_EVIDENCE"])).count()
    high_risk_cases = db.query(Case).filter(Case.risk_score >= 80).count()
    pending_approvals = db.query(Case).filter(Case.status == "PENDING_APPROVAL").count()
    
    return {
        "active_cases": active_cases,
        "high_risk_cases": high_risk_cases,
        "investigations_today": 12, 
        "pending_approvals": pending_approvals,
        "total_cases": total_cases
    }

@router.get("/case-status", response_model=List[CaseStatusItem])
def read_case_status_distribution(db: Session = Depends(get_db)):
    results = db.query(Case.status, func.count(Case.id)).group_by(Case.status).all()
    return [{"status": r[0], "count": r[1]} for r in results]

@router.get("/fraud-patterns", response_model=List[FraudPatternItem])
def read_fraud_pattern_distribution(db: Session = Depends(get_db)):
    results = db.query(Case.fraud_pattern, func.count(Case.id)).group_by(Case.fraud_pattern).all()
    return [{"pattern": r[0], "count": r[1]} for r in results]

@router.get("/risk-trend", response_model=List[RiskTrendItem])
def read_risk_trend():
    return [
        {"date": "Sep 13", "risk_score": 45, "alert_count": 10},
        {"date": "Sep 14", "risk_score": 52, "alert_count": 14},
        {"date": "Sep 15", "risk_score": 48, "alert_count": 12},
        {"date": "Sep 16", "risk_score": 68, "alert_count": 22},
        {"date": "Sep 17", "risk_score": 72, "alert_count": 18},
        {"date": "Sep 18", "risk_score": 85, "alert_count": 25},
        {"date": "Sep 19", "risk_score": 91, "alert_count": 30}
    ]
