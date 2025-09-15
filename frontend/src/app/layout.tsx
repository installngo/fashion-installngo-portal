import type { Metadata } from "next";
import "./globals.css";
import { LoadingProvider } from "../context/LoadingContext";
import { ToastProvider } from "../context/ToastContext";
import { ThemeProvider } from "../context/ThemeContext";
import { TranslationProvider } from "../context/TranslationContext";
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
    <html
      lang="en"
      className={inter.className}
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <body>
        <LoadingProvider>
          <ToastProvider>
            <ThemeProvider>
              <TranslationProvider>
                <AuthProvider>{children}</AuthProvider>
              </TranslationProvider>
            </ThemeProvider>
          </ToastProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
