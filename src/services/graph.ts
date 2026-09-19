import { getMockGraphData, globalGraphData } from "@/lib/mock-data/initial";
import { GraphNode, GraphEdge } from "@/types";

export const GraphService = {
  getGraphByCaseId: (caseId: string): { nodes: GraphNode[]; edges: GraphEdge[] } => {
    return getMockGraphData(caseId);
  },

  getGlobalGraph: (): { nodes: GraphNode[]; edges: GraphEdge[] } => {
    return globalGraphData;
  }
};
