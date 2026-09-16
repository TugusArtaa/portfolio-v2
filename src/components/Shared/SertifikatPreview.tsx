"use client";

import React from "react";
import Image from "next/image";

interface SertifikatPreviewProps {
  title: string;
  issuer: string;
  issueDate: string;
  expireDate?: string;
  image?: string;
}

export default function SertifikatPreview({
  title,
  issuer,
  issueDate,
  expireDate,
  image,
}: SertifikatPreviewProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "Tanggal belum diisi";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const isExpired = expireDate && new Date(expireDate) < new Date();

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-white shadow-sm">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-xl text-black leading-tight">
            {title || "Judul Sertifikat"}
          </h3>
          <p className="text-base text-zinc-600 font-medium">
            {issuer || "Penerbit Sertifikat"}
          </p>
        </div>
        <div className="hidden sm:block">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-800 border border-black/5">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
            Preview
          </span>
        </div>
      </div>

      {/* Certificate Card */}
      <div className="relative group">
        {/* Main certificate container */}
        <div className="relative bg-white rounded-3xl shadow-sm border border-black/10 overflow-hidden">
          {/* Certificate image/placeholder */}
          <div className="relative">
            {image ? (
              <div className="relative overflow-hidden">
                <div className="w-full aspect-[297/210] bg-zinc-100 flex items-center justify-center">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover w-full h-full"
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={false}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full aspect-[297/210] flex flex-col items-center justify-center bg-zinc-50 border-b border-black/5">
                <div className="w-20 h-20 rounded-2xl bg-zinc-200 flex items-center justify-center mb-4">
                  <svg
                    className="w-10 h-10 text-zinc-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-zinc-600 font-medium">
                  Preview Sertifikat
                </p>
                <p className="text-xs text-zinc-400 mt-1">
                  Rasio 4:3 (Landscape)
                </p>
              </div>
            )}
          </div>

          {/* Certificate details */}
          <div className="p-8">
            <div className="space-y-6">
              {/* Date information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center flex-shrink-0 border border-black/5">
                    <svg
                      className="w-5 h-5 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-500 mb-1">
                      Tanggal Terbit
                    </p>
                    <p className="text-base font-semibold text-black">
                      {formatDate(issueDate)}
                    </p>
                  </div>
                </div>

                {expireDate && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center flex-shrink-0 border border-black/5">
                      <svg
                        className="w-5 h-5 text-zinc-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-500 mb-1">
                        Berlaku Hingga
                      </p>
                      <p className="text-base font-semibold text-black">
                        {formatDate(expireDate)}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Status indicator */}
              <div className="flex items-center justify-between pt-4 border-t border-black/10">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full animate-pulse ${
                      isExpired ? "bg-rose-500" : "bg-emerald-500"
                    }`}
                  ></div>
                  <span
                    className={`text-sm font-medium ${
                      isExpired
                        ? "text-rose-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {isExpired ? "Sertifikat Tidak Aktif" : "Sertifikat Aktif"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Preview Mode
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
