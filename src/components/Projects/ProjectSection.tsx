"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLoading } from "@/context/LoadingContext";
import useProjectSectionAnimations from "@/hooks/useProjectSectionAnimations";
import dynamic from "next/dynamic";
import { useTheme } from "@/context/ThemeContext";

type ProjectPublic = {
  title: string;
  slug: string;
  description: string;
  techStack: string[] | null;
  coverImage: string;
  url?: string | null;
};

interface ProjectSectionProps {
  projects: ProjectPublic[];
}

const GitHubCalendar = dynamic(() => import("react-github-calendar"), {
  ssr: false,
});

export default function ProjectSection({ projects }: ProjectSectionProps) {
  const [displayedProjects, setDisplayedProjects] = useState<ProjectPublic[]>(
    []
  );
  const [showAll, setShowAll] = useState(false);
  const { startLoading } = useLoading();
  const sectionRef = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>;
  useProjectSectionAnimations(sectionRef);
  const { theme } = useTheme();

  const MAX_PROJECTS = 6;

  useEffect(() => {
    setDisplayedProjects(projects.slice(0, MAX_PROJECTS));
    setShowAll(false);
  }, [projects]);

  const handleShowMore = () => {
    setDisplayedProjects(projects);
    setShowAll(true);
  };

  const handleShowLess = () => {
    setDisplayedProjects(projects.slice(0, MAX_PROJECTS));
    setShowAll(false);
  };

  // Konsisten: jika data belum ada, return null
  if (!projects) return null;

  return (
    <section
      ref={sectionRef}
      className="max-w-6xl mx-auto py-12 px-4"
      data-projects-section
    >
      {/* Header Section */}
      <div className="text-center mb-8 sm:mb-12">
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-sky-900 dark:text-white"
          data-projects-content
        >
          My Projects
        </h2>
        <p
          className="text-base sm:text-lg text-slate-600 dark:text-neutral-300 mb-8"
          data-projects-content
        >
          List of my projects that I have done and currently working on.
        </p>
      </div>

      {/* Github Contribution Calendar Section */}
      <div className="w-full flex justify-center mb-8">
        <div className="w-full max-w-6xl bg-white/50 dark:bg-slate-800/50 rounded-xl p-0 border border-slate-200 dark:border-slate-700 shadow-md backdrop-blur-sm overflow-x-auto flex justify-center items-center">
          <div className="w-full px-4 py-6 sm:px-8 sm:py-8 flex justify-center items-center">
            <GitHubCalendar
              username="TugusArtaa"
              blockSize={15}
              blockMargin={4}
              fontSize={12}
              hideTotalCount={false}
              hideColorLegend={false}
              showWeekdayLabels={true}
              maxLevel={4}
              colorScheme={theme === "dark" ? "dark" : "light"}
              theme={{
                light: ["#fefefe", "#7dd3fc", "#38bdf8", "#0ea5e9", "#0369a1"],
                dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
              }}
              labels={{
                totalCount:
                  "{{count}} contributions in the last year (Public Repo)",
              }}
            />
          </div>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 sm:py-16">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">
            Tidak ada project.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-8">
            {displayedProjects.map(
              (
                { title, slug, description, techStack, coverImage, url },
                idx
              ) => (
                <div
                  key={slug}
                  className="group relative bg-white/50 dark:bg-slate-800/50 rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:shadow-sky-400/40 border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] flex flex-col h-full"
                  data-project-card
                >
                  {/* Corner borders */}
                  <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 rounded-tr-2xl transition-all duration-300 border-muted-foreground/30 group-hover:border-sky-500 group-hover:w-12 group-hover:h-12 sm:group-hover:w-16 sm:group-hover:h-16 z-10" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-l-2 rounded-bl-2xl transition-all duration-300 border-muted-foreground/30 group-hover:border-sky-500 group-hover:w-12 group-hover:h-12 sm:group-hover:w-16 sm:group-hover:h-16 z-10" />

                  {/* Project Image */}
                  <div className="p-4 sm:p-5">
                    <div className="relative overflow-hidden aspect-video bg-gradient-to-br from-slate-900 to-black rounded-lg group/image">
                      <Image
                        src={coverImage || "/placeholder.svg"}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 relative z-10 flex flex-col flex-grow">
                    {/* Title */}
                    <h3 className="font-bold text-sm sm:text-base lg:text-lg text-slate-800 dark:text-neutral-100 line-clamp-2 group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors duration-300 mb-2">
                      {title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 line-clamp-3 mb-3 flex-grow">
                      {description}
                    </p>

                    {/* Tech Stack */}
                    {techStack && techStack.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1.5">
                          {techStack.slice(0, 2).map((tech, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 text-xs font-medium rounded-md"
                            >
                              {tech}
                            </span>
                          ))}
                          {techStack.length > 2 && (
                            <span className="inline-flex items-center px-2 py-0.5 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 text-xs font-medium rounded-md">
                              +{techStack.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="flex justify-end mt-auto">
                      {/* Detail Button */}
                      <Link
                        href={`/projects/${slug}`}
                        onClick={startLoading}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 dark:from-sky-500 dark:to-sky-400 dark:hover:from-sky-600 dark:hover:to-sky-500 text-white text-xs font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-sky-400/40 transform hover:-translate-y-0.5"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Show More/Less Button */}
          {projects.length > MAX_PROJECTS && (
            <div className="text-center mt-8">
              <button
                onClick={showAll ? handleShowLess : handleShowMore}
                className="cursor-pointer inline-flex items-center px-6 py-3 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 dark:from-sky-500 dark:to-sky-400 dark:hover:from-sky-600 dark:hover:to-sky-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-sky-400/40 transform hover:-translate-y-1"
              >
                {showAll
                  ? "Show Less"
                  : `Show More (${projects.length - MAX_PROJECTS})`}
                <svg
                  className={`ml-2 w-4 h-4 transition-transform duration-300 ${
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
        </>
      )}
    </section>
  );
}
