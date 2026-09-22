from ..state import InvestigationState


def generate_explanation_node(state: InvestigationState) -> InvestigationState:
    risk = state.get("risk_score", 0.0)
    patterns = [p["name"] for p in state.get("fraud_patterns", [])]
    
    summary = f"Investigation concluded with a risk score of {risk:.2f}. "
    if patterns:
        summary += f"Identified patterns: {', '.join(patterns)}. "
    else:
        summary += "No specific fraud patterns identified. "
        
    if state.get("additional_evidence_required"):
        summary += "Additional evidence has been requested to resolve remaining uncertainties."
    else:
        summary += "Sufficient evidence collected for final recommendation."

    return {
        **state, 
        "explanation": {
            "reasoning_summary": summary,
            "evidence_considered": state.get("findings", []) + state.get("graph_evidence", []),
            "uncertainty": state.get("uncertainty", ""), 
            "additional_evidence_requested": state.get("additional_evidence_required", False),
            "action_rationale": state.get("recommended_actions", []), 
            "risk_vs_confidence": {"risk": risk, "confidence": state.get("confidence", 0.0)},
            "memory_persisted": True
        }
    }
