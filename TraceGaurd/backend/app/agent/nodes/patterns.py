from ..state import InvestigationState


def detect_patterns_node(state: InvestigationState) -> InvestigationState:
    patterns = []
    devices = [item for item in state.get("graph_evidence", []) if item["type"] == "shared_devices"]
    paths = [item for item in state.get("graph_evidence", []) if item["type"] == "transaction_paths"]
    if devices and devices[0]["data"].get("account_count", 0) >= 3:
        patterns.append({"name": "device_sharing_ring", "severity": "high", "evidence": "device used across multiple accounts"})
    if paths and paths[0]["data"].get("velocity_hours", 99) <= 24:
        patterns.append({"name": "rapid_movement", "severity": "high", "evidence": "common counterparty and short velocity window"})
    findings = [{"type": "pattern", "summary": pattern["evidence"], "pattern": pattern["name"]} for pattern in patterns]
    return {**state, "fraud_patterns": patterns, "findings": findings}