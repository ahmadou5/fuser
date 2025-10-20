// /components/Toast.tsx
"use client";
import React, { useEffect } from "react";
import { Download, CheckCircle, AlertTriangle, X } from "lucide-react";

// --- Types and Context ---
type ToastStatus = "pending" | "success" | "error";

interface ToastState {
  id: number;
  message: string;
  progress: number; // 0 to 100
  status: ToastStatus;
}

const getIcon = (status: ToastStatus) => {
  switch (status) {
    case "success":
      return <CheckCircle size={20} className="text-green-500" />;
    case "error":
      return <AlertTriangle size={20} className="text-red-500" />;
    default:
      return <Download size={20} className="text-blue-500 animate-bounce" />;
  }
};

const ToastItem: React.FC<{
  toast: ToastState;
  onDismiss: (id: number) => void;
}> = ({ toast, onDismiss }) => {
  const { id, message, progress, status } = toast;
  const isFinal = status === "success" || status === "error";

  // Auto-dismiss logic for final states
  useEffect(() => {
    if (isFinal) {
      const timer = setTimeout(() => onDismiss(id), 5000);
      return () => clearTimeout(timer);
    }
  }, [id, isFinal, onDismiss]);

  return (
    <div
      className={`
        relative overflow-hidden p-4 rounded-lg shadow-xl mb-3 
        bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-gray-700
        transition-all duration-300 ease-in-out
        transform ${isFinal ? "scale-105" : "scale-100"}
        ${isFinal ? "animate-pulse-final" : "animate-enter"}
      `}
      style={{
        width: "300px",
        // Optional: animate border color on status change
        borderColor:
          status === "success"
            ? "#10b981"
            : status === "error"
            ? "#ef4444"
            : "currentColor",
      }}
    >
      {/* Progress Bar (Only for pending) */}
      {status === "pending" && (
        <div
          className="absolute top-0 left-0 h-1 bg-blue-500/50 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getIcon(status)}
          <span
            className={`font-medium ${
              isFinal ? "text-lg" : "text-sm"
            } transition-all duration-300`}
          >
            {message}
          </span>
        </div>
        <button
          onClick={() => onDismiss(id)}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X size={16} />
        </button>
      </div>

      {/* CSS Animations (using style jsx for brevity, can be Tailwind classes) */}
      <style jsx>{`
        @keyframes enter {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pulse-final {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
          }
          50% {
            box-shadow: 0 0 10px 0
              ${status === "success"
                ? "#10b98140"
                : status === "error"
                ? "#ef444440"
                : "rgba(0, 0, 0, 0.1)"};
          }
          100% {
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
          }
        }
        .animate-enter {
          animation: enter 0.3s ease-out forwards;
        }
        .animate-pulse-final {
          animation: pulse-final 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export const ToastContainer: React.FC<{
  toasts: ToastState[];
  removeToast: (id: number) => void;
}> = ({ toasts, removeToast }) => (
  <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end pointer-events-none">
    {toasts.map((toast) => (
      <ToastItem key={toast.id} toast={toast} onDismiss={removeToast} />
    ))}
  </div>
);
