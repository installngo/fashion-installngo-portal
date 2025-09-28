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
        <Sidebar
          sidebarOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-4 md:p-6 bg-[var(--color-background)]">
          {children}
        </main>
      </div>
    </div>
  );
}