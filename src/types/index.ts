export type FraudPattern =
  | "Account Takeover"
  | "Identity Theft"
  | "Synthetic Fraud"
  | "Card Not Present (CNP)"
  | "Money Laundering"
  | "Structuring"
  | "Phishing Scam"
  | "Unknown";

export type CaseStatus =
  | "Open"
  | "Investigating"
  | "Pending Approval"
  | "Resolved"
  | "OPEN"
  | "INVESTIGATING"
  | "PENDING_APPROVAL"
  | "RESOLVED"
  | "ESCALATED";

export type PriorityLevel = "Low" | "Medium" | "High" | "Critical";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  accountStatus: "Active" | "Suspended" | "Blocked" | "Under Review";
  riskLevel: PriorityLevel;
  riskScore: number;
  accountAgeDays: number;
  transactionCount: number;
  previousCasesCount: number;
  knownDevicesCount: number;
  knownConnectionsCount: number;
  joinedDate: string;
}

export interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  merchant: string;
  category: string;
  location: string;
  timestamp: string;
  deviceInfo: string;
  ipAddress: string;
  riskScore: number;
  status: "Cleared" | "Pending" | "Blocked" | "Flagged";
}

export interface Case {
  id: string;
  customerId: string;
  customerName: string;
  transactionId?: string;
  riskScore: number;
  confidenceScore: number;
  fraudPattern: FraudPattern;
  status: CaseStatus;
  priority: PriorityLevel;
  createdAt: string;
  updatedAt: string;
  summary: string;
}

export interface Evidence {
  id: string;
  caseId: string;
  type: "Transaction" | "Device" | "Account" | "Identity" | "Connection/IP" | "Previous Case" | "Behavioral Signal";
  source: string;
  description: string;
  timestamp: string;
  confidence: number; // percentage 0-100
  relevance: "Low" | "Medium" | "High";
  relatedEntityId?: string;
}

export interface Finding {
  id: string;
  caseId: string;
  title: string;
  description: string;
  supportingEvidenceIds: string[];
  severity: PriorityLevel;
  confidence: number;
}

export interface RiskAssessment {
  caseId: string;
  overallScore: number;
  confidenceScore: number;
  factors: {
    name: string;
    score: number;
    description: string;
  }[];
}

export interface NextBestAction {
  action_id: string;
  caseId: string;
  recommendedAction: string;
  reason: string;
  priority: PriorityLevel;
  approvalRequired: boolean;
  status: "Pending" | "Approved" | "Rejected" | "Escalated";
}

export interface GraphData {
  case_id: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface Approval {
  id: string;
  caseId: string;
  action: string;
  approvalRequired: boolean;
  requestedBy: string;
  status: "Pending" | "Approved" | "Rejected";
  timestamp: string;
  notes?: string;
}

export interface TimelineEvent {
  id: string;
  caseId: string;
  timestamp: string;
  timeLabel: string;
  title: string;
  description: string;
  type: "signal" | "system" | "analyst" | "evidence" | "action" | "approval";
  status?: string;
}

export interface Device {
  id: string;
  customerId: string;
  model: string;
  os: string;
  deviceIdHash: string;
  isRecognized: boolean;
  lastUsed: string;
  associatedLocation: string;
}

export interface Connection {
  id: string;
  customerId: string;
  ipAddress: string;
  isp: string;
  location: string;
  isVpnOrProxy: boolean;
  riskScore: number;
  lastUsed: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: "Customer" | "Account" | "Transaction" | "Device" | "IP" | "Case" | "Merchant";
  riskLevel: PriorityLevel;
  properties: Record<string, string | number | boolean>;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: "OWNS" | "USED" | "INITIATED" | "CONNECTED_TO" | "ASSOCIATED_WITH" | "RELATED_TO";
}

export interface InvestigationData {
  caseDetails: Case;
  customerDetails: Customer;
  evidenceList: Evidence[];
  findingsList: Finding[];
  transactionsList: Transaction[];
  nextAction: NextBestAction;
  approvalDetails?: Approval;
  timeline: TimelineEvent[];
}
