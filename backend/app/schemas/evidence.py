from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class EvidenceBase(BaseModel):
    evidence_id: str
    case_id: str
    evidence_type: str
    source: str
    description: str
    relevance: str
    confidence: int
    related_entity_id: Optional[str] = None
    related_entity_type: Optional[str] = None

class EvidenceCreate(EvidenceBase):
    pass

class Evidence(EvidenceBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True
