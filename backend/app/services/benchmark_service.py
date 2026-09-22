from sqlalchemy.orm import Session
from app.models.case import Case
from app.services.investigation_service import investigation_service
from app.schemas.investigation import InvestigationStartRequest

class BenchmarkService:
    """
    Handles the 20 benchmark cases from the dataset.
    """
    
    @staticmethod
    async def process_benchmark_cases(db: Session):
        # 1. Identify benchmark cases (e.g. from a specific date range or list of IDs)
        # For demo, we assume they are already in the Case table or we create them
        benchmark_ids = [f"CASE-BENCH-{i:03d}" for i in range(1, 21)]
        
        results = []
        for case_id in benchmark_ids:
            # Trigger investigation for each
            try:
                request = InvestigationStartRequest(case_id=case_id)
                res = await investigation_service.start_investigation(db, request)
                results.append(res)
            except Exception:
                pass
        return results

benchmark_service = BenchmarkService()
