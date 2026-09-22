from typing import Any, Dict, List

from ..agent.tools.tigergraph import TigerGraphMCPClient


class TigerGraphClient:
    """Integration facade for replacing the mock transport with GSQL or MCP REST."""

    def __init__(self, transport: Any = None) -> None:
        self._client = TigerGraphMCPClient(transport=transport)

    def get_case_graph(self, customer_id: str, account_id: str) -> Dict[str, Any]:
        return self._client.customer_context(customer_id, account_id)

    def get_transaction_paths(self, account_id: str) -> List[Dict[str, Any]]:
        return self._client._query("get_transaction_paths", account_id)