"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useAboutSectionAnimations from "@/hooks/useAboutSectionAnimations";

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  logo: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({
  experiences,
}: ExperienceSectionProps) {
  useAboutSectionAnimations();
  const [showAll, setShowAll] = useState(false);
  const displayedExperiences = showAll ? experiences : experiences.slice(0, 3);

  // Refresh ScrollTrigger when experiences shown changes
  useEffect(() => {
    if (typeof window !== "undefined" && ScrollTrigger) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 50);
    }
  }, [displayedExperiences.length]);

  // Timeline beam animation
  const timelineRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current || !beamRef.current) return;
    const timeline = timelineRef.current;
    const beam = beamRef.current;

    gsap.set(beam, { height: 0 });

    // Use quickTo for smooth, real-time height update
    const setHeight = gsap.quickTo(beam, "height", {
      duration: 0.12,
      ease: "power1.out",
    });

    const st = ScrollTrigger.create({
      trigger: timeline,
      start: "top center",
      end: "bottom center",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalHeight = timeline.offsetHeight;
        setHeight(totalHeight * progress);
      },
    });

    return () => {
      st.kill();
    };
  }, [displayedExperiences.length]);

  return (
    <section className="mb-20 sm:mb-24">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-zinc-900">
          My Experience
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-zinc-600">
          Where I Learn, Build, and Contribute
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto" ref={timelineRef}>
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-zinc-200 z-0" />
        {/* Timeline Beam */}
        <div
          ref={beamRef}
          className="absolute left-1/2 transform -translate-x-px w-1 z-10 pointer-events-none"
          style={{
            top: 0,
            height: 0,
            background: "linear-gradient(to bottom, #71717a 0%, #d4d4d8 100%)",
            borderRadius: "9999px",
            boxShadow:
              "0 0 8px 2px rgba(161,161,170,0.25)",
            transition: undefined,
            willChange: "height",
          }}
        />

        <div className="space-y-12 sm:space-y-16 relative z-10">
          {displayedExperiences.map((exp, index) => (
            <div key={exp.id} className="relative">
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-zinc-800 rounded-full border-4 border-white shadow-lg z-10"></div>

              {/* Content */}
              <div
                data-about-experience
                className={`flex ${
                  index % 2 === 0 ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`w-full sm:w-5/12 lg:w-5/12 xl:w-2/5 ${
                    index % 2 === 0
                       ? "pr-8 sm:pr-16 lg:pr-20"
                      : "pl-8 sm:pl-16 lg:pl-20"
                  }`}
                >
                  <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-zinc-200 transition-colors duration-300">
                    {/* Header with Logo and Title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-zinc-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Image
                          src={exp.logo || "/placeholder.svg"}
                          alt={exp.company}
                          width={34}
                          height={34}
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-zinc-900 leading-tight mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-sm sm:text-base lg:text-lg text-zinc-600 font-medium">
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    {/* Date and Location */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="flex items-center gap-2 bg-zinc-100 px-3 py-1.5 rounded-full">
                        <svg
                          className="w-4 h-4 text-zinc-700"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-xs sm:text-sm lg:text-base font-medium text-zinc-800">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-zinc-100 px-3 py-1.5 rounded-full">
                        <svg
                          className="w-4 h-4 text-zinc-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-xs sm:text-sm lg:text-base font-medium text-zinc-700">
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm lg:text-base text-zinc-600 leading-relaxed text-justify">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {experiences.length > 3 && (
          <div className="text-center mt-8 relative z-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="cursor-pointer inline-flex items-center px-4 py-2.5 sm:px-6 sm:py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-md text-xs sm:text-sm lg:text-base"
            >
              {showAll
                ? "Show Less"
                : `View More Experience (${experiences.length - 3})`}
              <svg
                className={`ml-2 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 transition-transform duration-300 ${
                  showAll ? "rotate-180" : ""
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
    </section>
  );
}
