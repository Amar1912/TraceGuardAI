from ..config import HIGH_RISK_THRESHOLD, MEDIUM_RISK_THRESHOLD
from ..state import InvestigationState
from ..tools.actions import request_customer_verification, request_step_up_authentication


def recommend_action_node(state: InvestigationState) -> InvestigationState:
    risk = state.get("risk_score", 0.0)
    actions = []
    if risk >= HIGH_RISK_THRESHOLD:
        actions.append({"action": "BLOCK_ACCOUNT", "reason": "high risk typology indicators"})
    elif risk >= MEDIUM_RISK_THRESHOLD:
        actions.append(request_step_up_authentication(state.get("customer", {}).get("id", "unknown")))
    else:
        actions.append(request_customer_verification(state.get("transactions", [{}])[0].get("id", "unknown")))
    return {**state, "recommended_actions": actions}