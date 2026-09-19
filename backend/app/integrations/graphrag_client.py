from typing import List, Dict, Any
from app.core.config import settings

class GraphRAGClient:
    """
    Mock GraphRAG Client.
    Member 3 will later implement the actual GraphRAG pipeline.
    """
    def __init__(self):
        self.api_url = settings.GRAPHRAG_API_URL

    async def search(self, query: str) -> List[Dict[str, Any]]:
        return [
            {
                "text": "According to internal policy 4.2, crypto-exchanges are high-risk merchants for accounts under 12 months old.",
                "source": "Corporate Risk Manual"
            }
        ]

    async def get_fraud_pattern(self, pattern_name: str) -> Dict[str, Any]:
        return {
            "name": "Account Takeover",
            "description": "A form of identity theft where a fraudster gains unauthorized access to a victim's account.",
            "common_indicators": ["New device", "VPN usage", "Velocity spikes"]
        }

graphrag_client = GraphRAGClient()
