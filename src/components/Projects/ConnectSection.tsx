"use client";

import Link from "next/link";
import { useLoading } from "@/context/LoadingContext";
import useProjectSectionAnimations from "@/hooks/useProjectSectionAnimations";
import { useRef } from "react";

export default function ConnectSection() {
  const { startLoading } = useLoading();
  const sectionRef = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>;
  useProjectSectionAnimations(sectionRef);

  return (
    <section ref={sectionRef} className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            data-connect-content
            className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-zinc-900"
          >
            Let's Connect
          </h2>
          <p
            data-connect-content
            className="hidden sm:block text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 max-w-xl mx-auto"
          >
            Ready to bring your ideas to life? Let's discuss your next project
            and create something amazing together.
          </p>
          <div data-connect-content>
            <Link href="/contact" passHref>
              <button
                className="cursor-pointer inline-flex items-center px-8 sm:px-12 font-bold rounded-lg transition-all duration-300 shadow-none text-2xl sm:text-2xl lg:text-2xl text-zinc-900 focus:outline-none hover:text-zinc-600 hover:scale-105 group active:translate-y-1 active:scale-95"
                onClick={startLoading}
              >
                Get In Touch
                <svg
                  className="ml-2 w-8 h-8 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 48 48"
                >
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path
                    d="M18 24h12M26 18l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
