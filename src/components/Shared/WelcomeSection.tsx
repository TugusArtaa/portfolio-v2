"use client";

interface WelcomeSectionProps {
  title: string;
  subtitle: string;
  lastUpdated?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export default function WelcomeSection({
  title,
  subtitle,
  lastUpdated,
  icon,
  children,
  className = "",
}: WelcomeSectionProps) {
  return (
    <div
      className={`relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-md p-6 sm:p-8 lg:p-10 mb-8 overflow-hidden ${className}`}
    >
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
          {lastUpdated && (
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Terakhir diperbarui: {lastUpdated}</span>
            </div>
          )}
          {children}
        </div>

        {icon && (
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-slate-100/50 dark:bg-slate-700/50 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-slate-200/50 dark:border-slate-600/50">
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
