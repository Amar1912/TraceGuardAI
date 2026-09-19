from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.database import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    transaction_id = Column(String, unique=True, index=True) # e.g., TXN-2026-001
    customer_id = Column(String, ForeignKey("customers.customer_id"))
    account_id = Column(String)
    amount = Column(Float)
    merchant = Column(String)
    category = Column(String)
    location = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    device_id = Column(String)
    ip_address = Column(String)
    risk_score = Column(Integer, default=0)
    status = Column(String) # Cleared, Pending, Blocked, Flagged

    # Relationships
    customer = relationship("Customer", back_populates="transactions")
    cases = relationship("Case", back_populates="transaction")
