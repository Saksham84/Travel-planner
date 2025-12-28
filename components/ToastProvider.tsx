"use client";

import { createContext, useContext, useState } from "react";
import Toast from "./Toast";

type ToastType = "success" | "error" | "warning";

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  const showToast = (
    message: string,
    type: ToastType = "success"
  ) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000); // auto close
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return ctx;
};
