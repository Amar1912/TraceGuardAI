from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.database import Base

class Approval(Base):
    __tablename__ = "approvals"

    id = Column(Integer, primary_key=True, index=True)
    approval_id = Column(String, unique=True, index=True)
    case_id = Column(String, ForeignKey("cases.case_id"))
    action_id = Column(String, ForeignKey("next_best_actions.action_id"))
    requested_by = Column(String)
    status = Column(String) # PENDING, APPROVED, REJECTED
    reason = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    reviewed_at = Column(DateTime, nullable=True)
    reviewed_by = Column(String, nullable=True)

    # Relationships
    case = relationship("Case", back_populates="approvals")
