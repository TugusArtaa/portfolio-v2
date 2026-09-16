"use client";

import { useEffect, useState, use } from "react";
import SkillForm from "../../_form";
import LoadingSkeleton from "@/components/Shared/LoadingSkeleton";
import { Skill } from "@prisma/client";

export default function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const actualParams = use(params);
  const [data, setData] = useState<Skill | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
    fetch(`${baseUrl}/api/skills/${actualParams.id}`, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) {
          setNotFound(true);
        } else {
          const skill = await res.json();
          setData({
            id: skill.id,
            name: skill.name || "",
            level: skill.level || "",
            icon: skill.icon || "",
            createdAt: skill.createdAt,
          });
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setIsLoading(false));
  }, [actualParams.id]);

  if (isLoading) {
    return <LoadingSkeleton variant="form" />;
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-zinc-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-sm border border-black/10 overflow-hidden">
            <div className="p-8 border-b border-black/10">
              <h1 className="text-2xl font-bold text-black leading-tight mb-2">
                Skill Tidak Ditemukan
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                <span className="text-zinc-600 text-sm font-medium">
                  ID skill tidak valid atau telah dihapus
                </span>
              </div>
            </div>
            <div className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-zinc-100 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-zinc-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                Ups! Skill tidak dapat ditemukan
              </h3>
              <p className="text-zinc-600 mb-6 max-w-md mx-auto">
                Skill yang Anda cari mungkin telah dihapus atau ID tidak valid.
                Silakan kembali ke daftar skills.
              </p>
              <button
                onClick={() => (window.location.href = "/admin/skills")}
                className="inline-flex items-center px-6 py-3 bg-black hover:bg-zinc-800 text-white font-medium rounded-xl shadow-sm transition-all duration-200"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Kembali ke Daftar Skills
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SkillForm
      existing={data as Skill}
      onSuccess={() => (window.location.href = "/admin/skills")}
      onCancel={() => (window.location.href = "/admin/skills")}
    />
  );
}
