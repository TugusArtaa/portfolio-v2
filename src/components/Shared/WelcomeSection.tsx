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
      className={`relative bg-white/80 backdrop-blur-xl rounded-3xl border border-black/10 shadow-sm p-6 sm:p-8 lg:p-10 mb-8 overflow-hidden ${className}`}
    >
      <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-zinc-600 text-base sm:text-lg lg:text-xl font-medium">
            {subtitle}
          </p>
          {lastUpdated && (
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span>Terakhir diperbarui: {lastUpdated}</span>
            </div>
          )}
          {children}
        </div>

        {icon && (
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-zinc-100 rounded-2xl flex items-center justify-center border border-black/5">
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
