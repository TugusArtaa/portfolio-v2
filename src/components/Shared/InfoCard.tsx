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
    <div className="bg-white rounded-2xl border border-black/10 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-black">
          {title}
        </h3>
      </div>
      {value && (
        <div className="text-2xl font-bold text-black mb-1">
          {value}
        </div>
      )}
      <p className="text-zinc-600 text-sm">
        {description}
      </p>
      {extra && <div className="mt-4">{extra}</div>}
    </div>
  );
}
