import { apiFetch } from "./api";
import { GraphData } from "@/types";

export const GraphService = {
  getGraphByCaseId: async (caseId: string): Promise<GraphData> => {
    return apiFetch(`/graph/${caseId}`);
  },

  getGlobalGraph: async (): Promise<GraphData> => {
    return apiFetch("/graph/all");
  }
};
