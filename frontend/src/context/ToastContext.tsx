"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string; // changed to string for unique keys
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = "info") => {
    const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`; // unique id
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const getBgColor = (type: ToastType) => {
    switch (type) {
      case "success":
        return "bg-[#4CAF50]"; // soft green
      case "error":
        return "bg-[#F56565]"; // soft red
      case "info":
      default:
        return "bg-[#4299E1]"; // soft blue
    }
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed top-4 md:top-6 right-4 md:right-6 flex flex-col gap-3 z-50">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`${getBgColor(
                toast.type
              )} px-4 sm:px-5 py-2 sm:py-3 rounded-xl shadow-lg text-white font-medium text-xs sm:text-sm max-w-[16rem] sm:max-w-xs flex justify-between items-center`}
            >
              <span>{toast.message}</span>
              <button
                className="ml-2 text-white opacity-80 hover:opacity-100 text-sm font-bold"
                onClick={() => removeToast(toast.id)}
              >
                ×
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};