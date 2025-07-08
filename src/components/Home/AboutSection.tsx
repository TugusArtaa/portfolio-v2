import React, { forwardRef } from "react";
import TiltedCard from "@/components/TiltedCard/TiltedCard";
import Link from "next/link";
import { useLoading } from "@/context/LoadingContext";

const AboutSection = forwardRef<HTMLElement>((props, ref) => {
  const { startLoading } = useLoading();

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Gambar About - Kiri */}
          <div data-about-image className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px]">
              <TiltedCard
                imageSrc="/photo/about_photo.svg"
                altText="About Me"
                captionText="This is me!"
                containerHeight="100%"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p
                    className="absolute top-4 left-4 px-3 py-1 sm:top-6 sm:left-6 sm:px-6 sm:py-2 rounded-2xl bg-gray-700/70 text-white text-base sm:text-xl font-bold shadow-lg"
                    style={{ backdropFilter: "blur(4px)" }}
                  >
                    Hello!
                  </p>
                }
              />
            </div>
          </div>

          {/* Teks About - Kanan */}
          <div className="w-full lg:w-1/2 text-left">
            <h2
              data-about-content
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-sky-900 dark:text-white text-left"
            >
              About Me
            </h2>
            <p
              data-about-content
              className="text-slate-600 dark:text-neutral-300 text-md sm:text-lg lg:text-xl leading-relaxed mb-8 text-left"
            >
              A brief introduction about me and my interest — including the
              skills I've learned, tools I use, and certifications that support
              my journey.
            </p>
            <div data-about-content>
              <Link href="/about" passHref>
                <button
                  className="cursor-pointer inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 dark:from-sky-500 dark:to-sky-400 dark:hover:from-sky-600 dark:hover:to-sky-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-sky-400/40 transform hover:-translate-y-1 text-sm sm:text-base text-left active:translate-y-1 active:scale-95"
                  onClick={startLoading}
                >
                  Learn More
                  <svg
                    className="ml-2 w-4 h-4"
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
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
AboutSection.displayName = "AboutSection";
export default AboutSection;
