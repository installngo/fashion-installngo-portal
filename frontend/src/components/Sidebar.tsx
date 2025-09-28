"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Users, Settings } from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: Home },
  { name: "Courses", path: "/admin/courses", icon: BookOpen },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

interface SidebarProps {
  sidebarOpen: boolean;
  closeSidebar: () => void;
}

export default function Sidebar({ sidebarOpen, closeSidebar }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={`transition-transform duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
      style={{ height: "calc(100vh - 4.5rem)" }}
    >
      <aside className="bg-[var(--color-primary)] text-white rounded-xl shadow-[var(--card-shadow)] m-4 md:m-2 mb-4 w-64 h-full flex flex-col" style={{ width: "200px" }}>
        {/* Navigation (scrollable) */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-2 py-2 rounded-md font-medium transition-colors truncate ${
                  active
                    ? "bg-white text-[var(--color-primary)]"
                    : "hover:bg-white/20"
                }`}
              >
                <Icon size={18} />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer (always pinned) */}
        <div className="border-t border-white/20 p-4 text-sm text-white/70">
          v1.0.0
        </div>
      </aside>
    </div>
  );
}
