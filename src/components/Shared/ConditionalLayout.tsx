"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Shared/Navbar";
import { Footer } from "@/components/Shared/Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAbout = pathname.startsWith("/about");
  const isProjects = pathname.startsWith("/projects");
  const isContact = pathname.startsWith("/contact");
  const isValidPublicRoute = isHome || isAbout || isProjects || isContact;

  // If on a 404 / not found / unknown page, render clean standalone content without header or footer
  if (!isValidPublicRoute) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Navbar: z-50 but NOT relative so the absolute-positioned header spans full viewport */}
      <div className="z-50">
        <Navbar />
      </div>
      {/* Main container: Edge-to-edge w-full like wildan.pics */}
      <main className="relative w-full bg-background text-foreground overflow-x-clip">
        {children}
      </main>
      {!isHome && (
        <div className="relative z-[70]">
          <Footer />
        </div>
      )}
    </>
  );
}

