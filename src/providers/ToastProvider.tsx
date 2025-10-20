"use client";
import { ToastContainer } from "@/components/ui/Toast2";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

type ToastStatus = "pending" | "success" | "error";

interface ToastState {
  id: number;
  message: string;
  progress: number; // 0 to 100
  status: ToastStatus;
}

interface ToastContextType {
  toasts: ToastState[];
  addToast: (message: string) => number;
  updateToast: (id: number, updates: Partial<ToastState>) => void;
  removeToast: (id: number) => void;
}

// --- Hooks ---
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const nextId = useRef(1);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message: string): number => {
    const id = nextId.current++;
    const newToast: ToastState = {
      id,
      message,
      progress: 0,
      status: "pending",
    };
    setToasts((prev) => [...prev, newToast]);
    return id;
  }, []);

  const updateToast = useCallback(
    (id: number, updates: Partial<ToastState>) => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
      );
    },
    []
  );

  const contextValue = { toasts, addToast, updateToast, removeToast };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};
