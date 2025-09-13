"use client";

import { useTranslation } from "../context/TranslationContext";

export default function LanguageSelector() {
  const { currentLang, setCurrentLang } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value as "english" | "tamil" | "hindi";
    setCurrentLang(selectedLang);
  };

  return (
    <select
      value={currentLang}
      onChange={handleChange}
      style={{ padding: "0.25rem 0.5rem", borderRadius: "0.25rem" }}
    >
      <option value="english">English</option>
      <option value="tamil">தமிழ்</option>
      <option value="hindi">हिंदी</option>
    </select>
  );
}
