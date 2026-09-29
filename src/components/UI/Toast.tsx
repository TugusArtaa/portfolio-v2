"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, AlertCircle, AlertTriangle, Info } from "lucide-react";

/* Hallmark · component: toast-system · genre: apple-dynamic-island / sf-symbols
 * layout: centered top floating capsule with glassmorphic depth & tactile spring physics
 * features: bare Apple SF glyphs, web audio chimes, swipe-up to dismiss
 */

// Subtle Apple-style chime using Web Audio API (offline-safe, no external assets needed)
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
      // Pleasant high-pitch Apple haptic chime (F#5 -> C#6)
      osc.frequency.setValueAtTime(739.99, now);
      osc.frequency.exponentialRampToValueAtTime(1108.73, now + 0.12);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === "error") {
      // Soft gentle low warning tone (A3 -> E3)
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(164.81, now + 0.16);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === "warning") {
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(554.37, now + 0.12);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else {
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.12);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    }
  } catch {
    // Gracefully ignore audio errors so application never crashes
  }
}

export interface Toast {
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

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: Toast = { ...toast, id };

      setToasts((prev) => [...prev, newToast]);

      // Play soft chime
      playNotificationSound(toast.type);

      // Auto remove
      const timeout = setTimeout(() => {
        removeToast(id);
      }, toast.duration || 4500);

      return () => clearTimeout(timeout);
    },
    [removeToast]
  );

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
    <div className="fixed top-5 sm:top-6 inset-x-0 z-[9999] pointer-events-none flex flex-col items-center gap-2.5 px-4 max-w-lg mx-auto">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({
  toast,
  onClose,
}: {
  toast: Toast;
  onClose: () => void;
}) {
  const getIconConfig = () => {
    switch (toast.type) {
      case "success":
        return {
          icon: <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />,
        };
      case "error":
        return {
          icon: <AlertCircle className="w-4 h-4 text-rose-400 stroke-[2.2]" />,
        };
      case "warning":
        return {
          icon: <AlertTriangle className="w-4 h-4 text-amber-400 stroke-[2.2]" />,
        };
      default:
        return {
          icon: <Info className="w-4 h-4 text-sky-400 stroke-[2.2]" />,
        };
    }
  };

  const config = getIconConfig();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -24, scale: 0.9, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -16, scale: 0.92, filter: "blur(4px)" }}
      transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.8 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.5, bottom: 0.1 }}
      onDragEnd={(_, info) => {
        if (info.offset.y < -20) {
          onClose();
        }
      }}
      className="pointer-events-auto group relative w-full sm:w-auto inline-flex items-center gap-3 pl-4 pr-3 py-2.5 sm:py-3 rounded-2xl sm:rounded-full bg-zinc-950/92 hover:bg-zinc-950 text-white backdrop-blur-2xl border border-white/[0.12] shadow-[0_16px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.06)] transition-colors select-none cursor-grab active:cursor-grabbing"
    >
      {/* Bare Apple SF Glyph without enclosing circle */}
      <div className="shrink-0 flex items-center justify-center">
        {config.icon}
      </div>

      {/* Text Content */}
      <div className="flex-1 sm:flex-initial min-w-0 flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 text-left pr-1">
        <span className="font-semibold text-xs sm:text-[13px] text-white tracking-tight leading-tight">
          {toast.title}
        </span>
        {toast.message && (
          <>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-zinc-600 shrink-0" />
            <span className="text-[11px] sm:text-xs text-zinc-400 font-normal leading-tight break-words sm:truncate sm:max-w-xs">
              {toast.message}
            </span>
          </>
        )}
      </div>

      {/* Dismiss Button */}
      <button
        type="button"
        onClick={onClose}
        className="p-1 rounded-full text-zinc-500 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer ml-auto sm:ml-1"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}
export default ToastProvider;
