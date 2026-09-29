"use client";

import Link from "next/link";
import { RefreshCw, ArrowLeft } from "lucide-react";

export default function ErrorBoundary({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#09090b] text-white px-6 selection:bg-[#455ce9] selection:text-white">
      {/* Background ambient radial glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-md w-full text-center space-y-6">
        {/* Coordinate badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-400 font-mono text-xs uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          500 // UNEXPECTED ERROR
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans text-white">
          Something went wrong
        </h1>

        {/* Description */}
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          An unexpected error occurred while rendering this page. You can try refreshing or navigate back to the home page.
        </p>

        {/* Actions */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-medium text-sm transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-medium text-sm transition-all duration-200 active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
