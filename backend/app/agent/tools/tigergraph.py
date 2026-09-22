from typing import Any, Dict, List
from ...integrations.tigergraph_client import tigergraph_client

MOCK_CUSTOMERS = {
    "cust-001": {"id": "cust-001", "name": "Asha Rao", "risk_tier": "standard", "country": "IN"},
}
MOCK_ACCOUNTS = {"acct-001": {"id": "acct-001", "customer_id": "cust-001", "status": "active"}}
MOCK_TRANSACTIONS = {
    "acct-001": [
        {"id": "txn-1001", "account_id": "acct-001", "amount": 9200.0, "currency": "INR", "counterparty": "acct-foreign-77", "device_id": "device-shared-9", "ip_cluster": "ip-cluster-4"},
        {"id": "txn-1002", "account_id": "acct-001", "amount": 8700.0, "currency": "INR", "counterparty": "acct-foreign-77", "device_id": "device-shared-9", "ip_cluster": "ip-cluster-4"},
    ]
}


async def get_customer(identifier: str) -> Dict[str, Any]:
    # Try real TigerGraph first
    try:
        real_data = await tigergraph_client.get_entity_by_id("Customer", identifier)
        if real_data:
            return real_data
    except Exception:
        pass
    return dict(MOCK_CUSTOMERS.get(identifier, {"id": identifier, "name": "Unknown customer", "risk_tier": "unknown"}))


async def get_account(identifier: str) -> Dict[str, Any]:
    try:
        real_data = await tigergraph_client.get_entity_by_id("Account", identifier)
        if real_data:
            return real_data
    except Exception:
        pass
    return dict(MOCK_ACCOUNTS.get(identifier, {"id": identifier, "customer_id": "cust-001", "status": "active"}))


async def get_account_transactions(identifier: str) -> List[Dict[str, Any]]:
    try:
        # Assuming a GSQL query for this
        real_data = await tigergraph_client.run_query("getAccountTransactions", {"account_id": identifier})
        if real_data:
            return real_data
    except Exception:
        pass
    return [dict(item) for item in MOCK_TRANSACTIONS.get(identifier, MOCK_TRANSACTIONS["acct-001"])]


async def get_connected_accounts(identifier: str) -> List[Dict[str, Any]]:
    try:
        real_data = await tigergraph_client.run_query("getConnectedAccounts", {"account_id": identifier})
        if real_data:
            return real_data
    except Exception:
        pass
    return [{"account_id": "acct-linked-12", "shared_with": identifier, "relationship": "device_overlap"}]


async def get_shared_devices(identifier: str) -> List[Dict[str, Any]]:
    try:
        real_data = await tigergraph_client.run_query("getSharedDevices", {"account_id": identifier})
        if real_data:
            return real_data
    except Exception:
        pass
    return [{"device_id": "device-shared-9", "account_count": 4, "account_ids": [identifier, "acct-linked-12", "acct-linked-18", "acct-linked-22"]}]


async def get_transaction_paths(identifier: str) -> List[Dict[str, Any]]:
    try:
        real_data = await tigergraph_client.run_query("getTransactionPaths", {"account_id": identifier})
        if real_data:
            return real_data
    except Exception:
        pass
    return [{"path": [identifier, "acct-foreign-77", "merchant-204"], "hops": 2, "velocity_hours": 18}]


async def get_related_entities(entity_id: str, entity_type: str) -> Dict[str, Any]:
    """
    Generic tool to find related entities in the graph.
    """
    try:
        # Assuming a GSQL query or pyTigerGraph traversal
        # This will be used by the agent to explore the graph
        conn = tigergraph_client.connect()
        if conn:
            neighbors = conn.getNeighbors(entity_type, entity_id)
            return {"entity_id": entity_id, "neighbors": neighbors}
    except Exception:
        pass
    return {"entity_id": entity_id, "neighbors": []}


class TigerGraphMCPClient:
    """Small adapter boundary; replace _query with GSQL/MCP transport in production."""

    def __init__(self, transport: Any = None) -> None:
        self.transport = transport

    async def _query(self, name: str, identifier: str) -> Any:
        if self.transport is not None:
            return self.transport(name, identifier)
        
        queries = {
            "get_customer": get_customer, 
            "get_account": get_account, 
            "get_account_transactions": get_account_transactions,
            "get_connected_accounts": get_connected_accounts, 
            "get_shared_devices": get_shared_devices,
            "get_transaction_paths": get_transaction_paths
        }
        return await queries[name](identifier)

    async def customer_context(self, customer_id: str, account_id: str) -> Dict[str, Any]:
        return {
            "customer": await self._query("get_customer", customer_id), 
            "account": await self._query("get_account", account_id),
            "transactions": await self._query("get_account_transactions", account_id),
            "connected_accounts": await self._query("get_connected_accounts", account_id),
            "shared_devices": await self._query("get_shared_devices", account_id),
            "transaction_paths": await self._query("get_transaction_paths", account_id)
        }
