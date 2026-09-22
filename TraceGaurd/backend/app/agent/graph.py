from typing import Any, Dict

from .config import MAX_ITERATIONS
from .nodes.decision import recommend_action_node
from .nodes.evidence import collect_evidence_node
from .nodes.explanation import generate_explanation_node
from .nodes.investigate import investigate_node
from .nodes.memory import save_memory_node
from .nodes.patterns import detect_patterns_node
from .nodes.policy import policy_guard_node
from .nodes.risk import assess_risk_node
from .state import InvestigationState


def _run(initial: InvestigationState) -> InvestigationState:
    state = investigate_node(initial)
    while True:
        state = collect_evidence_node(state)
        state = detect_patterns_node(state)
        state = assess_risk_node(state)
        if state.get("additional_evidence_required") and state.get("iteration", 0) < MAX_ITERATIONS:
            state = {**state, "iteration": state.get("iteration", 0) + 1, "additional_evidence_required": False,
                     "new_evidence_collected": state.get("new_evidence_collected", []) + [{"type": "verification_requested", "iteration": state.get("iteration", 0) + 1}]}
            continue
        state = recommend_action_node(state)
        state = policy_guard_node(state)
        state = generate_explanation_node(state)
        return save_memory_node(state)


def gather_more_evidence_node(state: InvestigationState) -> InvestigationState:
    next_iteration = state.get("iteration", 0) + 1
    return {**state, "iteration": next_iteration, "additional_evidence_required": False,
            "new_evidence_collected": state.get("new_evidence_collected", []) +
            [{"type": "verification_requested", "iteration": next_iteration}]}


def evaluate_uncertainty(state: InvestigationState) -> str:
    if state.get("additional_evidence_required") and state.get("iteration", 0) < MAX_ITERATIONS:
        return "gather_more_evidence"
    return "recommend_action"


try:
    from langgraph.graph import END, StateGraph

    _workflow = StateGraph(InvestigationState)
    _workflow.add_node("investigate", investigate_node)
    _workflow.add_node("collect_evidence", collect_evidence_node)
    _workflow.add_node("detect_patterns", detect_patterns_node)
    _workflow.add_node("assess_risk", assess_risk_node)
    _workflow.add_node("gather_more_evidence", gather_more_evidence_node)
    _workflow.add_node("recommend_action", recommend_action_node)
    _workflow.add_node("policy_guard", policy_guard_node)
    _workflow.add_node("generate_explanation", generate_explanation_node)
    _workflow.add_node("save_memory", save_memory_node)
    _workflow.set_entry_point("investigate")
    _workflow.add_edge("investigate", "collect_evidence")
    _workflow.add_edge("collect_evidence", "detect_patterns")
    _workflow.add_edge("detect_patterns", "assess_risk")
    _workflow.add_conditional_edges("assess_risk", evaluate_uncertainty,
                                    {"gather_more_evidence": "gather_more_evidence", "recommend_action": "recommend_action"})
    _workflow.add_edge("gather_more_evidence", "collect_evidence")
    _workflow.add_edge("recommend_action", "policy_guard")
    _workflow.add_edge("policy_guard", "generate_explanation")
    _workflow.add_edge("generate_explanation", "save_memory")
    _workflow.add_edge("save_memory", END)
    investigation_runnable = _workflow.compile()
except ImportError:
    class _FallbackRunnable:
        def invoke(self, state: InvestigationState) -> InvestigationState:
            return _run(state)

        async def ainvoke(self, state: InvestigationState) -> InvestigationState:
            return _run(state)

    investigation_runnable = _FallbackRunnable()