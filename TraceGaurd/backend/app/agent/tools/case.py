from typing import Any, Dict

CASE_MEMORY: Dict[str, Dict[str, Any]] = {}


def load_case(case_id: str, trigger: Dict[str, Any]) -> Dict[str, Any]:
    customer_id = str(trigger.get("customer_id", "cust-001"))
    account_id = str(trigger.get("account_id", "acct-001"))
    return {"case_id": case_id, "customer_id": customer_id, "account_id": account_id, "trigger": dict(trigger)}


def persist_case_memory(case_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
    CASE_MEMORY[case_id] = {"case_id": case_id, "risk_score": payload.get("risk_score", 0.0),
                           "fraud_patterns": payload.get("fraud_patterns", []), "final_status": payload.get("final_status")}
    return {"case_id": case_id, "stored": True, "memory_type": "investigation_outcome", "risk_score": CASE_MEMORY[case_id]["risk_score"]}


def get_case_memory() -> list[Dict[str, Any]]:
    return list(CASE_MEMORY.values())