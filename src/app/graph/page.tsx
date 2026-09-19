"use strict";

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useFraudStore } from "@/lib/mock-data/store";
import { getMockGraphData } from "@/lib/mock-data/initial";
import {
  Network,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize,
  RotateCcw,
  Info,
  Shield,
  HelpCircle,
  AlertTriangle,
  ArrowLeft,
  X
} from "lucide-react";
import { GraphNode } from "@/types";

export default function GraphExplorerPage() {
  const params = useParams();
  const caseId = (params?.caseId as string) || "CASE-2026-001";

  // Load mock relational topology grid metrics data
  const graphData = getMockGraphData(caseId);

  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(graphData.nodes[0]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState("");

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.1, 2));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.1, 0.5));
  const handleReset = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setSelectedNode(graphData.nodes[0]);
  };

  // Node styles descriptor
  const getNodeColor = (type: string, risk: string) => {
    switch (type) {
      case "Customer": return "border-blue-500 bg-blue-950/60 text-blue-400";
      case "Account": return "border-slate-500 bg-slate-900 text-slate-300";
      case "Transaction": return risk === "Critical" ? "border-red-600 bg-red-950/70 text-red-400 font-bold" : "border-orange-500 bg-orange-950/40 text-orange-400";
      case "Device": return "border-purple-500 bg-purple-950/40 text-purple-400";
      case "IP": return "border-amber-500 bg-amber-950/40 text-amber-400";
      case "Case": return "border-rose-500 bg-rose-950/40 text-rose-400";
      case "Merchant": return "border-emerald-500 bg-emerald-950/40 text-emerald-400";
      default: return "border-slate-600 bg-slate-800 text-slate-400";
    }
  };

  // 2D Coordinates mapping grid to render a beautiful layout manually
  const nodePositions: Record<string, { x: number; y: number }> = {
    "NODE-CUST": { x: 300, y: 220 },
    "NODE-ACCT": { x: 480, y: 220 },
    "NODE-TXN1": { x: 620, y: 140 },
    "NODE-TXN2": { x: 620, y: 300 },
    "NODE-DEV1": { x: 800, y: 140 },
    "NODE-DEV2": { x: 300, y: 80 },
    "NODE-IP1": { x: 800, y: 300 },
    "NODE-MERCH1": { x: 740, y: 40 },
    "NODE-CASE1": { x: 450, y: 380 },
    "NODE-OTHER-ACCT": { x: 940, y: 220 }
  };

  const filteredNodes = graphData.nodes.filter(n =>
    n.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 h-[calc(100vh-100px)] flex flex-col">
      {/* Header toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#1e293b] pb-3 gap-2 flex-shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold font-mono tracking-tight text-slate-100 flex items-center gap-2">
              <Network className="w-5 h-5 text-blue-500" /> TigerGraph Anomaly Network Explorer
            </h1>
            <span className="text-[10px] font-mono bg-blue-950 text-blue-400 border border-blue-900 px-2 py-0.2 rounded uppercase">
              {caseId} cluster
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Visualize sub-network multi-entity traversal paths, hardware fingerprint tokens, and shared connection graphs.
          </p>
        </div>

        {/* Local Graph Actions search query box */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Locate node label..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0f172a] text-slate-200 border border-[#1e293b] pl-8 pr-3 py-1 rounded text-xs font-mono focus:outline-none focus:border-blue-500 placeholder:text-slate-600"
            />
          </div>
          {caseId !== "all" && (
            <Link href={`/investigations/${caseId}`} className="text-xs font-mono text-slate-400 bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded border border-slate-700 flex items-center gap-1 flex-shrink-0">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Case
            </Link>
          )}
        </div>
      </div>

      {/* Main Graph Viewport Split Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 border border-[#1e293b] bg-[#020617] rounded-xl overflow-hidden min-h-0 relative">

        {/* VIEWPORT CONTROLS HUD OVERLAY */}
        <div className="absolute left-4 top-4 bg-[#0f172a]/90 backdrop-blur-sm border border-[#1e293b] p-1.5 rounded-lg flex items-center gap-1 z-20 shadow-xl font-mono text-slate-300">
          <button onClick={handleZoomIn} title="Zoom In" className="p-1 hover:bg-slate-800 rounded transition-colors"><ZoomIn className="w-4 h-4" /></button>
          <button onClick={handleZoomOut} title="Zoom Out" className="p-1 hover:bg-slate-800 rounded transition-colors"><ZoomOut className="w-4 h-4" /></button>
          <button onClick={handleReset} title="Reset Scale" className="p-1 hover:bg-slate-800 rounded transition-colors"><RotateCcw className="w-4 h-4" /></button>
          <div className="w-px h-4 bg-slate-800 mx-1"></div>
          <span className="text-[10px] px-1 font-bold text-slate-400">{Math.round(zoomLevel * 100)}%</span>
        </div>

        {/* LEFT WINDOW PANEL: INTERACTIVE GRAPH STAGE - SPANS 3 COLS */}
        <div className="lg:col-span-3 relative h-full w-full bg-[#020617] overflow-hidden select-none cursor-grab active:cursor-grabbing border-r border-[#1e293b]/70">

          {/* Background Grid Pattern Vector */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:30px_30px] opacity-[0.15]"></div>

          {/* Graph Nodes Canvas Matrix container */}
          <div
            className="absolute inset-0 transition-transform duration-75 origin-top-left"
            style={{ transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)` }}
          >
            {/* RENDER EDGES FIRST SO THEY fall BEHIND NODES */}
            <svg className="absolute inset-0 w-[2000px] h-[2000px] pointer-events-none">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="18" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#334155" />
                </marker>
              </defs>
              {graphData.edges.map((edge) => {
                const start = nodePositions[edge.source] || { x: 100, y: 100 };
                const end = nodePositions[edge.target] || { x: 200, y: 200 };

                return (
                  <g key={edge.id}>
                    <line
                      x1={start.x + 60}
                      y1={start.y + 18}
                      x2={end.x + 60}
                      y2={end.y + 18}
                      stroke="#1e293b"
                      strokeWidth={1.8}
                      markerEnd="url(#arrow)"
                    />
                    {/* Edge relationship text marker label */}
                    <text
                      x={(start.x + end.x) / 2 + 60}
                      y={(start.y + end.y) / 2 + 14}
                      fill="#64748b"
                      fontSize={8}
                      fontFamily="monospace"
                      textAnchor="middle"
                      className="bg-slate-950 px-1 font-bold"
                    >
                      {edge.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* RENDER NODES OVERLAY */}
            {graphData.nodes.map((node) => {
              const pos = nodePositions[node.id] || { x: 150, y: 150 };
              const isSelected = selectedNode?.id === node.id;
              const matchesSearch = searchQuery === "" || node.label.toLowerCase().includes(searchQuery.toLowerCase());

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`absolute w-36 px-2.5 py-1.5 border-2 rounded-lg font-mono text-[10px] cursor-pointer shadow-lg transition-all ${getNodeColor(node.type, node.riskLevel)} ${
                    isSelected ? "ring-2 ring-blue-500 scale-105 border-slate-100 z-10" : "opacity-85 hover:opacity-100 hover:scale-102"
                  } ${!matchesSearch ? "opacity-25" : ""}`}
                  style={{ left: pos.x, top: pos.y }}
                >
                  <div className="flex items-center justify-between text-[8px] text-slate-500 font-bold uppercase tracking-tight">
                    <span>{node.type}</span>
                    <span className={node.riskLevel === "Critical" || node.riskLevel === "High" ? "text-red-400" : "text-slate-400"}>
                      {node.riskLevel[0]}
                    </span>
                  </div>
                  <div className="font-semibold text-slate-100 truncate mt-0.5">{node.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE PANEL: ENTITY PROPERTIES DETAILS DRAWER */}
        <div className="lg:col-span-1 bg-[#0f172a] flex flex-col h-full overflow-y-auto">
          <div className="p-4 border-b border-[#1e293b] bg-[#020617]/50 flex items-center justify-between">
            <h3 className="text-xs font-bold font-mono tracking-wider text-slate-300 uppercase flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-400" /> Element Attribute Matrix
            </h3>
            {selectedNode && (
              <button onClick={() => setSelectedNode(null)} className="text-slate-500 hover:text-slate-300"><X className="w-3.5 h-3.5" /></button>
            )}
          </div>

          <div className="p-4 flex-1 space-y-4">
            {selectedNode ? (
              <div className="space-y-4">
                {/* Visual identity wrapper */}
                <div className="bg-[#020617] border border-[#1e293b] p-3 rounded-lg font-mono">
                  <div className="text-[9px] text-slate-500 uppercase font-bold">{selectedNode.type} Node Definition</div>
                  <div className="text-xs font-bold text-slate-100 mt-1">{selectedNode.label}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase border ${
                      selectedNode.riskLevel === "Critical" ? "bg-red-950 text-red-400 border-red-800/40" :
                      selectedNode.riskLevel === "High" ? "bg-orange-950 text-orange-400 border-orange-800/30" :
                      "bg-slate-800 text-slate-400 border-slate-700"
                    }`}>
                      {selectedNode.riskLevel} Threat
                    </span>
                  </div>
                </div>

                {/* Properties fields hash mapping list */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Relational Properties:</span>
                  <div className="bg-[#020617]/60 border border-slate-800 rounded-lg p-2.5 font-mono text-xs space-y-2">
                    {Object.entries(selectedNode.properties).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-slate-800/40 pb-1 last:border-b-0 last:pb-0">
                        <span className="text-slate-500 text-[10px]">{key}:</span>
                        <span className="text-slate-200 text-right font-medium truncate max-w-[150px]" title={String(value)}>
                          {String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Custom Action router cross links */}
                <div className="pt-2 font-mono text-xs">
                  {selectedNode.type === "Customer" && (
                    <Link href={`/customers/${selectedNode.properties["ID"] || "CUST-10452"}`} className="w-full text-center block px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors">
                      Audit Customer Ledger Record
                    </Link>
                  )}
                  {selectedNode.type === "Transaction" && (
                    <Link href={`/transactions/TXN-2026-001`} className="w-full text-center block px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors">
                      Audit Transaction Ledger Block
                    </Link>
                  )}
                  {selectedNode.type === "Account" && (
                    <div className="text-[10px] text-slate-500 p-2 bg-slate-900 rounded border border-slate-800/80 leading-relaxed font-sans">
                      Account node automatically links to <strong> Sarah Jenkins</strong>. Discovered 12 concurrent initiated swipes this billing cycle.
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-40 flex items-center justify-center text-center p-4 text-slate-600 font-mono text-xs">
                Select any topology node on the graph canvas to inspect its cross-linked semantic attributes.
              </div>
            )}
          </div>

          {/* Graph Legend Panel footer info */}
          <div className="p-3 border-t border-[#1e293b] bg-[#020617]/30 font-mono text-[9px] text-slate-500 space-y-1">
            <div className="font-bold uppercase mb-1">Topology Legend Reference</div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-blue-500"></span> Customer Node</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-slate-600"></span> Bank Account</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-orange-500"></span> Transaction</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-purple-500"></span> Hardware Token</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
