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
      className={`group relative block rounded-2xl bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-md ${glowColor} ${hoverGlow} hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 p-6 overflow-hidden`}
    >
      <div
        className={`absolute inset-0 ${bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}
      ></div>
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-bl-2xl"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-black/5 to-transparent rounded-tr-2xl"></div>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`flex items-center justify-center w-14 h-14 rounded-xl ${iconBg} ${iconColor} shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
          >
            {icon}
          </div>
          <div className="text-right">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total
            </div>
            <div className="text-3xl font-black text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              <span className="relative">
                {value}
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {label}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Kelola {label.toLowerCase()}
            </p>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <svg
              className="w-5 h-5 text-slate-400 dark:text-slate-500"
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
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      </div>
    </a>
  );
}
