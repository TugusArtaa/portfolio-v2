import React, { forwardRef } from "react";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import AnimatedTitle from "@/components/AnimatedTitle/AnimatedTitle";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";

const HeroSection = forwardRef<HTMLElement>((props, ref) => (
  <section ref={ref} className="py-8 sm:py-12 lg:py-16">
    <div className="min-h-[70vh] flex flex-col-reverse lg:flex-row items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-8 lg:gap-12">
      {/* Kiri: Teks dan Tombol */}
      <div className="flex flex-col justify-center w-full lg:w-3/5 space-y-4 lg:space-y-6 text-left">
        {/* Subtitle */}
        <h2
          data-hero-text
          className="text-md sm:text-sm md:text-base lg:text-lg tracking-[0.1em] text-slate-400 dark:text-slate-400 font-medium uppercase text-left"
        >
          I PUTU AGUS SENIARTAWAN
        </h2>

        {/* Main Title */}
        <h1 data-hero-text className="leading-tight inline-block text-left">
          <AnimatedTitle />
        </h1>

        {/* Description */}
        <div
          data-hero-text
          className="text-md sm:text-base md:text-lg lg:text-xl text-slate-600 dark:text-neutral-300 leading-relaxed max-w-2xl text-left"
        >
          <p className="mb-2 text-left">
            <strong className="text-sky-900 dark:text-white">
              Hi! I'm Putu Agus
            </strong>{" "}
            — Junior front-end developer, UI/UX designer, and graphic designer.
            I love turning ideas into lively, neat, and user-friendly web
            displays. Coding and design are my way of telling stories in the
            digital world{" "}
            <TypeAnimation
              sequence={[
                "inspiring.",
                1200,
                "",
                200,
                "interactive.",
                1200,
                "",
                200,
                "impressive.",
                1200,
                "",
                200,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-slate-600 dark:text-neutral-300"
            />
          </p>
        </div>

        {/* Buttons */}
        <div
          data-hero-text
          className="flex flex-row gap-3 sm:gap-4 pt-4 items-start"
        >
          <a
            href="/cv/CV_ATS_Putu_Aguss.pdf"
            download
            className="group relative overflow-hidden bg-gradient-to-r from-sky-700 to-sky-400 hover:from-transparent hover:to-transparent dark:bg-gradient-to-r dark:from-sky-500 dark:to-sky-400 dark:hover:from-transparent dark:hover:to-transparent text-white hover:text-sky-900 dark:hover:text-sky-400 font-semibold border-2 border-sky-400 dark:border-sky-400 hover:border-sky-400 hover:dark:border-sky-400 px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-md shadow-sky-900/20 dark:shadow-sky-500/20 hover:shadow-lg hover:shadow-sky-900/30 dark:hover:shadow-sky-400/30 transform hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base text-left active:translate-y-1 active:scale-95"
          >
            <span className="relative z-10">Download CV</span>
          </a>

          <Link
            href="/contact"
            passHref
            className="group relative overflow-hidden bg-transparent hover:bg-gradient-to-r hover:from-sky-700 hover:to-sky-400 dark:hover:bg-gradient-to-r dark:hover:from-sky-500 dark:hover:to-sky-400 border-2 border-sky-400 dark:border-sky-400 text-sky-900 dark:text-sky-400 hover:text-white dark:hover:text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-md shadow-sky-400/20 dark:shadow-sky-400/20 hover:shadow-lg hover:shadow-sky-900/30 dark:hover:shadow-sky-400/30 transform hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base text-left active:translate-y-1 active:scale-95"
          >
            <span className="relative z-10">Contact Me</span>
          </Link>
        </div>

        {/* Stats */}
        <div
          data-hero-text
          className="flex flex-row flex-wrap gap-4 sm:gap-6 pt-6 text-xs sm:text-sm text-slate-400 dark:text-slate-400"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Available for projects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
            <span>Based in Bali, Indonesia</span>
          </div>
        </div>
      </div>

      {/* Kanan: Profile Card */}
      <div
        data-hero-card
        className="flex justify-center lg:justify-end items-center w-full lg:w-2/5 mb-8 lg:mb-0"
      >
        <div className="relative">
          {/* Profile Card Container */}
          <div className="relative z-10 transform hover:scale-105 transition-transform duration-300">
            <ProfileCard
              name="Putu Aguss"
              title="Front-end Developer"
              handle="Putuaguss"
              status="Simplicity."
              contactText="Contact Me"
              iconUrl="/photo/iconpattern.png"
              avatarUrl="/photo/tuagus_photo.svg"
              miniAvatarUrl="/photo/tuagus_profil.svg"
              behindGradient="to-br from-blue-400 via-purple-500 to-pink-600"
              innerGradient="to-r from-blue-500 to-purple-500"
              showUserInfo={true}
              enableTilt={true}
              onContactClick={() =>
                (window.location.href = "mailto:ptaguss2@gmail.com")
              }
            />
          </div>
        </div>
      </div>
    </div>
  </section>
));
HeroSection.displayName = "HeroSection";
export default HeroSection;
