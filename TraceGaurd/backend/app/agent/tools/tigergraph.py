from typing import Any, Dict, List


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


def get_customer(identifier: str) -> Dict[str, Any]:
    return dict(MOCK_CUSTOMERS.get(identifier, {"id": identifier, "name": "Unknown customer", "risk_tier": "unknown"}))


def get_account(identifier: str) -> Dict[str, Any]:
    return dict(MOCK_ACCOUNTS.get(identifier, {"id": identifier, "customer_id": "cust-001", "status": "active"}))


def get_account_transactions(identifier: str) -> List[Dict[str, Any]]:
    return [dict(item) for item in MOCK_TRANSACTIONS.get(identifier, MOCK_TRANSACTIONS["acct-001"])]


def get_connected_accounts(identifier: str) -> List[Dict[str, Any]]:
    return [{"account_id": "acct-linked-12", "shared_with": identifier, "relationship": "device_overlap"}]


def get_shared_devices(identifier: str) -> List[Dict[str, Any]]:
    return [{"device_id": "device-shared-9", "account_count": 4, "account_ids": [identifier, "acct-linked-12", "acct-linked-18", "acct-linked-22"]}]


def get_transaction_paths(identifier: str) -> List[Dict[str, Any]]:
    return [{"path": [identifier, "acct-foreign-77", "merchant-204"], "hops": 2, "velocity_hours": 18}]


class TigerGraphMCPClient:
    """Small adapter boundary; replace _query with GSQL/MCP transport in production."""

    def __init__(self, transport: Any = None) -> None:
        self.transport = transport

    def _query(self, name: str, identifier: str) -> Any:
        if self.transport is not None:
            return self.transport(name, identifier)
        return {"get_customer": get_customer, "get_account": get_account, "get_account_transactions": get_account_transactions,
                "get_connected_accounts": get_connected_accounts, "get_shared_devices": get_shared_devices,
                "get_transaction_paths": get_transaction_paths}[name](identifier)

    def customer_context(self, customer_id: str, account_id: str) -> Dict[str, Any]:
        return {"customer": self._query("get_customer", customer_id), "account": self._query("get_account", account_id),
                "transactions": self._query("get_account_transactions", account_id),
                "connected_accounts": self._query("get_connected_accounts", account_id),
                "shared_devices": self._query("get_shared_devices", account_id),
                "transaction_paths": self._query("get_transaction_paths", account_id)}