"use strict";

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertOctagon,
  ShieldAlert,
  Activity,
  CheckSquare,
  TrendingUp,
  ArrowUpRight,
  Filter,
  Eye,
  RefreshCw
} from "lucide-react";
import { useFraudStore } from "@/lib/mock-data/store";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  Legend
} from "recharts";

export default function DashboardPage() {
  const cases = useFraudStore((state) => state.cases);
  const transactions = useFraudStore((state) => state.transactions);

  // KPI computation
  const activeCases = cases.filter((c) => c.status !== "Resolved").length;
  const highRiskCases = cases.filter((c) => c.riskScore >= 80 && c.status !== "Resolved").length;
  const pendingApprovals = cases.filter((c) => c.status === "Pending Approval").length;
  const investigationsToday = cases.filter(
    (c) => c.createdAt.startsWith("2026-09-19")
  ).length;

  // Chart 1: Fraud Risk Trend (Fictional 7 days)
  const trendData = [
    { day: "Sep 13", score: 42, cases: 3 },
    { day: "Sep 14", score: 55, cases: 4 },
    { day: "Sep 15", score: 48, cases: 2 },
    { day: "Sep 16", score: 70, cases: 6 },
    { day: "Sep 17", score: 62, cases: 5 },
    { day: "Sep 18", score: 85, cases: 8 },
    { day: "Sep 19", score: 91, cases: 10 }
  ];

  // Chart 2: Cases by Status
  const statusCounts = {
    Open: cases.filter((c) => c.status === "Open").length,
    Investigating: cases.filter((c) => c.status === "Investigating").length,
    "Pending Approval": cases.filter((c) => c.status === "Pending Approval").length,
    Resolved: cases.filter((c) => c.status === "Resolved").length
  };

  const statusData = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value
  }));

  const STATUS_COLORS = {
    Open: "#3b82f6",          // Blue
    Investigating: "#6366f1", // Indigo
    "Pending Approval": "#f97316", // Orange
    Resolved: "#22c55e"        // Green
  };

  // Chart 3: Fraud Pattern Distribution
  const patternCounts: Record<string, number> = {};
  cases.forEach((c) => {
    patternCounts[c.fraudPattern] = (patternCounts[c.fraudPattern] || 0) + 1;
  });
  const patternData = Object.entries(patternCounts).map(([pattern, count]) => ({
    pattern,
    count
  }));

  // Chart 4: Risk Distribution
  const riskDistribution = [
    { level: "Low (<40)", count: cases.filter((c) => c.riskScore < 40).length, fill: "#22c55e" },
    { level: "Medium (40-70)", count: cases.filter((c) => c.riskScore >= 40 && c.riskScore < 70).length, fill: "#f97316" },
    { level: "High (70-90)", count: cases.filter((c) => c.riskScore >= 70 && c.riskScore < 90).length, fill: "#ef4444" },
    { level: "Critical (90+)", count: cases.filter((c) => c.riskScore >= 90).length, fill: "#7f1d1d" }
  ];

  // Custom tooltips styling for the dark dashboard
  const customTooltipStyle = {
    contentStyle: { backgroundColor: "#0f172a", borderColor: "#1e293b", color: "#f8fafc", fontSize: "11px" },
    itemStyle: { color: "#3b82f6" }
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#1e293b] pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100 font-mono">
            Fraud Investigation Overview
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Monitor suspicious activity, graph-discovered anomalies, and recommended mitigation directives.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded flex items-center gap-1.5">
            <RefreshCw className="w-3 h-3 text-blue-400 animate-spin-slow" />
            Live Stream Feed Active
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Active Cases</span>
            <div className="text-2xl font-bold font-mono tracking-tight text-slate-100">{activeCases}</div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>+12% vs last week</span>
            </div>
          </div>
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400">
            <AlertOctagon className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">High Risk Cases</span>
            <div className="text-2xl font-bold font-mono tracking-tight text-red-400">{highRiskCases}</div>
            <div className="text-[10px] text-red-400 flex items-center gap-0.5 font-semibold">
              <span>Immediate Focus Required</span>
            </div>
          </div>
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Investigations Today</span>
            <div className="text-2xl font-bold font-mono tracking-tight text-slate-100">{investigationsToday}</div>
            <div className="text-[10px] text-slate-400 font-mono">
              Agent scan completed
            </div>
          </div>
          <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Pending Approvals</span>
            <div className="text-2xl font-bold font-mono tracking-tight text-amber-500">{pendingApprovals}</div>
            <div className="text-[10px] text-amber-400 font-medium bg-amber-950/40 px-1 rounded inline-block">
              Requires human confirmation
            </div>
          </div>
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400">
            <CheckSquare className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Fraud Risk Trend */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-4">
          <h2 className="text-xs font-bold font-mono text-slate-300 mb-4 tracking-wide uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Fraud Risk Velocity Trend (Last 7 Days)
          </h2>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip {...customTooltipStyle} />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2.5} activeDot={{ r: 6 }} name="Avg Risk Score" />
                <Line type="monotone" dataKey="cases" stroke="#a855f7" strokeWidth={1.5} strokeDasharray="4 4" name="Alert Count" />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Cases by Status */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-4">
          <h2 className="text-xs font-bold font-mono text-slate-300 mb-4 tracking-wide uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            Cases Ingestion Status Partition
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center h-60">
            <div className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={4} dataKey="value">
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS] || "#cbd5e1"} />
                    ))}
                  </Pie>
                  <Tooltip {...customTooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 px-4">
              {statusData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between text-xs font-mono border-b border-slate-800/60 pb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ backgroundColor: STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS] }}></span>
                    <span className="text-slate-400">{entry.name}</span>
                  </div>
                  <span className="text-slate-200 font-bold">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart 3: Fraud Pattern Distribution */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-4">
          <h2 className="text-xs font-bold font-mono text-slate-300 mb-4 tracking-wide uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
            Graph Anomaly Fraud Pattern Vector Mapping
          </h2>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patternData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="pattern" stroke="#94a3b8" fontSize={9} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip {...customTooltipStyle} />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} name="Trigger Count">
                  {patternData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#6366f1" : "#a855f7"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Risk Distribution */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-4">
          <h2 className="text-xs font-bold font-mono text-slate-300 mb-4 tracking-wide uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            Total Dossier Risk Tier Spread
          </h2>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={riskDistribution} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis type="category" dataKey="level" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip {...customTooltipStyle} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} name="Case Count">
                  {riskDistribution.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Investigations Table Section */}
      <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1e293b] flex items-center justify-between">
          <h2 className="text-xs font-bold font-mono text-slate-300 tracking-wide uppercase flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-blue-400" />
            High Threat Queue (Recent Flagged Actions)
          </h2>
          <Link href="/cases" className="text-[11px] text-blue-400 hover:text-blue-300 hover:underline font-mono flex items-center gap-0.5">
            View full docket <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#020617]/50 text-slate-400 font-mono text-[10px] tracking-wider border-b border-[#1e293b] uppercase">
                <th className="py-3 px-5">Case ID</th>
                <th className="py-3 px-5">Customer Node</th>
                <th className="py-3 px-5">Fraud Vector Pattern</th>
                <th className="py-3 px-5 text-center">Threat Score</th>
                <th className="py-3 px-5">Current Status</th>
                <th className="py-3 px-5">Last Ingestion</th>
                <th className="py-3 px-5 text-right">Console</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-xs font-sans">
              {cases.slice(0, 5).map((item) => {
                const getRiskBadgeColor = (score: number) => {
                  if (score >= 90) return "bg-red-950/60 text-red-400 border-red-800/40";
                  if (score >= 70) return "bg-orange-950/40 text-orange-400 border-orange-800/30";
                  if (score >= 40) return "bg-yellow-950/20 text-yellow-400 border-yellow-800/20";
                  return "bg-emerald-950/30 text-emerald-400 border-emerald-800/20";
                };

                const getStatusStyle = (status: string) => {
                  switch (status) {
                    case "Open": return "text-blue-400 bg-blue-950/30 border-blue-800/20";
                    case "Investigating": return "text-indigo-400 bg-indigo-950/30 border-indigo-800/20";
                    case "Pending Approval": return "text-amber-400 bg-amber-950/30 border-amber-800/20 font-medium";
                    case "Resolved": return "text-emerald-400 bg-emerald-950/30 border-emerald-800/20";
                    default: return "text-slate-400 bg-slate-900 border-slate-800";
                  }
                };

                return (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="py-3 px-5 font-mono text-blue-400 font-medium">
                      <Link href={`/investigations/${item.id}`} className="hover:underline">
                        {item.id}
                      </Link>
                    </td>
                    <td className="py-3 px-5">
                      <div className="font-medium text-slate-200">{item.customerName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{item.customerId}</div>
                    </td>
                    <td className="py-3 px-5">
                      <span className="text-slate-300 font-mono text-[11px] bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">
                        {item.fraudPattern}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-center">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${getRiskBadgeColor(item.riskScore)}`}>
                        {item.riskScore}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${getStatusStyle(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-slate-400 font-mono text-[11px]">
                      {new Date(item.updatedAt).toLocaleDateString()} {new Date(item.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </td>
                    <td className="py-3 px-5 text-right">
                      <Link
                        href={`/investigations/${item.id}`}
                        className="inline-flex items-center gap-1 text-[11px] font-mono bg-slate-800 border border-slate-700 hover:bg-blue-600 hover:text-white px-2.5 py-1 rounded transition-colors text-slate-300"
                      >
                        <Eye className="w-3 h-3" />
                        Investigate
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
