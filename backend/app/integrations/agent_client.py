from typing import List, Dict, Any
from app.core.config import settings

class AgentClient:
    """
    Mock AI Agent Client.
    Member 3 will later connect the real LangGraph agent here.
    """
    def __init__(self):
        self.api_url = settings.AGENT_API_URL

    async def start_investigation(self, case_id: str) -> Dict[str, Any]:
        return {
            "status": "success",
            "message": "AI Agent investigation started.",
            "initial_assessment": {
                "risk_score": 91,
                "confidence": 0.94,
                "summary": "Multiple unusual transactions detected from a previously unseen device and VPN connection."
            }
        }

    async def analyze_evidence(self, case_id: str, evidence_ids: List[str]) -> Dict[str, Any]:
        return {
            "findings": [
                {
                    "title": "Unusual device association",
                    "description": "The OnePlus 11 device used has no prior history with this customer account.",
                    "severity": "HIGH",
                    "confidence": 96
                }
            ]
        }

    async def get_next_best_action(self, case_id: str) -> Dict[str, Any]:
        return {
            "action": "ESCALATE_ANALYST",
            "reason": "High risk combined with impossible travel/velocity spike.",
            "priority": "HIGH",
            "approval_required": True
        }

agent_client = AgentClient()
