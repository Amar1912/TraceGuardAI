from pydantic import BaseModel
from datetime import datetime

class TimelineEventBase(BaseModel):
    event_id: str
    case_id: str
    event_type: str
    description: str
    actor: str

class TimelineEventCreate(TimelineEventBase):
    pass

class TimelineEvent(TimelineEventBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True
