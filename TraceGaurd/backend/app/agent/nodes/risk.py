from ..config import LOW_CONFIDENCE_THRESHOLD
from ..state import InvestigationState


def assess_risk_node(state: InvestigationState) -> InvestigationState:
    patterns = state.get("fraud_patterns", [])
    risk = min(1.0, 0.25 + 0.3 * len(patterns))
    confidence = 0.55 + min(0.4, 0.15 * len(state.get("graph_evidence", [])))
    missing = []
    if not state.get("trigger", {}).get("customer_verified", False):
        missing.append("customer verification outcome")
    if not state.get("customer", {}).get("country"):
        missing.append("customer jurisdiction")
    uncertainty = "; ".join(missing) if missing else "Evidence supports the current assessment"
    return {**state, "risk_score": risk, "confidence": min(1.0, confidence), "uncertainty": uncertainty,
            "missing_evidence": missing, "additional_evidence_required": confidence < LOW_CONFIDENCE_THRESHOLD}