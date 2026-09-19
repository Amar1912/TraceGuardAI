from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.models.case import Case
from app.schemas.case import CaseCreate, CaseUpdate
from typing import Optional, List

class CaseService:
    @staticmethod
    def get_cases(
        db: Session, 
        status: Optional[str] = None, 
        priority: Optional[str] = None,
        fraud_pattern: Optional[str] = None,
        search: Optional[str] = None,
        skip: int = 0, 
        limit: int = 100
    ) -> List[Case]:
        query = db.query(Case)
        
        if status:
            query = query.filter(Case.status == status)
        if priority:
            query = query.filter(Case.priority == priority)
        if fraud_pattern:
            query = query.filter(Case.fraud_pattern == fraud_pattern)
        if search:
            query = query.filter(
                or_(
                    Case.case_id.ilike(f"%{search}%"),
                    Case.summary.ilike(f"%{search}%")
                )
            )
            
        return query.offset(skip).limit(limit).all()

    @staticmethod
    def get_case_by_id(db: Session, case_id: str) -> Optional[Case]:
        return db.query(Case).filter(Case.case_id == case_id).first()

    @staticmethod
    def create_case(db: Session, case: CaseCreate) -> Case:
        db_case = Case(**case.model_dump())
        db.add(db_case)
        db.commit()
        db.refresh(db_case)
        return db_case

    @staticmethod
    def update_case(db: Session, case_id: str, case_update: CaseUpdate) -> Optional[Case]:
        db_case = CaseService.get_case_by_id(db, case_id)
        if not db_case:
            return None
        
        update_data = case_update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_case, key, value)
            
        db.commit()
        db.refresh(db_case)
        return db_case

case_service = CaseService()
