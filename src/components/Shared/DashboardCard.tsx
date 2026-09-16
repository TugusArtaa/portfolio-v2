"use client";
import React from "react";

interface DashboardCardProps {
  label: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  bgColor: string;
  glowColor: string;
  hoverGlow: string;
  link: string;
  value: number;
}

export default function DashboardCard({
  label,
  icon,
  iconBg,
  iconColor,
  bgColor,
  glowColor,
  hoverGlow,
  link,
  value,
}: DashboardCardProps) {
  return (
    <a
      href={link}
      className="group relative block rounded-2xl bg-white border border-black/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 p-6 overflow-hidden"
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`flex items-center justify-center w-14 h-14 rounded-xl ${iconBg} ${iconColor} border border-black/5 shadow-sm group-hover:scale-105 transition-transform duration-200`}
          >
            {icon}
          </div>
          <div className="text-right">
            <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Total
            </div>
            <div className="text-3xl font-black text-black">
              {value}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-black group-hover:text-zinc-700 transition-colors duration-200">
              {label}
            </h3>
            <p className="text-sm text-zinc-500">
              Kelola {label.toLowerCase()}
            </p>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-200">
            <svg
              className="w-5 h-5 text-zinc-400"
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
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </a>
  );
}
