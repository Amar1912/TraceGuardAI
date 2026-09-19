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
import uuid

class InvestigationService:
    @staticmethod
    async def start_investigation(db: Session, request: InvestigationStartRequest) -> InvestigationResponse:
        case_id = request.case_id
        db_case = db.query(Case).filter(Case.case_id == case_id).first()
        if not db_case:
            raise Exception(f"Case {case_id} not found")

        # 1. Start Agent Investigation
        agent_resp = await agent_client.start_investigation(case_id)
        
        # 2. Create Investigation Record
        inv_id = f"INV-{uuid.uuid4().hex[:6].upper()}"
        db_inv = Investigation(
            investigation_id=inv_id,
            case_id=case_id,
            trigger="HIGH_RISK_TXN",
            status="ACTIVE",
            risk_score=agent_resp["initial_assessment"]["risk_score"],
            confidence_score=int(agent_resp["initial_assessment"]["confidence"] * 100),
            fraud_pattern="Account Takeover",
            summary=agent_resp["initial_assessment"]["summary"]
        )
        db.add(db_inv)
        
        # 3. Add Evidence (Mocking retrieval from TigerGraph)
        evidence_data = [
            {"type": "DEVICE", "desc": "Unrecognized device OnePlus 11"},
            {"type": "CONNECTION", "desc": "IP 185.213.154.12 flagged as VPN"}
        ]
        db_evidences = []
        for i, ev in enumerate(evidence_data):
            db_ev = Evidence(
                evidence_id=f"EVD-{inv_id}-{i}",
                case_id=case_id,
                evidence_type=ev["type"],
                source="TigerGraph",
                description=ev["desc"],
                relevance="HIGH",
                confidence=95
            )
            db.add(db_ev)
            db_evidences.append(db_ev)

        # 4. Generate Findings via Agent
        agent_findings = await agent_client.analyze_evidence(case_id, [e.evidence_id for e in db_evidences])
        db_findings = []
        for i, f in enumerate(agent_findings["findings"]):
            db_f = Finding(
                finding_id=f"FND-{inv_id}-{i}",
                investigation_id=inv_id,
                title=f["title"],
                description=f["description"],
                severity=f["severity"],
                confidence=f["confidence"],
                supporting_evidence_ids=db_evidences[0].evidence_id # Simplified
            )
            db.add(db_f)
            db_findings.append(db_f)

        # 5. Get Next Best Action
        action_resp = await agent_client.get_next_best_action(case_id)
        db_action = NextBestAction(
            action_id=f"ACT-{inv_id}",
            case_id=case_id,
            action_type=action_resp["action"],
            recommendation=f"Recommended action: {action_resp['action']}",
            reason=action_resp["reason"],
            priority=action_resp["priority"],
            approval_required=action_resp["approval_required"],
            status="PENDING"
        )
        db.add(db_action)

        # 6. Add Timeline Event
        db_event = TimelineEvent(
            event_id=f"TL-{inv_id}",
            case_id=case_id,
            event_type="INVESTIGATION_STARTED",
            description="AI Agent initiated comprehensive graph audit.",
            actor="AI_AGENT"
        )
        db.add(db_event)

        db.commit()
        db.refresh(db_inv)
        db.refresh(db_case)

        return {
            "case": db_case,
            "investigation": db_inv,
            "evidence": db_evidences,
            "findings": db_findings,
            "risk_assessment": {
                "risk_score": db_inv.risk_score,
                "confidence": db_inv.confidence_score / 100.0,
                "uncertainty": "low"
            },
            "fraud_pattern": {
                "name": db_inv.fraud_pattern,
                "confidence": 0.92
            },
            "next_best_action": {
                "action": db_action.action_type,
                "reason": db_action.reason,
                "approval_required": db_action.approval_required
            },
            "timeline": [{"timestamp": db_event.timestamp.isoformat(), "title": "Investigation Started", "description": db_event.description}]
        }

investigation_service = InvestigationService()
