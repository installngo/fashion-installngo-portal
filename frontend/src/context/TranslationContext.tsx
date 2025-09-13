"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import english from "../locales/english.json";
import tamil from "../locales/tamil.json";
import hindi from "../locales/hindi.json";

type Language = "english" | "tamil" | "hindi";

const translations: Record<Language, Record<string, string>> = {
  english,
  tamil,
  hindi,
};

interface TranslationContextType {
  currentLang: Language;
  setCurrentLang: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language>("english");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as Language | null;
    if (savedLang && ["english", "tamil", "hindi"].includes(savedLang)) {
      setCurrentLang(savedLang);
    } else {
      localStorage.setItem("lang", "english");
    }
    setIsReady(true);
  }, []);

  const updateLang = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem("lang", lang);
  };

  const t = (key: string) => translations[currentLang]?.[key] || key;

  if (!isReady) return null; // ✅ Prevent flicker

  return (
    <TranslationContext.Provider value={{ currentLang, setCurrentLang: updateLang, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) throw new Error("useTranslation must be used within TranslationProvider");
  return context;
}