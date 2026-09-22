from typing import Dict, Any, List

class PolicyEngine:
    """
    Validates agent recommendations against corporate fraud policies.
    """
    
    # Thresholds could be moved to config or database
    HIGH_RISK_THRESHOLD = 80
    HIGH_VALUE_THRESHOLD = 5000
    
    @staticmethod
    def validate_action(risk_score: int, action_type: str, total_amount: float = 0) -> Dict[str, Any]:
        """
        Determines if an action requires human approval based on policy.
        """
        approval_required = False
        reason = "Automated policy check passed."
        
        # Policy 1: High risk actions always require approval
        if action_type in ["BLOCK_ACCOUNT", "FILE_REPORT", "PERMANENT_BAN"]:
            approval_required = True
            reason = f"Action {action_type} is high-impact and requires human oversight."
            
        # Policy 2: High risk score + High value transaction
        if risk_score > PolicyEngine.HIGH_RISK_THRESHOLD and total_amount > PolicyEngine.HIGH_VALUE_THRESHOLD:
            approval_required = True
            reason = "High risk score combined with high transaction value requires manual review."
            
        # Policy 3: New account (not implemented here, would need account age)
        
        return {
            "approval_required": approval_required,
            "policy_reason": reason
        }

policy_engine = PolicyEngine()
