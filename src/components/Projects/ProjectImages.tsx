"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProjectImages({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="lg:col-span-3 space-y-6">
      {/* Main Image */}
      <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl lg:rounded-2xl overflow-hidden shadow-lg ring-1 ring-slate-200 dark:ring-slate-700">
        <Image
          src={images[activeImageIndex] || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 55vw"
        />
      </div>
      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 pt-2 px-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={`relative flex-shrink-0 w-16 h-11 sm:w-18 sm:h-12 lg:w-20 lg:h-14 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ring-2 ${
                index === activeImageIndex
                  ? "ring-sky-500 ring-offset-2 dark:ring-offset-slate-900 scale-105"
                  : "ring-transparent hover:ring-slate-300 dark:hover:ring-slate-600 hover:ring-offset-2 dark:hover:ring-offset-slate-900 hover:scale-105"
              }`}
              type="button"
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${title} - ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 64px, (max-width: 1024px) 72px, 80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
