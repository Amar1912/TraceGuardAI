import pyTigerGraph as tg
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

TIGERGRAPH_HOST = os.getenv("TIGERGRAPH_HOST", "")
TIGERGRAPH_GRAPH_NAME = "TraceGuardGraph"
TIGERGRAPH_SECRET = "jmcs5p0qgklb3erggr5ot94g6bj5u4bs"

def inspect():
    print(f"Connecting to {TIGERGRAPH_HOST}...")
    try:
        conn = tg.TigerGraphConnection(
            host=TIGERGRAPH_HOST,
            graphname=TIGERGRAPH_GRAPH_NAME,
            gsqlSecret=TIGERGRAPH_SECRET
        )
        conn.getToken(TIGERGRAPH_SECRET)
        
        print("\n--- SCHEMA ---")
        schema = conn.getSchema()
        
        print("\nVertex Types:")
        for vt in schema.get("VertexTypes", []):
            print(f"- {vt['Name']}")
            for attr in vt.get("Attributes", []):
                print(f"  * {attr['AttributeName']} ({attr['AttributeType']})")
        
        print("\nEdge Types:")
        for et in schema.get("EdgeTypes", []):
            print(f"- {et['Name']} ({et['FromVertexTypeName']} -> {et['ToVertexTypeName']})")
            
        print("\n--- STATISTICS ---")
        stats = conn.getStatistics()
        print(stats)

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    inspect()
