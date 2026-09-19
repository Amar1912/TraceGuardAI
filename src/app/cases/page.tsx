"use strict";

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, ArrowUpDown, Eye, HelpCircle } from "lucide-react";
import { useFraudStore } from "@/lib/mock-data/store";
import { CaseStatus, FraudPattern, PriorityLevel } from "@/types";

export default function CasesListPage() {
  const cases = useFraudStore((state) => state.cases);

  // States for query filtration
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [riskFilter, setRiskFilter] = useState<string>("ALL");
  const [patternFilter, setPatternFilter] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"risk" | "date" | "confidence">("risk");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Distinct parameters for drop downs
  const patterns: FraudPattern[] = [
    "Account Takeover",
    "Identity Theft",
    "Synthetic Fraud",
    "Card Not Present (CNP)",
    "Money Laundering",
    "Structuring",
    "Phishing Scam"
  ];

  // Filtering filter pipeline
  const filteredCases = cases.filter((item) => {
    // Search filter
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fraudPattern.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;

    // Fraud pattern filter
    const matchesPattern = patternFilter === "ALL" || item.fraudPattern === patternFilter;

    // Risk tier filter
    let matchesRisk = true;
    if (riskFilter === "CRITICAL") matchesRisk = item.riskScore >= 90;
    else if (riskFilter === "HIGH") matchesRisk = item.riskScore >= 70 && item.riskScore < 90;
    else if (riskFilter === "MEDIUM") matchesRisk = item.riskScore >= 40 && item.riskScore < 70;
    else if (riskFilter === "LOW") matchesRisk = item.riskScore < 40;

    return matchesSearch && matchesStatus && matchesPattern && matchesRisk;
  });

  // Sorting routine
  const sortedCases = [...filteredCases].sort((a, b) => {
    let fieldA: number | string = 0;
    let fieldB: number | string = 0;

    if (sortBy === "risk") {
      fieldA = a.riskScore;
      fieldB = b.riskScore;
    } else if (sortBy === "confidence") {
      fieldA = a.confidenceScore;
      fieldB = b.confidenceScore;
    } else if (sortBy === "date") {
      fieldA = new Date(a.createdAt).getTime();
      fieldB = new Date(b.createdAt).getTime();
    }

    if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const toggleSort = (type: "risk" | "date" | "confidence") => {
    if (sortBy === type) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(type);
      setSortOrder("desc");
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 90) return "bg-red-950/60 text-red-400 border-red-800/40";
    if (score >= 70) return "bg-orange-950/40 text-orange-400 border-orange-800/30";
    if (score >= 40) return "bg-yellow-950/20 text-yellow-400 border-yellow-800/20";
    return "bg-emerald-950/30 text-emerald-400 border-emerald-800/20";
  };

  const getPriorityBadge = (p: PriorityLevel) => {
    switch (p) {
      case "Critical": return "bg-red-900/30 text-red-500 border border-red-500/30 font-bold";
      case "High": return "bg-orange-950 text-orange-400 border border-orange-500/20";
      case "Medium": return "bg-yellow-950 text-yellow-500 border border-yellow-500/10";
      case "Low": return "bg-slate-800 text-slate-400 border border-slate-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header title */}
      <div>
        <h1 className="text-xl font-bold font-mono tracking-tight text-slate-100">
          Fraud Investigation Docket Queue
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Perform strict contextual audit filtering, deep relationship profiling, and queue state triage.
        </p>
      </div>

      {/* Advanced Filtration Strip Panel */}
      <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Query Filter */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter text queries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#020617] text-slate-200 pl-8 pr-3 py-1.5 rounded border border-[#1e293b] text-xs focus:outline-none focus:border-blue-500 placeholder:text-slate-500 font-mono"
            />
          </div>

          {/* Status select dropdown */}
          <div className="flex items-center bg-[#020617] border border-[#1e293b] rounded px-2">
            <span className="text-[10px] uppercase font-mono text-slate-500 mr-2">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-slate-200 text-xs py-1.5 focus:outline-none flex-1 font-mono cursor-pointer"
            >
              <option value="ALL">ALL STATUSES</option>
              <option value="Open">OPEN</option>
              <option value="Investigating">INVESTIGATING</option>
              <option value="Pending Approval">PENDING APPROVAL</option>
              <option value="Resolved">RESOLVED</option>
            </select>
          </div>

          {/* Risk select dropdown */}
          <div className="flex items-center bg-[#020617] border border-[#1e293b] rounded px-2">
            <span className="text-[10px] uppercase font-mono text-slate-500 mr-2">Threat:</span>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="bg-transparent text-slate-200 text-xs py-1.5 focus:outline-none flex-1 font-mono cursor-pointer"
            >
              <option value="ALL">ALL THREAT TIERS</option>
              <option value="CRITICAL">CRITICAL (90+)</option>
              <option value="HIGH">HIGH (70-90)</option>
              <option value="MEDIUM">MEDIUM (40-70)</option>
              <option value="LOW">LOW (&lt;40)</option>
            </select>
          </div>

          {/* Vector Pattern select dropdown */}
          <div className="flex items-center bg-[#020617] border border-[#1e293b] rounded px-2">
            <span className="text-[10px] uppercase font-mono text-slate-500 mr-2">Pattern:</span>
            <select
              value={patternFilter}
              onChange={(e) => setPatternFilter(e.target.value)}
              className="bg-transparent text-slate-200 text-xs py-1.5 focus:outline-none flex-1 font-mono cursor-pointer select-none"
            >
              <option value="ALL">ALL PATTERNS</option>
              {patterns.map((p) => (
                <option key={p} value={p}>{p.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Sort triggers overview info */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 bg-[#020617]/50 p-2 rounded border border-slate-800/40">
          <div>
            Showing <span className="text-blue-400 font-bold">{sortedCases.length}</span> matching case profiles
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-500">Quick Sort Controls:</span>
            <button onClick={() => toggleSort("risk")} className={`flex items-center gap-0.5 hover:text-slate-200 ${sortBy === "risk" ? "text-blue-400 font-bold" : ""}`}>
              Threat {sortBy === "risk" && (sortOrder === "desc" ? "↓" : "↑")}
            </button>
            <button onClick={() => toggleSort("confidence")} className={`flex items-center gap-0.5 hover:text-slate-200 ${sortBy === "confidence" ? "text-blue-400 font-bold" : ""}`}>
              Confidence {sortBy === "confidence" && (sortOrder === "desc" ? "↓" : "↑")}
            </button>
            <button onClick={() => toggleSort("date")} className={`flex items-center gap-0.5 hover:text-slate-200 ${sortBy === "date" ? "text-blue-400 font-bold" : ""}`}>
              Ingestion Date {sortBy === "date" && (sortOrder === "desc" ? "↓" : "↑")}
            </button>
          </div>
        </div>
      </div>

      {/* Main Docket Grid table */}
      <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#020617]/60 text-slate-400 font-mono text-[10px] tracking-wider border-b border-[#1e293b] uppercase select-none">
                <th className="py-3 px-4">Case ID</th>
                <th className="py-3 px-4">Customer Affinity</th>
                <th className="py-3 px-4">Anomaly Pattern Vector</th>
                <th className="py-3 px-4 text-center">Threat Score</th>
                <th className="py-3 px-4 text-center">Confidence</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Modified</th>
                <th className="py-3 px-4 text-right">Console</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-xs font-sans">
              {sortedCases.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-500 font-mono">
                    Zero items registered within the specified matrix filters.
                  </td>
                </tr>
              ) : (
                sortedCases.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-400">
                      <Link href={`/investigations/${item.id}`} className="hover:underline">
                        {item.id}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4">
                      <Link href={`/customers/${item.customerId}`} className="hover:underline font-medium text-slate-200 block">
                        {item.customerName}
                      </Link>
                      <span className="text-[10px] text-slate-500 font-mono block">{item.customerId}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-slate-300 font-mono text-[11px] bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">
                        {item.fraudPattern}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded font-mono font-bold border text-[11px] ${getRiskColor(item.riskScore)}`}>
                        {item.riskScore}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-purple-400 font-semibold">
                      {item.confidenceScore}%
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${getPriorityBadge(item.priority)}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${
                        item.status === "Open" ? "text-blue-400 bg-blue-950/20 border-blue-800/30" :
                        item.status === "Investigating" ? "text-indigo-400 bg-indigo-950/20 border-indigo-800/30" :
                        item.status === "Pending Approval" ? "text-amber-400 bg-amber-950/20 border-amber-800/30 font-bold" :
                        "text-emerald-400 bg-emerald-950/20 border-emerald-800/30"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {new Date(item.updatedAt).toLocaleDateString()} {new Date(item.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/investigations/${item.id}`}
                        className="inline-flex items-center gap-1 text-[11px] font-mono bg-slate-800 border border-slate-700 hover:bg-blue-600 hover:text-white px-2.5 py-1 rounded transition-colors text-slate-300"
                      >
                        <Eye className="w-3 h-3" />
                        Audit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mock Pagination Controls */}
        <div className="px-4 py-3 bg-[#020617]/40 border-t border-[#1e293b] flex items-center justify-between text-xs font-mono text-slate-400">
          <div>Page 1 of 1</div>
          <div className="flex gap-2">
            <button disabled className="px-2 py-1 bg-slate-800 border border-slate-700 text-slate-600 rounded cursor-not-allowed">Prev</button>
            <button disabled className="px-2 py-1 bg-slate-800 border border-slate-700 text-slate-600 rounded cursor-not-allowed">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
