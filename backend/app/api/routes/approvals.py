from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.approval import Approval as ApprovalModel
from app.models.case import Case
from app.schemas.approval import Approval, ApprovalUpdate
from typing import List
from datetime import datetime

from app.utils.action_executor import action_executor

router = APIRouter()

@router.get("/{case_id}/approvals", response_model=List[Approval])
def read_case_approvals(case_id: str, db: Session = Depends(get_db)):
    return db.query(ApprovalModel).filter(ApprovalModel.case_id == case_id).all()

@router.post("/{approval_id}/approve", response_model=Approval)
def approve_action(approval_id: str, db: Session = Depends(get_db)):
    db_app = db.query(ApprovalModel).filter(ApprovalModel.approval_id == approval_id).first()
    if not db_app:
        raise HTTPException(status_code=404, detail="Approval not found")
    
    # Execute actual action
    execution = action_executor.execute(db_app.action_id, db_app.case_id)
    
    db_app.status = "APPROVED"
    db_app.reviewed_at = datetime.utcnow()
    db_app.reason = execution["message"]
    
    # Update case status
    db_case = db.query(Case).filter(Case.case_id == db_app.case_id).first()
    if db_case:
        db_case.status = "RESOLVED"

    db.commit()
    db.refresh(db_app)
    return db_app

@router.post("/{approval_id}/reject", response_model=Approval)
def reject_action(approval_id: str, db: Session = Depends(get_db)):
    db_app = db.query(ApprovalModel).filter(ApprovalModel.approval_id == approval_id).first()
    if not db_app:
        raise HTTPException(status_code=404, detail="Approval not found")
    
    db_app.status = "REJECTED"
    db_app.reviewed_at = datetime.utcnow()
    db.commit()
    db.refresh(db_app)
    return db_app
