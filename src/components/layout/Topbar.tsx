"use strict";

import React from "react";
import { Search, Bell, AlertTriangle, Cpu, Terminal } from "lucide-react";
import Link from "next/link";
import { useFraudStore } from "@/lib/mock-data/store";

export function Topbar() {
  const cases = useFraudStore((state) => state.cases);
  const pendingApprovalsCount = cases.filter((c) => c.status === "Pending Approval").length;

  return (
    <header className="h-16 bg-[#0a0f1d] border-b border-[#1e293b] flex items-center justify-between px-6 z-10 select-none">
      {/* Search Input Filter Matrix with shortcut icon */}
      <div className="w-80 relative flex items-center">
        <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3" />
        <input
          type="text"
          placeholder="Search customer, transaction, case ID..."
          className="w-full bg-[#020617] text-slate-200 pl-9 pr-8 py-1.5 rounded border border-[#1e293b] text-xs font-mono focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-600"
        />
        <kbd className="absolute right-2 px-1.5 py-0.2 text-[9px] bg-slate-900 border border-slate-800 rounded font-mono text-slate-500 shadow-sm">/</kbd>
      </div>

      {/* Center/Top State Indicator */}
      <div className="flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-800/30 px-3 py-1 rounded-full text-[11px] font-mono text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.05)]">
        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
        <span>AI Agent Online</span>
      </div>

      {/* Action Controls and Profiles */}
      <div className="flex items-center gap-4">
        {/* GraphRAG / AI Core Simulation Badge */}
        <div className="hidden sm:flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded text-[10px] text-purple-400 font-mono">
          <Cpu className="w-3 h-3 text-purple-400" />
          <span>GraphRAG Core</span>
        </div>

        {/* Notifications Trigger Button */}
        <button className="p-1.5 rounded bg-[#020617] border border-[#1e293b] text-slate-400 hover:text-slate-200 hover:bg-slate-900 relative transition-colors shadow-sm">
          <Bell className="w-3.5 h-3.5" />
          {pendingApprovalsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-500 text-[8px] font-bold text-slate-950 flex items-center justify-center filter drop-shadow-[0_0_3px_rgba(34,211,238,0.5)]">
              {pendingApprovalsCount}
            </span>
          )}
        </button>

        {/* Vertical Separator */}
        <div className="w-px h-5 bg-[#1e293b]"></div>

        {/* HackerNest Top Right Branding Badge */}
        <div className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-950/80 via-blue-950/60 to-purple-950/80 border border-cyan-500/40 px-3 py-1 rounded-lg text-xs font-mono font-bold text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="tracking-wider uppercase">HackerNest</span>
        </div>

        {/* User profile capsule info */}
        <div className="flex items-center gap-2.5 font-mono">
          <div className="text-right hidden md:block">
            <div className="text-xs font-bold text-slate-200">Alex Vance</div>
            <div className="text-[9px] text-slate-500 font-medium">Fraud Analyst</div>
          </div>
          <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-purple-600 border border-blue-400/20 flex items-center justify-center text-white font-bold text-xs shadow-md">
            AV
          </div>
        </div>
      </div>
    </header>
  );
}
