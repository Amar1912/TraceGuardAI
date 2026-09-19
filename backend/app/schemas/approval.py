from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ApprovalBase(BaseModel):
    approval_id: str
    case_id: str
    action_id: str
    requested_by: str
    status: str
    reason: Optional[str] = None

class ApprovalCreate(ApprovalBase):
    pass

class ApprovalUpdate(BaseModel):
    status: str
    reason: Optional[str] = None
    reviewed_by: str

class Approval(ApprovalBase):
    id: int
    created_at: datetime
    reviewed_at: Optional[datetime] = None
    reviewed_by: Optional[str] = None

    class Config:
        from_attributes = True
