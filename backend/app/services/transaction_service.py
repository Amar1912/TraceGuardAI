from sqlalchemy.orm import Session
from app.models.transaction import Transaction
from typing import List, Optional

class TransactionService:
    @staticmethod
    def get_transactions(db: Session, skip: int = 0, limit: int = 100) -> List[Transaction]:
        return db.query(Transaction).offset(skip).limit(limit).all()

    @staticmethod
    def get_transaction_by_id(db: Session, transaction_id: str) -> Optional[Transaction]:
        return db.query(Transaction).filter(Transaction.transaction_id == transaction_id).first()

transaction_service = TransactionService()
