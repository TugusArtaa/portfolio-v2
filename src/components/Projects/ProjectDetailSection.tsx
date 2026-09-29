"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import TransitionLink from "@/components/UI/PageTransition/TransitionLink";
import ProjectImages from "@/components/Projects/ProjectImages";
import Magnetic from "@/components/UI/Magnetic";
import { cn } from "@/lib/utils";
import { REACTBITS_EASE } from "@/lib/motion";

type ProjectDetail = {
  id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[] | null;
  coverImage: string;
  url?: string | null;
  userId?: string | null;
  image1?: string | null;
  image2?: string | null;
  image3?: string | null;
  category?: string | null;
  createdAt: string;
  updatedAt: string;
};

interface Props {
  project: ProjectDetail;
  prevProject?: ProjectDetail | null;
  nextProject?: ProjectDetail | null;
  anotherProjects?: ProjectDetail[];
  allProjects?: ProjectDetail[];
}

export default function ProjectDetailSection({
  project,
  prevProject,
  nextProject,
  anotherProjects = [],
  allProjects = [],
}: Props) {
  const allImages = [
    project.coverImage,
    project.image1,
    project.image2,
    project.image3,
  ].filter(Boolean) as string[];

  const isRepo = Boolean(
    project.url &&
      (project.url.includes("github.com") || project.url.includes("gitlab.com"))
  );

  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const currentNum = currentIndex >= 0 ? currentIndex + 1 : 1;
  const totalNum = allProjects.length || 1;

  const releaseYear = (() => {
    if (!project.createdAt) return "2025";
    const year = new Date(project.createdAt).getFullYear();
    return isNaN(year) ? "2025" : year.toString();
  })();

  return (
    <section className="relative w-full min-h-screen bg-[#FAFAF9] text-zinc-950 selection:bg-[#455ce9] selection:text-white pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24 lg:pb-32 px-6 sm:px-8 lg:px-16 overflow-hidden">
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
            TOP NAVIGATION & BREADCRUMB
           ===================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: REACTBITS_EASE }}
          className="relative pb-6 mb-10 sm:mb-12"
        >
          <div className="flex items-center justify-between gap-3">
            <Magnetic strength={0.3}>
              <TransitionLink
                href="/projects"
                className="group cursor-pointer inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-zinc-950 text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-zinc-800 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md border border-zinc-800 shrink-0"
              >
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span>Back to Projects</span>
              </TransitionLink>
            </Magnetic>

            <div className="flex items-center gap-3 font-mono text-xs text-zinc-500 uppercase tracking-wider shrink-0 font-medium">
              <span className="hidden sm:inline font-semibold text-zinc-700">
                {project.category || "Web Development"}
              </span>
              <span className="hidden sm:inline text-zinc-300">/</span>
              <span>
                [ {currentNum.toString().padStart(2, "0")} /{" "}
                {totalNum.toString().padStart(2, "0")} ]
              </span>
            </div>
          </div>

          {/* Tactile hairline divider connecting across breadcrumb */}
          <div
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-300/80 to-transparent pointer-events-none"
            aria-hidden="true"
          />
        </motion.div>

        {/* =====================================================================
            PROJECT HERO HEADER
           ===================================================================== */}
        <div className="flex flex-col space-y-4 sm:space-y-5 text-left mb-10 sm:mb-12">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: REACTBITS_EASE, delay: 0.07 }}
          >
            <h2 className="font-mono text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
              PROJECT // CASE STUDY
            </h2>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: REACTBITS_EASE, delay: 0.12 }}
            className="font-brutal text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.035em] text-zinc-950 leading-[1.08] text-left"
          >
            {project.title}
          </motion.h1>
        </div>

        {/* =====================================================================
            MAIN CONTENT: GALLERY (LEFT) + DETAILS CARD (RIGHT)
           ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-14 sm:pb-18">
          {/* Left: Project Images Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: REACTBITS_EASE, delay: 0.18 }}
            className="lg:col-span-7"
          >
            <ProjectImages images={allImages} title={project.title} />
          </motion.div>

          {/* Right: Project Meta Details Column (Direct Editorial Canvas) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: REACTBITS_EASE, delay: 0.24 }}
            className="lg:col-span-5 flex flex-col space-y-7 lg:pl-2"
          >
            {/* Status & Timeline Header */}
            <div className="relative flex items-center justify-between gap-3 pb-4">
              <div className="inline-flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span
                    className={cn(
                      "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                      isRepo ? "bg-zinc-400" : "bg-emerald-400"
                    )}
                  />
                  <span
                    className={cn(
                      "relative inline-flex rounded-full h-2 w-2",
                      isRepo ? "bg-zinc-500" : "bg-emerald-500"
                    )}
                  />
                </span>
                <span className="font-mono text-xs uppercase tracking-wider font-semibold text-zinc-800">
                  {isRepo
                    ? "Source Code Available"
                    : project.url
                    ? "Live Production"
                    : "Archived Project"}
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider">
                <span className="text-zinc-400 font-normal">TIMELINE //</span>
                <span className="font-semibold text-zinc-700">{releaseYear}</span>
              </div>

              {/* Tactile hairline divider fading to right */}
              <div
                className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-zinc-300/80 via-zinc-200/50 to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* About This Project */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
                ABOUT // OVERVIEW
              </h3>
              <p className="text-base text-zinc-600 leading-[1.75] font-sans whitespace-pre-line text-left">
                {project.description}
              </p>
            </div>

            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="space-y-3 pt-1">
                <h3 className="font-mono text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
                  TECH STACK &amp; TOOLS
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-3 py-1.5 bg-white text-zinc-800 border border-zinc-200/80 rounded-lg text-xs font-mono font-medium hover:border-zinc-400 transition-colors shadow-2xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Primary Action Button */}
            {project.url && (
              <div className="pt-2">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 w-full px-6 py-3.5 bg-zinc-950 hover:bg-black text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-xl shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>
                    {isRepo ? "View Source Code" : "Open Live Project"}
                  </span>
                  {isRepo ? (
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.867 8.184 6.839 9.525.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.646.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.747-1.025 2.747-1.025.546 1.378.202 2.396.099 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.579.688.481C19.135 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  )}
                </a>
              </div>
            )}
          </motion.div>
        </div>

        {/* =====================================================================
            EDITORIAL PAGINATION STRIP (PREV / DIRECTORY / NEXT)
           ===================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: REACTBITS_EASE }}
          className="relative py-8 sm:py-10 my-10 sm:my-14"
        >
          {/* Top hairline */}
          <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/80 to-transparent pointer-events-none"
            aria-hidden="true"
          />
          {/* Bottom hairline */}
          <div
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-300/80 to-transparent pointer-events-none"
            aria-hidden="true"
          />
          {/* Mobile Index Counter - Clean & Centered at the top of the strip */}
          <div className="sm:hidden flex flex-col items-center justify-center text-center pb-5 mb-4 border-b border-zinc-200/80">
            <span className="font-mono text-xs font-bold text-zinc-900 tracking-wider">
              {currentNum.toString().padStart(2, "0")} /{" "}
              {totalNum.toString().padStart(2, "0")}
            </span>
            <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest mt-0.5">
              Archive Index
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 items-center">
            {/* Prev */}
            <div className="flex justify-start min-w-0">
              {prevProject ? (
                <TransitionLink
                  href={`/projects/${prevProject.slug}`}
                  className="group flex flex-col items-start space-y-1 text-left min-w-0 w-full"
                >
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-widest group-hover:text-zinc-700 transition-colors">
                    <svg
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 group-hover:-translate-x-1 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span className="truncate">Previous Project</span>
                  </span>
                  <span className="font-brutal text-sm sm:text-lg lg:text-xl font-bold text-zinc-900 group-hover:text-black truncate w-full transition-colors">
                    {prevProject.title}
                  </span>
                </TransitionLink>
              ) : (
                <div className="opacity-30 flex flex-col items-start space-y-1 select-none min-w-0 w-full">
                  <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-widest">
                    First Project
                  </span>
                  <span className="font-brutal text-sm sm:text-lg lg:text-xl font-bold text-zinc-400 truncate w-full">
                    No previous project
                  </span>
                </div>
              )}
            </div>

            {/* Center: Counter (Desktop) */}
            <div className="hidden sm:flex flex-col items-center justify-center text-center">
              <span className="font-mono text-sm sm:text-base font-bold text-zinc-900 tracking-wider">
                {currentNum.toString().padStart(2, "0")} /{" "}
                {totalNum.toString().padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mt-0.5">
                Archive Index
              </span>
            </div>

            {/* Next */}
            <div className="flex justify-end min-w-0 text-right">
              {nextProject ? (
                <TransitionLink
                  href={`/projects/${nextProject.slug}`}
                  className="group flex flex-col items-end space-y-1 text-right min-w-0 w-full"
                >
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-widest group-hover:text-zinc-700 transition-colors">
                    <span className="truncate">Next Project</span>
                    <svg
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 group-hover:translate-x-1 shrink-0"
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
                  </span>
                  <span className="font-brutal text-sm sm:text-lg lg:text-xl font-bold text-zinc-900 group-hover:text-black truncate w-full transition-colors">
                    {nextProject.title}
                  </span>
                </TransitionLink>
              ) : (
                <div className="opacity-30 flex flex-col items-end space-y-1 select-none text-right min-w-0 w-full">
                  <span className="font-mono text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-widest">
                    Last Project
                  </span>
                  <span className="font-brutal text-sm sm:text-lg lg:text-xl font-bold text-zinc-400 truncate w-full">
                    End of archive
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* =====================================================================
            ANOTHER PROJECTS / DISCOVER MORE CRAFT
           ===================================================================== */}
        {anotherProjects.length > 0 && (
          <div className="mt-14 sm:mt-18">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: REACTBITS_EASE }}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10"
            >
              <div className="flex flex-col space-y-2 text-left">
                <h2 className="font-mono text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
                  DISCOVER // MORE CRAFT
                </h2>
                <h3 className="font-brutal text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.035em] text-zinc-950 leading-[1.1]">
                  Explore Related Projects
                </h3>
              </div>

              <TransitionLink
                href="/projects"
                className="font-mono text-xs text-zinc-500 hover:text-zinc-950 uppercase tracking-wider font-semibold inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto group"
              >
                <span>View Full Archive</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </TransitionLink>
            </motion.div>

            {/* Grid Matching ProjectSection.tsx card aesthetic */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {anotherProjects.slice(0, 3).map(
                ({ title, slug, description, techStack, coverImage, category }, index) => (
                  <motion.div
                    key={slug}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.65,
                      ease: REACTBITS_EASE,
                      delay: index * 0.06,
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
                          {(index + 1).toString().padStart(2, "0")}
                        </span>
                      </div>

                      <h4 className="font-bold text-base sm:text-lg text-zinc-900 group-hover:text-black transition-colors duration-200 mb-2 line-clamp-1">
                        {title}
                      </h4>
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
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
