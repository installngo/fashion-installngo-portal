"use client";

import { useAuth } from "@/context/AuthContext";
import { Settings } from "lucide-react";

interface TopbarProps {
  toggleSidebar?: () => void;
}

export default function Topbar({ toggleSidebar }: TopbarProps) {
  const { organizationName } = useAuth();

  // Fallback initials if org name is missing
  const initials = organizationName
    ? organizationName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "ORG";

  return (
    <header
      className="fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-4 sm:px-6
      shadow-md z-50 bg-[var(--color-primary)] text-[var(--color-text-inverse)]"
    >
      {/* Left: Logo + Mobile Hamburger */}
      <div className="flex items-center space-x-2">
        {/* Hamburger only on mobile */}
        {toggleSidebar && (
          <button
            className="md:hidden p-2 rounded hover:bg-white/20 transition"
            onClick={toggleSidebar}
          >
            ☰
          </button>
        )}
        <h3 className="text-white font-semibold text-sm sm:text-base">
          Fashion
        </h3>
      </div>

      {/* Right: Organization Info */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Organization name: hidden on very small screens */}
        <h2 className="text-white font-semibold text-sm md:text-base truncate max-w-[500px] sm:max-w-[200px]">
          {organizationName || "Organization"}
        </h2>

        {/* Settings Icon in white circle */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center text-[var(--color-primary)] cursor-pointer">
          <Settings size={18} className="sm:w-5 sm:h-5" />
        </div>
      </div>
    </header>
  );
}