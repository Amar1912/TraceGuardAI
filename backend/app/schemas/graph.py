from pydantic import BaseModel
from typing import List, Optional

class GraphNode(BaseModel):
    id: str
    type: str
    label: str

class GraphEdge(BaseModel):
    source: str
    target: str
    relationship: str

class GraphData(BaseModel):
    case_id: str
    nodes: List[GraphNode]
    edges: List[GraphEdge]
