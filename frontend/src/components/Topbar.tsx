"use client";

interface TopbarProps {
  toggleSidebar: () => void;
}

export default function Topbar({ toggleSidebar }: TopbarProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-4 md:px-6 shadow-md z-50 bg-[var(--color-primary)] text-[var(--color-text-inverse)]"
    >
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded hover:bg-white/20 transition"
          onClick={toggleSidebar}
        >
          ☰
        </button>
        <span className="font-bold text-lg">Fashion Installngo</span>
      </div>

      {/* Right: Profile */}
      <div className="flex items-center space-x-4">
        <span className="text-sm hidden sm:block">John Doe</span>
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[var(--color-primary)] font-bold">
          JD
        </div>
      </div>
    </header>
  );
}
