"use strict";

"use client";

import React, { useState } from "react";
import { Settings, Shield, Sliders, Database, Server, RefreshCw } from "lucide-react";

export default function SettingsConsolePage() {
  const [syncRate, setSyncRate] = useState("5s");
  const [agentSensitivity, setAgentSensitivity] = useState(85);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header title */}
      <div className="border-b border-[#1e293b] pb-4">
        <h1 className="text-xl font-bold font-mono tracking-tight text-slate-100 flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-500" /> Platform Configuration Console
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Adjust high-density graph ingestion parameters, agent threshold constraints, and live stream telemetry filters.
        </p>
      </div>

      {/* Configuration Panels Forms List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Panel 1: Ingestion engine streams */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-5 space-y-4">
          <h2 className="text-xs font-bold font-mono tracking-wider text-slate-300 uppercase flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <Server className="w-4 h-4 text-blue-400" /> Ingestion Streaming Core
          </h2>

          <div className="space-y-3 font-mono text-xs">
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-500 uppercase">TigerGraph Sync Stream Delta Interval:</label>
              <select
                value={syncRate}
                onChange={(e) => setSyncRate(e.target.value)}
                className="w-full bg-[#020617] text-slate-200 border border-[#1e293b] p-2 rounded focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="1s">1 SEC (REAL-TIME AGENT DRIFT)</option>
                <option value="5s">5 SECS (OPTIMAL STREAM MATRIX)</option>
                <option value="30s">30 SECS (BATCH DEPOSIT INTERVAL)</option>
              </select>
            </div>

            <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-[11px] text-slate-400">
              <span>GraphRAG Cache Index:</span>
              <span className="text-emerald-400 font-bold">14,842 nodes active</span>
            </div>
          </div>
        </div>

        {/* Panel 2: Agent cognitive sensitivity */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-5 space-y-4">
          <h2 className="text-xs font-bold font-mono tracking-wider text-slate-300 uppercase flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <Sliders className="w-4 h-4 text-purple-400" /> Agent Inference Constraints
          </h2>

          <div className="space-y-3 font-mono text-xs">
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-500 uppercase">HEURISTICS ACCURACY THRESHOLD:</span>
                <span className="text-purple-400 font-bold">{agentSensitivity}% certainty</span>
              </div>
              <input
                type="range"
                min={50}
                max={99}
                value={agentSensitivity}
                onChange={(e) => setAgentSensitivity(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            <div className="p-2 bg-[#020617] rounded border border-slate-800 text-[11px] font-sans text-slate-400 leading-relaxed">
              Higher values force the AI Agent to request human confirmation or step-up authentication tokens for borderline suspicious behaviors.
            </div>
          </div>
        </div>
      </div>

      {/* Save indicator info */}
      <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono rounded-lg flex items-center gap-2">
        <Shield className="w-4 h-4" />
        <span>Mock environment settings synced in session memory. No hard disk writes committed.</span>
      </div>
    </div>
  );
}
