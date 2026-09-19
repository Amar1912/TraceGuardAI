"use strict";

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useFraudStore } from "@/lib/mock-data/store";
import { InvestigationService } from "@/services/investigations";
import { CaseService } from "@/services/cases";
import { CustomerService } from "@/services/customers";
import { TransactionService } from "@/services/transactions";
import {
  AlertTriangle,
  Clock,
  Shield,
  Fingerprint,
  Network,
  Cpu,
  Layers,
  FileText,
  User,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Share2,
  ExternalLink,
  Smartphone,
  Globe
} from "lucide-react";
import { CaseStatus } from "@/types";

export default function InvestigationCockpitPage() {
  const router = useRouter();
  const rawParams = useParams();
  const caseId = (rawParams?.caseId as string) || "CASE-2026-001";

  // Connect to global Zustand interactive mock store state
  const cases = useFraudStore((state) => state.cases);
  const customers = useFraudStore((state) => state.customers);
  const transactions = useFraudStore((state) => state.transactions);
  const evidenceList = useFraudStore((state) => state.evidence).filter(e => e.caseId === caseId);
  const findingsList = useFraudStore((state) => state.findings).filter(f => f.caseId === caseId);
  const nextActions = useFraudStore((state) => state.nextActions);
  const approvals = useFraudStore((state) => state.approvals);
  const timelines = useFraudStore((state) => state.timelines).filter(t => t.caseId === caseId);

  // Retrieve current active record context
  const currentCase = cases.find((c) => c.id === caseId) || cases[0];
  const customer = customers.find((c) => c.id === currentCase.customerId) || customers[0];
  const caseTransactions = transactions.filter((t) => t.customerId === currentCase.customerId);
  const action = nextActions.find((a) => a.caseId === caseId);
  const approval = approvals.find((a) => a.caseId === caseId);

  // Zustand mutations
  const updateCaseStatus = useFraudStore((state) => state.updateCaseStatus);
  const updateActionStatus = useFraudStore((state) => state.updateActionStatus);
  const updateApprovalStatus = useFraudStore((state) => state.updateApprovalStatus);
  const requestEvidence = useFraudStore((state) => state.requestEvidence);

  // Interaction inputs
  const [evidenceInput, setEvidenceInput] = useState("");
  const [approvalNotes, setApprovalNotes] = useState("");
  const [activeTab, setActiveTab] = useState<"summary" | "evidence" | "transactions">("summary");

  const getRiskColor = (score: number) => {
    if (score >= 90) return "text-red-400 bg-red-950/40 border-red-800/40";
    if (score >= 70) return "text-orange-400 bg-orange-950/40 border-orange-800/30";
    return "text-emerald-400 bg-emerald-950/30 border-emerald-800/20";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open": return "text-blue-400 bg-blue-950/30 border-blue-500/20";
      case "Investigating": return "text-indigo-400 bg-indigo-950/30 border-indigo-500/20 animate-pulse";
      case "Pending Approval": return "text-amber-400 bg-amber-950/30 border-amber-500/20 font-bold";
      case "Resolved": return "text-emerald-400 bg-emerald-950/30 border-emerald-500/20";
      default: return "text-slate-400 bg-slate-900 border-slate-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Back to list anchor link */}
      <div className="flex items-center justify-between border-b border-[#1e293b] pb-4">
        <div className="flex items-center gap-3">
          <Link href="/cases" className="p-1 rounded bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold font-mono text-slate-100">{caseId}</h1>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getStatusBadge(currentCase.status)}`}>
                {currentCase.status}
              </span>
              <span className="text-[10px] font-mono bg-purple-950/60 border border-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <Cpu className="w-2.5 h-2.5" /> Agent Inferred
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Target Profile: <span className="text-slate-200 font-medium">{currentCase.customerName}</span> ({currentCase.customerId})
            </p>
          </div>
        </div>

        {/* Global status selector shortcut */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-500">Triage:</span>
          <select
            value={currentCase.status}
            onChange={(e) => updateCaseStatus(caseId, e.target.value as CaseStatus)}
            className="bg-[#0f172a] border border-[#1e293b] text-xs text-slate-200 rounded px-2.5 py-1 focus:outline-none focus:border-blue-500 font-mono cursor-pointer"
          >
            <option value="Open">OPEN</option>
            <option value="Investigating">INVESTIGATING</option>
            <option value="Pending Approval">PENDING APPROVAL</option>
            <option value="Resolved">RESOLVED</option>
          </select>
        </div>
      </div>

      {/* Meta Indicators Grid Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#0f172a] border border-[#1e293b] rounded-xl p-3 font-mono text-xs">
        <div className="border-r border-slate-800/80 px-2">
          <div className="text-slate-500 text-[10px] uppercase">Threat Risk Score</div>
          <div className="text-lg font-bold text-red-400 mt-0.5 flex items-baseline gap-1">
            {currentCase.riskScore} <span className="text-[10px] text-slate-500 font-normal">/ 100</span>
          </div>
        </div>
        <div className="border-r border-slate-800/80 px-2">
          <div className="text-slate-500 text-[10px] uppercase">Confidence Weight</div>
          <div className="text-lg font-bold text-purple-400 mt-0.5">{currentCase.confidenceScore}%</div>
        </div>
        <div className="border-r border-slate-800/80 px-2">
          <div className="text-slate-500 text-[10px] uppercase">Pattern Vector</div>
          <div className="text-slate-200 font-semibold truncate mt-1 text-[11px] text-blue-400">{currentCase.fraudPattern}</div>
        </div>
        <div className="px-2">
          <div className="text-slate-500 text-[10px] uppercase">Priority Priority</div>
          <div className="text-slate-100 font-bold mt-0.5 text-xs text-amber-500">{currentCase.priority}</div>
        </div>
      </div>

      {/* Main Layout Workspace Splitting */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* LEFT / MAIN WING - OCCUPIES 2 COLUMNS */}
        <div className="lg:col-span-2 space-y-6">

          {/* Section 1: Investigation Summary Description */}
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-5 space-y-3">
            <h2 className="text-xs font-bold font-mono tracking-wider text-slate-300 uppercase flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <FileText className="w-4 h-4 text-blue-400" />
              AI Agent Context Dossier Summary
            </h2>
            <div className="text-xs text-slate-300 bg-[#020617]/50 border border-slate-800 p-3 rounded font-sans leading-relaxed">
              <div className="font-semibold text-slate-400 font-mono text-[10px] uppercase mb-1 text-blue-400">Trigger Alert Matrix Signal:</div>
              {currentCase.summary}
            </div>
          </div>

          {/* Section 2: Findings Analytics */}
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-5 space-y-4">
            <h2 className="text-xs font-bold font-mono tracking-wider text-slate-300 uppercase flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              GraphRAG Cognitive Synthesis Findings ({findingsList.length})
            </h2>

            <div className="space-y-3">
              {findingsList.map((f) => (
                <div key={f.id} className="border border-purple-500/20 bg-purple-500/5 rounded-lg p-3.5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-mono text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                      {f.title}
                    </div>
                    <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 border border-purple-500/20 px-1.5 py-0.2 rounded">
                      Confidence {f.confidence}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">{f.description}</p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[9px] font-mono text-slate-500 uppercase">Supporting Pillars:</span>
                    <div className="flex gap-1">
                      {f.supportingEvidenceIds.map((id) => (
                        <span key={id} className="text-[9px] font-mono bg-slate-900 border border-slate-800 text-slate-400 px-1 py-0.2 rounded">
                          {id}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Evidence Matrix cards */}
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-5 space-y-4">
            <h2 className="text-xs font-bold font-mono tracking-wider text-slate-300 uppercase flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              Discovered Graph Evidence Logs ({evidenceList.length})
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {evidenceList.map((e) => (
                <div key={e.id} className="bg-[#020617] border border-[#1e293b] rounded-lg p-3 flex flex-col justify-between space-y-2 hover:border-slate-700 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-blue-400 font-bold">{e.id}</span>
                      <span className="text-slate-500">{e.type.toUpperCase()}</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans font-medium line-clamp-3">{e.description}</p>
                  </div>

                  <div className="border-t border-slate-800/80 pt-2 flex items-center justify-between text-[9px] font-mono text-slate-500">
                    <div>Rel: <span className="text-orange-400 font-bold">{e.relevance}</span></div>
                    <div>Source: <span className="text-slate-400">{e.source}</span></div>
                  </div>

                  <div className="flex gap-1.5 pt-1">
                    {e.relatedEntityId && (
                      <Link
                        href={e.type === "Device" ? `/customers/${currentCase.customerId}` : e.type === "Transaction" ? `/transactions/${e.relatedEntityId}` : `#`}
                        className="text-[9px] font-mono bg-slate-900 text-slate-300 px-1.5 py-0.5 rounded border border-slate-800 hover:text-white flex items-center gap-0.5"
                      >
                        <ExternalLink className="w-2.5 h-2.5" /> Entity
                      </Link>
                    )}
                    <Link
                      href={`/graph/${caseId}`}
                      className="text-[9px] font-mono bg-blue-950/40 text-blue-400 px-1.5 py-0.5 rounded border border-blue-900/30 hover:text-white flex items-center gap-0.5"
                    >
                      <Network className="w-2.5 h-2.5" /> Trace Graph
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Transaction Analysis Table inside case */}
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#1e293b]">
              <h2 className="text-xs font-bold font-mono tracking-wider text-slate-300 uppercase">
                Associated Transaction Activity Index
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#020617]/50 text-slate-500 font-mono text-[9px] border-b border-[#1e293b] uppercase">
                    <th className="py-2 px-4">TXN ID</th>
                    <th className="py-2 px-4">Merchant</th>
                    <th className="py-2 px-4">Amount</th>
                    <th className="py-2 px-4">Location</th>
                    <th className="py-2 px-4 text-center">Threat Score</th>
                    <th className="py-2 px-4 text-right">State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-xs font-mono">
                  {caseTransactions.map((t) => (
                    <tr key={t.id} className={`hover:bg-slate-800/20 ${t.riskScore >= 80 ? "bg-red-500/5" : ""}`}>
                      <td className="py-2.5 px-4 text-blue-400 font-bold">
                        <Link href={`/transactions/${t.id}`}>{t.id}</Link>
                      </td>
                      <td className="py-2.5 px-4 text-slate-200 font-sans">{t.merchant}</td>
                      <td className="py-2.5 px-4 text-slate-100 font-bold">${t.amount.toFixed(2)}</td>
                      <td className="py-2.5 px-4 text-slate-400 text-[11px] font-sans">{t.location}</td>
                      <td className="py-2.5 px-4 text-center">
                        <span className={`px-1 py-0.2 rounded font-bold ${t.riskScore >= 80 ? "text-red-400 bg-red-950/40" : "text-slate-400"}`}>
                          {t.riskScore}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <span className={`text-[10px] px-1 rounded ${
                          t.status === "Flagged" ? "text-red-400 bg-red-950/40" :
                          t.status === "Blocked" ? "text-slate-200 bg-slate-800" :
                          "text-emerald-400"
                        }`}>{t.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 5: Connected Entities Panels */}
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-5 space-y-4">
            <h2 className="text-xs font-bold font-mono tracking-wider text-slate-300 uppercase flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5"><Network className="w-4 h-4 text-blue-400" /> Linked Network Elements Cluster</span>
              <Link href={`/graph/${caseId}`} className="text-[10px] text-blue-400 hover:underline">Explore full grid &rarr;</Link>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#020617] border border-[#1e293b] rounded-lg p-3 font-mono">
                <div className="text-[10px] text-slate-500 flex items-center gap-1"><User className="w-3 h-3" /> Customer</div>
                <div className="text-xs font-bold text-slate-200 mt-1 truncate">{customer.name}</div>
                <div className="text-[10px] text-blue-400 mt-2 hover:underline">
                  <Link href={`/customers/${customer.id}`}>Profile Record</Link>
                </div>
              </div>

              <div className="bg-[#020617] border border-[#1e293b] rounded-lg p-3 font-mono">
                <div className="text-[10px] text-slate-500 flex items-center gap-1"><Smartphone className="w-3 h-3" /> Hardware OS</div>
                <div className="text-xs font-bold text-slate-200 mt-1">OnePlus 11</div>
                <div className="text-[9px] text-red-400 mt-2 font-semibold bg-red-950/30 px-1 rounded inline-block">Unverified</div>
              </div>

              <div className="bg-[#020617] border border-[#1e293b] rounded-lg p-3 font-mono">
                <div className="text-[10px] text-slate-500 flex items-center gap-1"><Globe className="w-3 h-3" /> IP Connection</div>
                <div className="text-xs font-bold text-slate-200 mt-1">185.213.154.12</div>
                <div className="text-[9px] text-orange-400 mt-2 bg-orange-950/30 px-1 rounded inline-block font-semibold">Proxy Exit</div>
              </div>

              <div className="bg-[#020617] border border-[#1e293b] rounded-lg p-3 font-mono">
                <div className="text-[10px] text-slate-500 flex items-center gap-1"><Layers className="w-3 h-3" /> Share Count</div>
                <div className="text-xs font-bold text-slate-200 mt-1">3 Accounts</div>
                <div className="text-[9px] text-purple-400 mt-2 font-bold">Cross-Link High</div>
              </div>
            </div>
          </div>

          {/* Section 6: Ingestion Timeline Flow Stream */}
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-5 space-y-4">
            <h2 className="text-xs font-bold font-mono tracking-wider text-slate-300 uppercase flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Clock className="w-4 h-4 text-slate-400" />
              Telemetry Progression Audit Timeline Stream
            </h2>

            <div className="relative pl-6 border-l border-slate-800 space-y-5 ml-2 pt-2">
              {timelines.map((evt) => (
                <div key={evt.id} className="relative">
                  {/* Timeline dot */}
                  <span className={`absolute -left-[31px] top-0.5 w-2.5 h-2.5 rounded-full border-2 ${
                    evt.type === "signal" ? "bg-red-500 border-red-950" :
                    evt.type === "approval" ? "bg-amber-500 border-amber-950" :
                    evt.type === "action" ? "bg-purple-500 border-purple-950" :
                    "bg-slate-500 border-slate-900"
                  }`}></span>

                  <div className="font-mono text-xs text-slate-400 flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 bg-slate-900 px-1.5 py-0.2 rounded border border-slate-800">{evt.timeLabel}</span>
                    <span className="font-bold text-slate-200">{evt.title}</span>
                    {evt.status && (
                      <span className="text-[9px] px-1 bg-slate-800 text-slate-300 rounded font-semibold">{evt.status}</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">{evt.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT HAND SIDEBAR AREA - CRITICAL CONTROLS & DIRECTIVES */}
        <div className="space-y-6">

          {/* Right Card 1: Next Best Action Triage Control Panel */}
          {action && (
            <div className="bg-[#0f172a] border-2 border-blue-500/20 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-xs font-bold font-mono tracking-wider text-blue-400 uppercase flex items-center gap-1.5">
                  <Shield className="w-4 h-4" />
                  Next Best Action Directive
                </h3>
                <span className="text-[9px] font-mono text-red-400 bg-red-950 px-1.5 py-0.2 border border-red-800/40 rounded uppercase font-bold">
                  {action.priority} Priority
                </span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div>
                  <div className="text-[10px] text-slate-500">RECOMMENDED MANDATE:</div>
                  <div className="text-slate-100 font-bold bg-[#020617] p-2.5 rounded border border-slate-800 text-[11px] mt-1 text-slate-200">
                    {action.recommendedAction}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 mt-2">AGENT HEURISTICS BASIS:</div>
                  <div className="text-slate-400 font-sans text-[11px] mt-0.5 leading-relaxed bg-slate-900/40 p-2 rounded">
                    {action.reason}
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1 bg-slate-900 px-2 py-1 rounded">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                  Directive state: <span className="text-amber-400 font-bold uppercase">{action.status}</span>
                </div>
              </div>

              {/* Action mutations buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => updateActionStatus(caseId, "Approved")}
                  className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs rounded font-medium shadow-sm transition-colors"
                >
                  Execute Action
                </button>
                <button
                  onClick={() => updateActionStatus(caseId, "Escalated")}
                  className="px-2.5 py-1.5 bg-purple-900/60 hover:bg-purple-900 text-purple-300 border border-purple-700/30 font-mono text-xs rounded font-medium transition-colors"
                >
                  Escalate Core
                </button>
              </div>
              <button
                onClick={() => updateActionStatus(caseId, "Rejected")}
                className="w-full px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 font-mono text-xs rounded border border-slate-700 transition-colors"
              >
                Dismiss Recommendation
              </button>
            </div>
          )}

          {/* Right Card 2: Supplementary Evidence Ingestion Request Prompt */}
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-bold font-mono tracking-wider text-slate-300 uppercase flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Additional Evidence Required
            </h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              The aggregate data cluster has low biometric certainty regarding true physical device ownership. Demand step-up challenges to resolve entity alignment.
            </p>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-slate-500 uppercase block">Telemetry Type to Request:</label>
              <input
                type="text"
                placeholder="e.g. Biometric verification push, phone confirmation"
                value={evidenceInput}
                onChange={(e) => setEvidenceInput(e.target.value)}
                className="w-full bg-[#020617] text-slate-200 border border-[#1e293b] rounded p-2 text-xs font-mono focus:outline-none focus:border-blue-500 placeholder:text-slate-600"
              />
              <button
                onClick={() => {
                  if (!evidenceInput.trim()) return;
                  requestEvidence(caseId, evidenceInput);
                  setEvidenceInput("");
                }}
                className="w-full px-3 py-1.5 bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white font-mono text-xs rounded border border-slate-700 hover:border-blue-500 transition-colors"
              >
                Dispatch Evidence Demand
              </button>
            </div>
          </div>

          {/* Right Card 3: Administrative Core Governance Approval Panel */}
          {approval && (
            <div className="bg-[#0f172a] border border-amber-500/20 bg-amber-500/[0.01] rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-xs font-bold font-mono tracking-wider text-amber-500 uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Governance Approval Directive
                </h3>
                <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold border ${
                  approval.status === "Pending" ? "text-amber-400 bg-amber-950/60 border-amber-700/40 animate-pulse" :
                  approval.status === "Approved" ? "text-emerald-400 bg-emerald-950 border-emerald-800/40" :
                  "text-red-400 bg-red-950 border-red-800/40"
                }`}>
                  {approval.status}
                </span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="bg-[#020617] p-2.5 rounded border border-slate-800 text-[11px]">
                  <span className="text-[10px] text-slate-500 block uppercase">MUTATION INTENT:</span>
                  <span className="text-slate-200 font-bold">{approval.action}</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Requested by: <span className="text-purple-400 font-bold">{approval.requestedBy}</span>
                </div>
              </div>

              {approval.status === "Pending" ? (
                <div className="space-y-2">
                  <textarea
                    placeholder="Provide operational logs/notes justification for audit history trail..."
                    value={approvalNotes}
                    onChange={(e) => setApprovalNotes(e.target.value)}
                    className="w-full h-16 bg-[#020617] text-slate-200 border border-[#1e293b] rounded p-2 text-xs font-sans focus:outline-none focus:border-blue-500 placeholder:text-slate-600 resize-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        updateApprovalStatus(approval.id, "Approved", approvalNotes);
                        setApprovalNotes("");
                      }}
                      className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs rounded transition-colors font-medium"
                    >
                      Grant Approve
                    </button>
                    <button
                      onClick={() => {
                        updateApprovalStatus(approval.id, "Rejected", approvalNotes);
                        setApprovalNotes("");
                      }}
                      className="px-2.5 py-1.5 bg-red-950/40 hover:bg-red-900 border border-red-800/30 text-red-400 font-mono text-xs rounded transition-colors"
                    >
                      Deny Reject
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-[11px] font-sans text-slate-400 bg-slate-900/60 p-2.5 rounded border border-slate-800/80 leading-relaxed">
                  <span className="font-mono text-[10px] text-slate-500 block uppercase">Audit Affirmation Note:</span>
                  {approval.notes || "No notes logged by physical operator."}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
