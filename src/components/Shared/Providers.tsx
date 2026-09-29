"use client";

import React, { ReactNode } from "react";
import dynamic from "next/dynamic";
import { ToastProvider } from "@/components/UI/Toast";
import { TransitionProvider } from "@/context/TransitionContext";

// Dynamically import CurtainTransition with ssr: false to completely eliminate any hydration mismatch
const CurtainTransition = dynamic(
  () => import("@/components/UI/PageTransition/CurtainTransition"),
  { ssr: false }
);

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <TransitionProvider>
      {/* Wildan.pics-style 5-column shutter curtain & scramble text overlay */}
      <CurtainTransition />
      {/* Provider untuk notifikasi toast */}
      <ToastProvider>
        {children}
      </ToastProvider>
    </TransitionProvider>
  );
}
