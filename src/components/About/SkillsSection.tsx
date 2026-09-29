"use client";

import type { Skill } from "@/data/portfolio-data";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

import TechToken from "@/components/UI/TechToken/TechToken";

/* Hallmark · component: skills-section · genre: editorial · theme: Studio
 * 12-Column Desktop Grid / 6-Column Dual-Row Mobile Responsive Flow
 * pre-emit critique: P5 H5 E5 S5 R5 V5
 */

interface SkillsSectionProps {
  skills: Skill[];
}

const MAX_COLLAPSED = 12;

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasOverflow = Array.isArray(skills) && skills.length > MAX_COLLAPSED;
  const visibleSkills =
    hasOverflow && !isExpanded ? skills.slice(0, MAX_COLLAPSED) : skills;

  // Refresh ScrollTrigger when component mounts or expands
  useEffect(() => {
    if (typeof window !== "undefined" && ScrollTrigger) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [skills.length, isExpanded]);

  return (
    <section className="relative w-full py-20 sm:py-24 lg:py-32 px-6 sm:px-8 lg:px-16 bg-[#FAFAF9] text-zinc-950 overflow-hidden">
      {/* Full-width hairline tactile anchor connecting from previous section */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/80 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* =====================================================================
            SECTION HEADER: 100% Consistent Spacing & Sizing with Section 01
           ===================================================================== */}
        <div data-section-header className="flex flex-col space-y-6 text-left mb-10 sm:mb-12">
          {/* Eyebrow */}
          <div>
            <h2 className="font-mono text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
              ABOUT // SKILLS &amp; FRAMEWORKS
            </h2>
          </div>

          {/* Title: 100% Consistent font-brutal, size scale, leading, and tracking */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <h3 className="font-brutal text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold tracking-[-0.035em] text-zinc-950 leading-[1.05] text-left">
              Skills
            </h3>
            <span className="font-mono text-xs text-zinc-500 tracking-wider uppercase font-medium self-start sm:self-auto sm:pb-2">
              [{skills.length} Skills]
            </span>
          </div>
        </div>

        {/* Responsive Grid: Max 12 Desktop / Max 6 per Row Mobile (2 Rows = 12 items) */}
        {Array.isArray(skills) && skills.length > 0 ? (
          <div className="w-full pt-1">
            <motion.div
              layout
              className="grid grid-cols-6 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3 sm:gap-3.5 md:gap-4 lg:gap-4.5 w-full"
            >
              <AnimatePresence initial={false}>
                {visibleSkills.map((skill: Skill) => (
                  <motion.div
                    key={skill.id}
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="flex items-center justify-start"
                  >
                    <TechToken
                      id={skill.id}
                      name={skill.name}
                      icon={skill.icon}
                      animationHook="data-about-skills"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Hallmark Editorial Typographic Trigger (Anti-AI-Slop C3) */}
            {hasOverflow && (
              <div className="mt-5 sm:mt-6 flex items-center justify-start">
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="group inline-flex items-center gap-3 font-mono text-[11px] sm:text-xs font-semibold text-zinc-400 hover:text-zinc-950 uppercase tracking-[0.2em] transition-colors duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 py-1"
                  aria-expanded={isExpanded}
                >
                  <span className="w-4 h-[1px] bg-zinc-300 group-hover:w-7 group-hover:bg-zinc-950 transition-all duration-300 shrink-0" />
                  <span className="transition-colors">
                    {isExpanded
                      ? "Show Less"
                      : `View +${skills.length - MAX_COLLAPSED} More Skills`}
                  </span>
                  <span className="font-mono text-zinc-400 group-hover:text-zinc-950 group-hover:translate-x-0.5 transition-all duration-200 text-xs">
                    {isExpanded ? "↑" : "↓"}
                  </span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="font-mono text-sm text-zinc-500">No skills recorded.</p>
        )}
      </div>
    </section>
  );
}
