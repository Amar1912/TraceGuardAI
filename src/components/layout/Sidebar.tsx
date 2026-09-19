"use strict";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  LayoutDashboard,
  AlertOctagon,
  Eye,
  Users,
  CreditCard,
  Network,
  BarChart3,
  Settings
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className = "" }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Fraud Cases", href: "/cases", icon: AlertOctagon },
    { name: "Investigations", href: "/investigations/CASE-2026-001", icon: Eye, badge: "Active" },
    { name: "Graph Explorer", href: "/graph", icon: Network },
    { name: "Customers", href: "/customers/CUST-10452", icon: Users },
    { name: "Transactions", href: "/transactions/TXN-2026-001", icon: CreditCard },
    { name: "Reports", href: "#", icon: BarChart3, disabled: true },
    { name: "Settings", href: "/settings", icon: Settings }
  ];

  const isActive = (href: string) => {
    if (href === "#") return false;
    if (href === "/dashboard" && (pathname === "/" || pathname === "/dashboard")) return true;
    return pathname.startsWith(href) && href !== "/dashboard";
  };

  return (
    <aside className={`w-64 bg-[#0a0f1d] border-r border-[#1e293b] flex flex-col min-h-screen text-slate-200 relative shadow-[0_0_20px_rgba(59,130,246,0.05)] ${className}`}>
      {/* Brand Header */}
      <div className="h-16 flex flex-col justify-center px-6 border-b border-[#1e293b] relative bg-[#020617]/80">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <Shield className="w-5 h-5 text-cyan-400 fill-cyan-400/10 filter drop-shadow-[0_0_4px_rgba(34,211,238,0.4)]" />
            <span className="absolute w-1.5 h-1.5 bg-blue-500 rounded-full top-0.5 right-0.5 animate-pulse"></span>
          </div>
          <span className="font-bold text-base tracking-wider text-slate-50 font-mono filter drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
            TRACEGUARDAI
          </span>
        </div>
        <div className="text-[8px] font-mono text-slate-500 tracking-widest uppercase mt-0.5 pl-7">
          TRUST THROUGH INTELLIGENCE
        </div>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 px-3 py-4 space-y-1 bg-[#020617]/20">
        {menuItems.map((item, idx) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          if (item.disabled) {
            return (
              <div
                key={idx}
                className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 cursor-not-allowed select-none font-mono"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 opacity-40" />
                  <span>{item.name}</span>
                </div>
                <span className="text-[8px] bg-slate-900 border border-slate-800 px-1 py-0.2 rounded text-slate-600 tracking-tight">SOON</span>
              </div>
            );
          }

          return (
            <Link
              key={idx}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 text-xs font-mono font-medium rounded-md transition-all relative ${
                active
                  ? "bg-gradient-to-r from-blue-600/15 to-purple-600/5 text-cyan-400 border-l-2 border-cyan-400 shadow-[inset_0_0_8px_rgba(34,211,238,0.05)] pl-2.5"
                  : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${active ? "text-cyan-400 filter drop-shadow-[0_0_3px_rgba(34,211,238,0.5)]" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="text-[8px] bg-red-950/60 text-red-400 border border-red-500/30 px-1.5 py-0.2 rounded font-bold uppercase tracking-wide">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Futuristic Bottom Motto Section */}
      <div className="p-4 border-t border-[#1e293b] bg-[#020617]/40 space-y-3 font-mono">
        <div className="grid grid-cols-2 gap-1 text-[9px] text-slate-500 uppercase tracking-widest font-bold">
          <div className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-cyan-500"></span> Detect</div>
          <div className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-blue-500"></span> Connect</div>
          <div className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-purple-500"></span> Investigate</div>
          <div className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-emerald-500"></span> Prevent</div>
        </div>
        <div className="text-[9px] text-slate-400 text-center font-medium border-t border-slate-900 pt-2 opacity-80">
          “A Safer Financial Tomorrow”
        </div>
      </div>
    </aside>
  );
}
