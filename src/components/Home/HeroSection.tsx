import React, { forwardRef } from "react";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import AnimatedTitle from "@/components/AnimatedTitle/AnimatedTitle";
import Link from "next/link";
import { useLoading } from "@/context/LoadingContext";
import { useToast } from "@/components/UI/Toast";

const HeroSection = forwardRef<HTMLElement>((props, ref) => {
  const { startLoading } = useLoading();
  const { addToast } = useToast();

  // Handler for Contact Me button (left)
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    startLoading();
    window.location.href = "/contact";
  };

  // Handler for Download CV button
  const handleDownloadClick = () => {
    addToast({
      type: "success",
      title: "Download Started",
      message: "Your CV download has started successfully.",
      duration: 3000,
    });
  };

  return (
    <section ref={ref} className="py-8 sm:py-12 lg:py-16">
      <div className="min-h-[70vh] flex flex-col-reverse lg:flex-row items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-8 lg:gap-12">
        {/* Kiri: Teks dan Tombol */}
        <div className="flex flex-col justify-center w-full lg:w-3/5 space-y-4 lg:space-y-6 text-left">
          {/* Subtitle */}
          <h2
            data-hero-text
            className="text-md sm:text-sm md:text-base lg:text-lg tracking-[0.1em] text-zinc-500 font-medium uppercase text-left"
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
            className="text-md sm:text-base md:text-lg lg:text-xl text-zinc-600 leading-relaxed max-w-2xl text-left"
          >
            <p className="mb-2 text-left">
              <strong className="text-zinc-900">
                Hi! I'm Putu Agus
              </strong>{" "}
              — a tech enthusiast with a strong interest in UI/UX design,
              front-end development, and graphic design. I enjoy turning ideas
              into clean, functional, and user-centered digital experiences that
              feel intuitive, interactive, and engaging.
            </p>
          </div>

          {/* Buttons */}
          <div
            data-hero-text
            className="flex flex-row gap-3 sm:gap-4 pt-4 items-start"
          >
            <a
              href="/cv/CV_IPutuAgusSeniartawan.pdf"
              download
              className="group relative overflow-hidden bg-zinc-900 hover:bg-black text-white font-semibold border-2 border-zinc-900 px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-md hover:shadow-lg hover:shadow-zinc-500/20 transform hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base text-left active:translate-y-1 active:scale-95"
              onClick={handleDownloadClick}
            >
              <span className="relative z-10">Download CV</span>
            </a>

            <Link
              href="/contact"
              className="group relative overflow-hidden bg-transparent hover:bg-zinc-900 border-2 border-zinc-900 text-zinc-900 hover:text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base text-left active:translate-y-1 active:scale-95"
              onClick={handleContactClick}
            >
              <span className="relative z-10">Contact Me</span>
            </Link>
          </div>

          {/* Stats */}
          <div
            data-hero-text
            className="flex flex-row flex-wrap gap-4 sm:gap-6 pt-6 text-xs sm:text-sm text-zinc-500"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span>Available for work</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-zinc-400 rounded-full"></div>
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
                avatarUrl="/photo/tuagus_photo.webp"
                miniAvatarUrl="/photo/tuagus_profil.webp"
                behindGradient="to-br from-zinc-700 via-zinc-900 to-black"
                innerGradient="to-r from-zinc-800 to-zinc-950"
                showUserInfo={true}
                enableTilt={true}
                onContactClick={() => {
                  startLoading();
                  window.location.href = "mailto:ptaguss2@gmail.com";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
HeroSection.displayName = "HeroSection";
export default HeroSection;
