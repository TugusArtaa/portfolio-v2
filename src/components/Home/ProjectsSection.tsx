import React, { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLoading } from "@/context/LoadingContext";

const ProjectsSection = forwardRef<HTMLElement>((props, ref) => {
  const { startLoading } = useLoading();

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
          {/* Gambar Project - Kanan */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-lg">
              {/* Container untuk layout gambar */}
              <div className="flex gap-4 h-64 sm:h-80 lg:h-96">
                {/* Gambar Besar - Kiri */}
                <div data-projects-images className="flex-1">
                  <Image
                    src="/photo/photo_project_left.webp"
                    alt="Main Project"
                    width={500}
                    height={400}
                    priority
                    className="w-full h-full object-cover rounded-lg shadow-lg shadow-slate-400/30 grayscale hover:grayscale-0 transition-all duration-700 ease-out transform hover:scale-105 active:scale-110 active:grayscale-0 sm:active:scale-[1.15]"
                  />
                </div>

                {/* Container Gambar Kecil - Kanan */}
                <div className="flex flex-col gap-4 w-32 sm:w-40 lg:w-44">
                  {/* Gambar Kecil Atas */}
                  <div data-projects-images className="flex-1">
                    <Image
                      src="/photo/photo_project_right_1.webp"
                      alt="Project 2"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover rounded-lg shadow-md shadow-slate-400/25 grayscale hover:grayscale-0 transition-all duration-600 ease-out transform hover:scale-110 hover:rotate-2 active:scale-[1.2] active:grayscale-0 active:rotate-3 sm:active:scale-[1.25] sm:active:rotate-[5deg]"
                    />
                  </div>

                  {/* Gambar Kecil Bawah */}
                  <div data-projects-images className="flex-1">
                    <Image
                      src="/photo/photo_project_right_2.webp"
                      alt="Project 3"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover rounded-lg shadow-md shadow-slate-400/25 grayscale hover:grayscale-0 transition-all duration-600 ease-out transform hover:scale-110 hover:-rotate-2 active:scale-[1.2] active:grayscale-0 active:-rotate-3 sm:active:scale-[1.25] sm:active:-rotate-[5deg]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Teks Project - Kiri */}
          <div className="w-full lg:w-1/2 text-left">
            <h2
              data-projects-content
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-sky-900 dark:text-white text-left"
            >
              Projects
            </h2>
            <p
              data-projects-content
              className="text-slate-600 dark:text-neutral-300 text-md sm:text-lg lg:text-xl leading-relaxed mb-8 text-left"
            >
              Here are some projects I've completed and ones I'm currently
              working on — Click below to explore more.
            </p>
            <div data-projects-content>
              <Link href="/projects" passHref>
                <button
                  className="cursor-pointer inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 dark:from-sky-500 dark:to-sky-400 dark:hover:from-sky-600 dark:hover:to-sky-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-sky-400/40 transform hover:-translate-y-1 text-sm sm:text-base text-left active:translate-y-1 active:scale-95"
                  onClick={startLoading}
                >
                  View Projects
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
ProjectsSection.displayName = "ProjectsSection";
export default ProjectsSection;
