"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { useSound } from "react-sounds";

interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };

    setToasts((prev) => [...prev, newToast]);

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

function ToastContainer() {
  const { toasts, removeToast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Desktop/Tablet Container */}
      <div className="absolute top-4 right-4 w-full max-w-sm space-y-3 hidden sm:block">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* Mobile Container */}
      <div className="absolute top-4 left-4 right-4 space-y-3 sm:hidden">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
            mobile
          />
        ))}
      </div>
    </div>
  );
}

function ToastItem({
  toast,
  onClose,
  mobile = false,
}: {
  toast: Toast;
  onClose: () => void;
  mobile?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  // Sound hooks for each notification type
  const { play: playSuccess } = useSound("notification/completed");
  const { play: playError } = useSound("notification/error");
  const { play: playInfo } = useSound("notification/info");
  const { play: playWarning } = useSound("notification/warning");

  useEffect(() => {
    if (isVisible) return;
    const timer = setTimeout(() => setIsVisible(true), 50);
    // Play sound after a short delay
    setTimeout(() => {
      switch (toast.type) {
        case "success":
          playSuccess();
          break;
        case "error":
          playError();
          break;
        case "warning":
          playWarning();
          break;
        case "info":
        default:
          playInfo();
          break;
      }
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), 50);

    // Progress bar animation
    const duration = toast.duration || 5000;
    const interval = 50;
    const decrement = (interval / duration) * 100;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - decrement;
        if (newProgress <= 0) {
          clearInterval(progressTimer);
          return 0;
        }
        return newProgress;
      });
    }, interval);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, [toast.duration]);

  const getToastStyles = () => {
    switch (toast.type) {
      case "success":
        return {
          bg: "bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 dark:from-emerald-900/20 dark:via-green-900/20 dark:to-emerald-900/20",
          border: "border-emerald-200/60 dark:border-emerald-700/50",
          iconBg: "bg-emerald-500",
          progressBar: "bg-gradient-to-r from-emerald-400 to-emerald-500",
          icon: "text-white",
          iconPath: "M5 13l4 4L19 7",
          shadow: "shadow-emerald-500/10 dark:shadow-emerald-500/20",
        };
      case "error":
        return {
          bg: "bg-gradient-to-r from-red-50 via-rose-50 to-red-50 dark:from-red-900/20 dark:via-rose-900/20 dark:to-red-900/20",
          border: "border-red-200/60 dark:border-red-700/50",
          iconBg: "bg-red-500",
          progressBar: "bg-gradient-to-r from-red-400 to-red-500",
          icon: "text-white",
          iconPath: "M6 18L18 6M6 6l12 12",
          shadow: "shadow-red-500/10 dark:shadow-red-500/20",
        };
      case "warning":
        return {
          bg: "bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 dark:from-amber-900/20 dark:via-yellow-900/20 dark:to-amber-900/20",
          border: "border-amber-200/60 dark:border-amber-700/50",
          iconBg: "bg-amber-500",
          progressBar: "bg-gradient-to-r from-amber-400 to-amber-500",
          icon: "text-white",
          iconPath:
            "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z",
          shadow: "shadow-amber-500/10 dark:shadow-amber-500/20",
        };
      default:
        return {
          bg: "bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-blue-900/20",
          border: "border-blue-200/60 dark:border-blue-700/50",
          iconBg: "bg-blue-500",
          progressBar: "bg-gradient-to-r from-blue-400 to-blue-500",
          icon: "text-white",
          iconPath: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
          shadow: "shadow-blue-500/10 dark:shadow-blue-500/20",
        };
    }
  };

  const styles = getToastStyles();

  const baseClasses = `
    relative border rounded-lg overflow-hidden pointer-events-auto
    transform transition-all duration-500 ease-out
    bg-white dark:bg-slate-950
    ${styles.border} ${styles.shadow}
    ${mobile ? "mx-auto max-w-md shadow-lg" : "w-full shadow-md"}
    ${
      isVisible
        ? "translate-x-0 opacity-100 scale-100"
        : mobile
        ? "translate-y-[-100%] opacity-0 scale-95"
        : "translate-x-full opacity-0 scale-95"
    }
    hover:scale-[1.01] hover:shadow-md
    group
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <div className={baseClasses}>
      {/* Close Button (X) */}
      <button
        onClick={onClose}
        className={`
          absolute top-2 right-2 z-10
          flex-shrink-0 rounded-full
          hover:bg-slate-100/80 dark:hover:bg-slate-800/80
          active:scale-95
          p-1
        `}
        aria-label="Close"
        tabIndex={0}
      >
        <svg
          className={`
            text-slate-400 hover:text-slate-600 dark:hover:text-slate-300
            transition-colors duration-200
            w-4 h-4
          `}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div
        className={
          mobile
            ? "p-3 sm:p-4 flex items-center"
            : "p-3 lg:p-4 flex items-center"
        }
      >
        {/* Icon */}
        <div
          className={`
            ${styles.iconBg}
            rounded-full flex items-center justify-center
            ${mobile ? "w-6 h-6 mr-3" : "w-7 h-7 mr-3"}
            flex-shrink-0
          `}
        >
          <svg
            className={`${styles.icon} ${mobile ? "w-3.5 h-3.5" : "w-4 h-4"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={styles.iconPath}
            />
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4
            className={`
              font-bold text-slate-900 dark:text-white leading-tight
              ${mobile ? "text-xs" : "text-sm"}
            `}
          >
            {toast.title}
          </h4>
          {toast.message && (
            <p
              className={`
                text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed
                ${mobile ? "text-[10px]" : "text-xs"}
              `}
            >
              {toast.message}
            </p>
          )}
        </div>
      </div>
      {/* Progress Bar */}
      <div className="w-full h-1 bg-slate-200/30 dark:bg-slate-700/30">
        <div
          className={`h-full transition-all duration-75 ease-linear rounded-r-full ${styles.progressBar}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
