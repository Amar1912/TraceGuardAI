import { create } from "zustand";
import { Case, Customer, Transaction, Evidence, Finding, NextBestAction, Approval, TimelineEvent, CaseStatus, PriorityLevel } from "@/types";
import {
  initialCases,
  initialCustomers,
  initialTransactions,
  initialEvidence,
  initialFindings,
  initialNextActions,
  initialApprovals,
  initialTimelines,
  getMockGraphData
} from "./initial";

interface FraudStore {
  cases: Case[];
  customers: Customer[];
  transactions: Transaction[];
  evidence: Evidence[];
  findings: Finding[];
  nextActions: NextBestAction[];
  approvals: Approval[];
  timelines: TimelineEvent[];

  // Actions
  updateCaseStatus: (caseId: string, status: CaseStatus) => void;
  updateActionStatus: (caseId: string, status: "Pending" | "Approved" | "Rejected" | "Escalated") => void;
  updateApprovalStatus: (id: string, status: "Pending" | "Approved" | "Rejected", notes?: string) => void;
  requestEvidence: (caseId: string, evidenceType: string) => void;
  addTimelineEvent: (caseId: string, title: string, description: string, type: TimelineEvent["type"], status?: string) => void;
}

export const useFraudStore = create<FraudStore>((set) => ({
  cases: initialCases,
  customers: initialCustomers,
  transactions: initialTransactions,
  evidence: initialEvidence,
  findings: initialFindings,
  nextActions: initialNextActions,
  approvals: initialApprovals,
  timelines: initialTimelines,

  updateCaseStatus: (caseId, status) => set((state) => {
    const nowStr = new Date().toISOString();
    return {
      cases: state.cases.map((c) => c.id === caseId ? { ...c, status, updatedAt: nowStr } : c)
    };
  }),

  updateActionStatus: (caseId, status) => set((state) => {
    // Also record in timeline
    const timeLabel = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newEvent: TimelineEvent = {
      id: `TL-NEW-${Math.random()}`,
      caseId,
      timestamp: new Date().toISOString(),
      timeLabel,
      title: `Recommended action updated`,
      description: `Action recommendation status transitioned to ${status}.`,
      type: "action",
      status
    };

    return {
      nextActions: state.nextActions.map((a) => a.caseId === caseId ? { ...a, status } : a),
      timelines: [newEvent, ...state.timelines]
    };
  }),

  updateApprovalStatus: (id, status, notes) => set((state) => {
    const approval = state.approvals.find((a) => a.id === id);
    if (!approval) return {};

    const caseId = approval.caseId;
    const timeLabel = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newEvent: TimelineEvent = {
      id: `TL-NEW-${Math.random()}`,
      caseId,
      timestamp: new Date().toISOString(),
      timeLabel,
      title: `Approval decision: ${status}`,
      description: `Analyst processed the approval directive [${approval.action}] with outcome: ${status}. ${notes ? `Notes: ${notes}` : ""}`,
      type: "approval",
      status
    };

    // If approved, let's also update the case status to Resolved if it was a block/final action, or just update approval state
    const updatedCases = state.cases.map((c) => {
      if (c.id === caseId && status === "Approved") {
        return { ...c, status: "Resolved" as CaseStatus, updatedAt: new Date().toISOString() };
      }
      return c;
    });

    return {
      approvals: state.approvals.map((a) => a.id === id ? { ...a, status, notes } : a),
      timelines: [newEvent, ...state.timelines],
      cases: updatedCases
    };
  }),

  requestEvidence: (caseId, evidenceType) => set((state) => {
    const timeLabel = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newEvdId = `EVD-NEW-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

    const newEvidenceItem: Evidence = {
      id: newEvdId,
      caseId,
      type: "Behavioral Signal",
      source: "Manual Analyst Trigger",
      description: `Requested supplementary certification: ${evidenceType}. Awaiting ingestion pipeline feedback.`,
      timestamp: new Date().toISOString(),
      confidence: 50,
      relevance: "Medium"
    };

    const newEvent: TimelineEvent = {
      id: `TL-NEW-${Math.random()}`,
      caseId,
      timestamp: new Date().toISOString(),
      timeLabel,
      title: "Supplementary Evidence Requested",
      description: `Analyst demanded operational telemetry validation for: ${evidenceType}.`,
      type: "analyst"
    };

    return {
      evidence: [...state.evidence, newEvidenceItem],
      timelines: [newEvent, ...state.timelines]
    };
  }),

  addTimelineEvent: (caseId, title, description, type, status) => set((state) => {
    const timeLabel = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newEvent: TimelineEvent = {
      id: `TL-NEW-${Math.random()}`,
      caseId,
      timestamp: new Date().toISOString(),
      timeLabel,
      title,
      description,
      type,
      status
    };
    return {
      timelines: [newEvent, ...state.timelines]
    };
  })
}));
