from ..state import InvestigationState
from ..tools.evidence import normalize_graph_evidence
from ..tools.tigergraph import TigerGraphMCPClient
from ...integrations.graphrag_client import GraphRAGClient


def collect_evidence_node(state: InvestigationState) -> InvestigationState:
    account_id = state.get("transactions", [{}])[0].get("account_id", "acct-001")
    context = TigerGraphMCPClient().customer_context(state.get("customer", {}).get("id", "cust-001"), account_id)
    entities = [account_id] + [str(txn.get("device_id")) for txn in state.get("transactions", [])]
    rag = GraphRAGClient().retrieve_context("fraud investigation risk evidence", entities)
    return {**state, "graph_evidence": normalize_graph_evidence(context), "similar_cases": rag["similar_cases"],
            "new_evidence_collected": rag["entity_subgraph"]}