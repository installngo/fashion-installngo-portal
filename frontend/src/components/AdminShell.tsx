"use client";

import { useState } from "react";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 pt-14">
        <div className="fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64">
          <Sidebar
            sidebarOpen={sidebarOpen}
            closeSidebar={() => setSidebarOpen(false)}
          />
        </div>

        <main className="flex-1 ml-55 p-4 md:p-6 bg-[var(--color-background)] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
