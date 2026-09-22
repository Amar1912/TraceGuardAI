from typing import Any, Dict, List
from app.core.config import settings
from app.agent.tools.case import get_case_memory

REFERENCE_DATA = [
    {"kind": "policy", "id": "policy-velocity", "text": "Review rapid outbound movement and linked-account activity; step up authentication when customer intent is uncertain."},
    {"kind": "typology", "id": "pattern-device-ring", "text": "One device used across multiple unrelated accounts is a device-sharing ring indicator."},
    {"kind": "typology", "id": "pattern-rapid-movement", "text": "Multiple high-value transfers to a common counterparty in a short period indicate rapid movement."},
    {"kind": "typology", "id": "pattern-cycle", "text": "Funds returning through a connected path may indicate a circular transaction pattern."},
    {"kind": "regulatory", "id": "sar-trigger", "text": "File a SAR when activity is suspicious, material, and lacks a credible legitimate explanation; preserve evidence and rationale."},
    {"kind": "case", "id": "case-cleared-014", "text": "A verified business customer with documented payroll transfers was cleared after source-of-funds evidence."},
]

class GraphRAGClient:
    """
    GraphRAG Client for policy and knowledge retrieval.
    """
    def __init__(self, references: List[Dict[str, Any]] | None = None) -> None:
        self.references = references or REFERENCE_DATA
        self.api_url = settings.GRAPHRAG_API_URL

    def retrieve_context(self, query: str, entities: List[str]) -> Dict[str, Any]:
        """
        Retrieves relevant policy/regulatory context for a query.
        """
        terms = set((query + " " + " ".join(entities)).lower().split())
        ranked = sorted(self.references, key=lambda item: sum(word in item["text"].lower() for word in terms), reverse=True)
        memory = get_case_memory()
        return {
            "query": query, 
            "entities": entities, 
            "policy_rules": [x for x in ranked if x["kind"] in ("policy", "regulatory")][:3],
            "typologies": [x for x in ranked if x["kind"] == "typology"][:5], 
            "similar_cases": [x for x in ranked if x["kind"] == "case"][:3],
            "case_memory": memory[-5:],
            "entity_subgraph": [{"entity": entity, "related": "shared_device_or_ip_cluster", "source": "tigergraph"} for entity in entities]
        }

    async def search(self, query: str) -> List[Dict[str, Any]]:
        # For legacy compatibility
        return [{"text": r["text"], "source": r["id"]} for r in self.references[:2]]

    async def get_fraud_pattern(self, pattern_name: str) -> Dict[str, Any]:
        return {
            "name": pattern_name,
            "description": "Retrieved fraud pattern description.",
            "common_indicators": []
        }

graphrag_client = GraphRAGClient()

def retrieve_context(query: str, entities: List[str]) -> Dict[str, Any]:
    return graphrag_client.retrieve_context(query, entities)
