from ..config import HIGH_RISK_THRESHOLD, MEDIUM_RISK_THRESHOLD
from ..state import InvestigationState
from ..tools.actions import request_customer_verification, request_step_up_authentication
from ...utils.policy_engine import policy_engine


def recommend_action_node(state: InvestigationState) -> InvestigationState:
    risk = state.get("risk_score", 0.0)
    risk_int = int(risk * 100)
    actions = []
    
    # Decision logic
    if risk >= HIGH_RISK_THRESHOLD:
        actions.append({"action": "BLOCK_ACCOUNT", "reason": "High-risk patterns detected with high confidence."})
        actions.append({"action": "FILE_REPORT", "reason": "Mandatory reporting for critical risk levels."})
    elif risk >= MEDIUM_RISK_THRESHOLD:
        actions.append(request_step_up_authentication(state.get("customer", {}).get("id", "unknown")))
    else:
        actions.append({"action": "MONITOR_ACCOUNT", "reason": "Low risk detected, continued monitoring advised."})
        
    # Policy check
    approval_required = False
    for action in actions:
        policy_check = policy_engine.validate_action(risk_int, action["action"])
        if policy_check["approval_required"]:
            approval_required = True
            action["approval_required"] = True
            action["policy_reason"] = policy_check["policy_reason"]
            
    return {**state, "recommended_actions": actions, "approval_required": approval_required}
