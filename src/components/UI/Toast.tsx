"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
// Audio notification helper via native Web Audio API (offline-safe, no external CDN fetch)
export function playNotificationSound(type: "success" | "error" | "warning" | "info") {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === "success") {
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
    } else if (type === "error") {
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.2);
    } else if (type === "warning") {
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(554.37, now + 0.15);
    } else {
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.15);
    }

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

    osc.start(now);
    osc.stop(now + 0.25);
  } catch {
    // Gracefully ignore audio errors so application never crashes
  }
}

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

  useEffect(() => {
    if (isVisible) return;
    const timer = setTimeout(() => setIsVisible(true), 50);
    // Play sound after a short delay
    const soundTimer = setTimeout(() => {
      playNotificationSound(toast.type);
    }, 60);
    return () => {
      clearTimeout(timer);
      clearTimeout(soundTimer);
    };
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
          bg: "bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50",
          border: "border-emerald-200/60",
          iconBg: "bg-emerald-500",
          progressBar: "bg-gradient-to-r from-emerald-400 to-emerald-500",
          icon: "text-white",
          iconPath: "M5 13l4 4L19 7",
          shadow: "shadow-emerald-500/10",
        };
      case "error":
        return {
          bg: "bg-gradient-to-r from-red-50 via-rose-50 to-red-50",
          border: "border-red-200/60",
          iconBg: "bg-red-500",
          progressBar: "bg-gradient-to-r from-red-400 to-red-500",
          icon: "text-white",
          iconPath: "M6 18L18 6M6 6l12 12",
          shadow: "shadow-red-500/10",
        };
      case "warning":
        return {
          bg: "bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50",
          border: "border-amber-200/60",
          iconBg: "bg-amber-500",
          progressBar: "bg-gradient-to-r from-amber-400 to-amber-500",
          icon: "text-white",
          iconPath:
            "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z",
          shadow: "shadow-amber-500/10",
        };
      default:
        return {
          bg: "bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50",
          border: "border-blue-200/60",
          iconBg: "bg-blue-500",
          progressBar: "bg-gradient-to-r from-blue-400 to-blue-500",
          icon: "text-white",
          iconPath: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
          shadow: "shadow-blue-500/10",
        };
    }
  };

  const styles = getToastStyles();

  const baseClasses = `
    relative border rounded-lg overflow-hidden pointer-events-auto
    transform transition-all duration-500 ease-out
    bg-white
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
          hover:bg-slate-100/80
          active:scale-95
          p-1
        `}
        aria-label="Close"
        tabIndex={0}
      >
        <svg
          className={`
            text-slate-400 hover:text-slate-600
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
              font-bold text-slate-900 leading-tight
              ${mobile ? "text-xs" : "text-sm"}
            `}
          >
            {toast.title}
          </h4>
          {toast.message && (
            <p
              className={`
                text-slate-600 mt-0.5 leading-relaxed
                ${mobile ? "text-[10px]" : "text-xs"}
              `}
            >
              {toast.message}
            </p>
          )}
        </div>
      </div>
      {/* Progress Bar */}
      <div className="w-full h-1 bg-slate-200/30">
        <div
          className={`h-full transition-all duration-75 ease-linear rounded-r-full ${styles.progressBar}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
