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
      className="group relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-sm hover:shadow-md border border-black/10 hover:border-black/30 transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Project Image with Overlay - Updated to aspect-video */}
      <div className="relative aspect-video overflow-hidden rounded-t-3xl bg-zinc-100">
        {project.coverImage ? (
          <>
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </>
        ) : (
          <div className="h-full bg-zinc-100 flex items-center justify-center">
            <div className="text-center">
              <svg
                className="w-12 h-12 text-zinc-400 mx-auto mb-2"
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
              <span className="text-xs text-zinc-400 font-medium">
                No Image
              </span>
            </div>
          </div>
        )}

        {/* Status indicator */}
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1 bg-emerald-50 backdrop-blur-sm rounded-full px-2.5 py-1 border border-emerald-200">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-emerald-700 text-xs font-semibold">
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Project Title */}
        <div className="mb-3">
          <h3 className="font-bold text-lg text-black line-clamp-2 mb-1 group-hover:text-zinc-700 transition-colors duration-200">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
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
        <p className="text-zinc-600 text-sm line-clamp-3 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-4 h-4 text-zinc-400"
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
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
              Tech Stack
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.techStack
              .slice(0, 3)
              .map((tech: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-1 bg-zinc-100 text-zinc-800 text-xs font-medium rounded-full border border-black/5"
                >
                  {tech}
                </span>
              ))}
            {project.techStack.length > 3 && (
              <span className="inline-flex items-center px-2.5 py-1 bg-zinc-100 text-zinc-500 text-xs font-medium rounded-full border border-black/5">
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
              className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-sm font-semibold rounded-xl transition-all duration-200"
            >
              <svg
                className="w-4 h-4 mr-2"
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
              <span>Edit</span>
            </Link>

            <button
              onClick={() => onDelete(project)}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-sm font-semibold rounded-xl transition-all duration-200"
            >
              <svg
                className="w-4 h-4"
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

      {/* Subtle border bottom hover indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
}
