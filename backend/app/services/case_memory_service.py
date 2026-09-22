from sqlalchemy.orm import Session
from app.models.investigation import Investigation
from typing import List, Dict, Any

class CaseMemoryService:
    @staticmethod
    def get_similar_cases(db: Session, fraud_pattern: str) -> List[Dict[str, Any]]:
        """
        Retrieves historical cases with the same fraud pattern to provide context.
        """
        similar = db.query(Investigation).filter(Investigation.fraud_pattern == fraud_pattern).limit(5).all()
        return [
            {
                "id": inv.investigation_id,
                "summary": inv.summary,
                "outcome": inv.status,
                "risk": inv.risk_score
            } for inv in similar
        ]

case_memory_service = CaseMemoryService()
