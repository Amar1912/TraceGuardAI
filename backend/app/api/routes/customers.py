from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.customer_service import customer_service
from app.schemas.customer import Customer
from typing import List

router = APIRouter()

@router.get("/", response_model=List[Customer])
def read_customers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return customer_service.get_customers(db, skip, limit)

@router.get("/{customer_id}", response_model=Customer)
def read_customer(customer_id: str, db: Session = Depends(get_db)):
    db_customer = customer_service.get_customer_by_id(db, customer_id)
    if not db_customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return db_customer
