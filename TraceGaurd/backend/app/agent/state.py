from typing import Any, Dict, List, Optional, TypedDict


class InvestigationState(TypedDict, total=False):
    case_id: str
    iteration: int
    trigger: Dict[str, Any]
    customer: Dict[str, Any]
    transactions: List[Dict[str, Any]]
    graph_evidence: List[Dict[str, Any]]
    findings: List[Dict[str, Any]]
    fraud_patterns: List[Dict[str, Any]]
    risk_score: float
    confidence: float
    uncertainty: str
    missing_evidence: List[str]
    additional_evidence_required: bool
    new_evidence_collected: List[Dict[str, Any]]
    recommended_actions: List[Dict[str, Any]]
    approval_required: bool
    approval_role: Optional[str]
    explanation: Dict[str, Any]
    similar_cases: List[Dict[str, Any]]
    sar_required: bool
    sar_report: Optional[Dict[str, Any]]
    final_status: str