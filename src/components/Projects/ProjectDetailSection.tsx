"use client";

import Image from "next/image";
import Link from "next/link";
import ProjectImages from "@/components/Projects/ProjectImages";
import { useLoading } from "@/context/LoadingContext";

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

  const { startLoading } = useLoading();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="py-4 sm:py-6 lg:py-8 flex items-center justify-between">
          <Link
            href="/projects"
            onClick={startLoading}
            className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-white dark:bg-slate-900 border border-sky-200 dark:border-slate-700 shadow hover:shadow-lg hover:shadow-sky-400/25 hover:bg-sky-50 dark:hover:bg-sky-800 hover:border-sky-400 dark:hover:border-sky-500 text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-white font-semibold transition-all duration-300 active:scale-95 active:translate-y-0.5 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm sm:text-base"
            style={{
              transitionProperty:
                "background, border, color, box-shadow, transform",
            }}
          >
            <svg
              className="w-4 h-4 transition-transform duration-150 group-hover:-translate-x-0.5"
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
            <span className="hidden xs:inline sm:inline">Back to Projects</span>
            <span className="xs:hidden sm:hidden">Back</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 pb-8 sm:pb-12 lg:pb-16">
          {/* Images (Client Component) */}
          <div className="lg:col-span-3">
            <ProjectImages images={allImages} title={project.title} />
          </div>

          {/* Right Column - Project Info */}
          <div className="lg:col-span-2 flex flex-col space-y-4 sm:space-y-6">
            {/* Header Section */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-sky-900 dark:text-white leading-tight">
                {project.title}
              </h1>
              {/* Status Badge */}
              <div className="flex items-center">
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full ${
                    project.url
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      project.url
                        ? "bg-green-500 animate-pulse"
                        : "bg-amber-500 animate-pulse"
                    }`}
                  />
                  {project.url ? "Live Project" : "Local Project"}
                </span>
              </div>
            </div>

            {/* Technologies Section */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-sky-900 dark:text-sky-300">
                  Built with
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="group relative px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-sky-50 to-sky-100/80 dark:from-sky-900/40 dark:to-sky-800/30 text-sky-700 dark:text-sky-300 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl border border-sky-200/60 dark:border-sky-700/50 hover:from-sky-100 hover:to-sky-50 dark:hover:from-sky-800/60 dark:hover:to-sky-700/40 hover:border-sky-300 dark:hover:border-sky-600 hover:text-sky-800 dark:hover:text-sky-200 transition-all duration-300 cursor-default"
                    >
                      <span className="relative z-10">{tech}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-sky-400/10 to-sky-300/10 dark:from-sky-500/10 dark:to-sky-400/10 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Button */}
            {project.url && (
              <div className="pt-1 sm:pt-2">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 dark:from-sky-500 dark:to-sky-400 dark:hover:from-sky-600 dark:hover:to-sky-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:shadow-sky-400/25 transform hover:-translate-y-0.5 transition-all duration-300 group text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start"
                >
                  <span>View Live Project</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
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
                </a>
              </div>
            )}

            {/* Description Section */}
            <div className="flex-1 pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-800">
              <h2 className="text-sm sm:text-base lg:text-lg font-bold text-sky-900 dark:text-sky-300 mb-3 sm:mb-4">
                About This Project
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Another Projects Section */}
        {anotherProjects.length > 0 && (
          <div className="mt-8 sm:mt-12">
            {/* Pagination */}
            <div className="flex items-center justify-between mb-6 sm:mb-8 gap-2 sm:gap-4">
              {/* Previous Button */}
              <div>
                {prevProject ? (
                  <Link
                    href={`/projects/${prevProject.slug}`}
                    onClick={startLoading}
                    className="flex items-center gap-1 sm:gap-2 justify-center w-12 h-10 sm:w-auto sm:min-w-[120px] sm:h-12 px-2 sm:px-4 rounded-full bg-white dark:bg-slate-900 border border-sky-200 dark:border-slate-700 shadow hover:shadow-lg hover:shadow-sky-400/25 hover:bg-sky-50 dark:hover:bg-sky-800 hover:border-sky-400 dark:hover:border-sky-500 text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-white font-semibold transition-all duration-300 active:scale-95 active:translate-y-0.5 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-sky-400 text-xs sm:text-sm"
                    aria-label="Previous Project"
                    style={{
                      transitionProperty:
                        "background, border, color, box-shadow, transform",
                    }}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 dark:text-sky-400 group-hover:-translate-x-1 transition-transform duration-150"
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
                    <span className="hidden sm:inline truncate">Previous</span>
                  </Link>
                ) : (
                  <div className="flex items-center gap-1 sm:gap-2 justify-center w-12 h-10 sm:w-auto sm:min-w-[120px] sm:h-12 px-2 sm:px-4 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 opacity-30 font-semibold text-slate-400 text-xs sm:text-sm">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
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
                    <span className="hidden sm:inline truncate">Previous</span>
                  </div>
                )}
              </div>

              {/* Center Info */}
              <div className="flex-1 flex flex-col items-center justify-center min-w-0">
                <div className="w-full max-w-[180px] sm:max-w-xs rounded-full bg-white dark:bg-slate-900 border border-sky-200 dark:border-slate-700 shadow-sm px-3 py-1.5 sm:px-4 sm:py-2 flex flex-col items-center justify-center">
                  <span className="text-sm sm:text-base lg:text-lg font-bold text-sky-600 dark:text-sky-400">
                    {(
                      (allProjects?.findIndex((p) => p.slug === project.slug) ||
                        0) + 1
                    )
                      .toString()
                      .padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
                    of {(allProjects?.length || 0).toString().padStart(2, "0")}{" "}
                    projects
                  </span>
                </div>
              </div>

              {/* Next Button */}
              <div>
                {nextProject ? (
                  <Link
                    href={`/projects/${nextProject.slug}`}
                    onClick={startLoading}
                    className="flex items-center gap-1 sm:gap-2 justify-center w-12 h-10 sm:w-auto sm:min-w-[120px] sm:h-12 px-2 sm:px-4 rounded-full bg-white dark:bg-slate-900 border border-sky-200 dark:border-slate-700 shadow hover:shadow-lg hover:shadow-sky-400/25 hover:bg-sky-50 dark:hover:bg-sky-800 hover:border-sky-400 dark:hover:border-sky-500 text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-white font-semibold transition-all duration-300 active:scale-95 active:translate-y-0.5 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-sky-400 text-xs sm:text-sm"
                    aria-label="Next Project"
                    style={{
                      transitionProperty:
                        "background, border, color, box-shadow, transform",
                    }}
                  >
                    <span className="hidden sm:inline truncate">Next</span>
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform duration-150"
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
                  </Link>
                ) : (
                  <div className="flex items-center gap-1 sm:gap-2 justify-center w-12 h-10 sm:w-auto sm:min-w-[120px] sm:h-12 px-2 sm:px-4 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 opacity-30 font-semibold text-slate-400 text-xs sm:text-sm">
                    <span className="hidden sm:inline truncate">Next</span>
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
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
                  </div>
                )}
              </div>
            </div>

            {/* Section Title */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-sky-900 dark:text-white">
                Another Projects
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-sky-200 to-transparent dark:from-sky-800 dark:to-transparent"></div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {anotherProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  onClick={startLoading}
                  className="group relative bg-white/50 dark:bg-slate-800/50 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg hover:shadow-sky-400/40 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] flex flex-col mb-4 sm:mb-8"
                >
                  {/* Corner borders */}
                  <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 border-t-2 border-r-2 rounded-tr-xl sm:rounded-tr-2xl transition-all duration-300 border-muted-foreground/30 group-hover:border-sky-500 group-hover:w-8 group-hover:h-8 sm:group-hover:w-12 sm:group-hover:h-12 lg:group-hover:w-16 lg:group-hover:h-16 z-10" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 border-b-2 border-l-2 rounded-bl-xl sm:rounded-bl-2xl transition-all duration-300 border-muted-foreground/30 group-hover:border-sky-500 group-hover:w-8 group-hover:h-8 sm:group-hover:w-12 sm:group-hover:h-12 lg:group-hover:w-16 lg:group-hover:h-16 z-10" />

                  <div className="p-2.5 sm:p-3 lg:p-4 xl:p-5">
                    <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-black rounded-md sm:rounded-lg overflow-hidden">
                      {/* Mobile-only clickable icon button */}
                      <button
                        type="button"
                        className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-20 sm:hidden bg-white/80 dark:bg-slate-900/80 rounded-full p-1.5 sm:p-2 shadow hover:bg-sky-100 dark:hover:bg-sky-800 transition"
                        aria-label="View Project"
                        tabIndex={-1}
                      >
                        {/* Eye icon */}
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 dark:text-sky-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                      <Image
                        src={p.coverImage || "/placeholder.svg"}
                        alt={p.title}
                        fill
                        sizes="(max-width: 480px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                        className="object-cover rounded-md sm:rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="px-2.5 sm:px-3 lg:px-4 xl:px-5 pb-2.5 sm:pb-3 lg:pb-4 xl:pb-5 flex flex-col flex-grow">
                    <h4 className="font-bold text-xs sm:text-sm lg:text-xs xl:text-sm text-slate-800 dark:text-neutral-100 line-clamp-1 group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors duration-300 mb-1.5 sm:mb-2">
                      {p.title}
                    </h4>
                    <p className="text-[10px] sm:text-xs lg:text-[10px] xl:text-xs text-slate-600 dark:text-neutral-400 line-clamp-2 mb-1.5 sm:mb-2">
                      {p.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
