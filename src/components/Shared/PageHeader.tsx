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
    <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-sm border border-black/10 p-6 sm:p-8 lg:p-10 mb-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-200/50 rounded-full blur-3xl -translate-y-32 translate-x-32 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-zinc-100/50 rounded-full blur-3xl translate-y-24 -translate-x-24 pointer-events-none"></div>

      <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-zinc-600 text-base sm:text-lg lg:text-xl font-medium">
            {subtitle}
          </p>
          {itemCount !== undefined && (
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span>
                {itemCount} {itemLabel} tersedia
              </span>
            </div>
          )}
        </div>

        {actionButton && (
          <Link
            href={actionButton.href}
            className="group relative overflow-hidden inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-black hover:bg-zinc-800 text-white font-semibold rounded-2xl shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base"
          >
            {actionButton.icon && (
              <div className="relative w-5 h-5 mr-3 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-180 transition-all duration-300">
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
