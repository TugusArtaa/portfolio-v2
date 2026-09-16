"use client";

import type { About } from "@prisma/client";
import useAboutSectionAnimations from "@/hooks/useAboutSectionAnimations";

interface QuoteSectionProps {
  quote?: About;
}

export default function QuoteSection({ quote }: QuoteSectionProps) {
  useAboutSectionAnimations();
  return (
    <section className="mb-12 sm:mb-16">
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center" data-about-quote>
          {quote ? (
            <blockquote className="relative">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-zinc-600/40 mb-6 sm:mb-8 mx-auto"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
              </svg>
              <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-zinc-800 italic leading-relaxed">
                "{quote.content}"
              </p>
            </blockquote>
          ) : (
            <p className="text-zinc-500 text-lg sm:text-xl">
              No quote available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
