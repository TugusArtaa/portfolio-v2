import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar, { SidebarProvider } from "@/components/Admin/AdminSidebar";
import AdminMainContent from "@/components/Admin/AdminMainContent";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-zinc-50 transition-all duration-300">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <AdminMainContent session={session}>{children}</AdminMainContent>
      </div>
    </SidebarProvider>
  );
}
