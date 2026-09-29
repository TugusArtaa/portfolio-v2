"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Hallmark · component: experience-section · genre: editorial · theme: Studio
 * 12-Column Responsive Flow with Dual-Anchor Timeline Beam
 * pre-emit critique: P5 H5 E5 S5 R5 V5
 */

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
  const [showAll, setShowAll] = useState(false);
  const displayedExperiences = showAll ? experiences : experiences.slice(0, 3);

  // Refresh ScrollTrigger when experiences shown changes
  useEffect(() => {
    if (typeof window !== "undefined" && ScrollTrigger) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [displayedExperiences.length]);

  // Timeline beam animation
  const timelineRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    const updateNodes = (currentHeight: number) => {
      const beamTip = 16 + currentHeight;
      const isDesktop = window.innerWidth >= 640;
      const dotOffset = isDesktop ? 42 : 38;

      itemRefs.current.forEach((item) => {
        if (!item) return;
        const dotCenterY = item.offsetTop + dotOffset;
        const isActive = beamTip >= dotCenterY;

        if (isActive && !item.classList.contains("is-active")) {
          item.classList.add("is-active");
          item.setAttribute("data-active", "true");
        } else if (!isActive && item.classList.contains("is-active")) {
          item.classList.remove("is-active");
          item.setAttribute("data-active", "false");
        }
      });
    };

    const st = ScrollTrigger.create({
      trigger: timeline,
      start: "top center",
      end: "bottom center",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalHeight = timeline.offsetHeight;
        const targetHeight = totalHeight * progress;
        setHeight(targetHeight);
        updateNodes(targetHeight);
      },
    });

    // Initial check on mount
    requestAnimationFrame(() => {
      if (st) {
        const initialHeight = timeline.offsetHeight * st.progress;
        setHeight(initialHeight);
        updateNodes(initialHeight);
      }
    });

    return () => {
      st.kill();
    };
  }, [displayedExperiences.length]);

  return (
    <section className="relative w-full py-20 sm:py-24 lg:py-32 px-6 sm:px-8 lg:px-16 bg-[#FAFAF9] text-zinc-950 overflow-hidden">
      {/* Full-width hairline tactile anchor connecting from previous section */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/80 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* =====================================================================
            SECTION HEADER: 100% Consistent Spacing & Sizing with Section 01, 02 & 03
           ===================================================================== */}
        <div data-section-header className="flex flex-col space-y-6 text-left mb-10 sm:mb-12">
          {/* Eyebrow */}
          <div>
            <h2 className="font-mono text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
              ABOUT // CAREER &amp; EXPERIENCE
            </h2>
          </div>

          {/* Title: 100% Consistent font-brutal, size scale, leading, and tracking */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <h3 className="font-brutal text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold tracking-[-0.035em] text-zinc-950 leading-[1.05] text-left">
              Experience
            </h3>
            <span className="font-mono text-xs text-zinc-500 tracking-wider uppercase font-medium self-start sm:self-auto sm:pb-2">
              [{experiences.length} Experiences]
            </span>
          </div>
        </div>

        {/* =====================================================================
            TIMELINE TRACK & EXPERIENCE CARDS
           ===================================================================== */}
        <div className="relative max-w-6xl xl:max-w-7xl mx-auto pt-2 pb-2" ref={timelineRef}>
          {/* Static Timeline Line */}
          <div
            className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-zinc-200/80 z-0"
            aria-hidden="true"
          />

          {/* Running Animated Timeline Beam */}
          <div
            ref={beamRef}
            className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-[3px] z-10 pointer-events-none rounded-full"
            style={{
              top: 16,
              height: 0,
              background:
                "linear-gradient(to bottom, #18181b 0%, #3f3f46 60%, #a1a1aa 100%)",
              boxShadow: "0 0 10px 1px rgba(24, 24, 27, 0.25)",
              willChange: "height",
            }}
            aria-hidden="true"
          />

          {/* Timeline Cards Stack */}
          <div className="space-y-10 sm:space-y-14 relative z-10">
            {displayedExperiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={`${exp.id}-${index}`}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className="group/item relative"
                  data-active="false"
                >
                  {/* Concentric Timeline Node Dot: Inactive neutral gray until beam reaches it */}
                  <div
                    className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-7 sm:top-8 w-5 h-5 rounded-full bg-white border-2 border-zinc-300 z-20 flex items-center justify-center transition-all duration-300 group-hover/item:scale-125 group-[.is-active]/item:border-zinc-950 group-[.is-active]/item:shadow-[0_0_0_3px_rgba(24,24,27,0.12)] group-[.is-active]/item:scale-110"
                    aria-hidden="true"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 transition-all duration-300 group-hover/item:bg-zinc-950 group-[.is-active]/item:bg-zinc-950 group-[.is-active]/item:scale-125" />
                  </div>

                  {/* Desktop Tactile Hairline Connector */}
                  <div
                    className={`hidden sm:block absolute top-[37px] h-px z-10 pointer-events-none transition-all duration-500 ${
                      isEven
                        ? "right-1/2 w-6 lg:w-8 bg-gradient-to-l from-zinc-400/80 to-zinc-200/40"
                        : "left-1/2 w-6 lg:w-8 bg-gradient-to-r from-zinc-400/80 to-zinc-200/40"
                    } opacity-30 group-[.is-active]/item:opacity-100`}
                    aria-hidden="true"
                  />

                  {/* Mobile Tactile Hairline Connector */}
                  <div
                    className="sm:hidden absolute left-6 top-[37px] w-5 h-px bg-gradient-to-r from-zinc-400/80 to-zinc-200/40 z-10 pointer-events-none transition-all duration-500 opacity-30 group-[.is-active]/item:opacity-100"
                    aria-hidden="true"
                  />

                  {/* Experience Card */}
                  <div
                    data-about-experience
                    className={`flex w-full ${
                      isEven ? "sm:justify-start" : "sm:justify-end"
                    }`}
                  >
                    <div
                      className={`w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(50%-2rem)] ${
                        isEven ? "pl-12 sm:pl-0" : "pl-12 sm:pl-0 sm:ml-auto"
                      }`}
                    >
                      <div className="group/card relative rounded-2xl bg-white border border-zinc-200/90 hover:border-zinc-400/90 p-5 sm:p-6 lg:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.02)] hover:-translate-y-0.5 transition-all duration-300">
                        {/* ReactBits Corner Tag & Date Row */}
                        <div className="flex items-center justify-between gap-3 mb-4 border-b border-zinc-100 pb-3.5">
                          <span className="font-mono text-[10px] font-bold text-zinc-400 tracking-widest uppercase">
                            ROLE · {String(index + 1).padStart(2, "0")}
                          </span>

                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-50 border border-zinc-200/70 font-mono text-[11px] font-medium text-zinc-700">
                            <svg
                              className="w-3 h-3 text-zinc-400 shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.75}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <span>
                              {exp.startDate} – {exp.endDate}
                            </span>
                          </div>
                        </div>

                        {/* Company Logo + Role Title */}
                        <div className="flex items-start gap-3.5 sm:gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-200/80 p-2 flex items-center justify-center shrink-0 shadow-2xs group-hover/card:scale-105 group-hover/card:bg-zinc-100/70 transition-all duration-300">
                            <Image
                              src={exp.logo || "/placeholder.svg"}
                              alt={exp.company}
                              width={34}
                              height={34}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-brutal font-bold text-lg sm:text-xl text-zinc-900 group-hover/card:text-black tracking-tight leading-snug">
                              {exp.title}
                            </h4>
                            <p className="font-sans text-xs sm:text-sm font-semibold text-zinc-600 mt-0.5 tracking-tight">
                              {exp.company}
                            </p>
                          </div>
                        </div>

                        {/* Location Meta Pill */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="inline-flex items-center gap-1.5 text-[12px] font-mono text-zinc-500">
                            <svg
                              className="w-3.5 h-3.5 text-zinc-400 shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.75}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.75}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <span>{exp.location}</span>
                          </div>
                        </div>

                        {/* Editorial Narrative Description */}
                        <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed text-left">
                          {exp.description}
                        </p>

                        {/* Tactile Bottom Hairline Accent */}
                        <div
                          className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-zinc-950/0 to-transparent group-hover/card:via-zinc-950/20 transition-all duration-500 rounded-b-2xl pointer-events-none"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View More / Collapse Button */}
          {experiences.length > 3 && (
            <div className="text-center mt-12 sm:mt-16 relative z-20">
              <button
                onClick={() => setShowAll(!showAll)}
                className="group cursor-pointer inline-flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md border border-zinc-800"
              >
                <span className="font-mono text-xs font-semibold tracking-wider uppercase">
                  {showAll
                    ? "Collapse Timeline"
                    : `Explore Full History (${experiences.length - 3} More)`}
                </span>
                <span className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                  <svg
                    className={`w-3 h-3 text-zinc-300 transition-transform duration-300 ${
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
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
