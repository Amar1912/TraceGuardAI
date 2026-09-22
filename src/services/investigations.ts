import { apiFetch } from "./api";
import { Evidence, Finding, NextBestAction, Approval, TimelineEvent, InvestigationData } from "@/types";

export const InvestigationService = {
  startInvestigation: async (caseId: string): Promise<InvestigationData> => {
    return apiFetch("/investigations/start", {
      method: "POST",
      body: JSON.stringify({ case_id: caseId }),
    });
  },

  getEvidenceForCase: async (caseId: string): Promise<Evidence[]> => {
    return apiFetch(`/cases/${caseId}/evidence`);
  },

  getFindingsForCase: async (caseId: string): Promise<Finding[]> => {
    const investigation = await apiFetch(`/cases/${caseId}/investigation`);
    return investigation ? investigation.findings : [];
  },

  getNextActionForCase: async (caseId: string): Promise<NextBestAction | undefined> => {
    const actions = await apiFetch(`/cases/${caseId}/actions`);
    return actions[0];
  },

  getApprovalForCase: async (caseId: string): Promise<Approval | undefined> => {
    const approvals = await apiFetch(`/cases/${caseId}/approvals`);
    return approvals[0];
  },

  getTimelineForCase: async (caseId: string): Promise<TimelineEvent[]> => {
    return apiFetch(`/cases/${caseId}/timeline`);
  },

  submitActionDecision: async (caseId: string, decision: "Approved" | "Rejected" | "Escalated"): Promise<void> => {
    // Logic to update action status
    const action = await InvestigationService.getNextActionForCase(caseId);
    if (action) {
      await apiFetch(`/actions/${action.action_id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: decision.toUpperCase() }),
      });
    }
  },

  submitApprovalDecision: async (approvalId: string, status: "Approved" | "Rejected", notes?: string): Promise<void> => {
    const endpoint = status === "Approved" ? "approve" : "reject";
    await apiFetch(`/approvals/${approvalId}/${endpoint}`, {
      method: "POST",
      body: JSON.stringify({ reason: notes }),
    });
  },

  triggerEvidenceRequest: async (caseId: string, label: string): Promise<void> => {
    await apiFetch(`/cases/${caseId}/timeline`, {
      method: "POST",
      body: JSON.stringify({
        event_type: "EVIDENCE_REQUESTED",
        description: `Analyst requested additional evidence: ${label}`,
        actor: "ANALYST"
      }),
    });
  }
};
