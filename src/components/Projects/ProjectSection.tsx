"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import TransitionLink from "@/components/UI/PageTransition/TransitionLink";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import Magnetic from "@/components/UI/Magnetic";
import { REACTBITS_EASE } from "@/lib/motion";

const React3DLogo = dynamic(() => import("@/components/UI/React3DLogo"), {
  ssr: false,
  loading: () => (
    <div
      className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[340px] md:h-[340px] lg:w-[380px] lg:h-[380px] shrink-0"
      aria-hidden="true"
    />
  ),
});

type ProjectPublic = {
  title: string;
  slug: string;
  description: string;
  techStack: string[] | null;
  coverImage: string;
  url?: string | null;
  category?: string | null;
};

interface ProjectSectionProps {
  projects: ProjectPublic[];
}

const CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "web-dev", label: "Web Development" },
  { id: "branding", label: "Branding" },
  { id: "graphic-design", label: "Graphic Design" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

export default function ProjectSection({ projects }: ProjectSectionProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>;

  const MAX_PROJECTS = 6;

  // Category counts computed dynamically from data
  const counts = {
    all: projects.length,
    "web-dev": projects.filter(
      (p) => !p.category || p.category.toLowerCase().includes("web")
    ).length,
    branding: projects.filter((p) =>
      p.category?.toLowerCase().includes("brand")
    ).length,
    "graphic-design": projects.filter(
      (p) =>
        p.category?.toLowerCase().includes("graphic") ||
        p.category?.toLowerCase().includes("design")
    ).length,
  };

  // Filter projects by active category
  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "web-dev") {
      return !project.category || project.category.toLowerCase().includes("web");
    }
    if (activeCategory === "branding") {
      return project.category?.toLowerCase().includes("brand");
    }
    if (activeCategory === "graphic-design") {
      return (
        project.category?.toLowerCase().includes("graphic") ||
        project.category?.toLowerCase().includes("design")
      );
    }
    return true;
  });

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, MAX_PROJECTS);

  const handleCategoryChange = (
    catId: CategoryId,
    e?: React.MouseEvent<HTMLButtonElement>
  ) => {
    setActiveCategory(catId);
    setShowAll(false);
    if (e?.currentTarget) {
      e.currentTarget.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  // Refresh ScrollTrigger when displayed items change
  useEffect(() => {
    if (typeof window !== "undefined" && ScrollTrigger) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [displayedProjects.length, activeCategory]);

  const totalProjects = projects.length;

  if (!projects) return null;

  return (
    <section
      ref={sectionRef}
      data-projects-section
      className="relative w-full pt-32 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 lg:pb-24 px-6 sm:px-8 lg:px-16 bg-[#FAFAF9] text-zinc-950 overflow-hidden"
    >
      {/* Full-width hairline tactile anchor connecting from top */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/80 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Full-width hairline tactile anchor connecting to footer */}
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-300/80 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* =====================================================================
            SECTION HEADER: Brutalist Editorial Style with 3D React Logo
            Left: Typography with space-y-6 | Right: 3D React Logo
           ===================================================================== */}
        <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-8 sm:gap-10 mb-12 sm:mb-16 lg:mb-20">
          {/* Typography Column: Below 3D logo on mobile, on left on desktop */}
          <div className="flex flex-col space-y-6 sm:space-y-7 text-left max-w-2xl">
            {/* Eyebrow: Clean Architectural Coordinate */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: REACTBITS_EASE }}
            >
              <h2 className="font-mono text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
                PROJECT // ARCHIVE &amp; CRAFT
              </h2>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: REACTBITS_EASE, delay: 0.08 }}
            >
              <h1 className="font-brutal text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold tracking-[-0.035em] text-zinc-950 leading-[1.05] text-left">
                Featured Projects
              </h1>
            </motion.div>

            {/* Subtitle: Focused Measure with Comfortable Leading matching Home SummarySection */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: REACTBITS_EASE, delay: 0.16 }}
              className="text-base sm:text-lg text-zinc-600 leading-[1.7] max-w-xl text-left font-sans"
            >
              A curated showcase of my work as a Web Developer &amp; Creative Enthusiast — featuring projects across web development, branding, and graphic design.
            </motion.p>
          </div>

          {/* Right Column: 3D React Logo placed cleanly on the right with smooth scale reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: REACTBITS_EASE, delay: 0.1 }}
            className="flex items-center justify-center md:justify-end shrink-0 -my-4 md:my-0"
          >
            <React3DLogo size="large" />
          </motion.div>
        </div>

        {/* Scoped style to guarantee zero scrollbar leaks on tabs across all browser engines */}
        <style dangerouslySetInnerHTML={{ __html: `
          .no-scrollbar::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
          .no-scrollbar::-webkit-scrollbar-track,
          .no-scrollbar::-webkit-scrollbar-thumb,
          .no-scrollbar::-webkit-scrollbar-button { display: none !important; background: transparent !important; }
        ` }} />

        {/* =====================================================================
            CATEGORY FILTER TABS & COUNT BADGE (Tactile ReactBits Standalone Chips)
           ===================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: REACTBITS_EASE, delay: 0.22 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          {/* Mobile-only status row */}
          <div className="flex sm:hidden items-center justify-between text-zinc-500 font-mono text-[11px] uppercase tracking-wider px-0.5">
            <span>Filter Discipline</span>
            <span>[{totalProjects} Projects]</span>
          </div>

          {/* Swipeable Tabs Container with smooth touch scrolling */}
          <div
            role="tablist"
            aria-label="Filter projects by discipline"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
            className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto sm:overflow-x-visible no-scrollbar py-1 -mx-6 px-6 sm:mx-0 sm:px-0 w-[calc(100%+3rem)] sm:w-auto min-w-0 scroll-smooth touch-pan-x overscroll-x-contain"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = counts[cat.id];

              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={(e) => handleCategoryChange(cat.id, e)}
                  className={cn(
                    "shrink-0 relative px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-[11px] sm:text-xs uppercase tracking-wider font-semibold transition-colors duration-200 cursor-pointer whitespace-nowrap active:scale-95 border",
                    isActive
                      ? "text-white border-zinc-950 shadow-xs"
                      : "bg-white text-zinc-600 hover:text-zinc-950 border-zinc-200/90 hover:border-zinc-300 shadow-2xs hover:bg-zinc-50/80"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-zinc-950 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span>{cat.label}</span>
                    <span
                      className={cn(
                        "text-[10px] font-mono px-1.5 py-0.5 rounded-full transition-colors",
                        isActive
                          ? "bg-zinc-800 text-zinc-300"
                          : "bg-zinc-100 text-zinc-500 border border-zinc-200/60"
                      )}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Desktop Count Badge aligned with tabs */}
          <span className="hidden sm:inline-block font-mono text-xs text-zinc-500 tracking-wider uppercase font-medium shrink-0">
            [{totalProjects} Projects]
          </span>
        </motion.div>

        {/* =====================================================================
            PROJECTS GRID WITH TACTILE ANIMATIONS & MINIMALIST EMPTY STATE
           ===================================================================== */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: REACTBITS_EASE }}
            className="min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] flex flex-col items-center justify-center text-center max-w-2xl mx-auto py-8"
          >
            {/* Display Headline */}
            <h3 className="font-brutal text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.03em] text-zinc-950 leading-[1.15] mb-3">
              The {CATEGORIES.find((c) => c.id === activeCategory)?.label} archive is currently being prepared.
            </h3>

            {/* Subtitle */}
            <p className="text-zinc-500 text-xs sm:text-sm font-normal leading-relaxed max-w-md mb-7">
              Selected case studies, brand identity guides, and design artifacts are currently being documented for presentation.
            </p>

            {/* ReactBits Magnetic Button */}
            <Magnetic strength={0.3}>
              <button
                type="button"
                onClick={() => handleCategoryChange("all")}
                className="group cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-950 text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-zinc-800 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md border border-zinc-800"
              >
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to All Projects</span>
              </button>
            </Magnetic>
          </motion.div>
        ) : (
          <div id="projects-grid">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {displayedProjects.map(
                  (
                    { title, slug, description, techStack, coverImage, category },
                    index
                  ) => (
                    <motion.div
                      key={slug}
                      layout
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{
                        duration: 0.65,
                        ease: REACTBITS_EASE,
                        delay: (index % 3) * 0.06,
                      }}
                      className="group relative bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-lg border border-zinc-200/90 hover:border-zinc-300/90 hover:-translate-y-0.5 transition-all duration-500 ease-out flex flex-col h-full transform-gpu"
                    >
                      {/* Corner architectural accents */}
                      <div className="absolute top-0 right-0 w-8 h-8 sm:w-10 sm:h-10 border-t-2 border-r-2 rounded-tr-2xl transition-all duration-300 border-zinc-200 group-hover:border-zinc-900 group-hover:w-12 group-hover:h-12 z-10 pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 sm:w-10 sm:h-10 border-b-2 border-l-2 rounded-bl-2xl transition-all duration-300 border-zinc-200 group-hover:border-zinc-900 group-hover:w-12 group-hover:h-12 z-10 pointer-events-none" />

                      {/* Project Cover Image */}
                      <div className="p-4 sm:p-5 pb-0">
                        <div className="relative overflow-hidden aspect-video bg-zinc-900 rounded-xl group/image">
                          <Image
                            src={coverImage || "/placeholder.svg"}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                          />
                          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="p-4 sm:p-5 relative z-10 flex flex-col flex-grow">
                        {/* Eyebrow: Discipline badge & Index counter */}
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200/70 font-semibold">
                            {category || "Web Development"}
                          </span>
                          <span className="font-mono text-[10px] text-zinc-400">
                            0{index + 1}
                          </span>
                        </div>

                        <h3 className="font-bold text-base sm:text-lg text-zinc-900 group-hover:text-black transition-colors duration-200 mb-2 line-clamp-1">
                          {title}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-600 line-clamp-2 mb-4 leading-relaxed flex-grow">
                          {description}
                        </p>

                        {/* Tech Stack Pills */}
                        {techStack && techStack.length > 0 && (
                          <div className="mb-5">
                            <div className="flex flex-wrap gap-1.5">
                              {techStack.slice(0, 3).map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="inline-flex items-center px-2 py-0.5 bg-zinc-100/90 text-zinc-700 border border-zinc-200/70 text-[11px] font-mono font-medium rounded-md"
                                >
                                  {tech}
                                </span>
                              ))}
                              {techStack.length > 3 && (
                                <span className="inline-flex items-center px-2 py-0.5 bg-zinc-100/90 text-zinc-500 text-[11px] font-mono font-medium rounded-md">
                                  +{techStack.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Footer Row: Meta & CTA Button */}
                        <div className="flex items-center justify-between pt-3 border-t border-zinc-100 mt-auto">
                          <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider font-medium">
                            Case Study
                          </span>
                          <TransitionLink
                            href={`/projects/${slug}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950 hover:bg-black text-white text-xs font-mono font-medium uppercase tracking-wider rounded-lg transition-all duration-200 group/btn active:scale-95 shadow-2xs hover:shadow-xs"
                          >
                            <span>Explore</span>
                            <svg
                              className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </TransitionLink>
                        </div>
                      </div>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </motion.div>

            {/* Show More / Show Less Button */}
            {filteredProjects.length > MAX_PROJECTS && (
              <div className="text-center pt-10 sm:pt-14">
                <button
                  type="button"
                  onClick={() => setShowAll(!showAll)}
                  className="group cursor-pointer inline-flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md border border-zinc-800"
                >
                  <span className="font-mono text-xs font-semibold tracking-wider uppercase">
                    {showAll
                      ? "Show Less"
                      : `View More Projects (${filteredProjects.length - MAX_PROJECTS})`}
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
        )}
      </div>
    </section>
  );
}
