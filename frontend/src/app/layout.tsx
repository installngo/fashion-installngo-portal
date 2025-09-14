import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { TranslationProvider } from "../context/TranslationContext";
import LanguageSelector from "../components/LanguageSelector";
import { AuthProvider } from "../context/AuthContext";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "InstallNGo - Fashion",
  description: "Fashion InstallNGo Admin Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ThemeProvider>
          <TranslationProvider>
            <AuthProvider> {/* <- Wrap children with AuthProvider */}
              {children}
              <footer
                style={{
                  padding: "1rem",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                }}
              >
                <LanguageSelector />
                <ThemeSwitcher />
              </footer>
            </AuthProvider>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}