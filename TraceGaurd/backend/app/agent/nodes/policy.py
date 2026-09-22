from ..config import SAR_RISK_THRESHOLD
from ..state import InvestigationState


def policy_guard_node(state: InvestigationState) -> InvestigationState:
    actions = state.get("recommended_actions", [])
    approval = any(item.get("action") in {"BLOCK_ACCOUNT", "FREEZE_CARD", "REFUND"} for item in actions)
    sar = state.get("risk_score", 0.0) >= SAR_RISK_THRESHOLD and bool(state.get("fraud_patterns"))
    return {**state, "approval_required": approval, "approval_role": "fraud analyst" if approval else None,
            "sar_required": sar, "sar_report": {"status": "draft", "reason": "suspicious activity indicators", "case_id": state.get("case_id", "unknown")} if sar else None,
            "final_status": "pending_analyst_approval" if approval else "completed"}