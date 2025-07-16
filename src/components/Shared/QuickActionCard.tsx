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
      className="group relative bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 p-4"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 ${iconBg} ${iconColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
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
          <h3 className="font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Tambah {label}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Buat {label.toLowerCase()} baru
          </p>
        </div>
        <svg
          className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors"
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
