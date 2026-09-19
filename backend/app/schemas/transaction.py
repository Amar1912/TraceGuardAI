from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TransactionBase(BaseModel):
    transaction_id: str
    customer_id: str
    account_id: str
    amount: float
    merchant: str
    category: str
    location: str
    device_id: str
    ip_address: str
    risk_score: int
    status: str

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True
