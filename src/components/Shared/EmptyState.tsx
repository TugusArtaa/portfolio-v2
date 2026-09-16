"use client";

import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionButton?: {
    label: string;
    href: string;
  };
}

export default function EmptyState({
  title,
  description,
  icon,
  actionButton,
}: EmptyStateProps) {
  const defaultIcon = (
    <svg
      className="w-12 h-12 lg:w-16 lg:h-16 text-zinc-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
  );

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-sm border border-black/10 p-12 lg:p-20 text-center">
      <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-8 bg-zinc-100 rounded-3xl flex items-center justify-center border border-black/5">
        {icon || defaultIcon}
      </div>
      <h3 className="text-2xl lg:text-3xl font-bold text-black mb-4">
        {title}
      </h3>
      <p className="text-zinc-600 text-lg lg:text-xl max-w-md mx-auto mb-8">
        {description}
      </p>
      {actionButton && (
        <Link
          href={actionButton.href}
          className="inline-flex items-center px-6 py-3 bg-black hover:bg-zinc-800 text-white font-semibold rounded-xl transition-all duration-200"
        >
          {actionButton.label}
        </Link>
      )}
    </div>
  );
}
