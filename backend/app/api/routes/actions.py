from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.action import NextBestAction as ActionModel
from app.schemas.action import NextBestAction, NextBestActionUpdate
from typing import List

router = APIRouter()

@router.get("/{case_id}/actions", response_model=List[NextBestAction])
def read_case_actions(case_id: str, db: Session = Depends(get_db)):
    return db.query(ActionModel).filter(ActionModel.case_id == case_id).all()

@router.patch("/actions/{action_id}", response_model=NextBestAction)
def update_action(action_id: str, action_update: NextBestActionUpdate, db: Session = Depends(get_db)):
    db_action = db.query(ActionModel).filter(ActionModel.action_id == action_id).first()
    if not db_action:
        raise HTTPException(status_code=404, detail="Action not found")
    
    for key, value in action_update.model_dump(exclude_unset=True).items():
        setattr(db_action, key, value)
    
    db.commit()
    db.refresh(db_action)
    return db_action
