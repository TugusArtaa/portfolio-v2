import React, { forwardRef } from "react";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import TransitionLink from "@/components/UI/PageTransition/TransitionLink";
import { useToast } from "@/components/UI/Toast";
import { ArrowUpRight, Download } from "lucide-react";
import Magnetic from "@/components/UI/Magnetic";

/* Hallmark · component: summary-section · genre: modern-minimal · theme: Studio
 * states: default · hover · focus · active · disabled
 * contrast: pass (WCAG AAA on text-zinc-950, AA on text-zinc-600)
 */
const SummarySection = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props, ref) => {
  const { addToast } = useToast();

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
    <section
      ref={ref}
      id="summary-section"
      className="relative w-full py-20 sm:py-24 lg:py-32 px-6 sm:px-8 lg:px-16 bg-[#FAFAF9] text-zinc-950 overflow-hidden"
    >
      {/* Hairline tactile anchor */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/80 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* Kiri: Crafted Editorial Typography & Actions */}
        <div className="flex flex-col justify-center w-full lg:w-3/5 space-y-6 text-left">
          {/* Eyebrow: Clean Architectural Coordinate */}
          <div data-hero-text className="inline-flex items-center gap-2.5">
            <span
              className="w-1.5 h-1.5 rounded-full bg-zinc-950 shrink-0"
              aria-hidden="true"
            />
            <h2 className="font-mono text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
              01 // ABOUT ME
            </h2>
          </div>

          {/* Full Name: Distinctive Display Face */}
          <div data-hero-text className="space-y-2.5">
            <h1 className="font-brutal text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold tracking-[-0.035em] text-zinc-950 leading-[1.05] text-left">
              I Putu Agus Seniartawan
            </h1>

            {/* Tagline: Editorial Mono Tag */}
            <p className="font-mono text-xs sm:text-sm tracking-wider uppercase text-zinc-600 font-medium">
              [ Active Digital Business student ]
            </p>
          </div>

          {/* Bio Description: Focused Measure with Comfortable Leading */}
          <div
            data-hero-text
            className="text-base sm:text-lg text-zinc-600 leading-[1.7] max-w-xl text-left font-sans"
          >
            <p className="text-left">
              <strong className="text-zinc-950 font-semibold">
                Hi! I&apos;m Tuagus
              </strong>{" "}
              — a Web Developer &amp; Creative Enthusiast based in Bali. I specialize
              in modern web development, branding, and graphic design, turning
              ideas into clean, functional, and user-centered digital experiences
              that feel intuitive and engaging.
            </p>
          </div>

          {/* Buttons: Tactile Micro-Interactions with Magnetic Pull */}
          <div
            data-hero-text
            className="flex flex-wrap items-center gap-3.5 pt-2"
          >
            <Magnetic>
              <a
                href="/cv/CV_IPutuAgusSeniartawan.pdf"
                download
                onClick={handleDownloadClick}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-white font-medium text-sm sm:text-base border border-zinc-950 shadow-[0_1px_2px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-colors duration-200 active:scale-[0.98] cursor-pointer select-none"
              >
                <span>Download CV</span>
                <Download className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors duration-200" />
              </a>
            </Magnetic>

            <Magnetic>
              <TransitionLink
                href="/projects"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-50 text-zinc-900 font-medium text-sm sm:text-base border border-zinc-300 hover:border-zinc-950 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors duration-200 active:scale-[0.98] cursor-pointer select-none"
              >
                <span>View Projects</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </TransitionLink>
            </Magnetic>
          </div>

          {/* Status Colophon: Authentic Editorial Proof Strip */}
          <div
            data-hero-text
            className="pt-6 border-t border-zinc-200/90 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs font-mono text-zinc-500"
          >
            <div className="inline-flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="tracking-wider uppercase font-semibold text-zinc-800">
                Available for work
              </span>
            </div>

            <div className="inline-flex items-center gap-2 text-zinc-500">
              <span
                className="w-1 h-1 rounded-full bg-zinc-300"
                aria-hidden="true"
              />
              <span className="tracking-wider uppercase">
                Based in Bali, Indonesia
              </span>
            </div>
          </div>
        </div>

        {/* Kanan: Profile Card with Ambient Grounding Pedestal */}
        <div
          data-hero-card
          className="flex justify-center lg:justify-end items-center w-full lg:w-2/5 mb-8 lg:mb-0"
        >
          <div className="relative">
            {/* Soft atmospheric anchor to ground the card into the page */}
            <div
              className="absolute -inset-6 rounded-3xl bg-radial from-zinc-200/60 via-zinc-200/10 to-transparent blur-2xl pointer-events-none -z-10"
              aria-hidden="true"
            />

            {/* Profile Card Container */}
            <div className="relative z-10 transform hover:scale-[1.02] transition-transform duration-300">
              <ProfileCard
                name="Tuagus"
                title="Web Developer & Creative Enthusiast"
                handle="putuaguss"
                status="On Instagram"
                contactText="Contact Me"
                iconUrl="/photo/iconpattern.png"
                avatarUrl="/photo/tuagus_photo.webp"
                miniAvatarUrl="/photo/tuagus_profil.webp"
                behindGradient="linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(18,18,22,0.9) 100%)"
                innerGradient="linear-gradient(145deg, #18181b 0%, #050505 100%)"
                showUserInfo={true}
                enableTilt={true}
                onContactClick={() => {
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

SummarySection.displayName = "SummarySection";
export default SummarySection;
