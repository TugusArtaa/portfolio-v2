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
      className="group relative bg-white dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl shadow-md hover:shadow-lg border border-slate-200/60 dark:border-slate-700/60 transition-all duration-700 overflow-hidden transform hover:-translate-y-3 hover:scale-[1.0]"
      style={{
        animationDelay: `${index * 150}ms`,
      }}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-indigo-50/30 dark:from-blue-950/30 dark:via-transparent dark:to-indigo-950/30 pointer-events-none" />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-300/30 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-indigo-400/40 rounded-full animate-ping"></div>
        <div
          className="absolute bottom-1/3 left-2/3 w-1.5 h-1.5 bg-purple-300/30 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Status indicator */}
      <div className="absolute top-4 right-4 z-10">
        {isExpired ? (
          <div className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium border border-red-200 dark:border-red-800/50">
            Expired
          </div>
        ) : (
          <div className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/80 text-green-600 dark:text-green-400 text-xs font-medium border border-green-200 dark:border-green-800/50">
            Valid
          </div>
        )}
      </div>

      {/* Image with A4 landscape ratio */}
      {cert.image && (
        <div
          className="relative w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center overflow-hidden rounded-t-3xl"
          style={{ aspectRatio: "297/210" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          <Image
            src={cert.image}
            alt={cert.title}
            fill
            className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
        </div>
      )}

      <div className="relative p-6 space-y-4">
        {/* Certificate icon */}
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shrink-0">
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
            <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-1 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {cert.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 mb-2">
              <svg
                className="w-4 h-4 text-slate-400"
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

        {/* Date information with enhanced styling */}
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <svg
                className="w-4 h-4 text-blue-500"
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
            <span className="text-slate-900 dark:text-white font-semibold">
              {new Date(cert.issueDate).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          {cert.expireDate && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <svg
                  className="w-4 h-4 text-slate-400"
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
                    ? "text-red-600 dark:text-red-400"
                    : "text-slate-900 dark:text-white"
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
              className="flex-1 group/btn relative overflow-hidden inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
              <svg
                className="relative w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-200"
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
              <span className="relative">Edit</span>
            </button>

            <button
              type="button"
              onClick={() => onDelete(cert)}
              className="group/btn relative overflow-hidden inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40 text-red-700 dark:text-red-400 text-sm font-semibold rounded-xl hover:from-red-200 hover:to-red-300 dark:hover:from-red-800/60 dark:hover:to-red-700/60 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-200/0 via-red-200/40 to-red-200/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
              <svg
                className="relative w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200"
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
