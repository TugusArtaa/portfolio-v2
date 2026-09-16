"use client";

import type React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Shared/Navbar";
import { Footer } from "@/components/Shared/Footer";
import GridBackground from "@/components/UI/GridBackground";
import { useLoading } from "@/context/LoadingContext";
import { useEffect, useRef } from "react";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { stopLoading } = useLoading();
  const prevPath = useRef<string>("");

  useEffect(() => {
    if (prevPath.current && prevPath.current !== pathname) {
      stopLoading();
    }
    prevPath.current = pathname;
  }, [pathname]);

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
