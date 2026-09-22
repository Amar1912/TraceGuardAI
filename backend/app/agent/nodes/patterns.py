from ..state import InvestigationState


def detect_patterns_node(state: InvestigationState) -> InvestigationState:
    patterns = []
    graph_evidence = state.get("graph_evidence", [])
    transactions = state.get("transactions", [])
    
    # 1. Device Sharing Ring
    devices = [item for item in graph_evidence if item["type"] == "shared_devices"]
    if devices and devices[0]["data"].get("account_count", 0) >= 3:
        patterns.append({"name": "Device Sharing Ring", "severity": "high", "evidence": "Hardware ID used across 3+ unrelated accounts"})
    
    # 2. Rapid Movement (Velocity)
    paths = [item for item in graph_evidence if item["type"] == "transaction_paths"]
    if paths and paths[0]["data"].get("velocity_hours", 99) <= 24:
        patterns.append({"name": "Rapid Asset Movement", "severity": "high", "evidence": "High-velocity transfers to common counterparty nodes"})
        
    # 3. Account Takeover (ATO) Indicators
    # e.g. New device + VPN + High amount
    ip_evidence = [item for item in graph_evidence if item.get("type") == "ip_cluster" or "VPN" in str(item.get("data", ""))]
    if devices and ip_evidence and any(t.get("amount", 0) > 1000 for t in transactions):
        patterns.append({"name": "Account Takeover", "severity": "high", "evidence": "Anonymized network access from unrecognized hardware with high-value exit"})

    # 4. Money Laundering / Structuring
    # e.g. multiple transactions just below a threshold (mock logic)
    high_value_txns = [t for t in transactions if 8000 < t.get("amount", 0) < 10000]
    if len(high_value_txns) >= 2:
         patterns.append({"name": "Potential Structuring", "severity": "medium", "evidence": "Successive transactions just below reporting thresholds"})

    findings = [{"type": "pattern", "summary": pattern["evidence"], "pattern": pattern["name"]} for pattern in patterns]
    return {**state, "fraud_patterns": patterns, "findings": findings}
