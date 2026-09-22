import { Case, Customer, Transaction, Evidence, Finding, NextBestAction, Approval, TimelineEvent, GraphNode, GraphEdge, Device, Connection } from "@/types";

export const initialCustomers: Customer[] = [
  {
    id: "CUST-10452",
    name: "Sarah Jenkins",
    email: "sjenkins@example.com",
    phone: "+1-555-0143",
    accountStatus: "Under Review",
    riskLevel: "High",
    riskScore: 88,
    accountAgeDays: 450,
    transactionCount: 142,
    previousCasesCount: 0,
    knownDevicesCount: 2,
    knownConnectionsCount: 3,
    joinedDate: "2025-06-12"
  },
  {
    id: "CUST-20891",
    name: "Michael Chang",
    email: "mchang99@example.com",
    phone: "+1-555-0188",
    accountStatus: "Active",
    riskLevel: "Low",
    riskScore: 12,
    accountAgeDays: 1200,
    transactionCount: 843,
    previousCasesCount: 1,
    knownDevicesCount: 4,
    knownConnectionsCount: 5,
    joinedDate: "2023-02-19"
  },
  {
    id: "CUST-30412",
    name: "David Smith",
    email: "dsmith_finance@example.net",
    phone: "+1-555-0192",
    accountStatus: "Blocked",
    riskLevel: "Critical",
    riskScore: 96,
    accountAgeDays: 14,
    transactionCount: 8,
    previousCasesCount: 2,
    knownDevicesCount: 1,
    knownConnectionsCount: 2,
    joinedDate: "2026-09-05"
  },
  {
    id: "CUST-40582",
    name: "Elena Rostova",
    email: "erostova@example.org",
    phone: "+1-555-0211",
    accountStatus: "Suspended",
    riskLevel: "High",
    riskScore: 78,
    accountAgeDays: 820,
    transactionCount: 312,
    previousCasesCount: 0,
    knownDevicesCount: 3,
    knownConnectionsCount: 4,
    joinedDate: "2024-04-30"
  },
  {
    id: "CUST-50119",
    name: "Marcus Aurelius",
    email: "maurelius@history-tech.com",
    phone: "+1-555-0233",
    accountStatus: "Active",
    riskLevel: "Medium",
    riskScore: 45,
    accountAgeDays: 610,
    transactionCount: 195,
    previousCasesCount: 0,
    knownDevicesCount: 2,
    knownConnectionsCount: 3,
    joinedDate: "2024-11-15"
  },
  {
    id: "CUST-60721",
    name: "Aisha Rahman",
    email: "arahman@globalnet.com",
    phone: "+1-555-0277",
    accountStatus: "Active",
    riskLevel: "Low",
    riskScore: 24,
    accountAgeDays: 730,
    transactionCount: 410,
    previousCasesCount: 0,
    knownDevicesCount: 3,
    knownConnectionsCount: 3,
    joinedDate: "2024-09-19"
  },
  {
    id: "CUST-70982",
    name: "John Doe",
    email: "jdoe_anonymous@protonmail.com",
    phone: "+1-555-0311",
    accountStatus: "Under Review",
    riskLevel: "High",
    riskScore: 82,
    accountAgeDays: 5,
    transactionCount: 12,
    previousCasesCount: 0,
    knownDevicesCount: 1,
    knownConnectionsCount: 1,
    joinedDate: "2026-09-14"
  },
  {
    id: "CUST-80344",
    name: "Linda Thompson",
    email: "lthompson.design@example.com",
    phone: "+1-555-0345",
    accountStatus: "Active",
    riskLevel: "Low",
    riskScore: 8,
    accountAgeDays: 1500,
    transactionCount: 1205,
    previousCasesCount: 0,
    knownDevicesCount: 5,
    knownConnectionsCount: 8,
    joinedDate: "2022-07-04"
  },
  {
    id: "CUST-90211",
    name: "Carlos Mendez",
    email: "cmendez_import@example.com",
    phone: "+1-555-0399",
    accountStatus: "Active",
    riskLevel: "Medium",
    riskScore: 54,
    accountAgeDays: 310,
    transactionCount: 89,
    previousCasesCount: 1,
    knownDevicesCount: 2,
    knownConnectionsCount: 2,
    joinedDate: "2025-11-01"
  },
  {
    id: "CUST-99510",
    name: "Chloe Vance",
    email: "cvance_creative@example.net",
    phone: "+1-555-0421",
    accountStatus: "Under Review",
    riskLevel: "High",
    riskScore: 71,
    accountAgeDays: 95,
    transactionCount: 43,
    previousCasesCount: 0,
    knownDevicesCount: 2,
    knownConnectionsCount: 2,
    joinedDate: "2026-06-16"
  }
];

export const initialTransactions: Transaction[] = [
  {
    id: "TXN-2026-001",
    customerId: "CUST-10452",
    customerName: "Sarah Jenkins",
    amount: 4850.00,
    merchant: "CryptoVantage Exchange",
    category: "Financial Services",
    location: "Reykjavik, IS (VPN: Frankfurt, DE)",
    timestamp: "2026-09-19T09:31:12Z",
    deviceInfo: "OnePlus 11 (Android 13) - Unrecognized ID",
    ipAddress: "185.213.154.12",
    riskScore: 91,
    status: "Flagged"
  },
  {
    id: "TXN-2026-002",
    customerId: "CUST-10452",
    customerName: "Sarah Jenkins",
    amount: 1200.00,
    merchant: "BestBuy Online Store",
    category: "Electronics",
    location: "New York, US",
    timestamp: "2026-09-19T09:15:45Z",
    deviceInfo: "OnePlus 11 (Android 13) - Unrecognized ID",
    ipAddress: "185.213.154.12",
    riskScore: 75,
    status: "Pending"
  },
  {
    id: "TXN-2026-003",
    customerId: "CUST-10452",
    customerName: "Sarah Jenkins",
    amount: 45.20,
    merchant: "Starbucks Coffee",
    category: "Food & Beverage",
    location: "Boston, US",
    timestamp: "2026-09-18T14:22:00Z",
    deviceInfo: "iPhone 14 Pro (iOS 17) - Trusted",
    ipAddress: "68.14.92.105",
    riskScore: 5,
    status: "Cleared"
  },
  {
    id: "TXN-2026-004",
    customerId: "CUST-30412",
    customerName: "David Smith",
    amount: 9999.00,
    merchant: "Luxury Watches Group",
    category: "Retail Shopping",
    location: "Miami, US",
    timestamp: "2026-09-19T11:40:00Z",
    deviceInfo: "Google Pixel 8 - Unrecognized",
    ipAddress: "194.22.44.89",
    riskScore: 98,
    status: "Blocked"
  },
  {
    id: "TXN-2026-005",
    customerId: "CUST-30412",
    customerName: "David Smith",
    amount: 9500.00,
    merchant: "Luxury Watches Group",
    category: "Retail Shopping",
    location: "Miami, US",
    timestamp: "2026-09-19T11:42:15Z",
    deviceInfo: "Google Pixel 8 - Unrecognized",
    ipAddress: "194.22.44.89",
    riskScore: 97,
    status: "Blocked"
  },
  {
    id: "TXN-2026-006",
    customerId: "CUST-40582",
    customerName: "Elena Rostova",
    amount: 15000.00,
    merchant: "Wire Transfer Corp",
    category: "Transfers",
    location: "London, UK",
    timestamp: "2026-09-18T16:05:00Z",
    deviceInfo: "MacBook Pro M2 - Recognized",
    ipAddress: "82.165.4.31",
    riskScore: 84,
    status: "Flagged"
  },
  {
    id: "TXN-2026-007",
    customerId: "CUST-70982",
    customerName: "John Doe",
    amount: 2500.00,
    merchant: "Walmart Supercenter",
    category: "Groceries & Retail",
    location: "Chicago, US",
    timestamp: "2026-09-19T06:12:00Z",
    deviceInfo: "Samsung Galaxy S23 - Unrecognized",
    ipAddress: "45.132.22.102",
    riskScore: 89,
    status: "Flagged"
  },
  {
    id: "TXN-2026-008",
    customerId: "CUST-99510",
    customerName: "Chloe Vance",
    amount: 3200.00,
    merchant: "Apple Online Store",
    category: "Electronics",
    location: "San Jose, US",
    timestamp: "2026-09-19T13:02:00Z",
    deviceInfo: "Windows PC (Chrome) - Unrecognized",
    ipAddress: "91.242.11.45",
    riskScore: 78,
    status: "Flagged"
  },
  {
    id: "TXN-2026-009",
    customerId: "CUST-20891",
    name: "Michael Chang",
    amount: 150.75,
    merchant: "Amazon.com",
    category: "Retail Shopping",
    location: "San Francisco, US",
    timestamp: "2026-09-19T15:20:00Z",
    deviceInfo: "iPhone 15 Pro - Trusted",
    ipAddress: "73.140.22.91",
    riskScore: 10,
    status: "Cleared"
  } as unknown as Transaction,
  {
    id: "TXN-2026-010",
    customerId: "CUST-50119",
    customerName: "Marcus Aurelius",
    amount: 620.00,
    merchant: "HomeDepot Store",
    category: "Home Improvement",
    location: "Rome, IT",
    timestamp: "2026-09-19T10:45:00Z",
    deviceInfo: "iPad Air - Trusted",
    ipAddress: "93.41.112.5",
    riskScore: 40,
    status: "Cleared"
  },
  {
    id: "TXN-2026-011",
    customerId: "CUST-90211",
    customerName: "Carlos Mendez",
    amount: 7800.00,
    merchant: "Global Logistics Inc",
    category: "Business Expense",
    location: "Mexico City, MX",
    timestamp: "2026-09-18T18:10:00Z",
    deviceInfo: "Linux Workstation - Trusted",
    ipAddress: "187.210.45.62",
    riskScore: 65,
    status: "Flagged"
  },
  {
    id: "TXN-2026-012",
    customerId: "CUST-60721",
    customerName: "Aisha Rahman",
    amount: 85.00,
    merchant: "Uber Trips",
    category: "Transportation",
    location: "Dubai, AE",
    timestamp: "2026-09-19T14:30:00Z",
    deviceInfo: "Samsung S22 - Trusted",
    ipAddress: "94.200.41.18",
    riskScore: 12,
    status: "Cleared"
  },
  {
    id: "TXN-2026-013",
    customerId: "CUST-10452",
    customerName: "Sarah Jenkins",
    amount: 350.00,
    merchant: "Target Corp",
    category: "Retail Shopping",
    location: "Boston, US",
    timestamp: "2026-09-17T11:10:00Z",
    deviceInfo: "iPhone 14 Pro - Trusted",
    ipAddress: "68.14.92.105",
    riskScore: 8,
    status: "Cleared"
  },
  {
    id: "TXN-2026-014",
    customerId: "CUST-20891",
    customerName: "Michael Chang",
    amount: 2200.00,
    merchant: "Delta Air Lines",
    category: "Travel & Hospitality",
    location: "San Francisco, US",
    timestamp: "2026-09-16T08:44:00Z",
    deviceInfo: "MacBook Air - Trusted",
    ipAddress: "73.140.22.91",
    riskScore: 15,
    status: "Cleared"
  },
  {
    id: "TXN-2026-015",
    customerId: "CUST-30412",
    customerName: "David Smith",
    amount: 120.00,
    merchant: "Shell Fuel Station",
    category: "Automotive",
    location: "New York, US",
    timestamp: "2026-09-08T09:00:00Z",
    deviceInfo: "Google Pixel 8 - Unrecognized",
    ipAddress: "194.22.44.89",
    riskScore: 45,
    status: "Cleared"
  },
  {
    id: "TXN-2026-016",
    customerId: "CUST-80344",
    customerName: "Linda Thompson",
    amount: 450.00,
    merchant: "Nordstrom Inc",
    category: "Retail Shopping",
    location: "Seattle, US",
    timestamp: "2026-09-19T12:00:00Z",
    deviceInfo: "iPhone 15 Pro - Trusted",
    ipAddress: "67.180.4.12",
    riskScore: 4,
    status: "Cleared"
  },
  {
    id: "TXN-2026-017",
    customerId: "CUST-80344",
    customerName: "Linda Thompson",
    amount: 15.40,
    merchant: "Netflix Streaming",
    category: "Entertainment",
    location: "Seattle, US",
    timestamp: "2026-09-15T01:10:00Z",
    deviceInfo: "Smart TV - Trusted",
    ipAddress: "67.180.4.12",
    riskScore: 2,
    status: "Cleared"
  },
  {
    id: "TXN-2026-018",
    customerId: "CUST-50119",
    customerName: "Marcus Aurelius",
    amount: 1250.00,
    merchant: "Fnac Electronics",
    category: "Electronics",
    location: "Paris, FR",
    timestamp: "2026-09-15T16:40:00Z",
    deviceInfo: "iPad Air - Trusted",
    ipAddress: "81.240.52.19",
    riskScore: 35,
    status: "Cleared"
  },
  {
    id: "TXN-2026-019",
    customerId: "CUST-90211",
    customerName: "Carlos Mendez",
    amount: 230.00,
    merchant: "Costco Wholesale",
    category: "Groceries",
    location: "Mexico City, MX",
    timestamp: "2026-09-12T14:15:00Z",
    deviceInfo: "Linux Workstation - Trusted",
    ipAddress: "187.210.45.62",
    riskScore: 18,
    status: "Cleared"
  },
  {
    id: "TXN-2026-020",
    customerId: "CUST-40582",
    customerName: "Elena Rostova",
    amount: 850.00,
    merchant: "Hotel Ritz London",
    category: "Travel & Hospitality",
    location: "London, UK",
    timestamp: "2026-09-14T20:00:00Z",
    deviceInfo: "MacBook Pro M2 - Recognized",
    ipAddress: "82.165.4.31",
    riskScore: 50,
    status: "Cleared"
  }
];

export const initialCases: Case[] = [
  {
    id: "CASE-2026-001",
    customerId: "CUST-10452",
    customerName: "Sarah Jenkins",
    transactionId: "TXN-2026-001",
    riskScore: 91,
    confidenceScore: 94,
    fraudPattern: "Account Takeover",
    status: "Investigating",
    priority: "High",
    createdAt: "2026-09-19T09:32:00Z",
    updatedAt: "2026-09-19T16:00:00Z",
    summary: "Multiple unusual transactions were detected from a previously unseen device and connection. The activity differs significantly from the customer's historical behavior profile, including rapid out-of-pattern crypto purchasing."
  },
  {
    id: "CASE-2026-002",
    customerId: "CUST-30412",
    customerName: "David Smith",
    transactionId: "TXN-2026-004",
    riskScore: 98,
    confidenceScore: 99,
    fraudPattern: "Identity Theft",
    status: "Pending Approval",
    priority: "Critical",
    createdAt: "2026-09-19T11:43:00Z",
    updatedAt: "2026-09-19T11:45:00Z",
    summary: "Attempted high-value purchases ($9,999 and $9,500) at a luxury merchant immediately following a phone number change via customer support. High correlation with synthetic fraud profile."
  },
  {
    id: "CASE-2026-003",
    customerId: "CUST-40582",
    customerName: "Elena Rostova",
    transactionId: "TXN-2026-006",
    riskScore: 84,
    confidenceScore: 88,
    fraudPattern: "Money Laundering",
    status: "Open",
    priority: "High",
    createdAt: "2026-09-18T16:10:00Z",
    updatedAt: "2026-09-18T16:10:00Z",
    summary: "Large outbound wire transfer to a high-risk offshore entity. Source funds originated from rapid structural smaller inbound peer-to-peer deposits within the last 48 hours."
  },
  {
    id: "CASE-2026-004",
    customerId: "CUST-70982",
    customerName: "John Doe",
    transactionId: "TXN-2026-007",
    riskScore: 89,
    confidenceScore: 82,
    fraudPattern: "Synthetic Fraud",
    status: "Investigating",
    priority: "High",
    createdAt: "2026-09-19T06:15:00Z",
    updatedAt: "2026-09-19T08:20:00Z",
    summary: "Newly opened account showing immediate max-limit transactions from an IP address block heavily linked to known residential proxy farms used by fraud rings."
  },
  {
    id: "CASE-2026-005",
    customerId: "CUST-99510",
    customerName: "Chloe Vance",
    transactionId: "TXN-2026-008",
    riskScore: 78,
    confidenceScore: 76,
    fraudPattern: "Card Not Present (CNP)",
    status: "Open",
    priority: "Medium",
    createdAt: "2026-09-19T13:10:00Z",
    updatedAt: "2026-09-19T13:10:00Z",
    summary: "E-commerce transaction flagged due to rapid succession cvv brute forcing signals detected at the payment gateway level from an unknown device type."
  },
  {
    id: "CASE-2026-006",
    customerId: "CUST-90211",
    customerName: "Carlos Mendez",
    transactionId: "TXN-2026-011",
    riskScore: 65,
    confidenceScore: 70,
    fraudPattern: "Structuring",
    status: "Resolved",
    priority: "Medium",
    createdAt: "2026-09-18T18:15:00Z",
    updatedAt: "2026-09-19T14:00:00Z",
    summary: "Repeated transaction amounts hovering just below the regular reporting threshold ($7,800). Case resolved after verification of legitimate commercial freight operations documentation provided by customer."
  },
  {
    id: "CASE-2026-007",
    customerId: "CUST-10452",
    customerName: "Sarah Jenkins",
    transactionId: "TXN-2026-002",
    riskScore: 75,
    confidenceScore: 80,
    fraudPattern: "Account Takeover",
    status: "Investigating",
    priority: "High",
    createdAt: "2026-09-19T09:20:00Z",
    updatedAt: "2026-09-19T09:40:00Z",
    summary: "Sub-case of main takeover event. High-value retail electronics purchase attempted alongside the crypto exchange withdrawal signal."
  },
  {
    id: "CASE-2026-008",
    customerId: "CUST-50119",
    customerName: "Marcus Aurelius",
    riskScore: 45,
    confidenceScore: 60,
    fraudPattern: "Phishing Scam",
    status: "Resolved",
    priority: "Low",
    createdAt: "2026-09-15T11:00:00Z",
    updatedAt: "2026-09-16T10:00:00Z",
    summary: "Customer reported clicking an unverified link and entering card credentials. Account was preemptively locked and card replaced. Zero fraud loss incurred."
  },
  {
    id: "CASE-2026-009",
    customerId: "CUST-20891",
    customerName: "Michael Chang",
    riskScore: 35,
    confidenceScore: 85,
    fraudPattern: "Unknown",
    status: "Resolved",
    priority: "Low",
    createdAt: "2026-09-16T09:00:00Z",
    updatedAt: "2026-09-16T12:00:00Z",
    summary: "Travel alert mismatch. Customer forgot to report an international itinerary. Transaction cleared after quick text message multi-factor verification confirmation."
  },
  {
    id: "CASE-2026-010",
    customerId: "CUST-30412",
    customerName: "David Smith",
    transactionId: "TXN-2026-005",
    riskScore: 97,
    confidenceScore: 98,
    fraudPattern: "Identity Theft",
    status: "Pending Approval",
    priority: "Critical",
    createdAt: "2026-09-19T11:44:00Z",
    updatedAt: "2026-09-19T11:45:00Z",
    summary: "Secondary transaction attempt accompanying critical identity breach alert. Connected to luxury watch reseller channel activity."
  }
];

export const initialEvidence: Evidence[] = [
  {
    id: "EVD-001",
    caseId: "CASE-2026-001",
    type: "Device",
    source: "Device Graph",
    description: "Transaction originated from a device (OnePlus 11) not previously associated with the customer or any historical login session.",
    timestamp: "2026-09-19T09:31:12Z",
    confidence: 96,
    relevance: "High",
    relatedEntityId: "DEV-OP11"
  },
  {
    id: "EVD-002",
    caseId: "CASE-2026-001",
    type: "Connection/IP",
    source: "Network Intelligence",
    description: "IP address (185.213.154.12) is flagged as a commercial data-center VPN exit point based in Frankfurt, hiding the true client location.",
    timestamp: "2026-09-19T09:31:12Z",
    confidence: 92,
    relevance: "High",
    relatedEntityId: "IP-185-213"
  },
  {
    id: "EVD-003",
    caseId: "CASE-2026-001",
    type: "Behavioral Signal",
    source: "Velocity Engine",
    description: "Account speed check violation. The transaction occurred less than 15 minutes after a standard low-value local purchase in Boston, implying physical impossibility (impossible travel).",
    timestamp: "2026-09-19T09:31:12Z",
    confidence: 99,
    relevance: "High"
  },
  {
    id: "EVD-004",
    caseId: "CASE-2026-001",
    type: "Transaction",
    source: "Core Banking",
    description: "High-value high-velocity asset purchase ($4,850.00) directed to a known cryptocurrency brokerage node, deviating from historical retail patterns.",
    timestamp: "2026-09-19T09:31:12Z",
    confidence: 100,
    relevance: "High",
    relatedEntityId: "TXN-2026-001"
  },
  {
    id: "EVD-005",
    caseId: "CASE-2026-002",
    type: "Identity",
    source: "IAM Logs",
    description: "Critical security settings updated. Customer phone number changed via voice channel after bypassing verification via a leaked SSN variable.",
    timestamp: "2026-09-19T11:35:00Z",
    confidence: 95,
    relevance: "High",
    relatedEntityId: "CUST-30412"
  },
  {
    id: "EVD-006",
    caseId: "CASE-2026-002",
    type: "Transaction",
    source: "Merchant Feed",
    description: "Immediate high-value transaction trial at luxury retail distributor within 5 minutes of high-risk credential modification.",
    timestamp: "2026-09-19T11:40:00Z",
    confidence: 100,
    relevance: "High",
    relatedEntityId: "TXN-2026-004"
  }
];

export const initialFindings: Finding[] = [
  {
    id: "FND-001",
    caseId: "CASE-2026-001",
    title: "Unusual device association detected",
    description: "A completely new hardware footprint initiated contact with the core account ledger. There is zero cryptographic overlap with the customer's traditional hardware authorization tokens.",
    supportingEvidenceIds: ["EVD-001"],
    severity: "High",
    confidence: 96
  },
  {
    id: "FND-002",
    caseId: "CASE-2026-001",
    title: "Anonymized Network Tunneling",
    description: "The actor deliberately channeled traffic through a proxy framework to mask their underlying physical presence, a classic posture adopted during remote credential stuffing or session highjacking.",
    supportingEvidenceIds: ["EVD-002"],
    severity: "High",
    confidence: 92
  },
  {
    id: "FND-003",
    caseId: "CASE-2026-001",
    title: "Impossible Travel / Velocity Spill",
    description: "Geographic displacement confirms a compromise. It is impossible to execute a retail swipe in Boston and a digital withdrawal from an overseas server coordinate inside a 15-minute operational delta.",
    supportingEvidenceIds: ["EVD-003", "EVD-004"],
    severity: "Critical",
    confidence: 99
  }
];

export const initialNextActions: NextBestAction[] = [
  {
    action_id: "ACT-001",
    caseId: "CASE-2026-001",
    recommendedAction: "Escalate to Senior Fraud Analyst & Block Crypto Gateway Routing",
    reason: "High risk score (91) combined with concurrent impossible travel, high-value asset out-of-character exit, and immediate VPN overlay usage.",
    priority: "High",
    approvalRequired: true,
    status: "Pending"
  },
  {
    action_id: "ACT-002",
    caseId: "CASE-2026-002",
    recommendedAction: "Freeze Complete Account Infrastructure & Revoke SIM token",
    reason: "Critical rating (98). Identity takeover confirmed through unauthorized telephony settings overwrite followed by emergency luxury capital drain attempts.",
    priority: "Critical",
    approvalRequired: true,
    status: "Pending"
  }
];

export const initialApprovals: Approval[] = [
  {
    id: "APP-001",
    caseId: "CASE-2026-001",
    action: "Block Account & Hold Funds Transfer",
    approvalRequired: true,
    requestedBy: "AI Investigation Agent",
    status: "Pending",
    timestamp: "2026-09-19T09:40:00Z"
  },
  {
    id: "APP-002",
    caseId: "CASE-2026-002",
    action: "Permanent Hard Blacklist of Associated Identities",
    approvalRequired: true,
    requestedBy: "AI Investigation Agent",
    status: "Pending",
    timestamp: "2026-09-19T11:45:00Z"
  }
];

export const initialTimelines: TimelineEvent[] = [
  {
    id: "TL-001",
    caseId: "CASE-2026-001",
    timestamp: "2026-09-19T09:31:12Z",
    timeLabel: "09:31 AM",
    title: "Fraud signal detected",
    description: "Core velocity rule engine triggered high alert on transaction TXN-2026-001 at CryptoVantage Exchange.",
    type: "signal",
    status: "Critical"
  },
  {
    id: "TL-002",
    caseId: "CASE-2026-001",
    timestamp: "2026-09-19T09:32:00Z",
    timeLabel: "09:32 AM",
    title: "Investigation case created",
    description: "Platform automatically generated case dossier CASE-2026-001 and flagged case as High priority.",
    type: "system"
  },
  {
    id: "TL-003",
    caseId: "CASE-2026-001",
    timestamp: "2026-09-19T09:33:15Z",
    timeLabel: "09:33 AM",
    title: "Transaction history retrieved",
    description: "Graph engine aggregated 6 months of benchmark transactional behavior for Sarah Jenkins.",
    type: "system"
  },
  {
    id: "TL-004",
    caseId: "CASE-2026-001",
    timestamp: "2026-09-19T09:34:40Z",
    timeLabel: "09:34 AM",
    title: "Device relationship identified",
    description: "Discovered device token 'DEV-OP11' corresponds to a newly compiled fingerprint not shared across other customer nodes.",
    type: "evidence"
  },
  {
    id: "TL-005",
    caseId: "CASE-2026-001",
    timestamp: "2026-09-19T09:35:10Z",
    timeLabel: "09:35 AM",
    title: "Risk assessed by TigerGraph Agent",
    description: "Fraud vector score resolved to 91/100. High confidence score attached due to absolute velocity breach.",
    type: "signal",
    status: "High"
  },
  {
    id: "TL-006",
    caseId: "CASE-2026-001",
    timestamp: "2026-09-19T09:36:00Z",
    timeLabel: "09:36 AM",
    title: "Additional evidence requested",
    description: "System prompted a background step-up authentication notification to the trusted mobile hardware push token.",
    type: "system"
  },
  {
    id: "TL-007",
    caseId: "CASE-2026-001",
    timestamp: "2026-09-19T09:38:22Z",
    timeLabel: "09:38 AM",
    title: "Step-up authentication timeout",
    description: "The authentication requirement timed out. No response received from the legitimate device.",
    type: "evidence",
    status: "Suspicious"
  },
  {
    id: "TL-008",
    caseId: "CASE-2026-001",
    timestamp: "2026-09-19T09:39:05Z",
    timeLabel: "09:39 AM",
    title: "Next Best Action generated",
    description: "AI Agent issued recommendation: 'Escalate to Senior Fraud Analyst'.",
    type: "action"
  },
  {
    id: "TL-009",
    caseId: "CASE-2026-001",
    timestamp: "2026-09-19T09:40:00Z",
    timeLabel: "09:40 AM",
    title: "Approval requested",
    description: "Action payload 'Block Account & Hold Funds Transfer' dispatched to analyst dashboard waiting for physical confirmation.",
    type: "approval"
  }
];

export const initialDevices: Device[] = [
  {
    id: "DEV-OP11",
    customerId: "CUST-10452",
    model: "OnePlus 11",
    os: "Android 13",
    deviceIdHash: "a7b3c9d2e5f81234",
    isRecognized: false,
    lastUsed: "2026-09-19T09:31:12Z",
    associatedLocation: "Frankfurt, DE"
  },
  {
    id: "DEV-IP14",
    customerId: "CUST-10452",
    model: "iPhone 14 Pro",
    os: "iOS 17.2",
    deviceIdHash: "f4e3d2c1b0a98765",
    isRecognized: true,
    lastUsed: "2026-09-18T14:22:00Z",
    associatedLocation: "Boston, US"
  }
];

export const initialConnections: Connection[] = [
  {
    id: "CON-001",
    customerId: "CUST-10452",
    ipAddress: "185.213.154.12",
    isp: "M22 Berlin Hosting GMBH",
    location: "Frankfurt, DE",
    isVpnOrProxy: true,
    riskScore: 85,
    lastUsed: "2026-09-19T09:31:12Z"
  },
  {
    id: "CON-002",
    customerId: "CUST-10452",
    ipAddress: "68.14.92.105",
    isp: "Comcast Cable",
    location: "Boston, US",
    isVpnOrProxy: false,
    riskScore: 2,
    lastUsed: "2026-09-18T14:22:00Z"
  }
];

// Mock Graph data for the network visualization
export const getMockGraphData = (caseId: string) => {
  // We can return a specific sub-network based on the caseId.
  // For CASE-2026-001, return the rich fraud cluster.
  const nodes: GraphNode[] = [
    { id: "NODE-CUST", label: "Sarah Jenkins", type: "Customer", riskLevel: "High", properties: { "ID": "CUST-10452", "Risk": "88", "Status": "Review" } },
    { id: "NODE-ACCT", label: "Acct: **4921", type: "Account", riskLevel: "Medium", properties: { "Balance": "$45,210.00", "Age": "450 days" } },
    { id: "NODE-TXN1", label: "TXN-2026-001 ($4,850)", type: "Transaction", riskLevel: "Critical", properties: { "Amount": "$4,850.00", "Merchant": "CryptoVantage" } },
    { id: "NODE-TXN2", label: "TXN-2026-002 ($1,200)", type: "Transaction", riskLevel: "High", properties: { "Amount": "$1,200.00", "Merchant": "BestBuy" } },
    { id: "NODE-DEV1", label: "OnePlus 11 (New)", type: "Device", riskLevel: "High", properties: { "OS": "Android 13", "Trust": "Unrecognized" } },
    { id: "NODE-DEV2", label: "iPhone 14 (Trusted)", type: "Device", riskLevel: "Low", properties: { "OS": "iOS 17", "Trust": "Verified" } },
    { id: "NODE-IP1", label: "185.213.154.12 (VPN)", type: "IP", riskLevel: "High", properties: { "ISP": "M22 Berlin", "Type": "Data Center" } },
    { id: "NODE-MERCH1", label: "CryptoVantage", type: "Merchant", riskLevel: "Medium", properties: { "Industry": "Crypto Broker", "Risk Rating": "Medium" } },
    { id: "NODE-CASE1", label: "CASE-2026-001", type: "Case", riskLevel: "High", properties: { "Pattern": "Account Takeover", "Score": "91" } },
    // A suspicious link to another account sharing the same unrecognized device/VPN!
    { id: "NODE-OTHER-ACCT", label: "Acct: **8812 (M. Müller)", type: "Account", riskLevel: "Critical", properties: { "Linked Case": "CASE-2026-003", "Status": "Flagged" } }
  ];

  const edges: GraphEdge[] = [
    { id: "e1", source: "NODE-CUST", target: "NODE-ACCT", label: "OWNS" },
    { id: "e2", source: "NODE-ACCT", target: "NODE-TXN1", label: "INITIATED" },
    { id: "e3", source: "NODE-ACCT", target: "NODE-TXN2", label: "INITIATED" },
    { id: "e4", source: "NODE-TXN1", target: "NODE-DEV1", label: "USED" },
    { id: "e5", source: "NODE-TXN2", target: "NODE-DEV1", label: "USED" },
    { id: "e6", source: "NODE-TXN1", target: "NODE-IP1", label: "CONNECTED_TO" },
    { id: "e7", source: "NODE-DEV1", target: "NODE-IP1", label: "CONNECTED_TO" },
    { id: "e8", source: "NODE-TXN1", target: "NODE-MERCH1", label: "ASSOCIATED_WITH" },
    { id: "e9", source: "NODE-CASE1", target: "NODE-TXN1", label: "RELATED_TO" },
    { id: "e10", source: "NODE-CASE1", target: "NODE-CUST", label: "RELATED_TO" },
    { id: "e11", source: "NODE-DEV1", target: "NODE-OTHER-ACCT", label: "ASSOCIATED_WITH" }, // Shared device link!!
    { id: "e12", source: "NODE-IP1", target: "NODE-OTHER-ACCT", label: "ASSOCIATED_WITH" }  // Shared IP link!!
  ];

  return { nodes, edges };
};

// Global graph explorer data
export const globalGraphData = getMockGraphData("all");
