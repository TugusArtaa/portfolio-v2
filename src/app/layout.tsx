"use client";

import "@/styles/globals.css";
import React, { ReactNode } from "react";
import ConditionalLayout from "@/components/shared/ConditionalLayout";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/components/ui/toast";
import { LoadingProvider, useLoading } from "@/context/LoadingContext";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { AnimatePresence } from "framer-motion";

function GlobalLoading() {
  const { isLoading } = useLoading();

  return (
    <AnimatePresence mode="wait">
      {isLoading && <LoadingScreen key="loading" />}
    </AnimatePresence>
  );
}

// Root layout untuk seluruh aplikasi
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>
        <LoadingProvider>
          <GlobalLoading />
          {/* Provider untuk tema dark/light */}
          <ThemeProvider>
            {/* Provider untuk notifikasi toast */}
            <ToastProvider>
              {/* Layout bersyarat untuk halaman tertentu */}
              <ConditionalLayout>{children}</ConditionalLayout>
            </ToastProvider>
          </ThemeProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
