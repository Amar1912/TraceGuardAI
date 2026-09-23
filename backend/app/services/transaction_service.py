from sqlalchemy.orm import Session
from app.models.transaction import Transaction
from app.integrations.tigergraph_client import tigergraph_client
from app.core.config import settings
from typing import List, Optional
import logging

logger = logging.getLogger(__name__)

class TransactionService:
    @staticmethod
    def get_transactions(db: Session, skip: int = 0, limit: int = 100) -> List[Transaction]:
        if settings.DATA_SOURCE == "tigergraph":
            try:
                # Synchronous wrapper / fallback to DB if TG vertex fetch isn't returning models
                tg_txns = [] # Will be populated if TG is active
            except Exception as e:
                logger.error(f"Error fetching transactions from TigerGraph: {e}")
        
        return db.query(Transaction).offset(skip).limit(limit).all()

    @staticmethod
    def get_transaction_by_id(db: Session, transaction_id: str) -> Optional[Transaction]:
        db_txn = db.query(Transaction).filter(Transaction.transaction_id == transaction_id).first()
        if db_txn:
            return db_txn
            
        if settings.DATA_SOURCE == "tigergraph":
            try:
                # Check TigerGraph for PaymentTransaction or Transaction
                import asyncio
                tg_entity = asyncio.run(tigergraph_client.get_entity_by_id("PaymentTransaction", transaction_id))
                if not tg_entity:
                    tg_entity = asyncio.run(tigergraph_client.get_entity_by_id("Transaction", transaction_id))
                
                if tg_entity:
                    attrs = tg_entity.get("attributes", {})
                    return Transaction(
                        transaction_id=str(tg_entity.get("v_id", transaction_id)),
                        customer_id=str(attrs.get("sender", attrs.get("customer_id", "unknown"))),
                        amount=float(attrs.get("amount", 0.0)),
                        currency=str(attrs.get("currency", "USD")),
                        merchant=str(attrs.get("receiver", attrs.get("merchant", "Unknown Merchant"))),
                        risk_score=int(attrs.get("risk_score", 50)),
                        status=str(attrs.get("status", "COMPLETED")),
                        location=str(attrs.get("location", "Unknown Location")),
                        device_id=str(attrs.get("device_id", "DEV-UNKNOWN")),
                        ip_address=str(attrs.get("ip_address", "127.0.0.1"))
                    )
            except Exception as e:
                logger.error(f"Error fetching transaction {transaction_id} from TigerGraph: {e}")

        return None

transaction_service = TransactionService()
