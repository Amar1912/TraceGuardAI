"use strict";

"use client";

import React from "react";
import Link from "next/link";
import {
  AlertOctagon,
  ShieldAlert,
  Activity,
  CheckSquare,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Layers,
  Globe,
  Clock,
  Compass,
  Zap,
  HelpCircle
} from "lucide-react";
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
  CartesianGrid
} from "recharts";

export default function DashboardPage() {
  // Line Chart: Fraud Risk Velocity (Last 7 Days)
  const riskVelocityData = [
    { name: "Sep 13", Risk: 45, Alerts: 10 },
    { name: "Sep 14", Risk: 52, Alerts: 14 },
    { name: "Sep 15", Risk: 48, Alerts: 12 },
    { name: "Sep 16", Risk: 68, Alerts: 22 },
    { name: "Sep 17", Risk: 72, Alerts: 18 }, // Tooltip highlighted target
    { name: "Sep 18", Risk: 85, Alerts: 25 },
    { name: "Sep 19", Risk: 91, Alerts: 30 }
  ];

  // Donut Chart: Cases by Status (Total: 32)
  const casesStatusData = [
    { name: "Open", value: 12, color: "#06b6d4" },         // Cyan
    { name: "Investigating", value: 8, color: "#6366f1" },  // Indigo
    { name: "Pending Approval", value: 5, color: "#f97316" }, // Orange
    { name: "Resolved", value: 7, color: "#10b981" }       // Emerald
  ];

  // Bar Chart: Fraud Pattern Distribution
  const patternDistributionData = [
    { name: "Account Takeover", count: 15 },
    { name: "Synthetic Identity", count: 9 },
    { name: "Money Laundering", count: 6 },
    { name: "Transaction Fraud", count: 4 },
    { name: "Card Fraud", count: 3 }
  ];

  // Recent Investigations table data
  const recentInvestigations = [
    { id: "CASE-2026-001", customer: "CUST-10452", txn: "TXN-001", risk: 91, pattern: "Account Takeover", status: "Investigating", updated: "2m ago", tier: "High" },
    { id: "CASE-2026-002", customer: "CUST-98231", txn: "TXN-045", risk: 78, pattern: "Synthetic Identity", status: "Open", updated: "12m ago", tier: "High" },
    { id: "CASE-2026-003", customer: "CUST-76521", txn: "TXN-087", risk: 65, pattern: "Money Laundering", status: "Pending Approval", updated: "24m ago", tier: "Medium" },
    { id: "CASE-2026-004", customer: "CUST-22311", txn: "TXN-122", risk: 43, pattern: "Transaction Fraud", status: "Resolved", updated: "1h ago", tier: "Low" },
    { id: "CASE-2026-005", customer: "CUST-90876", txn: "TXN-033", risk: 88, pattern: "Card Fraud", status: "Investigating", updated: "2h ago", tier: "High" }
  ];

  return (
    <div className="space-y-6 relative select-none">

      {/* Background Cyber Tech Grid Decorative Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none -z-10"></div>

      {/* MAIN TOP BRANDING COMMAND ZONE HEADER - NO ROBOTS */}
      <div className="bg-gradient-to-r from-[#0a122c] to-[#040814] border border-cyan-500/20 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-center gap-4 relative overflow-hidden backdrop-blur-md shadow-[inset_0_0_20px_rgba(6,182,212,0.05)]">
        {/* Glow neon accents */}
        <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-32 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

        <div className="space-y-1.5 z-10 text-center md:text-left">
          <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest bg-cyan-950/50 border border-cyan-800/40 px-2.5 py-0.5 rounded-full inline-block">
            WELCOME BACK, ANALYST
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight font-mono text-slate-100 uppercase">
            FRAUD INVESTIGATION COMMAND CENTER
          </h1>
          <p className="text-xs text-slate-400 italic font-sans max-w-xl">
            “Real-time intelligence. Deeper connections. Safer communities.”
          </p>
        </div>

        {/* Abstract Node Graph Pattern instead of Humanoids */}
        <div className="flex flex-col items-center md:items-end justify-center z-10 font-mono text-right flex-shrink-0">
          <div className="flex items-center gap-1.5 text-slate-500 mb-1">
            <svg className="w-20 h-10 text-cyan-500/30 opacity-75" viewBox="0 0 100 40">
              <circle cx="20" cy="20" r="3" fill="#06b6d4" className="animate-pulse" />
              <circle cx="50" cy="10" r="3" fill="#6366f1" />
              <circle cx="80" cy="30" r="3" fill="#a855f7" />
              <circle cx="50" cy="30" r="3" fill="#06b6d4" />
              <line x1="20" y1="20" x2="50" y2="10" stroke="#1e293b" strokeWidth="1" />
              <line x1="50" y1="10" x2="80" y2="30" stroke="#1e293b" strokeWidth="1" />
              <line x1="20" y1="20" x2="50" y2="30" stroke="#1e293b" strokeWidth="1" />
              <line x1="50" y1="30" x2="80" y2="30" stroke="#1e293b" strokeWidth="1" />
            </svg>
          </div>
          <div className="text-[10px] text-slate-400 font-medium italic pr-1">
            “It’s not just data. It’s people’s trust.”
          </div>
        </div>
      </div>

      {/* CORE Dashboard STAGE VIEWPORT SPLITTING */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">

        {/* MAIN PANEL CONTENT FLIGHT STAGE (OCCUPIES 3 COLS) */}
        <div className="lg:col-span-3 space-y-6">

          {/* KPI Tiers Grid Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* KPI 1: Active Cases */}
            <div className="bg-[#070b19]/80 border border-blue-500/20 rounded-xl p-4 flex flex-col justify-between space-y-2 shadow-[0_4px_12px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-full pointer-events-none"></div>
              <div className="flex items-center justify-between text-slate-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                <span>Active Cases</span>
                <AlertOctagon className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-3xl font-extrabold font-mono text-cyan-400 filter drop-shadow-[0_0_6px_rgba(6,182,212,0.3)]">7</div>
              <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +12% vs last week
              </div>
            </div>

            {/* KPI 2: High Risk Cases */}
            <div className="bg-[#070b19]/80 border border-red-500/20 rounded-xl p-4 flex flex-col justify-between space-y-2 shadow-[0_4px_12px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-red-500/40 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 rounded-bl-full pointer-events-none"></div>
              <div className="flex items-center justify-between text-slate-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                <span>High Risk Cases</span>
                <ShieldAlert className="w-4 h-4 text-red-400" />
              </div>
              <div className="text-3xl font-extrabold font-mono text-red-400 filter drop-shadow-[0_0_6px_rgba(239,68,68,0.3)]">5</div>
              <div className="text-[10px] font-mono text-red-400 font-semibold bg-red-950/40 px-1.5 py-0.2 rounded border border-red-950">
                Immediate Focus Required
              </div>
            </div>

            {/* KPI 3: Investigations Today */}
            <div className="bg-[#070b19]/80 border border-purple-500/20 rounded-xl p-4 flex flex-col justify-between space-y-2 shadow-[0_4px_12px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-purple-500/40 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 rounded-bl-full pointer-events-none"></div>
              <div className="flex items-center justify-between text-slate-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                <span>Investigations Today</span>
                <Activity className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-3xl font-extrabold font-mono text-purple-400 filter drop-shadow-[0_0_6px_rgba(168,85,247,0.3)]">12</div>
              <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +33% vs yesterday
              </div>
            </div>

            {/* KPI 4: Pending Approvals */}
            <div className="bg-[#070b19]/80 border border-orange-500/20 rounded-xl p-4 flex flex-col justify-between space-y-2 shadow-[0_4px_12px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-orange-500/40 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/5 rounded-bl-full pointer-events-none"></div>
              <div className="flex items-center justify-between text-slate-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                <span>Pending Approvals</span>
                <CheckSquare className="w-4 h-4 text-orange-400" />
              </div>
              <div className="text-3xl font-extrabold font-mono text-orange-400 filter drop-shadow-[0_0_6px_rgba(249,115,22,0.3)]">3</div>
              <div className="text-[10px] font-mono text-slate-400 flex items-center gap-0.5">
                <TrendingDown className="w-3 h-3 text-red-400" /> -25% vs yesterday
              </div>
            </div>
          </div>

          {/* Charts Row Blocks Grid split */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Chart 1: Fraud Risk Velocity Line Chart (Spans 2 cols) */}
            <div className="lg:col-span-2 bg-[#070b19]/60 border border-[#1e293b] rounded-xl p-4 relative shadow-lg backdrop-blur-sm">
              <h2 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                Fraud Risk Velocity (Last 7 Days)
              </h2>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={riskVelocityData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#070b19", borderColor: "#22d3ee", color: "#f8fafc", fontFamily: "monospace", fontSize: "11px" }}
                      itemStyle={{ color: "#22d3ee" }}
                    />
                    <Line type="monotone" dataKey="Risk" stroke="#06b6d4" strokeWidth={3} activeDot={{ r: 6 }} name="Risk Score" />
                    <Line type="monotone" dataKey="Alerts" stroke="#a855f7" strokeWidth={1.5} strokeDasharray="4 4" name="Alert Count" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* Specialized HUD text snippet referencing Sep 17 highlighted prompt requirement */}
              <div className="mt-2 text-[10px] font-mono text-slate-500 bg-[#020617] p-2 rounded border border-slate-800 flex justify-between">
                <span>SIMULATION CURVE REFRESH DELTA: <span className="text-cyan-400">ACTIVE</span></span>
                <span>HIGHLIGHT MATRIX: <span className="text-purple-400">Sep 17 (Risk: 72, Alerts: 18)</span></span>
              </div>
            </div>

            {/* Chart 2: Cases By Status Donut Chart (1 col) */}
            <div className="bg-[#070b19]/60 border border-[#1e293b] rounded-xl p-4 relative shadow-lg flex flex-col justify-between">
              <h2 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Cases By Status
              </h2>

              <div className="h-44 w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={casesStatusData} cx="50%" cy="50%" innerRadius={48} outerRadius={64} paddingAngle={4} dataKey="value">
                      {casesStatusData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#070b19", borderColor: "#1e293b", color: "#fff", fontSize: "11px", fontFamily: "monospace" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text tag total cases */}
                <div className="absolute text-center font-mono">
                  <div className="text-lg font-extrabold text-slate-100">32</div>
                  <div className="text-[8px] text-slate-500 uppercase tracking-widest">Total Cases</div>
                </div>
              </div>

              {/* Legends partitioning text summary links */}
              <div className="space-y-1 font-mono text-[10px] pt-2 border-t border-slate-900">
                {casesStatusData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-slate-400 pb-0.5 last:pb-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: item.color }}></span>
                      <span>{item.name}</span>
                    </div>
                    <span className="text-slate-200 font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Fraud Pattern Distribution Bar chart Block */}
          <div className="bg-[#070b19]/60 border border-[#1e293b] rounded-xl p-4 relative shadow-lg">
            <h2 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-400" />
              Fraud Pattern Distribution Vector
            </h2>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={patternDistributionData} margin={{ top: 5, right: 10, left: -30, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.2} vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={9} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#070b19", borderColor: "#1e293b", color: "#fff", fontSize: "11px", fontFamily: "monospace" }}
                  />
                  <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Trigger Volume">
                    {patternDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#06b6d4" : "#6366f1"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Investigations high density data logs grid table */}
          <div className="bg-[#070b19]/60 border border-[#1e293b] rounded-xl overflow-hidden shadow-xl">
            <div className="px-5 py-3.5 border-b border-[#1e293b] bg-[#020617]/40 flex justify-between items-center">
              <h2 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-cyan-400" />
                Recent Investigations Ingestion Stream
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead>
                  <tr className="bg-[#020617]/80 text-slate-500 text-[9px] tracking-wider uppercase border-b border-[#1e293b]">
                    <th className="py-2.5 px-4">Case ID</th>
                    <th className="py-2.5 px-4">Customer</th>
                    <th className="py-2.5 px-4">Transaction</th>
                    <th className="py-2.5 px-4 text-center">Threat Index</th>
                    <th className="py-2.5 px-4">Pattern Vector</th>
                    <th className="py-2.5 px-4">Status</th>
                    <th className="py-2.5 px-4">Updated</th>
                    <th className="py-2.5 px-4 text-right">Console</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900 text-slate-300">
                  {recentInvestigations.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-cyan-400">{item.id}</td>
                      <td className="py-3 px-4 font-sans text-slate-200">{item.customer}</td>
                      <td className="py-3 px-4 text-slate-400">{item.txn}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.tier === "High" ? "bg-red-950/60 text-red-400" : "bg-orange-950/40 text-orange-400"
                        }`}>
                          {item.risk}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[11px] text-slate-300">{item.pattern}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.2 rounded-full text-[9px] border ${
                          item.status === "Investigating" ? "text-cyan-400 bg-cyan-950/30 border-cyan-800/20" :
                          item.status === "Pending Approval" ? "text-orange-400 bg-orange-950/30 border-orange-800/20" :
                          item.status === "Resolved" ? "text-emerald-400 bg-emerald-950/30 border-emerald-800/20" :
                          "text-blue-400 bg-blue-950/30 border-blue-800/20"
                        }`}>{item.status}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-500 text-[11px]">{item.updated}</td>
                      <td className="py-3 px-4 text-right">
                        <Link href={`/investigations/${item.id}`} className="text-cyan-400 text-[11px] hover:underline hover:text-cyan-300 font-bold flex items-center justify-end gap-0.5">
                          View &rarr;
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Panel Layout Segment: Global Fraud Activity map matrix simulation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* World Map matrix layout */}
            <div className="md:col-span-2 bg-[#070b19]/60 border border-[#1e293b] rounded-xl p-4 shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2">
                <h3 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  Global Fraud Activity Anomalies Grid
                </h3>
                <span className="text-[8px] font-mono text-slate-600 tracking-wide uppercase">MOCK GEOSPATIAL FEED</span>
              </div>

              {/* Graphical world simulation grid vectors dots */}
              <div className="h-32 bg-[#020617] rounded-lg border border-slate-900 flex flex-col justify-center items-center relative overflow-hidden p-4">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:16px_10px] opacity-[0.06]"></div>

                {/* Glowing simulation vectors tags */}
                <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-cyan-400 filter drop-shadow-[0_0_4px_#22d3ee] animate-pulse"></div>
                <div className="absolute top-1/2 left-2/3 w-1.5 h-1.5 rounded-full bg-red-500 filter drop-shadow-[0_0_4px_#ef4444] animate-ping"></div>
                <div className="absolute bottom-1/3 left-1/2 w-2 h-2 rounded-full bg-purple-500 filter drop-shadow-[0_0_4px_#a855f7] animate-pulse"></div>
                <div className="absolute top-1/3 left-3/4 w-2 h-2 rounded-full bg-orange-400 filter drop-shadow-[0_0_4px_#f97316] animate-pulse"></div>

                <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest text-center select-none">
                  [ SIMULATED RISK TELEMETRY AREA FEED ACTIVE ]
                </span>
              </div>
            </div>

            {/* High Risk Regions side matrix widget */}
            <div className="bg-[#070b19]/60 border border-[#1e293b] rounded-xl p-4 shadow-lg font-mono text-xs flex flex-col justify-between">
              <div className="border-b border-slate-900 pb-1.5 mb-2">
                <h3 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">High Risk Target Regions</h3>
              </div>
              <div className="space-y-2">
                {[
                  { region: "Eastern Europe", risk: "Critical" },
                  { region: "Southeast Asia", risk: "High" },
                  { region: "West Africa", risk: "Critical" },
                  { region: "South America", risk: "High" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-slate-900 pb-1 last:border-b-0 last:pb-0">
                    <span className="text-slate-300 font-sans">{item.region}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                      item.risk === "Critical" ? "text-red-400 bg-red-950/40" : "text-orange-400 bg-orange-950/30"
                    }`}>{item.risk}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* TraceGuardAI quote panel banner */}
          <div className="bg-gradient-to-r from-purple-950/10 via-slate-900/60 to-cyan-950/10 border border-slate-800 rounded-xl p-3.5 text-center relative overflow-hidden">
            <div className="text-slate-300 font-sans italic text-xs leading-relaxed">
              “Every connection tells a story. Our job is to find the truth.”
            </div>
            <div className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-1">
              — TraceGuardAI
            </div>
          </div>

        </div>

        {/* RIGHT SIDE PANEL WINDOW: CORE SYSTEM TELEMETRY (1 COL) */}
        <div className="lg:col-span-1 space-y-6">

          {/* Card 1: Administrative Core System Operation Status Circular meters */}
          <div className="bg-[#070b19]/60 border border-[#1e293b] rounded-xl p-4 space-y-3.5 shadow-lg">
            <div className="flex flex-col space-y-0.5 border-b border-slate-900 pb-1.5">
              <h3 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider">All Systems Operational</h3>
              <span className="text-[8px] font-mono text-slate-600 uppercase">TELEMETRY DIAGNOSTICS</span>
            </div>

            {/* Gauges meters list layout */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="bg-[#020617] border border-slate-900 rounded p-2 text-center">
                <div className="text-[9px] text-slate-500 uppercase">AI Agent</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">99%</div>
              </div>
              <div className="bg-[#020617] border border-slate-900 rounded p-2 text-center">
                <div className="text-[9px] text-slate-500 uppercase">Graph DB</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">98%</div>
              </div>
              <div className="bg-[#020617] border border-slate-900 rounded p-2 text-center">
                <div className="text-[9px] text-slate-500 uppercase">API Services</div>
                <div className="text-sm font-bold text-cyan-400 mt-0.5">97%</div>
              </div>
              <div className="bg-[#020617] border border-slate-900 rounded p-2 text-center">
                <div className="text-[9px] text-slate-500 uppercase">Frontend</div>
                <div className="text-sm font-bold text-cyan-400 mt-0.5">100%</div>
              </div>
            </div>
          </div>

          {/* Card 3: Cyber Time Panel hud layer */}
          <div className="bg-[#070b19]/60 border border-[#1e293b] rounded-xl p-4 space-y-2.5 shadow-lg font-mono">
            <div className="flex justify-between items-baseline">
              <div className="text-slate-400 text-xs font-bold"><Clock className="w-3 h-3 inline mr-1 text-cyan-400" /> Fri, 19 Sep 2026</div>
              <div className="text-cyan-400 text-sm font-extrabold filter drop-shadow-[0_0_4px_rgba(6,182,212,0.4)]">03:24 PM</div>
            </div>

            {/* Stylized custom waveform/monitoring visualization bar line segments instead of illustrations */}
            <div className="h-6 bg-[#020617] rounded border border-slate-950 flex items-center justify-center gap-0.5 px-2">
              <span className="w-1 h-3 bg-cyan-500 rounded-sm animate-pulse"></span>
              <span className="w-1 h-4 bg-blue-500 rounded-sm"></span>
              <span className="w-1 h-2 bg-purple-500 rounded-sm animate-pulse"></span>
              <span className="w-1 h-4 bg-cyan-400 rounded-sm"></span>
              <span className="w-1 h-3 bg-indigo-500 rounded-sm"></span>
              <span className="w-1 h-1 bg-slate-800 rounded-sm"></span>
              <span className="w-1 h-2 bg-purple-600 rounded-sm"></span>
              <span className="w-1 h-4 bg-cyan-500 rounded-sm animate-pulse"></span>
            </div>

            <div className="text-[9px] text-slate-500 uppercase font-bold text-center tracking-widest opacity-85">
              “Stay Curious. Stay Secure.”
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}