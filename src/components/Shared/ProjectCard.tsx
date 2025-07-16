"use client";

import Link from "next/link";
import { Project } from "@prisma/client";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  index: number;
  onDelete: (project: Project) => void;
  formatDate: (dateString: string) => string;
  showActions?: boolean;
  variant?: "admin" | "public";
}

export default function ProjectCard({
  project,
  index,
  onDelete,
  formatDate,
  showActions = true,
  variant = "admin",
}: ProjectCardProps) {
  return (
    <div
      className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-md hover:shadow-lg border border-white/40 dark:border-slate-700/40 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-all duration-500 overflow-hidden transform hover:-translate-y-1 hover:scale-[1.0]"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Project Image with Overlay - Updated to aspect-video */}
      <div className="relative aspect-video overflow-hidden rounded-t-3xl">
        {project.coverImage ? (
          <>
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </>
        ) : (
          <div className="h-full bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-slate-700 dark:via-slate-600 dark:to-slate-500 flex items-center justify-center group-hover:from-blue-200 group-hover:via-indigo-200 group-hover:to-purple-200 dark:group-hover:from-slate-600 dark:group-hover:via-slate-500 dark:group-hover:to-slate-400 transition-colors duration-500">
            <div className="text-center">
              <svg
                className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                No Image
              </span>
            </div>
          </div>
        )}

        {/* Status indicator */}
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/50 backdrop-blur-sm rounded-full px-2 py-1 border border-green-200 dark:border-green-700">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-700 dark:text-green-300 text-xs font-semibold">
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Project Title */}
        <div className="mb-3">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-2 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              {formatDate(
                typeof project.updatedAt === "string"
                  ? project.updatedAt
                  : project.updatedAt instanceof Date
                  ? project.updatedAt.toISOString()
                  : ""
              )}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-4 h-4 text-slate-500 dark:text-slate-400"
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
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Tech Stack
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.techStack
              .slice(0, 3)
              .map((tech: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full border border-blue-200/60 dark:border-blue-700/40 hover:scale-105 transition-transform duration-200"
                >
                  {tech}
                </span>
              ))}
            {project.techStack.length > 3 && (
              <span className="inline-flex items-center px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs font-semibold rounded-full border border-slate-200 dark:border-slate-600">
                +{project.techStack.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {showActions && variant === "admin" && (
          <div className="flex gap-3">
            <Link
              href={`/admin/projects/${project.id}/edit`}
              className="flex-1 group/btn relative overflow-hidden inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
              <svg
                className="relative w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <span className="relative">Edit</span>
            </Link>

            <button
              onClick={() => onDelete(project)}
              className="group/btn relative overflow-hidden inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40 text-red-700 dark:text-red-400 text-sm font-semibold rounded-xl hover:from-red-200 hover:to-red-300 dark:hover:from-red-800/60 dark:hover:to-red-700/60 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-200/0 via-red-200/40 to-red-200/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
              <svg
                className="relative w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Progress Bar Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-400/20 to-transparent rounded-tr-3xl transform rotate-45 translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500"></div>
    </div>
  );
}
