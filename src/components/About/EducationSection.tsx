"use client";

import { useState, useEffect } from "react";
import useAboutSectionAnimations from "@/hooks/useAboutSectionAnimations";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Mock data untuk mata kuliah relevan
const relevantCourses = [
  { name: "Web Programming", grade: "A" },
  { name: "Mobile Programming", grade: "A" },
  { name: "Database Design", grade: "A" },
  { name: "Web Design", grade: "A" },
  { name: "Graphic Design", grade: "A" },
  { name: "Cloud Technology", grade: "A" },
  { name: "Computer Network", grade: "A" },
  { name: "Basic Algorithms and Programming", grade: "A" },
];

export default function EducationSection() {
  useAboutSectionAnimations();
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [showFullStory, setShowFullStory] = useState(false);
  const displayedCourses = showAllCourses
    ? relevantCourses
    : relevantCourses.slice(0, 4);

  // Refresh ScrollTrigger when courses or story shown changes
  useEffect(() => {
    if (typeof window !== "undefined" && ScrollTrigger) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 50);
    }
  }, [displayedCourses.length, showFullStory]);

  return (
    <section className="mb-20 sm:mb-24">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-sky-900 dark:text-white">
          Education
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-neutral-300">
          Academic background and relevant courses
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Education Info & Courses */}
          <div className="space-y-8">
            {/* Education Info */}
            <div className="relative" data-about-education>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-sky-800/50 dark:bg-sky-400/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-neutral-100 mb-2">
                    D3 Manajemen Informatika
                  </h3>
                  <p className="text-sky-700 dark:text-sky-400 font-semibold text-base sm:text-lg mb-1">
                    Politeknik Negeri Bali
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    2022 - 2025
                  </p>
                </div>
              </div>

              {/* IPK Card */}
              <div className="mb-6">
                <div className="flex items-center justify-between shadow-sm py-4 px-4 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-slate-700 dark:text-neutral-200 font-medium text-sm sm:text-base">
                      Indeks Prestasi Kumulatif (IPK)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-slate-800 dark:text-neutral-100">
                        3.98
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        / 4.00
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Relevant Courses */}
            <div className="space-y-6" data-about-education>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-sky-800/50 dark:bg-sky-400/50 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-slate-800 dark:text-neutral-100">
                  Relevant Courses
                </h4>
              </div>

              <div className="space-y-3">
                {displayedCourses.map((course, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 px-4 bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
                      <span className="text-slate-700 dark:text-neutral-200 font-medium text-sm sm:text-base">
                        {course.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          course.grade === "A"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : course.grade === "A-"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {course.grade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Show More/Less Button for Courses */}
              {relevantCourses.length > 4 && (
                <div className="text-center pt-4">
                  <button
                    onClick={() => setShowAllCourses(!showAllCourses)}
                    className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 dark:from-sky-500 dark:to-sky-400 dark:hover:from-sky-600 dark:hover:to-sky-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-sky-400/40 transform hover:-translate-y-1 text-sm sm:text-base"
                  >
                    {showAllCourses
                      ? "Show Less"
                      : `Show More (${relevantCourses.length - 4})`}
                    <svg
                      className={`ml-2 w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${
                        showAllCourses ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Academic Journey Story */}
          <div className="space-y-6">
            <div
              className="relative bg-white/50 dark:bg-slate-800/50 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-700/50"
              data-about-education
            >
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-8 h-8 opacity-50">
                <svg
                  viewBox="0 0 24 24"
                  className="w-full h-full text-sky-800 dark:text-sky-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <ellipse cx="12" cy="12" rx="10" ry="4" />
                  <path d="M2 12a10 10 0 0020 0" />
                  <path d="M12 2a15.3 15.3 0 010 20" />
                  <path d="M12 2a15.3 15.3 0 000 20" />
                </svg>
              </div>

              <div className="relative space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <h4 className="text-lg font-bold text-slate-800 dark:text-neutral-100">
                    My Academic Journey
                  </h4>
                </div>

                <div className="space-y-4 text-slate-600 dark:text-neutral-300 leading-relaxed">
                  {/* Mobile: Truncated version with inline learn more */}
                  <div className="block lg:hidden">
                    <p>
                      <span className="font-semibold text-sky-700 dark:text-sky-400">
                        Aspiring to become a professional Frontend Developer
                      </span>{" "}
                      with a strong foundation in UI/UX design, I recently
                      completed my Diploma in Informatics Management at
                      Politeknik Negeri Bali (2022–2025), graduated with a GPA
                      of 3.98.
                      {!showFullStory && (
                        <>
                          {" "}
                          <button
                            onClick={() => setShowFullStory(true)}
                            className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium underline underline-offset-2 transition-colors duration-200"
                          >
                            Learn more
                          </button>
                        </>
                      )}
                    </p>

                    {showFullStory && (
                      <div className="mt-4 space-y-4">
                        <p>
                          My academic journey has been shaped by a{" "}
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            deep passion for designing user-centric digital
                            products
                          </span>{" "}
                          that not only function smoothly but also feel
                          intuitive and visually compelling. Rather than
                          treating design and development as separate silos, I
                          see them as a continuous creative process — one that
                          transforms ideas into interactive, meaningful
                          experiences.
                        </p>

                        <p>
                          Throughout my studies, I've worked on various{" "}
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            real-world projects and design prototypes
                          </span>{" "}
                          that emphasized responsiveness, accessibility, and
                          clarity. This experience, combined with a strong
                          design sense and problem-solving mindset, has driven
                          me to explore the intersection between frontend
                          engineering and human-centered design.
                        </p>

                        <p>
                          I'm continuously learning, experimenting, and building
                          — excited to bring ideas to life, improve the way
                          people interact with technology, and{" "}
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            shape digital experiences that truly matter.
                          </span>{" "}
                          <button
                            onClick={() => setShowFullStory(false)}
                            className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium underline underline-offset-2 transition-colors duration-200"
                          >
                            Show less
                          </button>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Desktop: Full version */}
                  <div className="hidden lg:block space-y-4">
                    <p>
                      <span className="font-semibold text-sky-700 dark:text-sky-400">
                        Aspiring to become a professional Frontend Developer
                      </span>{" "}
                      with a strong foundation in UI/UX design, I recently
                      completed my Diploma in Informatics Management at
                      Politeknik Negeri Bali (2022–2025), graduated with a GPA
                      of 3.98.
                    </p>

                    <p>
                      My academic journey has been shaped by a{" "}
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        deep passion for designing user-centric digital products
                      </span>{" "}
                      that not only function smoothly but also feel intuitive
                      and visually compelling. Rather than treating design and
                      development as separate silos, I see them as a continuous
                      creative process — one that transforms ideas into
                      interactive, meaningful experiences.
                    </p>

                    <p>
                      Throughout my studies, I've worked on various{" "}
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        real-world projects and design prototypes
                      </span>{" "}
                      that emphasized responsiveness, accessibility, and
                      clarity. This experience, combined with a strong design
                      sense and problem-solving mindset, has driven me to
                      explore the intersection between frontend engineering and
                      human-centered design.
                    </p>

                    <p>
                      I'm continuously learning, experimenting, and building —
                      excited to bring ideas to life, improve the way people
                      interact with technology, and{" "}
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        shape digital experiences that truly matter
                      </span>
                      .
                    </p>

                    {/* Key highlights - Desktop */}
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <span className="text-slate-600 dark:text-slate-400">
                          User-Centric Design
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
                        <span className="text-slate-600 dark:text-slate-400">
                          Frontend Development
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span className="text-slate-600 dark:text-slate-400">
                          Real-world Projects
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <span className="text-slate-600 dark:text-slate-400">
                          Problem Solving
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
