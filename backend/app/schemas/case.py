from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class CaseBase(BaseModel):
    case_id: str
    customer_id: str
    transaction_id: Optional[str] = None
    status: str
    risk_score: int
    confidence_score: int
    fraud_pattern: str
    priority: str
    trigger_type: str
    trigger_description: str
    summary: str

class CaseCreate(CaseBase):
    pass

class CaseUpdate(BaseModel):
    status: Optional[str] = None
    risk_score: Optional[int] = None
    confidence_score: Optional[int] = None
    priority: Optional[str] = None
    summary: Optional[str] = None

class Case(CaseBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
