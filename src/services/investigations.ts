import { useFraudStore } from "@/lib/mock-data/store";
import { Evidence, Finding, NextBestAction, Approval, TimelineEvent } from "@/types";

export const InvestigationService = {
  getEvidenceForCase: (caseId: string): Evidence[] => {
    return useFraudStore.getState().evidence.filter((e) => e.caseId === caseId);
  },

  getFindingsForCase: (caseId: string): Finding[] => {
    return useFraudStore.getState().findings.filter((f) => f.caseId === caseId);
  },

  getNextActionForCase: (caseId: string): NextBestAction | undefined => {
    return useFraudStore.getState().nextActions.find((a) => a.caseId === caseId);
  },

  getApprovalForCase: (caseId: string): Approval | undefined => {
    return useFraudStore.getState().approvals.find((a) => a.caseId === caseId);
  },

  getTimelineForCase: (caseId: string): TimelineEvent[] => {
    return useFraudStore.getState().timelines.filter((t) => t.caseId === caseId);
  },

  submitActionDecision: (caseId: string, decision: "Approved" | "Rejected" | "Escalated"): void => {
    useFraudStore.getState().updateActionStatus(caseId, decision);
  },

  submitApprovalDecision: (approvalId: string, status: "Approved" | "Rejected", notes?: string): void => {
    useFraudStore.getState().updateApprovalStatus(approvalId, status, notes);
  },

  triggerEvidenceRequest: (caseId: string, label: string): void => {
    useFraudStore.getState().requestEvidence(caseId, label);
  }
};
