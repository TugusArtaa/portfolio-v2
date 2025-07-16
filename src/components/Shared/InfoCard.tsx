"use client";
import React from "react";

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value?: React.ReactNode;
  description: string;
  extra?: React.ReactNode;
}

export default function InfoCard({
  icon,
  title,
  value,
  description,
  extra,
}: InfoCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-md p-6">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
          {title}
        </h3>
      </div>
      {value && (
        <div className="text-2xl font-bold text-slate-800 dark:text-white mb-1">
          {value}
        </div>
      )}
      <p className="text-slate-600 dark:text-slate-400 text-sm">
        {description}
      </p>
      {extra && <div className="mt-4">{extra}</div>}
    </div>
  );
}
