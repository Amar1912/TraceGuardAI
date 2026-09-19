from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.evidence import Evidence as EvidenceModel
from app.schemas.evidence import Evidence, EvidenceCreate
from typing import List

router = APIRouter()

@router.get("/{case_id}/evidence", response_model=List[Evidence])
def read_case_evidence(case_id: str, db: Session = Depends(get_db)):
    return db.query(EvidenceModel).filter(EvidenceModel.case_id == case_id).all()

@router.get("/evidence/{evidence_id}", response_model=Evidence)
def read_evidence(evidence_id: str, db: Session = Depends(get_db)):
    db_ev = db.query(EvidenceModel).filter(EvidenceModel.evidence_id == evidence_id).first()
    if not db_ev:
        raise HTTPException(status_code=404, detail="Evidence not found")
    return db_ev
