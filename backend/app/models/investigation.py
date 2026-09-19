from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.database import Base

class Investigation(Base):
    __tablename__ = "investigations"

    id = Column(Integer, primary_key=True, index=True)
    investigation_id = Column(String, unique=True, index=True)
    case_id = Column(String, ForeignKey("cases.case_id"))
    trigger = Column(String)
    status = Column(String)
    risk_score = Column(Integer, default=0)
    confidence_score = Column(Integer, default=0)
    fraud_pattern = Column(String)
    summary = Column(Text)
    started_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)

    # Relationships
    case = relationship("Case", back_populates="investigations")
    findings = relationship("Finding", back_populates="investigation")

class Finding(Base):
    __tablename__ = "findings"

    id = Column(Integer, primary_key=True, index=True)
    finding_id = Column(String, unique=True, index=True)
    investigation_id = Column(String, ForeignKey("investigations.investigation_id"))
    title = Column(String)
    description = Column(Text)
    severity = Column(String) # LOW, MEDIUM, HIGH, CRITICAL
    confidence = Column(Integer, default=0)
    supporting_evidence_ids = Column(String) # Stored as comma-separated string for simplicity in SQLite
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    investigation = relationship("Investigation", back_populates="findings")
