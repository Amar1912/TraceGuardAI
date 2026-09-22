from ..state import InvestigationState


def generate_explanation_node(state: InvestigationState) -> InvestigationState:
    return {**state, "explanation": {"evidence_considered": state.get("findings", []) + state.get("graph_evidence", []),
        "uncertainty": state.get("uncertainty", ""), "additional_evidence_requested": state.get("additional_evidence_required", False),
        "action_rationale": state.get("recommended_actions", []), "risk_vs_confidence": {"risk": state.get("risk_score", 0.0), "confidence": state.get("confidence", 0.0)}}}