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
            className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-white border border-zinc-200 shadow-sm hover:shadow-md hover:bg-zinc-100 hover:border-zinc-300 text-zinc-700 hover:text-zinc-950 font-semibold transition-all duration-300 active:scale-95 active:translate-y-0.5 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-zinc-400 text-sm sm:text-base"
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 pb-8 sm:pb-12 lg:pb-16">
          {/* Images Section */}
          <div className="lg:col-span-3">
            <ProjectImages images={allImages} title={project.title} />
          </div>

          {/* Project Info Section */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            {/* Title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-zinc-900 leading-tight">
              {project.title}
            </h1>

            {/* Status Badge */}
            <div className="flex">
              <span
                className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full bg-zinc-100 text-zinc-800 border border-zinc-200`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    project.url
                      ? project.url.includes("github.com") ||
                        project.url.includes("gitlab.com")
                        ? "bg-zinc-400 animate-pulse"
                        : "bg-emerald-500 animate-pulse"
                      : "bg-zinc-400 animate-pulse"
                  }`}
                />
                {project.url
                  ? project.url.includes("github.com") ||
                    project.url.includes("gitlab.com")
                    ? "Local Project"
                    : "Live Project"
                  : "Local Project"}
              </span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-zinc-200 to-transparent" />

            {/* About This Project */}
            <div className="space-y-3">
              <h2 className="text-sm sm:text-base lg:text-lg font-bold text-zinc-900">
                About This Project
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-sm sm:text-md lg:text-base text-zinc-600 leading-relaxed text-justify">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Built With */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-zinc-900">
                  Built with
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-zinc-100 text-zinc-800 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl border border-zinc-200 hover:border-zinc-400 transition-all duration-300 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Project Links */}
            {project.url && (
              <div className="space-y-3">
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-zinc-900">
                  Project Links
                </h3>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 group text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start"
                >
                  <span>
                    {project.url &&
                    (project.url.includes("github.com") ||
                      project.url.includes("gitlab.com"))
                      ? "View Source Code"
                      : "Live Project"}
                  </span>
                  {project.url &&
                  (project.url.includes("github.com") ||
                    project.url.includes("gitlab.com")) ? (
                    // GitHub icon
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.867 8.184 6.839 9.525.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.646.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.747-1.025 2.747-1.025.546 1.378.202 2.396.099 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.579.688.481C19.135 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                    </svg>
                  ) : (
                    // External link icon
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
                  )}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Another Projects Section */}
        {anotherProjects.length > 0 && (
          <div className="mt-8 sm:mt-12 space-y-6 sm:space-y-8">
            {/* Pagination */}
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              {/* Previous Button */}
              <div>
                {prevProject ? (
                  <Link
                    href={`/projects/${prevProject.slug}`}
                    onClick={startLoading}
                    className="flex items-center gap-1 sm:gap-2 justify-center w-12 h-10 sm:w-auto sm:min-w-[120px] sm:h-12 px-2 sm:px-4 rounded-full bg-white border border-zinc-200 shadow-sm hover:shadow-md hover:bg-zinc-100 hover:border-zinc-300 text-zinc-700 hover:text-zinc-950 font-semibold transition-all duration-300 active:scale-95 active:translate-y-0.5 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-zinc-400 text-xs sm:text-sm"
                    aria-label="Previous Project"
                    style={{
                      transitionProperty:
                        "background, border, color, box-shadow, transform",
                    }}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-700 group-hover:-translate-x-1 transition-transform duration-150"
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
                  <div className="flex items-center gap-1 sm:gap-2 justify-center w-12 h-10 sm:w-auto sm:min-w-[120px] sm:h-12 px-2 sm:px-4 rounded-full bg-zinc-100 border border-zinc-200 opacity-30 font-semibold text-zinc-400 text-xs sm:text-sm">
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
                <div className="w-full max-w-[180px] sm:max-w-xs rounded-full bg-white border border-zinc-200 shadow-sm px-3 py-1.5 sm:px-4 sm:py-2 flex flex-col items-center justify-center">
                  <span className="text-sm sm:text-base lg:text-lg font-bold text-zinc-900">
                    {(
                      (allProjects?.findIndex((p) => p.slug === project.slug) ||
                        0) + 1
                    )
                      .toString()
                      .padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-xs text-zinc-500">
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
                    className="flex items-center gap-1 sm:gap-2 justify-center w-12 h-10 sm:w-auto sm:min-w-[120px] sm:h-12 px-2 sm:px-4 rounded-full bg-white border border-zinc-200 shadow-sm hover:shadow-md hover:bg-zinc-100 hover:border-zinc-300 text-zinc-700 hover:text-zinc-950 font-semibold transition-all duration-300 active:scale-95 active:translate-y-0.5 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-zinc-400 text-xs sm:text-sm"
                    aria-label="Next Project"
                    style={{
                      transitionProperty:
                        "background, border, color, box-shadow, transform",
                    }}
                  >
                    <span className="hidden sm:inline truncate">Next</span>
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-700 group-hover:translate-x-1 transition-transform duration-150"
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
                  <div className="flex items-center gap-1 sm:gap-2 justify-center w-12 h-10 sm:w-auto sm:min-w-[120px] sm:h-12 px-2 sm:px-4 rounded-full bg-zinc-100 border border-zinc-200 opacity-30 font-semibold text-zinc-400 text-xs sm:text-sm">
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
            <div className="flex items-center gap-3 sm:gap-4">
              <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-zinc-900">
                Another Projects
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-zinc-200 to-transparent" />
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {anotherProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  onClick={startLoading}
                  className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-200 shadow-sm hover:shadow-xl hover:shadow-black/10 transition-all duration-300 hover:-translate-y-1 flex flex-col mb-4 sm:mb-8"
                >
                  {/* Corner borders */}
                  <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 border-t-2 border-r-2 rounded-tr-xl sm:rounded-tr-2xl transition-all duration-300 border-zinc-300 group-hover:border-zinc-900 group-hover:w-8 group-hover:h-8 sm:group-hover:w-12 sm:group-hover:h-12 lg:group-hover:w-16 lg:group-hover:h-16 z-10" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 border-b-2 border-l-2 rounded-bl-xl sm:rounded-bl-2xl transition-all duration-300 border-zinc-300 group-hover:border-zinc-900 group-hover:w-8 group-hover:h-8 sm:group-hover:w-12 sm:group-hover:h-12 lg:group-hover:w-16 lg:group-hover:h-16 z-10" />

                  {/* Image Container */}
                  <div className="p-2.5 sm:p-3 lg:p-4 xl:p-5">
                    <div className="relative aspect-video bg-zinc-900 rounded-md sm:rounded-lg overflow-hidden">
                      {/* Mobile-only clickable icon button */}
                      <button
                        type="button"
                        className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-20 sm:hidden bg-white/90 rounded-full p-1.5 sm:p-2 shadow hover:bg-zinc-100 transition"
                        aria-label="View Project"
                        tabIndex={-1}
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-800"
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

                  {/* Project Info */}
                  <div className="px-2.5 sm:px-3 lg:px-4 xl:px-5 pb-2.5 sm:pb-3 lg:pb-4 xl:pb-5 flex flex-col flex-grow space-y-1.5 sm:space-y-2">
                    <h4 className="font-bold text-xs sm:text-sm lg:text-xs xl:text-sm text-zinc-900 line-clamp-1 group-hover:text-zinc-950 transition-colors duration-300">
                      {p.title}
                    </h4>
                    <p className="text-[10px] sm:text-xs lg:text-[10px] xl:text-xs text-zinc-600 line-clamp-2">
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
