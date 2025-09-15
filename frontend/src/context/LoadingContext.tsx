"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
  isLoading: boolean;
  show: () => void;
  hide: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const show = () => setIsLoading(true);
  const hide = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, show, hide }}>
      {children}
      {isLoading && <Loader />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
};

// Loader Component
const Loader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
    <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
  </div>
);
