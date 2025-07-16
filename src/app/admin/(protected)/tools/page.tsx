"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/UI/Toast";
import DeleteConfirmationModal from "@/components/Shared/DeleteConfirmationModal";
import PageHeader from "@/components/Shared/PageHeader";
import LoadingSkeleton from "@/components/Shared/LoadingSkeleton";
import EmptyState from "@/components/Shared/EmptyState";
import Pagination from "@/components/Shared/Pagination";
import { useRouter } from "next/navigation";
import ToolsCard from "@/components/Shared/ToolsCard";
import { Tool } from "@prisma/client";

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    tool: Tool | null;
  }>({
    isOpen: false,
    tool: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const { addToast } = useToast();
  const router = useRouter();

  const itemsPerPage = 6;

  const fetchTools = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/tools");
      const data: Tool[] = await res.json();
      setTools(data);
    } catch {
      addToast({
        type: "error",
        title: "Gagal Memuat Data",
        message: "Tidak dapat memuat daftar tools.",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  // Pagination
  const totalPages = Math.ceil(tools.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTools = tools.slice(startIndex, endIndex);

  const handleAdd = () => {
    router.push("/admin/tools/new");
  };

  const handleEdit = (tool: Tool) => {
    router.push(`/admin/tools/${tool.id}/edit`);
  };

  const handleDelete = (tool: Tool) => {
    setDeleteModal({ isOpen: true, tool });
  };

  const confirmDelete = async () => {
    if (!deleteModal.tool) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/tools/${deleteModal.tool.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        addToast({
          type: "success",
          title: "Tool Dihapus",
          message: `Tool "${deleteModal.tool.name}" berhasil dihapus.`,
          duration: 4000,
        });
        await fetchTools();
        setDeleteModal({ isOpen: false, tool: null });
      } else {
        throw new Error();
      }
    } catch {
      addToast({
        type: "error",
        title: "Gagal Menghapus",
        message: "Terjadi kesalahan saat menghapus tool.",
        duration: 6000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, tool: null });
    addToast({
      type: "info",
      title: "Penghapusan Dibatalkan",
      message: "Tool Anda tetap aman dan tidak ada perubahan yang dilakukan.",
      duration: 3000,
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [tools.length]);

  const addIcon = (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 12 12">
      <path
        d="M6 0v12M0 6h12"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <LoadingSkeleton variant="header" />
            <LoadingSkeleton variant="card" count={itemsPerPage} />
            <LoadingSkeleton variant="pagination" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <PageHeader
            title="Daftar Tools"
            subtitle="Kelola dan pantau semua tools yang Anda gunakan"
            itemCount={tools.length}
            itemLabel="tools"
            actionButton={{
              label: "Tambah Tool",
              href: "/admin/tools/new",
              icon: addIcon,
            }}
          />

          {/* Tools Grid */}
          {tools.length === 0 ? (
            <EmptyState
              title="Belum ada tool"
              description="Tambahkan tool pertama Anda"
              actionButton={{
                label: "Tambah Tool",
                href: "/admin/tools/new",
              }}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-12">
                {currentTools.map((tool, index) => (
                  <ToolsCard
                    key={tool.id}
                    tool={tool}
                    index={startIndex + index}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    showActions={true}
                    variant="admin"
                  />
                ))}
              </div>

              {/* Pagination Component */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={tools.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  itemLabel="tool"
                />
              )}
            </>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
          isDeleting={isDeleting}
          title="Konfirmasi Hapus"
          description={`Yakin ingin menghapus tool "${deleteModal.tool?.name}"?`}
          warningMessage="Tool akan dihapus secara permanen."
        />
      </div>
    </div>
  );
}
