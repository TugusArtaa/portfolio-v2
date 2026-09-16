"use client";

import { signOut } from "next-auth/react";
import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserMenu from "./UserMenu";
import TimeDisplay from "./TimeDisplay";
import { useSidebar } from "./AdminSidebar";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { Session } from "next-auth";

interface AdminHeaderProps {
  session: Session;
}

export default function AdminHeader({ session }: AdminHeaderProps) {
  const { isCollapsed } = useSidebar();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [showLoading, setShowLoading] = useState(false);

  // Get page info based on pathname
  const getPageInfo = () => {
    if (pathname === "/admin/dashboard") {
      return {
        title: "Dashboard",
        subtitle: "Ringkasan dan overview sistem",
        icon: (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 5a2 2 0 012-2h4a2 2 0 012 2v1H8V5z"
            />
          </svg>
        ),
        breadcrumb: [{ name: "Dashboard", href: "/admin/dashboard" }],
      };
    } else if (pathname.startsWith("/admin/projects")) {
      const isNew = pathname.includes("/new");
      const isEdit = pathname.includes("/edit");
      return {
        title: isNew
          ? "Tambah Proyek"
          : isEdit
          ? "Edit Proyek"
          : "Manajemen Proyek",
        subtitle: isNew
          ? "Buat proyek baru"
          : isEdit
          ? "Edit detail proyek"
          : "Kelola semua proyek Anda",
        icon: (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        ),
        breadcrumb: [
          { name: "Dashboard", href: "/admin" },
          { name: "Proyek", href: "/admin/projects" },
          ...(isNew ? [{ name: "Tambah Proyek", href: pathname }] : []),
          ...(isEdit ? [{ name: "Edit Proyek", href: pathname }] : []),
        ],
      };
    } else if (pathname.startsWith("/admin/skills")) {
      return {
        title: "Manajemen Skills",
        subtitle: "Kelola keahlian dan kemampuan",
        icon: (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        ),
        breadcrumb: [
          { name: "Dashboard", href: "/admin" },
          { name: "Skills", href: "/admin/skills" },
        ],
      };
    } else if (pathname.startsWith("/admin/about")) {
      return {
        title: "Tentang Saya",
        subtitle: "Edit profil dan informasi personal",
        icon: (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        ),
        breadcrumb: [
          { name: "Dashboard", href: "/admin" },
          { name: "Tentang Saya", href: "/admin/about" },
        ],
      };
    } else if (pathname.startsWith("/admin/settings")) {
      return {
        title: "Pengaturan",
        subtitle: "Konfigurasi sistem dan preferensi",
        icon: (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        ),
        breadcrumb: [
          { name: "Dashboard", href: "/admin" },
          { name: "Pengaturan", href: "/admin/settings" },
        ],
      };
    }
    return {
      title: "Admin Panel",
      subtitle: "Kelola konten website Anda",
      icon: null,
      breadcrumb: [],
    };
  };

  const pageInfo = getPageInfo();

  const handleLogout = () => {
    setShowLoading(true);
    setTimeout(() => {
      signOut({ callbackUrl: "/" });
    }, 4000);
  };

  if (showLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <header
        className={`sticky top-0 z-10 h-[73px] bg-white/80 backdrop-blur-xl border-b border-black/10 ${
          isCollapsed ? "left-16" : "left-64"
        } lg:left-${isCollapsed ? "16" : "64"}`}
      >
        <div className="px-4 lg:px-6 h-full flex items-center">
          <div className="flex items-center justify-between w-full">
            {/* Breadcrumb Section */}
            <div className="flex items-center gap-4">
              {/* Mobile hamburger space */}
              <div className="w-12 md:hidden"></div>

              {/* Mobile title - only visible on mobile */}
              <div className="md:hidden">
                <h1 className="text-lg font-bold text-black">
                  Halaman Admin
                </h1>
              </div>

              {/* Breadcrumb Navigation - hidden on mobile */}
              <nav className="hidden md:flex items-center space-x-2 text-sm">
                {pageInfo.breadcrumb.map((item, index) => (
                  <div key={item.href} className="flex items-center">
                    {index > 0 && (
                      <svg
                        className="w-4 h-4 text-zinc-400 mx-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                    {index === pageInfo.breadcrumb.length - 1 ? (
                      <span className="text-black font-semibold text-lg">
                        {item.name}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-zinc-500 hover:text-black transition-colors font-medium"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              <TimeDisplay />
              <UserMenu session={session} onLogout={handleLogout} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
