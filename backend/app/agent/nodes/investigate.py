from ..state import InvestigationState
from ..tools.case import load_case
from ..tools.tigergraph import TigerGraphMCPClient


async def investigate_node(state: InvestigationState) -> InvestigationState:
    case = load_case(state["case_id"], state.get("trigger", {}))
    context = await TigerGraphMCPClient().customer_context(case["customer_id"], case["account_id"])
    return {**state, "customer": context["customer"], "transactions": context["transactions"], "iteration": state.get("iteration", 0)}