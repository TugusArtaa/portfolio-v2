import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#09090b] text-white px-6 selection:bg-[#455ce9] selection:text-white">
      {/* Background ambient radial glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-md w-full text-center space-y-6">
        {/* Coordinate badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-400 font-mono text-xs uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
          404 // NOT FOUND
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-sans text-white">
          Page not found
        </h1>

        {/* Description */}
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          The page or project you are looking for doesn&apos;t exist, has been removed, or the link is broken.
        </p>

        {/* Back to Home CTA */}
        <div className="pt-4 flex justify-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-medium text-sm transition-all duration-200 active:scale-[0.98] shadow-lg shadow-black/20"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
