from sqlalchemy.orm import Session
from app.models.customer import Customer
from typing import List, Optional

class CustomerService:
    @staticmethod
    def get_customers(db: Session, skip: int = 0, limit: int = 100) -> List[Customer]:
        return db.query(Customer).offset(skip).limit(limit).all()

    @staticmethod
    def get_customer_by_id(db: Session, customer_id: str) -> Optional[Customer]:
        return db.query(Customer).filter(Customer.customer_id == customer_id).first()

customer_service = CustomerService()
