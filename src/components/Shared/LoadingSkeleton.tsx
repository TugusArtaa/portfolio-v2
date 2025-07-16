"use client";

interface LoadingSkeletonProps {
  variant?:
    | "card"
    | "list"
    | "form"
    | "header"
    | "empty"
    | "pagination"
    | "stats"
    | "quickActions";
  count?: number;
}

export default function LoadingSkeleton({
  variant = "card",
  count = 6,
}: LoadingSkeletonProps) {
  if (variant === "header") {
    return (
      <div className="mb-8 animate-pulse">
        <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl px-8 py-6 flex flex-col gap-3">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg w-56 mb-2"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-80 mb-2"></div>
          <div className="flex gap-4 mt-2">
            <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
            <div className="h-8 w-40 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-12 animate-pulse">
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-lg rounded-3xl p-6"
          >
            <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-2xl mb-6"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg mb-4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg mb-2"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "pagination") {
    return (
      <div className="flex justify-center mt-8 animate-pulse">
        <div className="h-10 w-64 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
      </div>
    );
  }

  if (variant === "empty") {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-pulse">
        <div className="w-24 h-24 bg-slate-200 dark:bg-slate-700 rounded-2xl mb-6"></div>
        <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded-lg mb-2"></div>
        <div className="h-4 w-64 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
      </div>
    );
  }

  if (variant === "form") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500 py-8 animate-pulse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl backdrop-blur-xl overflow-hidden">
            {/* Header Skeleton */}
            <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl p-8">
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg w-48 mb-4"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-64"></div>
            </div>
            {/* Content Skeleton */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-24"></div>
                      <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-32"></div>
                  <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "stats") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-pulse">
        {[...Array(count ?? 4)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col justify-between h-40 bg-white/60 rounded-xl dark:bg-slate-800/60 p-6 w-full"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-700" />
              <div className="flex-1">
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg mb-2"></div>
                <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
              </div>
            </div>
            <div>
              <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded-xl mb-2"></div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "quickActions") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {[...Array(count ?? 4)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col justify-between h-32 bg-white/60 rounded-xl dark:bg-slate-800/60 p-5 w-full"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
            </div>
            <div className="h-3 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
