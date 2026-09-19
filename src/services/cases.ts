import { useFraudStore } from "@/lib/mock-data/store";
import { Case, CaseStatus } from "@/types";

export const CaseService = {
  getCases: (): Case[] => {
    return useFraudStore.getState().cases;
  },

  getCaseById: (id: string): Case | undefined => {
    return useFraudStore.getState().cases.find((c) => c.id === id);
  },

  updateStatus: (caseId: string, status: CaseStatus): void => {
    useFraudStore.getState().updateCaseStatus(caseId, status);
  }
};
