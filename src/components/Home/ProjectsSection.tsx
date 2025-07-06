import React, { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";

const ProjectsSection = forwardRef<HTMLElement>((props, ref) => (
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
                  src="/photo/photo_project_left.svg"
                  alt="Main Project"
                  width={500}
                  height={400}
                  className="w-full h-full object-cover rounded-lg shadow-lg shadow-slate-400/30 dark:shadow-slate-900/50 grayscale hover:grayscale-0 transition-all duration-700 ease-out transform hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/40 dark:hover:shadow-sky-400/50 active:scale-110 active:grayscale-0 active:shadow-2xl active:shadow-sky-600/50 dark:active:shadow-sky-300/60 cursor-pointer sm:active:scale-[1.15] sm:active:shadow-3xl"
                />
              </div>

              {/* Container Gambar Kecil - Kanan */}
              <div className="flex flex-col gap-4 w-32 sm:w-40 lg:w-44">
                {/* Gambar Kecil Atas */}
                <div data-projects-images className="flex-1">
                  <Image
                    src="/photo/photo_project_right_1.svg"
                    alt="Project 2"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover rounded-lg shadow-md shadow-slate-400/25 dark:shadow-slate-900/40 grayscale hover:grayscale-0 transition-all duration-600 ease-out transform hover:scale-110 hover:rotate-2 hover:shadow-xl hover:shadow-sky-500/35 dark:hover:shadow-sky-400/45 active:scale-[1.2] active:grayscale-0 active:rotate-3 active:shadow-xl active:shadow-sky-600/45 dark:active:shadow-sky-300/55 cursor-pointer sm:active:scale-[1.25] sm:active:rotate-[5deg]"
                  />
                </div>

                {/* Gambar Kecil Bawah */}
                <div data-projects-images className="flex-1">
                  <Image
                    src="/photo/photo_project_right_2.svg"
                    alt="Project 3"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover rounded-lg shadow-md shadow-slate-400/25 dark:shadow-slate-900/40 grayscale hover:grayscale-0 transition-all duration-600 ease-out transform hover:scale-110 hover:-rotate-2 hover:shadow-xl hover:shadow-sky-500/35 dark:hover:shadow-sky-400/45 active:scale-[1.2] active:grayscale-0 active:-rotate-3 active:shadow-xl active:shadow-sky-600/45 dark:active:shadow-sky-300/55 cursor-pointer sm:active:scale-[1.25] sm:active:-rotate-[5deg]"
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
            Here are some projects I've completed and ones I'm currently working
            on — Click below to explore more.
          </p>
          <div data-projects-content>
            <Link href="/projects" passHref>
              <button className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-sky-400 to-sky-700 dark:bg-gradient-to-r dark:from-sky-400 dark:to-sky-500 hover:from-sky-500 hover:to-sky-800 dark:hover:from-sky-300 dark:hover:to-sky-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-md shadow-sky-400/20 dark:shadow-sky-400/20 hover:shadow-lg hover:shadow-sky-900/30 dark:hover:shadow-sky-500/30 transform hover:-translate-y-0.5 text-left active:translate-y-1 active:scale-95">
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
));
ProjectsSection.displayName = "ProjectsSection";
export default ProjectsSection;
