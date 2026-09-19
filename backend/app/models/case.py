from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.database import Base

class Case(Base):
    __tablename__ = "cases"

    id = Column(Integer, primary_key=True, index=True)
    case_id = Column(String, unique=True, index=True) # e.g., CASE-2026-001
    customer_id = Column(String, ForeignKey("customers.customer_id"))
    transaction_id = Column(String, ForeignKey("transactions.transaction_id"), nullable=True)
    status = Column(String) # OPEN, INVESTIGATING, PENDING_EVIDENCE, PENDING_APPROVAL, RESOLVED, ESCALATED
    risk_score = Column(Integer, default=0)
    confidence_score = Column(Integer, default=0)
    fraud_pattern = Column(String)
    priority = Column(String) # LOW, MEDIUM, HIGH, CRITICAL
    trigger_type = Column(String)
    trigger_description = Column(Text)
    summary = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    customer = relationship("Customer", back_populates="cases")
    transaction = relationship("Transaction", back_populates="cases")
    evidence = relationship("Evidence", back_populates="case")
    investigations = relationship("Investigation", back_populates="case")
    actions = relationship("NextBestAction", back_populates="case")
    approvals = relationship("Approval", back_populates="case")
    timeline = relationship("TimelineEvent", back_populates="case")
