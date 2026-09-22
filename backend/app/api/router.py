from fastapi import APIRouter
from app.api.routes import cases, customers, transactions, investigations, graph, dashboard, evidence, actions, approvals, search, benchmark

api_router = APIRouter()

api_router.include_router(cases.router, prefix="/cases", tags=["cases"])
api_router.include_router(customers.router, prefix="/customers", tags=["customers"])
api_router.include_router(transactions.router, prefix="/transactions", tags=["transactions"])
api_router.include_router(investigations.router, prefix="/investigations", tags=["investigations"])
api_router.include_router(graph.router, prefix="/graph", tags=["graph"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(evidence.router, prefix="/cases", tags=["evidence"])
api_router.include_router(actions.router, prefix="", tags=["actions"])
api_router.include_router(approvals.router, prefix="/approvals", tags=["approvals"])
api_router.include_router(search.router, prefix="/search", tags=["search"])
api_router.include_router(benchmark.router, prefix="/benchmark", tags=["benchmark"])
