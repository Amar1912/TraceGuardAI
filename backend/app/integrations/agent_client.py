from typing import Any, Dict, List
from app.core.config import settings
from app.agent.graph import investigation_runnable
from app.agent.schemas.output import AgentResult

class AgentClient:
    """
    AI Agent Client using LangGraph.
    Orchestrates the investigation workflow.
    """
    def __init__(self):
        self.api_url = settings.AGENT_API_URL

    async def investigate(self, case_id: str, trigger_payload: Dict[str, Any]) -> AgentResult:
        """
        Runs the LangGraph investigation runnable.
        """
        # Note: investigation_runnable.ainvoke is used for async
        state = await investigation_runnable.ainvoke({
            "case_id": case_id, 
            "trigger": trigger_payload, 
            "iteration": 0
        })
        return AgentResult.model_validate(state) if hasattr(AgentResult, "model_validate") else AgentResult.parse_obj(state)

    async def start_investigation(self, case_id: str) -> Dict[str, Any]:
        """
        Backward compatibility / Legacy interface.
        """
        # For now, we can map this to investigate with a mock trigger
        result = await self.investigate(case_id, {
            "customer_id": "unknown",
            "account_id": "unknown",
            "signal": "manual_trigger"
        })
        return {
            "status": "success",
            "message": "AI Agent investigation completed.",
            "initial_assessment": {
                "risk_score": int(result.risk_score * 100),
                "confidence": result.confidence_score,
                "summary": result.explanation
            }
        }

    async def analyze_evidence(self, case_id: str, evidence_ids: List[str]) -> Dict[str, Any]:
        return {
            "findings": []
        }

    async def get_next_best_action(self, case_id: str) -> Dict[str, Any]:
        return {
            "action": "ESCALATE_ANALYST",
            "reason": "High risk detected by agent.",
            "priority": "HIGH",
            "approval_required": True
        }

agent_client = AgentClient()
