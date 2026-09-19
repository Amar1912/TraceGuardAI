from typing import List, Dict, Any
from app.core.config import settings

class TigerGraphClient:
    """
    Mock TigerGraph Client.
    Member 2 will later implement real GSQL queries here.
    """
    def __init__(self):
        self.host = settings.TIGERGRAPH_HOST
        self.username = settings.TIGERGRAPH_USERNAME
        self.password = settings.TIGERGRAPH_PASSWORD
        self.graph_name = settings.TIGERGRAPH_GRAPH_NAME

    async def get_case_graph(self, case_id: str) -> Dict[str, Any]:
        # Mock graph data
        return {
            "case_id": case_id,
            "nodes": [
                {"id": "CUST-10452", "type": "customer", "label": "Sarah Jenkins"},
                {"id": "ACC-001", "type": "account", "label": "Checking **4921"},
                {"id": "TXN-001", "type": "transaction", "label": "$4,850.00 to CryptoVantage"},
                {"id": "DEV-001", "type": "device", "label": "OnePlus 11 (Unrecognized)"},
                {"id": "IP-001", "type": "ip", "label": "185.213.154.12 (VPN)"}
            ],
            "edges": [
                {"source": "CUST-10452", "target": "ACC-001", "relationship": "OWNS"},
                {"source": "ACC-001", "target": "TXN-001", "relationship": "INITIATED"},
                {"source": "TXN-001", "target": "DEV-001", "relationship": "USED"},
                {"source": "TXN-001", "target": "IP-001", "relationship": "CONNECTED_TO"}
            ]
        }

    async def get_customer_relationships(self, customer_id: str) -> List[Dict[str, Any]]:
        return []

    async def get_transaction_relationships(self, transaction_id: str) -> List[Dict[str, Any]]:
        return []

    async def get_related_devices(self, entity_id: str) -> List[Dict[str, Any]]:
        return []

    async def get_previous_cases(self, customer_id: str) -> List[Dict[str, Any]]:
        return []

tigergraph_client = TigerGraphClient()
