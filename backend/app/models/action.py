from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.database import Base

class NextBestAction(Base):
    __tablename__ = "next_best_actions"

    id = Column(Integer, primary_key=True, index=True)
    action_id = Column(String, unique=True, index=True)
    case_id = Column(String, ForeignKey("cases.case_id"))
    action_type = Column(String)
    recommendation = Column(String)
    reason = Column(Text)
    priority = Column(String)
    approval_required = Column(Boolean, default=False)
    status = Column(String) # PENDING, APPROVED, REJECTED, ESCALATED
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    case = relationship("Case", back_populates="actions")
