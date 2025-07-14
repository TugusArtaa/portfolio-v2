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
            className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-sky-900 dark:text-white"
          >
            Want something like this?
          </h2>
          <p
            data-connect-content
            className="hidden sm:block text-slate-600 dark:text-neutral-300 text-md sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-full mx-auto"
          >
            Let's collaborate and bring your ideas to life. Reach out and let's
            discuss your next project!
          </p>
          <div data-connect-content>
            <Link href="/contact">
              <button
                className="cursor-pointer inline-flex items-center px-8 sm:px-12 font-bold rounded-lg transition-all duration-300 shadow-none text-2xl sm:text-2xl lg:text-2xl text-sky-600 dark:text-sky-400 focus:outline-none hover:text-sky-400 dark:hover:text-sky-300 hover:scale-105 group active:translate-y-1 active:scale-95"
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
