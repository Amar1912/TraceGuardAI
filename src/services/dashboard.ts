import { apiFetch } from "./api";
import { Case } from "@/types";

export interface DashboardSummary {
  active_cases: number;
  high_risk_cases: number;
  investigations_today: number;
  pending_approvals: number;
  total_cases: number;
}

export interface RiskTrendItem {
  date: string;
  risk_score: number;
  alert_count: number;
}

export interface CaseStatusItem {
  status: string;
  count: number;
}

export interface FraudPatternItem {
  pattern: string;
  count: number;
}

export const DashboardService = {
  getSummary: async (): Promise<DashboardSummary> => {
    return apiFetch("/dashboard/summary");
  },

  getRiskTrend: async (): Promise<RiskTrendItem[]> => {
    return apiFetch("/dashboard/risk-trend");
  },

  getCaseStatusDistribution: async (): Promise<CaseStatusItem[]> => {
    return apiFetch("/dashboard/case-status");
  },

  getFraudPatternDistribution: async (): Promise<FraudPatternItem[]> => {
    return apiFetch("/dashboard/fraud-patterns");
  },

  getRecentInvestigations: async (): Promise<Case[]> => {
    return apiFetch("/cases/?limit=5");
  }
};
