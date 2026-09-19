from fastapi import APIRouter
from app.services.graph_service import graph_service
from app.schemas.graph import GraphData

router = APIRouter()

@router.get("/{case_id}", response_model=GraphData)
async def read_case_graph(case_id: str):
    return await graph_service.get_case_graph(case_id)
