"use client";

import { useState } from "react";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar */}
      <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 pt-14"> {/* pt-14 = Topbar height */}
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 p-4 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
