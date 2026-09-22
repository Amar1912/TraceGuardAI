from typing import Any, Dict, List


def normalize_graph_evidence(context: Dict[str, Any]) -> List[Dict[str, Any]]:
    evidence: List[Dict[str, Any]] = []
    for key in ("connected_accounts", "shared_devices", "transaction_paths"):
        for item in context.get(key, []):
            evidence.append({"source": "tigergraph", "type": key, "data": item})
    return evidence