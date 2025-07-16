"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/UI/Toast";
import DeleteConfirmationModal from "@/components/Shared/DeleteConfirmationModal";
import PageHeader from "@/components/Shared/PageHeader";
import LoadingSkeleton from "@/components/Shared/LoadingSkeleton";
import EmptyState from "@/components/Shared/EmptyState";
import Pagination from "@/components/Shared/Pagination";
import { useRouter } from "next/navigation";
import SertifikatCard from "@/components/Shared/SertifikatCard";
import { Certificate } from "@prisma/client";

export default function SertifikatPage() {
  const [certList, setCertList] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    cert: Certificate | null;
  }>({
    isOpen: false,
    cert: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const { addToast } = useToast();
  const router = useRouter();

  const itemsPerPage = 6;

  const fetchCerts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/sertifikat");
      const data: Certificate[] = await res.json();
      setCertList(data);
    } catch {
      addToast({
        type: "error",
        title: "Gagal Memuat Data",
        message: "Tidak dapat memuat daftar sertifikat.",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  // Pagination
  const totalPages = Math.ceil(certList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCerts = certList.slice(startIndex, endIndex);

  const handleAdd = () => {
    router.push("/admin/sertifikat/new");
  };

  const handleEdit = (cert: Certificate) => {
    router.push(`/admin/sertifikat/${cert.id}/edit`);
  };

  const handleDelete = (cert: Certificate) => {
    setDeleteModal({ isOpen: true, cert });
  };

  const confirmDelete = async () => {
    if (!deleteModal.cert) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/sertifikat/${deleteModal.cert.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        addToast({
          type: "success",
          title: "Sertifikat Dihapus",
          message: `Sertifikat "${deleteModal.cert.title}" berhasil dihapus.`,
          duration: 4000,
        });
        await fetchCerts();
        setDeleteModal({ isOpen: false, cert: null });
      } else {
        throw new Error();
      }
    } catch {
      addToast({
        type: "error",
        title: "Gagal Menghapus",
        message: "Terjadi kesalahan saat menghapus sertifikat.",
        duration: 6000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, cert: null });
    addToast({
      type: "info",
      title: "Penghapusan Dibatalkan",
      message: "Sertifikat tetap aman dan tidak ada perubahan yang dilakukan.",
      duration: 3000,
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [certList.length]);

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
            title="Daftar Sertifikat"
            subtitle="Kelola dan pantau semua data sertifikat Anda"
            itemCount={certList.length}
            itemLabel="sertifikat"
            actionButton={{
              label: "Tambah Sertifikat",
              href: "/admin/sertifikat/new",
              icon: addIcon,
            }}
          />

          {/* Sertifikat Grid */}
          {certList.length === 0 ? (
            <EmptyState
              title="Belum ada data sertifikat"
              description="Tambahkan sertifikat pertama Anda"
              actionButton={{
                label: "Tambah Sertifikat",
                href: "/admin/sertifikat/new",
              }}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-12">
                {currentCerts.map((cert, index) => (
                  <SertifikatCard
                    key={cert.id}
                    cert={cert}
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
                  totalItems={certList.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  itemLabel="sertifikat"
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
          description={`Yakin ingin menghapus sertifikat "${
            deleteModal.cert?.title || ""
          }"?`}
          warningMessage="Sertifikat akan dihapus secara permanen."
        />
      </div>
    </div>
  );
}
