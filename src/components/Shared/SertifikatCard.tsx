"use client";

import React from "react";
import { Certificate } from "@prisma/client";
import Image from "next/image";

interface SertifikatCardProps {
  cert: Certificate;
  index: number;
  onEdit: (cert: Certificate) => void;
  onDelete: (cert: Certificate) => void;
  showActions?: boolean;
  variant?: "admin" | "public";
}

export default function SertifikatCard({
  cert,
  index,
  onEdit,
  onDelete,
  showActions = true,
  variant = "admin",
}: SertifikatCardProps) {
  const isExpired = cert.expireDate && new Date(cert.expireDate) < new Date();

  return (
    <div
      className="group relative bg-white backdrop-blur-xl rounded-3xl shadow-sm hover:shadow-md border border-black/10 hover:border-black/25 transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
      style={{
        animationDelay: `${index * 150}ms`,
      }}
    >
      {/* Status indicator */}
      <div className="absolute top-4 right-4 z-10">
        {isExpired ? (
          <div className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold border border-rose-200">
            Expired
          </div>
        ) : (
          <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
            Valid
          </div>
        )}
      </div>

      {/* Image with A4 landscape ratio */}
      {cert.image && (
        <div
          className="relative w-full bg-zinc-50 flex items-center justify-center overflow-hidden rounded-t-3xl border-b border-black/5"
          style={{ aspectRatio: "297/210" }}
        >
          <Image
            src={cert.image}
            alt={cert.title}
            fill
            className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        </div>
      )}

      <div className="relative p-6 space-y-4">
        {/* Certificate icon */}
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-zinc-100 text-black shrink-0 border border-black/5">
            <svg
              className="w-5 h-5"
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
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-xl text-black mb-1 leading-tight group-hover:text-zinc-700 transition-colors duration-200">
              {cert.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-zinc-600 mb-2">
              <svg
                className="w-4 h-4 text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span className="font-medium">{cert.issuer}</span>
            </div>
          </div>
        </div>

        {/* Date information */}
        <div className="bg-zinc-50 rounded-2xl p-4 space-y-2 border border-black/5">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-zinc-600">
              <svg
                className="w-4 h-4 text-zinc-400"
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
              <span className="font-medium">Tanggal Terbit:</span>
            </div>
            <span className="text-black font-semibold">
              {new Date(cert.issueDate).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          {cert.expireDate && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-zinc-600">
                <svg
                  className="w-4 h-4 text-zinc-400"
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
                <span className="font-medium">Berlaku Hingga:</span>
              </div>
              <span
                className={`font-semibold ${
                  isExpired
                    ? "text-rose-600"
                    : "text-black"
                }`}
              >
                {new Date(cert.expireDate).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          )}
        </div>

        {showActions && variant === "admin" && (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => onEdit(cert)}
              className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-sm font-semibold rounded-xl transition-all duration-200"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <span>Edit</span>
            </button>

            <button
              type="button"
              onClick={() => onDelete(cert)}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-sm font-semibold rounded-xl transition-all duration-200"
            >
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
