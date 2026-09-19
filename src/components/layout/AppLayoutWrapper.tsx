"use strict";

"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export default function AppLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#020617]">
      {/* Sidebar navigation panel */}
      <Sidebar className="flex-shrink-0" />

      {/* Main console content viewport */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar />

        {/* Scrollable interior stage */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#020617]">
          {children}
        </main>
      </div>
    </div>
  );
}
