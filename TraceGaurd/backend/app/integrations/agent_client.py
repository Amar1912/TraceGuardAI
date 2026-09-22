from typing import Any, Dict

from ..agent.graph import investigation_runnable
from ..agent.schemas.output import AgentResult


class AgentClient:
    async def investigate(self, case_id: str, trigger_payload: Dict[str, Any]) -> AgentResult:
        state = investigation_runnable.invoke({"case_id": case_id, "trigger": trigger_payload, "iteration": 0})
        return AgentResult.model_validate(state) if hasattr(AgentResult, "model_validate") else AgentResult.parse_obj(state)