"use client";

import Image from "next/image";

interface ProjectPreviewProps {
  title: string;
  description: string;
  techStack: string;
  previewImage: string;
}

export default function ProjectPreview({
  title,
  description,
  techStack,
  previewImage,
}: ProjectPreviewProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-black/10 overflow-hidden">
      <div className="aspect-video relative overflow-hidden bg-zinc-100">
        {previewImage ? (
          <Image
            src={previewImage}
            alt="Preview"
            fill
            className="w-full h-full object-cover"
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        ) : (
          <div className="h-full bg-zinc-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-zinc-400"
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
          </div>
        )}
      </div>

      {/* Content Preview */}
      <div className="p-4">
        <h4 className="font-bold text-black line-clamp-1 mb-2">
          {title || "Judul Proyek"}
        </h4>
        <p className="text-zinc-600 text-sm line-clamp-2 mb-3">
          {description || "Deskripsi proyek akan muncul di sini..."}
        </p>

        {/* Tech Stack Preview */}
        {techStack && (
          <div className="flex flex-wrap gap-1">
            {techStack
              .split(",")
              .slice(0, 2)
              .map((tech, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-0.5 bg-zinc-100 text-zinc-800 text-xs font-medium rounded-md border border-black/5"
                >
                  {tech.trim()}
                </span>
              ))}
            {techStack.split(",").length > 2 && (
              <span className="inline-block px-2 py-0.5 bg-zinc-100 text-zinc-500 text-xs font-medium rounded-md border border-black/5">
                +{techStack.split(",").length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
