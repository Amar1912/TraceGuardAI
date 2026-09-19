from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class NextBestActionBase(BaseModel):
    action_id: str
    case_id: str
    action_type: str
    recommendation: str
    reason: str
    priority: str
    approval_required: bool
    status: str

class NextBestActionCreate(NextBestActionBase):
    pass

class NextBestActionUpdate(BaseModel):
    status: Optional[str] = None

class NextBestAction(NextBestActionBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
