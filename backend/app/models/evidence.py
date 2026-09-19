from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.database import Base

class Evidence(Base):
    __tablename__ = "evidence"

    id = Column(Integer, primary_key=True, index=True)
    evidence_id = Column(String, unique=True, index=True) # e.g., EVD-001
    case_id = Column(String, ForeignKey("cases.case_id"))
    evidence_type = Column(String) # TRANSACTION, DEVICE, ACCOUNT, IDENTITY, CONNECTION, BEHAVIOR, PREVIOUS_CASE, GRAPH
    source = Column(String)
    description = Column(Text)
    relevance = Column(String) # LOW, MEDIUM, HIGH
    confidence = Column(Integer, default=0) # 0-100
    related_entity_id = Column(String, nullable=True)
    related_entity_type = Column(String, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)

    # Relationships
    case = relationship("Case", back_populates="evidence")
