from ..state import InvestigationState
from ..tools.case import persist_case_memory


def save_memory_node(state: InvestigationState) -> InvestigationState:
    memory = persist_case_memory(state.get("case_id", "unknown"), dict(state))
    return {**state, "explanation": {**state.get("explanation", {}), "memory_persisted": memory["stored"]}}