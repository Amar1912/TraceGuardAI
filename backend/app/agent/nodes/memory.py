from ..state import InvestigationState
from ..tools.case import persist_case_memory


def save_memory_node(state: InvestigationState) -> InvestigationState:
    # Logic to persist final investigation state for future retrieval
    return {**state, "explanation": {**state.get("explanation", {}), "memory_persisted": True}}
