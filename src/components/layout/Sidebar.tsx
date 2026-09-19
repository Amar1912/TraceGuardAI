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
    { name: "Graph Explorer", href: "/graph", icon: Network },
    { name: "Customers", href: "/customers/CUST-10452", icon: Users, label: "Sarah J." },
    { name: "Transactions", href: "/transactions/TXN-2026-001", icon: CreditCard, label: "TXN-001" },
    { name: "Investigations", href: "/investigations/CASE-2026-001", icon: Eye, badge: "Active" },
    { name: "Reports", href: "#", icon: BarChart3, disabled: true },
    { name: "Settings", href: "/settings", icon: Settings }
  ];

  const isActive = (href: string) => {
    if (href === "#") return false;
    if (href === "/dashboard" && (pathname === "/" || pathname === "/dashboard")) return true;
    return pathname.startsWith(href) && href !== "/dashboard";
  };

  return (
    <aside className={`w-64 bg-[#0f172a] border-r border-[#1e293b] flex flex-col min-h-screen text-slate-200 ${className}`}>
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-[#1e293b] gap-2">
        <Shield className="w-6 h-6 text-blue-500 fill-blue-500/10" />
        <span className="font-semibold text-lg tracking-wider text-slate-50 font-mono">
          GraphShield <span className="text-blue-400">AI</span>
        </span>
      </div>

      {/* Profile summary quick link */}
      <div className="p-4 border-b border-[#1e293b] bg-[#020617]/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
            AN
          </div>
          <div>
            <div className="text-xs font-medium text-slate-200">Analyst Mode</div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
              Agent Core Live
            </div>
          </div>
        </div>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item, idx) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          if (item.disabled) {
            return (
              <div
                key={idx}
                className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-500 cursor-not-allowed select-none"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-500 uppercase tracking-tight">Soon</span>
              </div>
            );
          }

          return (
            <Link
              key={idx}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-md transition-colors ${
                active
                  ? "bg-blue-600/15 text-blue-400 border-l-2 border-blue-500 pl-2.5"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${active ? "text-blue-400" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="text-[9px] bg-red-900/30 text-red-400 border border-red-500/20 px-1.5 py-0.5 rounded-full font-semibold font-mono">
                  {item.badge}
                </span>
              )}
              {item.label && (
                <span className="text-[10px] text-slate-500 font-mono">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer System Status */}
      <div className="p-4 border-t border-[#1e293b] bg-[#020617]/20 text-[10px] text-slate-500 font-mono space-y-1">
        <div>Platform: v1.0.4-mock</div>
        <div>Engine Status: <span className="text-emerald-500">Synced</span></div>
      </div>
    </aside>
  );
}
