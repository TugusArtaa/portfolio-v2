"use client";
import type React from "react";
import { useState, useEffect, useRef } from "react";
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

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

export default function ProjectSection({ projects }: ProjectSectionProps) {
  const [displayedProjects, setDisplayedProjects] = useState<ProjectPublic[]>(
    []
  );
  const [showAll, setShowAll] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [animationData, setAnimationData] = useState(null);
  const { startLoading } = useLoading();
  const sectionRef = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>;
  useProjectSectionAnimations(sectionRef);
  const { theme } = useTheme();
  const MAX_PROJECTS = 6;

  // Load Lottie animation
  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch("/animations/Animation-Project.json");
        if (response.ok) {
          const data = await response.json();
          setAnimationData(data);
        }
      } catch (error) {
        console.log("Animation file not found, using fallback");
      }
    };
    loadAnimation();
  }, []);

  // Track window width for responsive calendar
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Responsive calendar settings
  const getCalendarSettings = () => {
    if (windowWidth < 480) {
      // Extra small screens - very large size
      return {
        blockSize: 18,
        blockMargin: 4,
        fontSize: 13,
        showWeekdayLabels: false,
        hideColorLegend: false,
      };
    } else if (windowWidth < 640) {
      // Small screens - large size
      return {
        blockSize: 16,
        blockMargin: 4,
        fontSize: 13,
        showWeekdayLabels: false,
        hideColorLegend: false,
      };
    } else if (windowWidth < 768) {
      // Medium screens
      return {
        blockSize: 15,
        blockMargin: 3,
        fontSize: 12,
        showWeekdayLabels: true,
        hideColorLegend: false,
      };
    } else if (windowWidth < 1024) {
      // Large screens
      return {
        blockSize: 15,
        blockMargin: 3,
        fontSize: 12,
        showWeekdayLabels: true,
        hideColorLegend: false,
      };
    } else {
      // Extra large screens
      return {
        blockSize: 16,
        blockMargin: 4,
        fontSize: 13,
        showWeekdayLabels: true,
        hideColorLegend: false,
      };
    }
  };
  const calendarSettings = getCalendarSettings();

  // Calculate real data for statistics
  const totalProjects = projects.length;
  const uniqueTechStack = new Set(projects.flatMap((p) => p.techStack || []))
    .size;

  if (!projects) return null;

  return (
    <section
      ref={sectionRef}
      className="max-w-7xl mx-auto py-8 px-4"
      data-projects-section
    >
      {/* Header Section with Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 items-center mb-6 sm:mb-8 lg:mb-12">
        {/* Left Column - Text Content and Statistics */}
        <div
          className="order-2 lg:order-1 space-y-4 sm:space-y-5 text-left"
          data-projects-content
        >
          {/* Main Title (My Projects) and Subtitle */}
          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-sky-900 dark:text-white leading-tight">
              My Projects
            </h2>
            <p className="text-slate-600 dark:text-neutral-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
              List of my projects that I have done and currently working on.
            </p>
          </div>

          {/* Statistics Section (using real data from projects prop) */}
          <div className="flex flex-wrap gap-2 sm:gap-3 pt-2 sm:pt-3">
            <div className="flex items-center gap-2 sm:gap-3 bg-white/30 dark:bg-slate-700/30 px-3 sm:px-4 py-2 sm:py-3 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex-shrink-0 w-6 sm:w-8 h-6 sm:h-8 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 sm:w-4 h-3 sm:h-4 text-sky-600 dark:text-sky-400"
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
              <span className="text-base sm:text-lg lg:text-xl font-bold text-sky-600 dark:text-sky-400">
                {totalProjects}
              </span>
              <span className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-neutral-400">
                Total Projects
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-white/30 dark:bg-slate-700/30 px-3 sm:px-4 py-2 sm:py-3 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex-shrink-0 w-6 sm:w-8 h-6 sm:h-8 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 sm:w-4 h-3 sm:h-4 text-sky-600 dark:text-sky-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <span className="text-base sm:text-lg lg:text-xl font-bold text-sky-600 dark:text-sky-400">
                {uniqueTechStack}
              </span>
              <span className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-neutral-400">
                Technologies Used
              </span>
            </div>
          </div>

          {/* Scroll Down Button - Hidden on mobile */}
          <div className="pt-3 sm:pt-4 lg:pt-6 hidden sm:block">
            <button
              onClick={() => {
                // This selector already targets the "Github Contribution Calendar Section"
                document
                  .querySelector("[data-projects-section] > div:nth-child(2)")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
              }}
              className="group inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-all duration-300 font-medium text-sm border-b border-transparent hover:border-sky-600 dark:hover:border-sky-400 pb-1"
            >
              View Projects Below
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
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
        </div>
        {/* Right Column - Clean Lottie Animation */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] 2xl:w-[36rem] 2xl:h-[36rem] flex items-center justify-center">
            {animationData && Lottie && (
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                className="w-full h-full"
              />
            )}
          </div>
        </div>
      </div>
      {/* Github Contribution Calendar Section */}
      <div className="w-full mb-6">
        <div className="relative w-full max-w-7xl mx-auto bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 shadow-md backdrop-blur-sm overflow-hidden">
          {/* Corner borders */}
          <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 rounded-tr-xl border-slate-300 dark:border-slate-600 z-10" />
          <div className="absolute bottom-0 left-0 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-l-2 rounded-bl-xl border-slate-300 dark:border-slate-600 z-10" />

          {/* Calendar Header */}
          <div className="text-center pt-6 px-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">
              GitHub Contribution Activity
            </h3>
          </div>

          {/* Calendar Container with moderate height and responsive padding */}
          <div className="w-full px-3 py-4 xs:px-4 xs:py-5 sm:px-6 sm:py-6 md:px-8 md:py-8">
            <div className="overflow-x-auto">
              <div className="min-w-fit flex justify-center items-center min-h-[160px] sm:min-h-[180px] md:min-h-[200px]">
                {windowWidth > 0 && (
                  <GitHubCalendar
                    username="TugusArtaa"
                    blockSize={calendarSettings.blockSize}
                    blockMargin={calendarSettings.blockMargin}
                    fontSize={calendarSettings.fontSize}
                    hideTotalCount={false}
                    hideColorLegend={calendarSettings.hideColorLegend}
                    showWeekdayLabels={calendarSettings.showWeekdayLabels}
                    maxLevel={4}
                    colorScheme={theme === "dark" ? "dark" : "light"}
                    theme={{
                      light: [
                        "#fefefe",
                        "#7dd3fc",
                        "#38bdf8",
                        "#0ea5e9",
                        "#0369a1",
                      ],
                      dark: [
                        "#161b22",
                        "#0e4429",
                        "#006d32",
                        "#26a641",
                        "#39d353",
                      ],
                    }}
                    labels={{
                      totalCount:
                        "{{count}} contributions in the last year (Public Repo)",
                    }}
                  />
                )}
              </div>
            </div>
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
