"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Theme = "default" | "dark";

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>("default");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme && ["default", "dark"].includes(savedTheme)) {
      setCurrentTheme(savedTheme);
    } else {
      localStorage.setItem("theme", "default");
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      document.documentElement.setAttribute("data-theme", currentTheme);
      localStorage.setItem("theme", currentTheme);
    }
  }, [currentTheme, isReady]);

  const updateTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem("theme", theme);
  };

  if (!isReady) return null; // ✅ Prevent flicker

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}