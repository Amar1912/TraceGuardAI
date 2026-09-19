from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.transaction_service import transaction_service
from app.schemas.transaction import Transaction
from typing import List

router = APIRouter()

@router.get("/", response_model=List[Transaction])
def read_transactions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return transaction_service.get_transactions(db, skip, limit)

@router.get("/{transaction_id}", response_model=Transaction)
def read_transaction(transaction_id: str, db: Session = Depends(get_db)):
    db_transaction = transaction_service.get_transaction_by_id(db, transaction_id)
    if not db_transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return db_transaction
