from sqlalchemy.orm import Session
from app.models.investigation import Investigation, Finding
from app.models.evidence import Evidence
from app.models.case import Case
from app.models.action import NextBestAction
from app.models.timeline import TimelineEvent
from app.schemas.investigation import InvestigationStartRequest, InvestigationResponse
from app.integrations.agent_client import agent_client
from app.integrations.tigergraph_client import tigergraph_client
from app.integrations.graphrag_client import graphrag_client
from datetime import datetime
from typing import Optional, List
import uuid

class InvestigationService:
    @staticmethod
    async def start_investigation(db: Session, request: InvestigationStartRequest) -> InvestigationResponse:
        case_id = request.case_id
        db_case = db.query(Case).filter(Case.case_id == case_id).first()
        if not db_case:
            raise Exception(f"Case {case_id} not found")

        # 1. Trigger Agentic Investigation (REAL AGENT)
        # Using the trigger info from the case
        trigger_payload = {
            "customer_id": db_case.customer_id,
            "account_id": db_case.transaction_id or "unknown", # using transaction_id as account_id proxy if not available
            "signal": db_case.trigger_type or "manual_audit"
        }
        
        agent_result = await agent_client.investigate(case_id, trigger_payload)
        
        # 2. Persist Investigation Record
        inv_id = f"INV-{uuid.uuid4().hex[:6].upper()}"
        db_inv = Investigation(
            investigation_id=inv_id,
            case_id=case_id,
            trigger=db_case.trigger_type or "MANUAL",
            status="COMPLETED",
            risk_score=int(agent_result.risk_score * 100),
            confidence_score=int(agent_result.confidence_score * 100),
            fraud_pattern=agent_result.fraud_patterns[0]["name"] if agent_result.fraud_patterns else "Unknown",
            summary=agent_result.explanation.get("reasoning_summary", "Agent completed graph analysis.")
        )
        db.add(db_inv)
        
        # 3. Persist Evidence from Agent findings
        db_evidences = []
        for i, ev in enumerate(agent_result.graph_evidence):
            db_ev = Evidence(
                evidence_id=f"EVD-{inv_id}-{i}",
                case_id=case_id,
                evidence_type=ev.get("type", "GRAPH"),
                source=ev.get("source", "TigerGraph"),
                description=str(ev.get("data", "Relationship identified in graph")),
                relevance="HIGH",
                confidence=90
            )
            db.add(db_ev)
            db_evidences.append(db_ev)

        # 4. Persist Findings
        db_findings = []
        for i, f in enumerate(agent_result.findings):
            db_f = Finding(
                finding_id=f"FND-{inv_id}-{i}",
                investigation_id=inv_id,
                title=f.get("summary", "Fraud Indicator"),
                description=f.get("pattern", "Suspicious pattern detected"),
                severity="HIGH",
                confidence=90,
                supporting_evidence_ids="" # Simplified
            )
            db.add(db_f)
            db_findings.append(db_f)

        # 5. Persist Actions
        db_actions = []
        for i, action in enumerate(agent_result.recommended_actions):
            db_action = NextBestAction(
                action_id=f"ACT-{inv_id}-{i}",
                case_id=case_id,
                action_type=action["action"],
                recommendation=action["action"],
                reason=action["reason"],
                priority="HIGH",
                approval_required=agent_result.approval_required,
                status="PENDING"
            )
            db.add(db_action)
            db_actions.append(db_action)

        # 6. Add Timeline Event
        db_event = TimelineEvent(
            event_id=f"TL-{inv_id}",
            case_id=case_id,
            event_type="AGENT_INVESTIGATION_COMPLETED",
            description=f"AI Agent analyzed {len(db_evidences)} data points and identified {len(db_findings)} findings.",
            actor="AI_AGENT"
        )
        db.add(db_event)

        db.commit()
        db.refresh(db_inv)
        db.refresh(db_case)

        return InvestigationService._format_response(db_case, db_inv, db_evidences, db_findings, db_actions, agent_result, db_event)

    @staticmethod
    def _format_response(db_case, db_inv, db_evidences, db_findings, db_actions, agent_result, db_event):
        return {
            "case": db_case,
            "investigation": db_inv,
            "evidence": db_evidences,
            "findings": db_findings,
            "risk_assessment": {
                "risk_score": db_inv.risk_score,
                "confidence": agent_result.confidence_score if hasattr(agent_result, 'confidence_score') else 0.9,
                "uncertainty": agent_result.uncertainty if hasattr(agent_result, 'uncertainty') else "low"
            },
            "fraud_pattern": {
                "name": db_inv.fraud_pattern,
                "confidence": 0.92
            },
            "next_best_action": {
                "action": db_actions[0].action_type if db_actions else "ESCALATE",
                "reason": db_actions[0].reason if db_actions else "Review required",
                "approval_required": getattr(agent_result, 'approval_required', True)
            },
            "timeline": [{"timestamp": db_event.timestamp.isoformat(), "title": "Investigation Completed", "description": db_event.description}]
        }

    @staticmethod
    def get_investigation_by_id(db: Session, inv_id: str) -> Optional[Investigation]:
        return db.query(Investigation).filter(Investigation.investigation_id == inv_id).first()

    @staticmethod
    def get_investigation_for_case(db: Session, case_id: str) -> Optional[Investigation]:
        return db.query(Investigation).filter(Investigation.case_id == case_id).order_by(Investigation.started_at.desc()).first()

investigation_service = InvestigationService()

