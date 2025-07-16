"use client";

import { useEffect, useState } from "react";
import ProjectForm from "../../_form";
import React from "react";
import LoadingSkeleton from "@/components/Shared/LoadingSkeleton";
import { Project } from "@prisma/client";

export default function EditProjectPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(
    null
  );
  const [data, setData] = useState<Project | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params instanceof Promise) {
      params.then((resolved) => setUnwrappedParams(resolved));
    } else {
      setUnwrappedParams(params);
    }
  }, [params]);

  useEffect(() => {
    if (!unwrappedParams) return;

    setIsLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${unwrappedParams.id}`,
      {
        cache: "no-store",
      }
    )
      .then(async (res) => {
        if (!res.ok) {
          setNotFound(true);
        } else {
          setData(await res.json());
        }
      })
      .catch((error) => {
        console.error("Error fetching project:", error);
        setNotFound(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [unwrappedParams]);

  if (isLoading) {
    return <LoadingSkeleton variant="form" />;
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl shadow-md border border-white/40 dark:border-slate-700/40 overflow-hidden">
            {/* Error Header */}
            <div className="relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl p-8 text-slate-900 dark:text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-400/20 to-pink-400/20 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-400/20 to-yellow-400/20 rounded-full blur-3xl translate-y-24 -translate-x-24"></div>

              <div className="relative">
                <h1 className="text-3xl font-black bg-gradient-to-r from-slate-900 via-red-800 to-pink-900 dark:from-white dark:via-red-200 dark:to-pink-200 bg-clip-text text-transparent leading-tight mb-2">
                  Proyek Tidak Ditemukan
                </h1>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                    ID proyek tidak valid atau telah dihapus
                  </span>
                </div>
              </div>
            </div>

            {/* Error Content */}
            <div className="p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-3xl flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-red-500 dark:text-red-400"
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
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Ups! Proyek tidak dapat ditemukan
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                Proyek yang Anda cari mungkin telah dihapus atau ID tidak valid.
                Silakan kembali ke daftar proyek.
              </p>
              <button
                onClick={() => (window.location.href = "/admin/projects")}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
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
                Kembali ke Daftar Proyek
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProjectForm
      existing={data as Project}
      onSuccess={() => (window.location.href = "/admin/projects")}
    />
  );
}
