"use strict";

"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useFraudStore } from "@/lib/mock-data/store";
import {
  CreditCard,
  User,
  ShieldAlert,
  Smartphone,
  Globe,
  ArrowLeft,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Compass
} from "lucide-react";

export default function TransactionBlockDetailsPage() {
  const params = useParams();
  const transactionId = (params?.transactionId as string) || "TXN-2026-001";

  // Connect to Zustand reactive live memory store
  const transactions = useFraudStore((state) => state.transactions);
  const currentTxn = transactions.find((t) => t.id === transactionId) || transactions[0];
  const relativeTxns = transactions.filter((t) => t.customerId === currentTxn.customerId && t.id !== currentTxn.id);

  const getRiskColor = (score: number) => {
    if (score >= 90) return "text-red-400 bg-red-950/40 border-red-800/40";
    if (score >= 70) return "text-orange-400 bg-orange-950/40 border-orange-800/30";
    return "text-emerald-400 bg-emerald-950/20 border-emerald-800/20";
  };

  return (
    <div className="space-y-6">
      {/* Header section back navigation links */}
      <div className="flex items-center gap-3 border-b border-[#1e293b] pb-4">
        <Link href="/cases" className="p-1 rounded bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold font-mono text-slate-100">{currentTxn.id}</h1>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
              currentTxn.status === "Flagged" || currentTxn.status === "Blocked" ? "text-red-400 bg-red-950/40 border-red-800/40" : "text-emerald-400 bg-emerald-950/40 border-emerald-800/20"
            }`}>
              {currentTxn.status.toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">Core Banking Ledger Settlement Event block</p>
        </div>
      </div>

      {/* Main split grid panel matrix layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* LEFT COLUMN WING - CORE SETTLEMENT TELEMETRY NODES (2 COLS) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Card 1: Core Billing Transaction Parameters */}
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-5 space-y-4">
            <h2 className="text-xs font-bold font-mono tracking-wider text-slate-300 uppercase border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-blue-500" />
              Settlement Ledger Telemetry Parameters
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="space-y-3 bg-[#020617]/40 p-3 rounded border border-slate-800/60">
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px]">MERCHANT BENEFICIARY:</span>
                  <span className="text-slate-100 font-sans font-bold text-sm mt-0.5">{currentTxn.merchant}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px]">AUTHORIZED VALUE AMOUNT:</span>
                  <span className="text-slate-500 text-lg font-bold text-slate-50 mt-0.5">${currentTxn.amount.toFixed(2)} USD</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px]">TIMESTAMP SYNC:</span>
                  <span className="text-slate-300 mt-0.5"><Calendar className="w-3.5 h-3.5 inline text-slate-500 mr-1" />{new Date(currentTxn.timestamp).toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3 bg-[#020617]/40 p-3 rounded border border-slate-800/60">
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px]">AFFILIATED DEPOSIT IDENTITY:</span>
                  <span className="text-blue-400 font-bold mt-0.5 hover:underline">
                    <Link href={`/customers/${currentTxn.customerId}`} className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" /> {currentTxn.customerName}
                    </Link>
                  </span>
                  <span className="text-[10px] text-slate-500">{currentTxn.customerId}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px]">NETWORK CLIENT IP ADDRESS:</span>
                  <span className="text-slate-200 mt-0.5 flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-amber-500" /> {currentTxn.ipAddress}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px]">HARDWARE AGENT FOOTPRINT:</span>
                  <span className="text-slate-300 font-sans mt-0.5 truncate flex items-center gap-1"><Smartphone className="w-3.5 h-3.5 text-purple-400" /> {currentTxn.deviceInfo}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Connected Relative Transactions History */}
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#1e293b]">
              <h3 className="text-xs font-bold font-mono tracking-wider text-slate-300 uppercase flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-indigo-400" /> Close Velocity Neighbor Transactions
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead>
                  <tr className="bg-[#020617]/60 text-slate-500 text-[9px] uppercase border-b border-[#1e293b]">
                    <th className="py-2 px-4">TXN ID</th>
                    <th className="py-2 px-4">Merchant</th>
                    <th className="py-2 px-4">Amount</th>
                    <th className="py-2 px-4">Location Coordinates</th>
                    <th className="py-2 px-4 text-center">Threat</th>
                    <th className="py-2 px-4 text-right">Settlement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-slate-300">
                  {relativeTxns.slice(0, 4).map((t) => (
                    <tr key={t.id} className="hover:bg-slate-800/10">
                      <td className="py-2.5 px-4 text-blue-400 font-bold">
                        <Link href={`/transactions/${t.id}`}>{t.id}</Link>
                      </td>
                      <td className="py-2.5 px-4 text-slate-200 font-sans">{t.merchant}</td>
                      <td className="py-2.5 px-4 font-bold text-slate-100">${t.amount.toFixed(2)}</td>
                      <td className="py-2.5 px-4 text-slate-400 font-sans text-[11px]">{t.location}</td>
                      <td className="py-2.5 px-4 text-center text-slate-400">{t.riskScore}</td>
                      <td className="py-2.5 px-4 text-right text-emerald-400">{t.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN WING - FRAUD MATRIX INDICATORS OVERLAYS (1 COL) */}
        <div className="space-y-6">

          {/* Right Card 1: Threat Score Gauge Summary */}
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-bold font-mono tracking-wider text-slate-300 uppercase flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <ShieldAlert className="w-4 h-4 text-red-500" /> Anomaly Score breakdown
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between bg-[#020617] border border-slate-800 p-3 rounded">
                <span className="text-slate-500">AGGREGATE FRAUD INDEX:</span>
                <span className={`px-2 py-0.5 border rounded font-bold text-sm ${getRiskColor(currentTxn.riskScore)}`}>
                  {currentTxn.riskScore} / 100
                </span>
              </div>

              <div className="text-[11px] text-slate-400 space-y-1.5 pt-1">
                <div className="flex items-center justify-between border-b border-slate-800/40 pb-1">
                  <span>Geographic Velocity Variance:</span>
                  <span className={currentTxn.riskScore >= 70 ? "text-red-400 font-bold" : "text-slate-300"}>High Discrepancy</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800/40 pb-1">
                  <span>Hardware Cookie Signature:</span>
                  <span className={currentTxn.riskScore >= 70 ? "text-red-400 font-bold" : "text-slate-300"}>Unrecognized Device</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800/40 pb-1">
                  <span>Merchant Risk Multiplier:</span>
                  <span className="text-slate-300 font-bold">1.4x (Crypto Channel)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card 2: AI Agent Security Lock Directive Action Card */}
          <div className="bg-[#0f172a] border border-purple-500/20 bg-purple-500/[0.01] rounded-xl p-5 space-y-3">
            <h3 className="text-xs font-bold font-mono tracking-wider text-purple-400 uppercase flex items-center gap-1.5">
              <Lock className="w-4 h-4" /> Mitigating Safety Traps
            </h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              This block was dynamically locked by the <strong>TigerGraph Guard Agent</strong> to intercept rapid cross-border asset leakage during the investigation window.
            </p>
            <div className="pt-2 font-mono">
              <Link href={`/investigations/CASE-2026-001`} className="w-full text-center block bg-purple-900/40 border border-purple-700/30 hover:bg-purple-900 text-purple-300 py-1.5 rounded text-xs transition-colors">
                Inspect Aggregate Dossier
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
