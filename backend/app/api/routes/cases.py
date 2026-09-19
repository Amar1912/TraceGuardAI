from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.case_service import case_service
from app.schemas.case import Case, CaseCreate, CaseUpdate
from typing import List, Optional

router = APIRouter()

@router.get("/", response_model=List[Case])
def read_cases(
    status: Optional[str] = None,
    priority: Optional[str] = None,
    fraud_pattern: Optional[str] = None,
    search: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    cases = case_service.get_cases(db, status, priority, fraud_pattern, search, skip, limit)
    return cases

@router.get("/{case_id}", response_model=Case)
def read_case(case_id: str, db: Session = Depends(get_db)):
    db_case = case_service.get_case_by_id(db, case_id)
    if db_case is None:
        raise HTTPException(status_code=404, detail=f"Case {case_id} not found")
    return db_case

@router.post("/", response_model=Case)
def create_case(case: CaseCreate, db: Session = Depends(get_db)):
    return case_service.create_case(db, case)

@router.patch("/{case_id}", response_model=Case)
def update_case(case_id: str, case_update: CaseUpdate, db: Session = Depends(get_db)):
    db_case = case_service.update_case(db, case_id, case_update)
    if db_case is None:
        raise HTTPException(status_code=404, detail=f"Case {case_id} not found")
    return db_case
