from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.benchmark_service import benchmark_service
from typing import List, Dict, Any

router = APIRouter()

@router.post("/process")
async def process_benchmarks(db: Session = Depends(get_db)) -> List[Dict[str, Any]]:
    """
    Triggers investigation for all 20 benchmark cases.
    """
    return await benchmark_service.process_benchmark_cases(db)
