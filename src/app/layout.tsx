"use client";

import "@/styles/globals.css";
import React, { ReactNode } from "react";
import ConditionalLayout from "@/components/Shared/ConditionalLayout";
import { ToastProvider } from "@/components/UI/Toast";
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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LoadingProvider>
          <GlobalLoading />
          {/* Provider untuk notifikasi toast */}
          <ToastProvider>
            {/* Layout bersyarat untuk halaman tertentu */}
            <ConditionalLayout>{children}</ConditionalLayout>
          </ToastProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
