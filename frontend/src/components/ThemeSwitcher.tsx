"use client";

import { useTheme, Theme } from "../context/ThemeContext";

export default function ThemeSwitcher() {
  const { currentTheme, setTheme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as Theme);
  };

  return (
    <select
      value={currentTheme}
      onChange={handleChange}
      style={{
        padding: "0.25rem 0.5rem",
        borderRadius: "0.25rem",
        border: "1px solid #ccc",
      }}
    >
      <option value="default">Default</option>
      <option value="dark">Dark</option>
    </select>
  );
}
