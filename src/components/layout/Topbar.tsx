"use strict";

import React from "react";
import { Search, Bell, AlertTriangle, Cpu, Terminal } from "lucide-react";
import Link from "next/link";
import { useFraudStore } from "@/lib/mock-data/store";

export function Topbar() {
  const cases = useFraudStore((state) => state.cases);
  const activeCase = cases.find((c) => c.id === "CASE-2026-001");
  const pendingApprovalsCount = cases.filter((c) => c.status === "Pending Approval").length;

  return (
    <header className="h-16 bg-[#0f172a] border-b border-[#1e293b] flex items-center justify-between px-6 z-10">
      {/* Search Input Filter Mock */}
      <div className="w-80 relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search Customer, Transaction, Case ID..."
          className="w-full bg-[#020617] text-slate-200 pl-9 pr-4 py-1.5 rounded-md border border-[#1e293b] text-xs focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-500"
        />
      </div>

      {/* Middle Context Area: Active Investigation Indicator */}
      {activeCase && (
        <Link
          href={`/investigations/${activeCase.id}`}
          className="hidden md:flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded text-xs text-amber-400 hover:bg-amber-500/15 transition-colors"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span className="font-medium font-mono text-[11px]">
            ACTIVE TARGET: {activeCase.id} ({activeCase.customerName})
          </span>
          <span className="bg-amber-950 px-1 py-0.2 rounded text-[10px] border border-amber-500/30">
            Risk {activeCase.riskScore}
          </span>
        </Link>
      )}

      {/* Action Controls and Profiles */}
      <div className="flex items-center gap-4">
        {/* GraphRAG / AI Core Simulation Badge */}
        <div className="flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded text-[11px] text-purple-400 font-mono">
          <Cpu className="w-3.5 h-3.5" />
          <span>GraphRAG Core</span>
        </div>

        {/* Notifications Button */}
        <button className="p-1.5 rounded-md bg-[#020617] border border-[#1e293b] text-slate-300 hover:text-slate-100 hover:bg-slate-800 relative transition-colors">
          <Bell className="w-4 h-4" />
          {pendingApprovalsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-[9px] font-bold text-white flex items-center justify-center">
              {pendingApprovalsCount}
            </span>
          )}
        </button>

        {/* Vertical divider */}
        <div className="w-px h-6 bg-[#1e293b]"></div>

        {/* Profile metadata */}
        <div className="flex items-center gap-2.5">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-medium text-slate-200">Cmdr. Alex Vance</div>
            <div className="text-[10px] text-slate-400 font-mono">ID: SEC-8841</div>
          </div>
          <div className="w-8 h-8 rounded-md bg-slate-800 border border-[#1e293b] flex items-center justify-center text-slate-300 font-semibold text-xs font-mono">
            AV
          </div>
        </div>
      </div>
    </header>
  );
}
