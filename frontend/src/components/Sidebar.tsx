"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Courses", path: "/admin/courses" },
  { name: "Users", path: "/admin/users" },
  { name: "Settings", path: "/admin/settings" },
];

interface SidebarProps {
  sidebarOpen: boolean;
  closeSidebar: () => void;
}

export default function Sidebar({ sidebarOpen, closeSidebar }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      />

      <aside
        className={`fixed top-16 left-6 bottom-6 w-60 bg-white rounded-2xl shadow-lg z-50 transform transition-transform
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:top-0 md:left-0 md:bottom-0 md:translate-x-0 md:rounded-none md:shadow-none`}
      >
        <nav className="flex flex-col p-4 space-y-2 h-full overflow-auto">
          {navItems.map((item) => {
            const active = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  active
                    ? "bg-[var(--color-primary)] text-[var(--color-text-inverse)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background)] hover:text-[var(--color-primary)]"
                }`}
                onClick={closeSidebar}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
