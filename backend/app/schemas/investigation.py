from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from app.schemas.evidence import Evidence
from app.schemas.case import Case

class FindingBase(BaseModel):
    finding_id: str
    investigation_id: str
    title: str
    description: str
    severity: str
    confidence: int
    supporting_evidence_ids: str

class FindingCreate(FindingBase):
    pass

class Finding(FindingBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class InvestigationBase(BaseModel):
    investigation_id: str
    case_id: str
    trigger: str
    status: str
    risk_score: int
    confidence_score: int
    fraud_pattern: str
    summary: str

class InvestigationCreate(InvestigationBase):
    pass

class Investigation(InvestigationBase):
    id: int
    started_at: datetime
    completed_at: Optional[datetime] = None
    findings: List[Finding] = []

    class Config:
        from_attributes = True

class InvestigationStartRequest(BaseModel):
    case_id: str

class RiskAssessment(BaseModel):
    risk_score: int
    confidence: float
    uncertainty: str

class FraudPatternResult(BaseModel):
    name: str
    confidence: float

class NextBestActionResult(BaseModel):
    action: str
    reason: str
    approval_required: bool

class InvestigationResponse(BaseModel):
    case: Case
    investigation: Investigation
    evidence: List[Evidence]
    findings: List[Finding]
    risk_assessment: RiskAssessment
    fraud_pattern: FraudPatternResult
    next_best_action: NextBestActionResult
    approval: Optional[dict] = None
    timeline: List[dict] = []
