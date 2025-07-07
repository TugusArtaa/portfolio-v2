"use client";

import type React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import GridBackground from "@/components/ui/grid-background";
import { useLoading } from "@/context/LoadingContext";
import { useEffect, useRef } from "react";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const { stopLoading } = useLoading();
  const prevPath = useRef<string>("");

  useEffect(() => {
    if (!isAdminRoute && prevPath.current && prevPath.current !== pathname) {
      stopLoading();
    }
    prevPath.current = pathname;
  }, [pathname]);

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950">{children}</div>
    );
  }

  return (
    <>
      {/* Grid Background*/}
      <GridBackground />

      {/* Content */}
      <div className="relative z-10">
        <Navbar className="" />
        <main className="px-4">{children}</main>
        <Footer />
      </div>
    </>
  );
}
