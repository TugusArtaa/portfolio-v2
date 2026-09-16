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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setIsModalOpen(false);
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  };

  return (
    <>
      <div className="lg:col-span-3 space-y-6">
        {/* Main Image */}
        <div className="relative aspect-video bg-zinc-100 rounded-xl lg:rounded-2xl overflow-hidden shadow-lg ring-1 ring-zinc-200 group">
          <Image
            src={images[activeImageIndex] || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 55vw"
          />

          {/* Fullscreen Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 p-2 sm:p-2.5 bg-zinc-900/80 hover:bg-zinc-900 text-white rounded-lg transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm"
            type="button"
            aria-label="View fullscreen"
          >
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
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          </button>
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
                    ? "ring-zinc-900 ring-offset-2 scale-105"
                    : "ring-transparent hover:ring-zinc-300 hover:ring-offset-2 hover:scale-105"
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

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors duration-200 z-10"
            type="button"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Modal Content */}
          <div
            className="relative w-full max-w-4xl sm:max-w-5xl lg:max-w-6xl max-h-[85vh] sm:max-h-[90vh] aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeImageIndex] || "/placeholder.svg"}
              alt={title}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 95vw, (max-width: 1024px) 90vw, 85vw"
            />

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors duration-200"
                  type="button"
                  aria-label="Previous image"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
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
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors duration-200"
                  type="button"
                  aria-label="Next image"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
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
                </button>
              </>
            )}

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 px-2 sm:px-3 py-1 bg-black/50 text-white text-xs sm:text-sm rounded-full">
                {activeImageIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
