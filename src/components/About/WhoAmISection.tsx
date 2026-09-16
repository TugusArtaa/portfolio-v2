"use client";
import type { About } from "@/data/portfolio-data";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface WhoAmISectionProps {
  whoAmI?: About;
}

export default function WhoAmISection({ whoAmI }: WhoAmISectionProps) {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [clickedImage, setClickedImage] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if device is mobile/touch device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024 || "ontouchstart" in window);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Handle click for mobile devices
  const handleImageClick = (index: number) => {
    if (isMobile) {
      setClickedImage(clickedImage === index ? null : index);
    }
  };

  // Handle hover for desktop devices
  const handleMouseEnter = (index: number) => {
    if (!isMobile) {
      setHoveredImage(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setHoveredImage(null);
    }
  };

  // Determine which image should be expanded
  const expandedImage = isMobile ? clickedImage : hoveredImage;

  const images = [
    {
      src: "/photo/about_hero_1.webp",
      alt: "Profile Image 1",
    },
    {
      src: "/photo/about_hero_2.webp",
      alt: "Profile Image 2",
    },
    {
      src: "/photo/about_hero_3.webp",
      alt: "Profile Image 3",
    },
  ];

  // Refresh ScrollTrigger when component mounts or whoAmI changes
  useEffect(() => {
    if (typeof window !== "undefined" && ScrollTrigger) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 50);
    }
  }, [whoAmI]);

  return (
    <section className="mb-20 sm:mb-24">
      <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
        {/* Text Content - Left */}
        <div className="order-2 lg:order-1" data-hero-text>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-zinc-900">
            Who Am I?
          </h2>
          {whoAmI ? (
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-5 text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed">
                {whoAmI.content.split("\n").map((para, idx) => (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: para }} />
                ))}
              </div>
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
                <div className="flex items-center gap-2 bg-zinc-100 border border-zinc-200/60 px-3 sm:px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium text-zinc-800">
                    Open to opportunities
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-zinc-100 border border-zinc-200/60 px-3 sm:px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-zinc-400 rounded-full"></div>
                  <span className="text-xs sm:text-sm font-medium text-zinc-700">
                    Always learning
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-slate-500 text-base sm:text-lg">
              No information available.
            </p>
          )}
        </div>

        {/* Simple Image Gallery - Right */}
        <div
          className="order-1 lg:order-2 flex justify-center lg:justify-end"
          data-hero-text
        >
          <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl">
            <div className="flex items-end justify-center gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`relative transition-all duration-500 ease-out cursor-pointer rounded-xl overflow-hidden ${
                    expandedImage === index
                      ? "w-32 sm:w-40 lg:w-54 xl:w-64"
                      : "w-20 sm:w-24 lg:w-28 xl:w-32"
                  } h-56 sm:h-72 lg:h-96 xl:h-[28rem] ${
                    index === 1 ? "mb-8 sm:mb-10 lg:mb-14 xl:mb-16" : "mb-0"
                  }`}
                  onClick={() => handleImageClick(index)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className={`object-cover transition-all duration-500 ease-out ${
                      expandedImage === index ? "grayscale-0" : "grayscale"
                    }`}
                    sizes="(max-width: 640px) 25vw, (max-width: 1024px) 20vw, 15vw"
                  />

                  {/* Subtle indicator for mobile */}
                  {isMobile && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-black/20 rounded-full p-2">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
