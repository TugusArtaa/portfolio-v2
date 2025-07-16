"use client";

import { useSidebar } from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { Session } from "next-auth";

interface AdminMainContentProps {
  session: Session;
  children: React.ReactNode;
}

export default function AdminMainContent({
  session,
  children,
}: AdminMainContentProps) {
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={`flex-1 min-h-screen transition-[margin] duration-200 ${
        isCollapsed ? "lg:ml-16" : "lg:ml-64"
      }`}
    >
      {/* Header */}
      <AdminHeader session={session} />

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
