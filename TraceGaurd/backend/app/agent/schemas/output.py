from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class AgentResult(BaseModel):
    case_id: str
    iteration: int = Field(ge=0, le=2)
    trigger: Dict[str, Any] = Field(default_factory=dict)
    customer: Dict[str, Any] = Field(default_factory=dict)
    transactions: List[Dict[str, Any]] = Field(default_factory=list)
    graph_evidence: List[Dict[str, Any]] = Field(default_factory=list)
    findings: List[Dict[str, Any]] = Field(default_factory=list)
    fraud_patterns: List[Dict[str, Any]] = Field(default_factory=list)
    risk_score: float = Field(default=0.0, ge=0.0, le=1.0)
    confidence: float = Field(default=0.0, ge=0.0, le=1.0)
    uncertainty: str = ""
    missing_evidence: List[str] = Field(default_factory=list)
    additional_evidence_required: bool = False
    new_evidence_collected: List[Dict[str, Any]] = Field(default_factory=list)
    recommended_actions: List[Dict[str, Any]] = Field(default_factory=list)
    approval_required: bool = False
    approval_role: Optional[str] = None
    explanation: Dict[str, Any] = Field(default_factory=dict)
    similar_cases: List[Dict[str, Any]] = Field(default_factory=list)
    sar_required: bool = False
    sar_report: Optional[Dict[str, Any]] = None
    final_status: str = "completed"

    class Config:
        extra = "forbid"