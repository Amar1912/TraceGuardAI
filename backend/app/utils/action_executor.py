from typing import Dict, Any

class MockActionExecutor:
    """
    Simulates execution of fraud mitigation actions.
    """
    
    @staticmethod
    def execute(action_type: str, target_id: str) -> Dict[str, Any]:
        """
        Executes the specified action and returns the result.
        """
        success = True
        message = f"Action {action_type} successfully executed on {target_id}."
        
        if action_type == "BLOCK_ACCOUNT":
            # Simulate external API call to core banking
            message = f"Account {target_id} has been blocked in the core ledger."
        elif action_type == "FILE_REPORT":
            message = f"Suspicious Activity Report (SAR) drafted for entity {target_id}."
        elif action_type == "WARN_CUSTOMER":
            message = f"Security notification dispatched to customer associated with {target_id}."
            
        return {
            "success": success,
            "message": message,
            "action": action_type,
            "target": target_id
        }

action_executor = MockActionExecutor()
