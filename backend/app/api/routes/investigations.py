from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.investigation_service import investigation_service
from app.schemas.investigation import InvestigationStartRequest, InvestigationResponse, Investigation
from typing import List

router = APIRouter()

@router.post("/start", response_model=InvestigationResponse)
async def start_investigation(request: InvestigationStartRequest, db: Session = Depends(get_db)):
    try:
        return await investigation_service.start_investigation(db, request)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{investigation_id}", response_model=Investigation)
def read_investigation(investigation_id: str, db: Session = Depends(get_db)):
    inv = investigation_service.get_investigation_by_id(db, investigation_id)
    if not inv:
        inv = investigation_service.get_investigation_for_case(db, investigation_id)
    if not inv:
        raise HTTPException(status_code=404, detail="Investigation not found")
    return inv
