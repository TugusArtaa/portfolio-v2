import React, { forwardRef } from "react";
import Link from "next/link";

const ConnectSection = forwardRef<HTMLElement>((props, ref) => (
  <section ref={ref} className="py-2 sm:py-2 lg:py-4">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2
          data-connect-content
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-6 text-sky-900 dark:text-white"
        >
          Let's Connect
        </h2>
        <p
          data-connect-content
          className="hidden sm:block text-slate-600 dark:text-neutral-300 text-md sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-full mx-auto"
        >
          Ready to bring your ideas to life? Let's discuss your next project and
          create something amazing together.
        </p>
        <div data-connect-content>
          <Link href="/contact" passHref>
            <button className="inline-flex items-center px-8 sm:px-12 font-bold rounded-lg transition-all duration-300 shadow-none text-3xl sm:text-2xl text-sky-600 dark:text-sky-400 focus:outline-none hover:text-sky-400 dark:hover:text-sky-300 hover:scale-105 group active:translate-y-1 active:scale-95">
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
));
ConnectSection.displayName = "ConnectSection";
export default ConnectSection;
