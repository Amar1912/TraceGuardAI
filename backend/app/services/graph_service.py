from app.integrations.tigergraph_client import tigergraph_client
from typing import Dict, Any

class GraphService:
    @staticmethod
    async def get_case_graph(case_id: str) -> Dict[str, Any]:
        return await tigergraph_client.get_case_graph(case_id)

graph_service = GraphService()
