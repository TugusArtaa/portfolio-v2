"use client";

import Link from "next/link";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  itemCount?: number;
  itemLabel?: string;
  actionButton?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  };
}

export default function PageHeader({
  title,
  subtitle,
  itemCount,
  itemLabel = "item",
  actionButton,
}: PageHeaderProps) {
  return (
    <div className="relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-md border border-white/20 dark:border-slate-700/50 p-6 sm:p-8 lg:p-10 mb-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl translate-y-24 -translate-x-24"></div>

      <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent leading-tight">
            {title}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg lg:text-xl font-medium">
            {subtitle}
          </p>
          {itemCount !== undefined && (
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>
                {itemCount} {itemLabel} tersedia
              </span>
            </div>
          )}
        </div>

        {actionButton && (
          <Link
            href={actionButton.href}
            className="group relative overflow-hidden inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-md hover:shadow-blue-500/25 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            {actionButton.icon && (
              <div className="relative w-5 h-5 mr-3 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 group-hover:rotate-180 transition-all duration-300">
                {actionButton.icon}
              </div>
            )}
            <span className="relative">{actionButton.label}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
