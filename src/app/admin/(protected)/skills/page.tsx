"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/UI/Toast";
import DeleteConfirmationModal from "@/components/Shared/DeleteConfirmationModal";
import PageHeader from "@/components/Shared/PageHeader";
import LoadingSkeleton from "@/components/Shared/LoadingSkeleton";
import EmptyState from "@/components/Shared/EmptyState";
import Pagination from "@/components/Shared/Pagination";
import { useRouter } from "next/navigation";
import SkillsCard from "@/components/Shared/SkillsCard";
import { Skill } from "@prisma/client";

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    skill: Skill | null;
  }>({
    isOpen: false,
    skill: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const { addToast } = useToast();
  const router = useRouter();

  const itemsPerPage = 6;

  const fetchSkills = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/skills");
      const data: Skill[] = await res.json();
      setSkills(data);
    } catch {
      addToast({
        type: "error",
        title: "Gagal Memuat Data",
        message: "Tidak dapat memuat daftar skills.",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Pagination
  const totalPages = Math.ceil(skills.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSkills = skills.slice(startIndex, endIndex);

  const handleAdd = () => {
    router.push("/admin/skills/new");
  };

  const handleEdit = (skill: Skill) => {
    router.push(`/admin/skills/${skill.id}/edit`);
  };

  const handleDelete = (skill: Skill) => {
    setDeleteModal({ isOpen: true, skill });
  };

  const confirmDelete = async () => {
    if (!deleteModal.skill) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/skills/${deleteModal.skill.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        addToast({
          type: "success",
          title: "Skill Dihapus",
          message: `Skill "${deleteModal.skill.name}" berhasil dihapus.`,
          duration: 4000,
        });
        await fetchSkills();
        setDeleteModal({ isOpen: false, skill: null });
      } else {
        throw new Error();
      }
    } catch {
      addToast({
        type: "error",
        title: "Gagal Menghapus",
        message: "Terjadi kesalahan saat menghapus skill.",
        duration: 6000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, skill: null });
    addToast({
      type: "info",
      title: "Penghapusan Dibatalkan",
      message: "Skill Anda tetap aman dan tidak ada perubahan yang dilakukan.",
      duration: 3000,
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [skills.length]);

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
      <div className="min-h-screen bg-zinc-50">
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
    <div className="min-h-screen bg-zinc-50">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <PageHeader
            title="Daftar Skills"
            subtitle="Kelola dan pantau semua skills Anda dengan mudah"
            itemCount={skills.length}
            itemLabel="skills"
            actionButton={{
              label: "Tambah Skill",
              href: "/admin/skills/new",
              icon: addIcon,
            }}
          />

          {/* Skills Grid */}
          {skills.length === 0 ? (
            <EmptyState
              title="Belum ada skill"
              description="Tambahkan skill pertama Anda"
              actionButton={{
                label: "Tambah Skill",
                href: "/admin/skills/new",
              }}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-12">
                {currentSkills.map((skill, index) => (
                  <SkillsCard
                    key={skill.id}
                    skill={skill}
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
                  totalItems={skills.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  itemLabel="skill"
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
          description={`Yakin ingin menghapus skill "${deleteModal.skill?.name}"?`}
          warningMessage="Skill akan dihapus secara permanen."
        />
      </div>
    </div>
  );
}
