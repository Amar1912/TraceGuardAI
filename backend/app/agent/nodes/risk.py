from ..config import LOW_CONFIDENCE_THRESHOLD, HIGH_RISK_THRESHOLD, MEDIUM_RISK_THRESHOLD
from ..state import InvestigationState


def assess_risk_node(state: InvestigationState) -> InvestigationState:
    patterns = state.get("fraud_patterns", [])
    graph_evidence = state.get("graph_evidence", [])
    
    # Base risk starts from patterns
    risk = 0.2
    if patterns:
        max_pattern_severity = max([0.7 if p.get("severity") == "high" else 0.4 for p in patterns])
        risk = max(risk, max_pattern_severity)
    
    # Adjust risk based on graph evidence (e.g. shared devices)
    shared_device_evidence = [e for e in graph_evidence if e.get("type") == "shared_devices"]
    if shared_device_evidence:
        # Increase risk if device is shared with many accounts
        max_accounts = max([e.get("data", {}).get("account_count", 0) for e in shared_device_evidence] + [0])
        if max_accounts > 2:
            risk += 0.2
            
    # Adjust risk based on transaction amount
    transactions = state.get("transactions", [])
    total_amount = sum([txn.get("amount", 0) for txn in transactions])
    if total_amount > 5000:
        risk += 0.1
        
    risk = min(1.0, risk)
    
    # Confidence is based on amount of evidence
    confidence = 0.5
    if len(graph_evidence) >= 2:
        confidence += 0.2
    if len(patterns) >= 1:
        confidence += 0.2
        
    missing = []
    if not state.get("trigger", {}).get("customer_verified", False):
        missing.append("customer verification outcome")
    if not state.get("customer", {}).get("country"):
        missing.append("customer jurisdiction")
        
    uncertainty = "; ".join(missing) if missing else "Evidence supports the current assessment"
    
    # If risk is high but confidence is low, we definitely need more evidence
    additional_evidence_required = (risk > MEDIUM_RISK_THRESHOLD and confidence < LOW_CONFIDENCE_THRESHOLD)
    
    return {**state, "risk_score": risk, "confidence": min(1.0, confidence), "uncertainty": uncertainty,
            "missing_evidence": missing, "additional_evidence_required": additional_evidence_required}
