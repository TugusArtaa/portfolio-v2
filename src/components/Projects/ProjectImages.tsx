"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { REACTBITS_EASE } from "@/lib/motion";

// Crossfade duration in ms — shared by the CSS transition on image layers
const CROSSFADE_MS = 380;

export default function ProjectImages({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  // prevImageIndex: the outgoing image that stays at opacity 1 as a base layer
  // so the incoming image can fade in on top without revealing the dark bg
  const [prevImageIndex, setPrevImageIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cleanupRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => { if (cleanupRef.current) clearTimeout(cleanupRef.current); };
  }, []);

  // Central image-change handler — manages the prev-layer lifecycle
  const changeImage = useCallback((newIndex: number) => {
    if (newIndex === activeImageIndex) return;
    if (cleanupRef.current) clearTimeout(cleanupRef.current);
    setPrevImageIndex(activeImageIndex);
    setActiveImageIndex(newIndex);
    // Retire the prev layer only after the CSS transition has finished
    cleanupRef.current = setTimeout(() => setPrevImageIndex(null), CROSSFADE_MS + 60);
  }, [activeImageIndex]);

  const nextImage = useCallback(() => {
    changeImage((activeImageIndex + 1) % images.length);
  }, [activeImageIndex, changeImage, images.length]);

  const prevImage = useCallback(() => {
    changeImage((activeImageIndex - 1 + images.length) % images.length);
  }, [activeImageIndex, changeImage, images.length]);

  // Lock body scroll and set class when lightbox is open
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("lightbox-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("lightbox-open");
    }

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("lightbox-open");
    };
  }, [isModalOpen]);

  // Global keyboard shortcuts when lightbox is open
  useEffect(() => {
    if (!isModalOpen) return;

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isModalOpen, nextImage, prevImage]);

  return (
    <>
      <div className="w-full space-y-4 sm:space-y-5">
        {/* Main Image */}
        <div className="relative aspect-video bg-zinc-900 rounded-xl overflow-hidden shadow-[0_20px_45px_-15px_rgba(0,0,0,0.12)] border border-zinc-200/90 group">
          {images.map((image, index) => {
            const isActive = index === activeImageIndex;
            const isPrev = index === prevImageIndex;

            // active → top layer, fades IN via CSS transition
            // prev   → base layer, opacity 1, covers bg during the fade-in above
            // other  → hidden immediately
            const opacity = isActive || isPrev ? 1 : 0;
            const zIndex = isActive ? 10 : isPrev ? 5 : 0;

            return (
              <div
                key={`${image}-${index}`}
                className="absolute inset-0 w-full h-full"
                style={{
                  opacity,
                  zIndex,
                  // Only the incoming image transitions; prev & others snap instantly
                  transition: isActive
                    ? `opacity ${CROSSFADE_MS}ms ease-in-out`
                    : "none",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${title} - ${index + 1}`}
                  fill
                  loading="eager"
                  priority={index === 0}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 55vw"
                />
              </div>
            );
          })}

          {/* Quick Prev/Next Navigation Arrows on Hover (Desktop) */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 bg-black/60 hover:bg-black/90 text-white rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-105 shadow-md backdrop-blur-md border border-white/10 z-30 cursor-pointer hidden sm:flex items-center justify-center active:scale-95"
                type="button"
                aria-label="Previous image"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 bg-black/60 hover:bg-black/90 text-white rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-105 shadow-md backdrop-blur-md border border-white/10 z-30 cursor-pointer hidden sm:flex items-center justify-center active:scale-95"
                type="button"
                aria-label="Next image"
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Fullscreen Button */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setIsModalOpen(true)}
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 p-2.5 sm:p-3 bg-black/60 hover:bg-black/90 text-white rounded-xl transition-colors duration-200 shadow-md backdrop-blur-md border border-white/10 z-30 cursor-pointer"
            type="button"
            aria-label="View fullscreen"
          >
            <svg
              className="w-4 h-4 sm:w-4.5 sm:h-4.5"
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
          </motion.button>
        </div>

        {/* Thumbnail Gallery */}
        {images.length > 1 && (
          <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-2 pt-1 px-0.5 scrollbar-hide">
            {images.map((image, index) => {
              const isActive = index === activeImageIndex;

              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => changeImage(index)}
                  className={cn(
                    "group relative shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-md overflow-hidden cursor-pointer transition-all duration-300",
                    isActive
                      ? "ring-2 ring-zinc-950 shadow-xs"
                      : "ring-1 ring-zinc-200/90 hover:ring-zinc-400"
                  )}
                  type="button"
                  aria-label={`View photo ${index + 1}`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${title} - ${index + 1}`}
                    fill
                    loading="eager"
                    className={cn(
                      "object-cover transition-all duration-300",
                      isActive
                        ? "filter grayscale-0 opacity-100 scale-100"
                        : "filter grayscale contrast-[1.05] opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                    )}
                    sizes="(max-width: 640px) 80px, 96px"
                  />
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal (Portaled directly to document.body with AnimatePresence) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={`${title} image lightbox`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="fixed inset-0 bg-black/95 backdrop-blur-md z-[9999] flex items-center justify-center p-4 sm:p-6 select-none"
                onClick={() => setIsModalOpen(false)}
                tabIndex={-1}
              >
                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-5 right-5 sm:top-7 sm:right-7 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors duration-200 z-30 cursor-pointer border border-white/20 backdrop-blur-md shadow-lg"
                  type="button"
                  aria-label="Close modal"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>

                {/* Modal Content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.3, ease: REACTBITS_EASE }}
                  className="relative w-full max-w-5xl lg:max-w-6xl max-h-[85vh] aspect-video"
                  onClick={(e) => e.stopPropagation()}
                >
                  {images.map((image, index) => {
                    const isActive = index === activeImageIndex;
                    const isPrev = index === prevImageIndex;

                    const opacity = isActive || isPrev ? 1 : 0;
                    const zIndex = isActive ? 10 : isPrev ? 5 : 0;

                    return (
                      <div
                        key={`lightbox-${image}-${index}`}
                        className="absolute inset-0 w-full h-full flex items-center justify-center"
                        style={{
                          opacity,
                          zIndex,
                          transition: isActive
                            ? `opacity ${CROSSFADE_MS}ms ease-in-out`
                            : "none",
                          pointerEvents: isActive ? "auto" : "none",
                        }}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${title} - ${index + 1}`}
                          fill
                          loading="eager"
                          className="object-contain"
                          sizes="(max-width: 640px) 95vw, (max-width: 1024px) 90vw, 85vw"
                        />
                      </div>
                    );
                  })}

                  {/* Navigation Buttons */}
                  {images.length > 1 && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={prevImage}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors duration-200 cursor-pointer border border-white/10 z-30"
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
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={nextImage}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors duration-200 cursor-pointer border border-white/10 z-30"
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
                      </motion.button>
                    </>
                  )}

                  {/* Image Counter */}
                  {images.length > 1 && (
                    <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 px-3.5 py-1.5 bg-black/70 text-zinc-300 font-mono text-xs uppercase tracking-wider rounded-full border border-white/10 backdrop-blur-sm z-30">
                      [ {(activeImageIndex + 1).toString().padStart(2, "0")} / {images.length.toString().padStart(2, "0")} ]
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
