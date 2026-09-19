"use strict";

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useFraudStore } from "@/lib/mock-data/store";
import {
  User,
  CreditCard,
  Smartphone,
  ShieldAlert,
  Globe,
  ArrowLeft,
  Calendar,
  Layers,
  Activity,
  History
} from "lucide-react";

export default function CustomerProfilePage() {
  const params = useParams();
  const customerId = (params?.customerId as string) || "CUST-10452";

  // Load variables context state from live store
  const customers = useFraudStore((state) => state.customers);
  const transactions = useFraudStore((state) => state.transactions);
  const cases = useFraudStore((state) => state.cases);

  const customer = customers.find((c) => c.id === customerId) || customers[0];
  const customerTransactions = transactions.filter((t) => t.customerId === customer.id);
  const customerCases = cases.filter((c) => c.customerId === customer.id);

  const [activeTab, setActiveTab] = useState<"txns" | "cases" | "devices">("txns");

  const getRiskStyle = (score: number) => {
    if (score >= 80) return "bg-red-950/60 text-red-400 border-red-800/40";
    if (score >= 40) return "bg-orange-950/40 text-orange-400 border-orange-800/30";
    return "bg-emerald-950/30 text-emerald-400 border-emerald-800/20";
  };

  return (
    <div className="space-y-6">
      {/* Header bar back-linking */}
      <div className="flex items-center gap-3 border-b border-[#1e293b] pb-4">
        <Link href="/dashboard" className="p-1 rounded bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold font-mono text-slate-100">{customer.name}</h1>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getRiskStyle(customer.riskScore)}`}>
              Risk Score: {customer.riskScore}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">System Reference FQN ID: {customer.id}</p>
        </div>
      </div>

      {/* Profile Overview Meta Matrix Widgets Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Core parameters card */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-4 font-mono text-xs space-y-2.5">
          <h3 className="text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-800 pb-1.5 flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-blue-400" /> Account Metadata Identity
          </h3>
          <div className="flex justify-between">
            <span className="text-slate-500">Email:</span>
            <span className="text-slate-200 font-sans">{customer.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Phone:</span>
            <span className="text-slate-200">{customer.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Status Status:</span>
            <span className={`px-1 rounded uppercase font-bold text-[10px] ${
              customer.accountStatus === "Active" ? "text-emerald-400" : "text-amber-500"
            }`}>{customer.accountStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Joined Date:</span>
            <span className="text-slate-300"><Calendar className="w-3 h-3 inline mr-1 text-slate-500" />{customer.joinedDate}</span>
          </div>
        </div>

        {/* Counter analytics metrics cards */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-4 font-mono text-xs space-y-2.5">
          <h3 className="text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-800 pb-1.5 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-indigo-400" /> Cluster Connections Index
          </h3>
          <div className="flex justify-between">
            <span className="text-slate-500">Total Transaction Count:</span>
            <span className="text-slate-200 font-bold">{customer.transactionCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Historic Flagged Cases:</span>
            <span className="text-red-400 font-bold">{customer.previousCasesCount} cases</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Known Devices Hash:</span>
            <span className="text-slate-200">{customer.knownDevicesCount} footprint nodes</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Network Connections:</span>
            <span className="text-slate-200">{customer.knownConnectionsCount} IP segments</span>
          </div>
        </div>

        {/* Hardware / network intelligence overlay highlights */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-4 flex flex-col justify-between space-y-2 text-xs font-mono">
          <div className="space-y-2">
            <h3 className="text-slate-400 font-bold uppercase text-[10px] tracking-wide border-b border-slate-800 pb-1.5 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-orange-400" /> Active Security Threat Level
            </h3>
            <div className="p-2 bg-[#020617] rounded border border-slate-800 text-[11px] font-sans text-slate-300 leading-relaxed">
              {customer.riskScore >= 70 ? (
                <span className="text-red-400 font-mono font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 inline-block animate-pulse"></span>
                  High risk takeover signal active. Trapping exit pathways.
                </span>
              ) : (
                <span className="text-emerald-400 font-mono">Standard benchmark parameters matched. Regular auditing loop.</span>
              )}
            </div>
          </div>

          <Link href={`/graph/CASE-2026-001`} className="w-full text-center block bg-slate-800 border border-slate-700 text-slate-300 hover:text-white py-1 rounded text-[11px] hover:bg-slate-700 transition-colors">
            Audit Network Graph Linkage
          </Link>
        </div>
      </div>

      {/* Tabs navigation panel layout */}
      <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl overflow-hidden">
        <div className="px-4 bg-[#020617]/50 border-b border-[#1e293b] flex gap-2">
          <button
            onClick={() => setActiveTab("txns")}
            className={`px-4 py-2.5 font-mono text-xs font-medium border-b-2 transition-colors ${
              activeTab === "txns" ? "border-blue-500 text-blue-400" : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 inline mr-1" /> Transaction Ledger ({customerTransactions.length})
          </button>

          <button
            onClick={() => setActiveTab("cases")}
            className={`px-4 py-2.5 font-mono text-xs font-medium border-b-2 transition-colors ${
              activeTab === "cases" ? "border-blue-500 text-blue-400" : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <History className="w-3.5 h-3.5 inline mr-1" /> Dossier Incidents ({customerCases.length})
          </button>

          <button
            onClick={() => setActiveTab("devices")}
            className={`px-4 py-2.5 font-mono text-xs font-medium border-b-2 transition-colors ${
              activeTab === "devices" ? "border-blue-500 text-blue-400" : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 inline mr-1" /> Connected Hardware & IPs
          </button>
        </div>

        {/* Tab content panels rendering */}
        <div className="p-4">
          {activeTab === "txns" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead>
                  <tr className="text-slate-500 text-[10px] uppercase border-b border-slate-800 pb-1">
                    <th className="py-2 px-2">TXN ID</th>
                    <th className="py-2 px-2">Timestamp</th>
                    <th className="py-2 px-2">Merchant</th>
                    <th className="py-2 px-2">Amount</th>
                    <th className="py-2 px-2">Location Geolocation</th>
                    <th className="py-2 px-2 text-center">Risk</th>
                    <th className="py-2 px-2 text-right">State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-slate-300">
                  {customerTransactions.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-800/10">
                      <td className="py-2 px-2 text-blue-400 font-bold">
                        <Link href={`/transactions/${t.id}`}>{t.id}</Link>
                      </td>
                      <td className="py-2 px-2 text-slate-500 text-[11px]">{new Date(t.timestamp).toLocaleString()}</td>
                      <td className="py-2 px-2 font-sans text-slate-200">{t.merchant}</td>
                      <td className="py-2 px-2 font-bold text-slate-100">${t.amount.toFixed(2)}</td>
                      <td className="py-2 px-2 font-sans text-slate-400 text-[11px]">{t.location}</td>
                      <td className="py-2 px-2 text-center font-bold text-slate-400">{t.riskScore}</td>
                      <td className="py-2 px-2 text-right">
                        <span className={`text-[10px] px-1 rounded ${
                          t.status === "Flagged" ? "text-red-400 bg-red-950/40" : "text-emerald-400"
                        }`}>{t.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "cases" && (
            <div className="space-y-3 font-mono text-xs">
              {customerCases.length === 0 ? (
                <div className="text-slate-600 text-center py-6">Zero historical fraud cases logged for this identity record.</div>
              ) : (
                customerCases.map((c) => (
                  <div key={c.id} className="border border-slate-800 bg-slate-900/40 rounded-lg p-3 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Link href={`/investigations/${c.id}`} className="text-blue-400 font-bold hover:underline">{c.id}</Link>
                        <span className="text-slate-300 font-semibold bg-slate-900 border border-slate-800 px-1.5 py-0.2 rounded text-[11px]">{c.fraudPattern}</span>
                      </div>
                      <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">{c.summary}</p>
                    </div>

                    <div className="flex sm:flex-col items-start sm:items-end justify-between font-mono text-[11px] flex-shrink-0 text-slate-400 gap-1 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                      <div>Threat Rating: <span className="text-red-400 font-bold">{c.riskScore}</span></div>
                      <div className="px-1.5 py-0.2 bg-slate-800 rounded text-[10px] uppercase">{c.status}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "devices" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              {/* Device 1 */}
              <div className="border border-slate-800 bg-slate-900/20 p-3 rounded-lg space-y-2">
                <div className="flex justify-between text-[10px] text-slate-500 uppercase font-bold">
                  <span>Hardware Fingerprint Profile</span>
                  <span className="text-red-400">Unrecognized</span>
                </div>
                <div className="text-slate-200 font-bold flex items-center gap-1.5"><Smartphone className="w-4 h-4 text-purple-400" /> OnePlus 11 (Android 13)</div>
                <div className="text-slate-400 text-[11px] space-y-1 bg-[#020617] p-2 rounded border border-slate-800/60">
                  <div>Hash Token: <span className="text-slate-300">a7b3c9d2e5f81234</span></div>
                  <div>ISP Carrier: <span className="text-slate-300 font-sans">M22 Berlin Hosting</span></div>
                  <div>Last Geolocation: <span className="text-slate-300 font-sans">Frankfurt, DE (VPN exit)</span></div>
                  <div>Timestamp: <span className="text-slate-500">2026-09-19 09:31 AM</span></div>
                </div>
              </div>

              {/* Device 2 */}
              <div className="border border-slate-800 bg-slate-900/20 p-3 rounded-lg space-y-2">
                <div className="flex justify-between text-[10px] text-slate-500 uppercase font-bold">
                  <span>Hardware Fingerprint Profile</span>
                  <span className="text-emerald-400 font-bold">Trusted Primary</span>
                </div>
                <div className="text-slate-200 font-bold flex items-center gap-1.5"><Smartphone className="w-4 h-4 text-emerald-400" /> iPhone 14 Pro (iOS 17.2)</div>
                <div className="text-slate-400 text-[11px] space-y-1 bg-[#020617] p-2 rounded border border-slate-800/60">
                  <div>Hash Token: <span className="text-slate-300">f4e3d2c1b0a98765</span></div>
                  <div>ISP Carrier: <span className="text-slate-300 font-sans">Comcast Cable</span></div>
                  <div>Last Geolocation: <span className="text-slate-300 font-sans">Boston, US</span></div>
                  <div>Timestamp: <span className="text-slate-500">2026-09-18 02:22 PM</span></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
