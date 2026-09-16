"use client";

import type { Skill } from "@/data/portfolio-data";
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
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-zinc-900">
          Skills
        </h2>
        <p className="text-base sm:text-lg text-slate-600">
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
                className="group flex items-center gap-1.5 sm:gap-2 lg:gap-3 bg-white hover:bg-zinc-100 rounded-full px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 shadow-sm border border-zinc-200 hover:border-zinc-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {skill.icon && (
                  <img
                    src={skill.icon || "/placeholder.svg"}
                    alt={skill.name}
                    className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform duration-300"
                  />
                )}
                <span className="font-medium text-slate-700 text-xs sm:text-sm lg:text-base">
                  {skill.name}
                </span>
                {skill.level && (
                  <span className="hidden sm:inline-flex text-xs text-zinc-800 font-medium bg-zinc-100 border border-zinc-200/60 px-2 py-0.5 rounded-full">
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
                className="cursor-pointer inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-zinc-900 hover:bg-black text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-zinc-500/20 transform hover:-translate-y-1 text-sm sm:text-base"
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
          <p className="text-slate-500">
            No skills available.
          </p>
        </div>
      )}
    </section>
  );
}
