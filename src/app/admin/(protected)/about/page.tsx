"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/UI/Toast";
import DeleteConfirmationModal from "@/components/Shared/DeleteConfirmationModal";
import PageHeader from "@/components/Shared/PageHeader";
import LoadingSkeleton from "@/components/Shared/LoadingSkeleton";
import EmptyState from "@/components/Shared/EmptyState";
import Pagination from "@/components/Shared/Pagination";
import { useRouter } from "next/navigation";
import AboutCard from "@/components/Shared/AboutCard";
import { About } from "@prisma/client";

export default function AboutPage() {
  const [aboutList, setAboutList] = useState<About[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    about: About | null;
  }>({
    isOpen: false,
    about: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const { addToast } = useToast();
  const router = useRouter();

  const itemsPerPage = 6;

  const fetchAbout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/about");
      const data: About[] = await res.json();
      setAboutList(data);
    } catch {
      addToast({
        type: "error",
        title: "Gagal Memuat Data",
        message: "Tidak dapat memuat daftar about.",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  // Pagination
  const totalPages = Math.ceil(aboutList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAbout = aboutList.slice(startIndex, endIndex);

  const handleAdd = () => {
    router.push("/admin/about/new");
  };

  const handleEdit = (about: About) => {
    router.push(`/admin/about/${about.id}/edit`);
  };

  const handleDelete = (about: About) => {
    setDeleteModal({ isOpen: true, about });
  };

  const confirmDelete = async () => {
    if (!deleteModal.about) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/about/${deleteModal.about.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        addToast({
          type: "success",
          title: "About Dihapus",
          message: `Data "${deleteModal.about.id}" berhasil dihapus.`,
          duration: 4000,
        });
        await fetchAbout();
        setDeleteModal({ isOpen: false, about: null });
      } else {
        throw new Error();
      }
    } catch {
      addToast({
        type: "error",
        title: "Gagal Menghapus",
        message: "Terjadi kesalahan saat menghapus data.",
        duration: 6000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, about: null });
    addToast({
      type: "info",
      title: "Penghapusan Dibatalkan",
      message: "Data about tetap aman dan tidak ada perubahan yang dilakukan.",
      duration: 3000,
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [aboutList.length]);

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
            title="Daftar About"
            subtitle="Kelola dan pantau semua data about Anda"
            itemCount={aboutList.length}
            itemLabel="about"
            actionButton={{
              label: "Tambah About",
              href: "/admin/about/new",
              icon: addIcon,
            }}
          />

          {/* About Grid */}
          {aboutList.length === 0 ? (
            <EmptyState
              title="Belum ada data about"
              description="Tambahkan data about pertama Anda"
              actionButton={{
                label: "Tambah About",
                href: "/admin/about/new",
              }}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-12">
                {currentAbout.map((about, index) => (
                  <AboutCard
                    key={about.id}
                    about={about}
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
                  totalItems={aboutList.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  itemLabel="about"
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
          description={`Yakin ingin menghapus data about "${
            deleteModal.about?.id || ""
          }"?`}
          warningMessage="Data about akan dihapus secara permanen."
        />
      </div>
    </div>
  );
}
