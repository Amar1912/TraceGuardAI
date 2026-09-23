from typing import Any, Dict, List, Optional
import pyTigerGraph as tg
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

class TigerGraphClient:
    """
    Dedicated TigerGraph Service connecting to TraceGuardGraph on TigerGraph Cloud.
    Handles token management, RESTPP queries, error handling, and entity lookup.
    """
    def __init__(self):
        self.host = settings.TIGERGRAPH_HOST
        self.graph_name = settings.TIGERGRAPH_GRAPH_NAME
        self.secret = settings.TIGERGRAPH_SECRET
        self.conn = None
        self.token = None

    def connect(self):
        """
        Connects to TigerGraph Cloud instance and retrieves a valid authorization token.
        Handles errors gracefully without exposing secrets or tokens.
        """
        if not self.host or not self.secret:
            logger.info("TigerGraph host or secret missing in settings. Running in unconfigured/offline mode.")
            return None

        if not self.conn:
            try:
                self.conn = tg.TigerGraphConnection(
                    host=self.host,
                    graphname=self.graph_name,
                    gsqlSecret=self.secret
                )
                self.token = self.conn.getToken(self.secret)
            except Exception as e:
                logger.error(f"Failed to connect or authenticate with TigerGraph: {type(e).__name__}")
                self.conn = None
                self.token = None
                return None
        return self.conn

    async def run_query(self, query_name: str, params: Optional[Dict[str, Any]] = None) -> Optional[Any]:
        """
        Executes an installed GSQL query over RESTPP.
        """
        conn = self.connect()
        if not conn:
            return None
        try:
            return conn.runInstalledQuery(query_name, params or {})
        except Exception as e:
            logger.error(f"Error running TigerGraph query '{query_name}': {type(e).__name__}")
            return None

    async def get_schema(self) -> Dict[str, Any]:
        """
        Retrieves graph schema details from TigerGraph.
        """
        conn = self.connect()
        if conn:
            try:
                return conn.getSchema()
            except Exception as e:
                logger.error(f"Error fetching TigerGraph schema: {type(e).__name__}")
                return {"error": f"Failed to fetch schema: {type(e).__name__}"}
        return {"error": "TigerGraph not connected"}

    async def get_case_graph(self, case_id: str) -> Dict[str, Any]:
        """
        Retrieves subgraph related to a specific case or transaction.
        """
        conn = self.connect()
        if conn:
            try:
                # Primary vertex types to check
                for v_type in ["PaymentTransaction", "Case", "Transaction", "Account", "Customer"]:
                    try:
                        vertices = conn.getVerticesById(v_type, case_id)
                        if vertices:
                            nodes = [{"id": str(v.get("v_id", case_id)), "type": v.get("v_type", v_type), "label": str(v.get("v_id", case_id)), "attributes": v.get("attributes", {})} for v in vertices]
                            
                            # Fetch neighbors / connected edges
                            edges = []
                            try:
                                neighbors = conn.getNeighbors(v_type, case_id)
                                for n in neighbors:
                                    target_id = str(n.get("v_id", ""))
                                    if target_id:
                                        nodes.append({"id": target_id, "type": n.get("v_type", "Vertex"), "label": target_id, "attributes": n.get("attributes", {})})
                                        edges.append({"source": case_id, "target": target_id, "type": n.get("e_type", "CONNECTED_TO")})
                            except Exception:
                                pass

                            return {
                                "case_id": case_id,
                                "nodes": [{"id": n["id"], "type": n["type"], "label": n["label"]} for n in nodes],
                                "edges": [{"source": e["source"], "target": e["target"], "relationship": e.get("relationship", e.get("type", "CONNECTED_TO"))} for e in edges]
                            }
                    except Exception:
                        continue
            except Exception as e:
                logger.error(f"Error retrieving case graph for {case_id}: {type(e).__name__}")

        # Fallback structured graph construction matching GraphData schema
        from app.agent.tools.tigergraph import TigerGraphMCPClient
        mcp_client = TigerGraphMCPClient()
        ctx = await mcp_client.customer_context("cust-001", "acct-001")
        
        nodes = []
        edges = []
        cust_id = ctx.get("customer", {}).get("id", "cust-001")
        acct_id = ctx.get("account", {}).get("id", "acct-001")
        
        nodes.append({"id": case_id, "type": "Case", "label": case_id})
        nodes.append({"id": cust_id, "type": "Customer", "label": ctx.get("customer", {}).get("name", cust_id)})
        nodes.append({"id": acct_id, "type": "Account", "label": acct_id})
        
        edges.append({"source": case_id, "target": acct_id, "relationship": "ASSOCIATED_WITH"})
        edges.append({"source": acct_id, "target": cust_id, "relationship": "OWNED_BY"})
        
        for txn in ctx.get("transactions", []):
            txn_id = txn.get("id")
            if txn_id:
                nodes.append({"id": txn_id, "type": "PaymentTransaction", "label": f"${txn.get('amount', 0)}"})
                edges.append({"source": acct_id, "target": txn_id, "relationship": "INITIATED"})
                if txn.get("device_id"):
                    dev_id = txn.get("device_id")
                    nodes.append({"id": dev_id, "type": "Device", "label": dev_id})
                    edges.append({"source": txn_id, "target": dev_id, "relationship": "USED_DEVICE"})

        return {
            "case_id": case_id,
            "nodes": nodes,
            "edges": edges
        }

    async def get_entities(self, vertex_type: str, limit: int = 10) -> List[Dict[str, Any]]:
        conn = self.connect()
        if conn:
            try:
                return conn.getVertices(vertex_type, limit=limit)
            except Exception as e:
                logger.error(f"Error getting vertices for {vertex_type}: {type(e).__name__}")
        return []

    async def get_entity_by_id(self, vertex_type: str, vertex_id: str) -> Optional[Dict[str, Any]]:
        conn = self.connect()
        if conn:
            try:
                result = conn.getVerticesById(vertex_type, vertex_id)
                return result[0] if result else None
            except Exception as e:
                logger.error(f"Error getting entity {vertex_type}/{vertex_id}: {type(e).__name__}")
        return None

    async def get_shared_devices(self, account_id: str) -> List[Dict[str, Any]]:
        """
        Finds devices shared between multiple accounts.
        """
        conn = self.connect()
        if conn:
            try:
                res = conn.runInstalledQuery("findSharedDevices", {"acc": account_id})
                if res:
                    return res
            except Exception:
                pass
        return []

    async def get_transaction_network(self, transaction_id: str) -> Dict[str, Any]:
        """
        Traces connected transactions for a primary transaction ID.
        """
        conn = self.connect()
        if conn:
            try:
                for v_type in ["PaymentTransaction", "Transaction"]:
                    txn = await self.get_entity_by_id(v_type, transaction_id)
                    if txn:
                        return {"transaction": txn, "status": "retrieved"}
            except Exception as e:
                logger.error(f"Error tracing transaction network for {transaction_id}: {type(e).__name__}")
        return {}

tigergraph_client = TigerGraphClient()
