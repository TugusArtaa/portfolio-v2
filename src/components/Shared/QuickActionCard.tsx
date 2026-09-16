"use client";
import React from "react";

interface QuickActionCardProps {
  label: string;
  iconBg: string;
  iconColor: string;
  link: string;
}

export default function QuickActionCard({
  label,
  iconBg,
  iconColor,
  link,
}: QuickActionCardProps) {
  return (
    <a
      href={link}
      className="group relative bg-white rounded-xl border border-black/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-4"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 ${iconBg} ${iconColor} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200 border border-black/5`}
        >
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
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-black group-hover:text-zinc-700 transition-colors">
            Tambah {label}
          </h3>
          <p className="text-xs text-zinc-500">
            Buat {label.toLowerCase()} baru
          </p>
        </div>
        <svg
          className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </a>
  );
}
