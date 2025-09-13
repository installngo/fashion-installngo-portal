"use client";

import { useTranslation } from "../context/TranslationContext";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <section className="text-center px-6 py-12 flex flex-col items-center gap-2">
        <h1> {t("welcomeTitle")} </h1>
        <h3> {t("welcomeSubtitle")} </h3>

        <div className="flex flex-row gap-3 justify-center items-center mt-3">
          <a href="/login" className="btn-primary w-30">
            {t("login")}
          </a>
          <a href="/signup" className="btn-primary w-30">
            {t("signup")}
          </a>
        </div>
      </section>

      <footer className="absolute bottom-4 text-sm opacity-70">
        © {new Date().getFullYear()} Installngo. {t("rightsReserved")}
      </footer>
    </main>
  );
}
