from sqlalchemy import Column, Integer, String, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.database import Base

class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(String, unique=True, index=True) # e.g., CUST-10452
    display_name = Column(String)
    email = Column(String)
    phone = Column(String)
    account_status = Column(String) # Active, Suspended, Blocked, Under Review
    risk_level = Column(String) # Low, Medium, High, Critical
    risk_score = Column(Integer, default=0)
    account_age = Column(Integer) # In days
    transaction_count = Column(Integer, default=0)
    previous_case_count = Column(Integer, default=0)
    known_devices_count = Column(Integer, default=0)
    known_connections_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    transactions = relationship("Transaction", back_populates="customer")
    cases = relationship("Case", back_populates="customer")
