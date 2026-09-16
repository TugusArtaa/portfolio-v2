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
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-zinc-900">
          Education
        </h2>
        <p className="text-base sm:text-lg text-zinc-600">
          Academic Background and Relevant Courses
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Education Info & Courses */}
          <div className="space-y-8">
            {/* Education Info */}
            <div className="relative" data-about-education>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-zinc-900 text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <svg
                    className="w-6 h-6"
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
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 mb-2">
                    D3 Manajemen Informatika
                  </h3>
                  <p className="text-zinc-700 font-semibold text-base sm:text-lg mb-1">
                    Politeknik Negeri Bali
                  </p>
                  <p className="text-zinc-500 text-sm">
                    2022 - 2025
                  </p>
                </div>
              </div>

              {/* IPK Card */}
              <div className="mb-6">
                <div className="flex items-center justify-between shadow-sm py-4 px-4 bg-white rounded-xl border border-zinc-200">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-zinc-900 rounded-full"></div>
                    <span className="text-zinc-700 font-medium text-sm sm:text-base">
                      Indeks Prestasi Kumulatif (IPK)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-zinc-900">
                        3.98
                      </span>
                      <span className="text-xs text-zinc-500">
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
                <div className="w-12 h-12 bg-zinc-900 text-white rounded-lg flex items-center justify-center shadow-sm">
                  <svg
                    className="w-6 h-6"
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
                <h4 className="text-xl font-bold text-zinc-900">
                  Relevant Courses
                </h4>
              </div>

              <div className="space-y-3">
                {displayedCourses.map((course, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 px-4 bg-white rounded-xl shadow-sm border border-zinc-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-zinc-800 rounded-full"></div>
                      <span className="text-zinc-800 font-medium text-sm sm:text-base">
                        {course.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-800 border border-zinc-200">
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
                    className="cursor-pointer inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-md transform hover:-translate-y-0.5 text-sm sm:text-base"
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
              className="relative bg-white rounded-2xl p-6 shadow-sm border border-zinc-200"
              data-about-education
            >
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-8 h-8 opacity-40">
                <svg
                  viewBox="0 0 24 24"
                  className="w-full h-full text-zinc-400"
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
                  <h4 className="text-lg font-bold text-zinc-900">
                    My Academic Journey
                  </h4>
                </div>

                <div className="space-y-4 text-zinc-600 leading-relaxed">
                  {/* Mobile: Truncated version with inline learn more */}
                  <div className="block lg:hidden">
                    <p>
                      <span className="font-semibold text-zinc-900">
                        Aspiring to become a professional UI/UX designer
                      </span>{" "}
                      with a strong foundation in front-end development, I
                      recently completed my Diploma in Informatics Management at
                      Bali State Polytechnic, graduating with a GPA of 3.98
                      (2022–2025).
                      {!showFullStory && (
                        <>
                          {" "}
                          <button
                            onClick={() => setShowFullStory(true)}
                            className="text-zinc-900 hover:underline font-medium underline underline-offset-2 transition-colors duration-200"
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
                          <span className="font-semibold text-zinc-800">
                            deep passion for designing user-centric digital
                            products
                          </span>{" "}
                          that are not only functional but also intuitive and
                          visually compelling. I view design and development as
                          an integrated creative process, transforming ideas
                          into interactive and meaningful experiences.
                        </p>

                        <p>
                          Throughout my studies, I've worked on various{" "}
                          <span className="font-semibold text-zinc-800">
                            real-world projects and design prototypes
                          </span>
                          , emphasizing responsiveness, accessibility, and
                          clarity. This experience, combined with a strong
                          design sense and problem-solving mindset, has driven
                          me to explore the intersection of front-end
                          engineering and human-centered design.
                        </p>

                        <p>
                          I'm continuously learning, experimenting, and
                          building, eager to bring ideas to life, improve how
                          people interact with technology, and{" "}
                          <span className="font-semibold text-zinc-800">
                            shape digital experiences that truly matter.
                          </span>{" "}
                          <button
                            onClick={() => setShowFullStory(false)}
                            className="text-zinc-900 hover:underline font-medium underline underline-offset-2 transition-colors duration-200"
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
                      <span className="font-semibold text-zinc-900">
                        Aspiring to become a professional UI/UX designer
                      </span>{" "}
                      with a strong foundation in front-end development, I
                      recently completed my Diploma in Informatics Management at
                      Bali State Polytechnic, graduating with a GPA of 3.98
                      (2022–2025).
                    </p>

                    <p>
                      My academic journey has been shaped by a{" "}
                      <span className="font-semibold text-zinc-800">
                        deep passion for designing user-centric digital products
                      </span>{" "}
                      that are not only functional but also intuitive and
                      visually compelling. I view design and development as an
                      integrated creative process, transforming ideas into
                      interactive and meaningful experiences.
                    </p>

                    <p>
                      Throughout my studies, I've worked on various{" "}
                      <span className="font-semibold text-zinc-800">
                        real-world projects and design prototypes
                      </span>
                      , emphasizing responsiveness, accessibility, and clarity.
                      This experience, combined with a strong design sense and
                      problem-solving mindset, has driven me to explore the
                      intersection of front-end engineering and human-centered
                      design.
                    </p>

                    <p>
                      I'm continuously learning, experimenting, and building,
                      eager to bring ideas to life, improve how people interact
                      with technology, and{" "}
                      <span className="font-semibold text-zinc-800">
                        shape digital experiences that truly matter
                      </span>
                      .
                    </p>

                    {/* Key highlights - Desktop */}
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-zinc-800 rounded-full"></div>
                        <span className="text-zinc-600">
                          User-Centric Design
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-zinc-800 rounded-full"></div>
                        <span className="text-zinc-600">
                          Frontend Development
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-zinc-800 rounded-full"></div>
                        <span className="text-zinc-600">
                          Real-world Projects
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-zinc-800 rounded-full"></div>
                        <span className="text-zinc-600">
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
