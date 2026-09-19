from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.database import Base

class TimelineEvent(Base):
    __tablename__ = "timeline_events"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(String, unique=True, index=True)
    case_id = Column(String, ForeignKey("cases.case_id"))
    event_type = Column(String) # FRAUD_SIGNAL, CASE_CREATED, EVIDENCE_ADDED, etc.
    description = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)
    actor = Column(String)

    # Relationships
    case = relationship("Case", back_populates="timeline")
