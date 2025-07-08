"use client";

import type { Skill } from "@prisma/client";
import { useState, useEffect } from "react";
import useAboutSectionAnimations from "@/hooks/useAboutSectionAnimations";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  useAboutSectionAnimations();
  const [showAll, setShowAll] = useState(false);
  const displayedSkills = showAll ? skills : skills.slice(0, 8);

  // Refresh ScrollTrigger when skills shown changes
  useEffect(() => {
    if (typeof window !== "undefined" && ScrollTrigger) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 50);
    }
  }, [displayedSkills.length]);

  return (
    <section className="mb-20 sm:mb-24">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-sky-900 dark:text-white">
          Skills
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-neutral-300">
          Technologies and frameworks I work with
        </p>
      </div>

      {Array.isArray(skills) && skills.length > 0 ? (
        <div className="space-y-6">
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 lg:gap-3">
            {displayedSkills.map((skill: Skill) => (
              <div
                key={skill.id}
                data-about-skills
                className="group flex items-center gap-1.5 sm:gap-2 lg:gap-3 bg-white/50 dark:bg-slate-800/50 hover:bg-sky-50 dark:hover:bg-slate-700 rounded-full px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 shadow-md shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {skill.icon && (
                  <img
                    src={skill.icon || "/placeholder.svg"}
                    alt={skill.name}
                    className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform duration-300"
                  />
                )}
                <span className="font-medium text-slate-700 dark:text-neutral-200 text-xs sm:text-sm lg:text-base">
                  {skill.name}
                </span>
                {skill.level && (
                  <span className="hidden sm:inline-flex text-xs text-sky-600 dark:text-sky-400 font-medium bg-sky-100 dark:bg-sky-900/30 px-2 py-0.5 rounded-full">
                    {skill.level}
                  </span>
                )}
              </div>
            ))}
          </div>

          {skills.length > 8 && (
            <div className="text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="cursor-pointer inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 dark:from-sky-500 dark:to-sky-400 dark:hover:from-sky-600 dark:hover:to-sky-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-sky-400/40 transform hover:-translate-y-1 text-sm sm:text-base"
              >
                {showAll ? "Show Less" : `Show More (${skills.length - 8})`}
                <svg
                  className={`ml-2 w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${
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
      ) : (
        <div className="text-center py-8 sm:py-12">
          <p className="text-slate-500 dark:text-slate-400">
            No skills available.
          </p>
        </div>
      )}
    </section>
  );
}
