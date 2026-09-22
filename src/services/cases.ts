import { apiFetch } from "./api";
import { Case, CaseStatus } from "@/types";

export const CaseService = {
  getCases: async (): Promise<Case[]> => {
    return apiFetch("/cases/");
  },

  getCaseById: async (id: string): Promise<Case> => {
    return apiFetch(`/cases/${id}`);
  },

  updateStatus: async (caseId: string, status: CaseStatus): Promise<Case> => {
    return apiFetch(`/cases/${caseId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  }
};
