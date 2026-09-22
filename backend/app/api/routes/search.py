from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.case import Case
from app.models.customer import Customer
from app.models.transaction import Transaction
from typing import List, Dict, Any

router = APIRouter()

@router.get("/")
def search(q: str = Query(...), db: Session = Depends(get_db)) -> Dict[str, Any]:
    """
    Search across cases, customers, and transactions.
    """
    cases = db.query(Case).filter(Case.case_id.ilike(f"%{q}%")).limit(5).all()
    customers = db.query(Customer).filter(Customer.display_name.ilike(f"%{q}%")).limit(5).all()
    txns = db.query(Transaction).filter(Transaction.transaction_id.ilike(f"%{q}%")).limit(5).all()
    
    return {
        "cases": cases,
        "customers": customers,
        "transactions": txns
    }
