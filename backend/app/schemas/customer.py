from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CustomerBase(BaseModel):
    customer_id: str
    display_name: str
    email: str
    phone: str
    account_status: str
    risk_level: str
    risk_score: int
    account_age: int
    transaction_count: int
    previous_case_count: int
    known_devices_count: int
    known_connections_count: int

class CustomerCreate(CustomerBase):
    pass

class Customer(CustomerBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
