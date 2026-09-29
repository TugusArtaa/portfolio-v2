"use client";

import React, { forwardRef, useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import TransitionLink from "@/components/UI/PageTransition/TransitionLink";
import Magnetic from "@/components/UI/Magnetic";
import { ArrowRight, ArrowUp } from "lucide-react";

/* Studio Geometric Curve Heart Icon matching Footer */
const StudioHeartIcon = ({ className = "w-3 h-3 text-zinc-900 fill-current" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

/* Hallmark · component: footer · genre: editorial-minimal · theme: Studio
 * inspired by wildan.pics footer / connect section
 * features: grand display typography with circular portrait photo as 'O',
 * magnetic 'Get In Touch' CTA pill, and complete colophon footer with live local time.
 */

export const Footer = forwardRef<HTMLElement, { className?: string }>(({ className = "" }, ref) => {
  const pathname = usePathname();
  const isContact = pathname?.startsWith("/contact");
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Makassar", // WITA (Bali, Indonesia / UTC+8)
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={ref as React.Ref<HTMLElement>}
      id="connect-section"
      className={`relative w-full ${
        isContact
          ? "pt-0 pb-8 sm:pb-10 lg:pb-12"
          : "pt-20 sm:pt-24 lg:pt-32 pb-8 sm:pb-10 lg:pb-12"
      } px-6 sm:px-8 lg:px-16 bg-[#FAFAF9] text-zinc-950 overflow-hidden ${className}`}
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-center">
        {!isContact && (
          <>
            {/* =========================================================================
                GRAND DISPLAY TYPOGRAPHY: LET'S C[PHOTO]NNECT (Massive Edge-to-Edge Impact)
               ========================================================================= */}
            <div
              data-connect-content
              className="relative w-full flex items-center justify-center text-center select-none pt-0 pb-3 sm:pb-3 lg:pb-4"
            >
          <div className="relative flex flex-col md:flex-row items-center justify-center font-brutal font-extrabold text-[clamp(3.15rem,15vw,5.5rem)] md:text-[clamp(2rem,11vw,9.85rem)] tracking-tight sm:tracking-[-0.035em] uppercase leading-[0.92] md:leading-none text-zinc-950 gap-1.5 sm:gap-2 md:gap-0 max-w-full">
            <span className="md:mr-4 lg:mr-8 whitespace-nowrap">LET&apos;S</span>
            <span className="inline-flex items-center whitespace-nowrap">
              <span>C</span>
              {/* Circular Photo replacing letter 'O' */}
              <span className="relative inline-flex items-center justify-center w-[0.88em] h-[0.88em] mx-1 sm:mx-2 md:mx-3 lg:mx-4 rounded-full overflow-hidden border-2 sm:border-4 md:border-[5px] lg:border-[6px] border-zinc-950 shrink-0 bg-zinc-900 group cursor-pointer align-middle">
                <Image
                  src="/photo/hero_photo.webp"
                  alt="I Putu Agus Seniartawan"
                  fill
                  sizes="(max-width: 768px) 240px, 360px"
                  className="object-cover object-[center_15%] group-hover:scale-110 transition-transform duration-500 ease-out"
                  priority
                />
              </span>
              <span>NNECT</span>
            </span>
          </div>

          {/* ===================================================================
              MAGNETIC PILL BUTTON: ALIGNED WITH RIGHT BOUNDARY & OVERLAPPING NNECT
             =================================================================== */}
          <div className="absolute -bottom-2 sm:-bottom-1 md:bottom-2 lg:bottom-3 right-0 z-20">
            <Magnetic strength={0.35}>
              <TransitionLink
                href="/contact"
                className="group relative inline-flex items-center gap-2 sm:gap-2.5 pl-3 pr-4.5 sm:pl-3.5 sm:pr-5 py-1.5 sm:py-2 rounded-full bg-white hover:bg-zinc-950 text-zinc-950 hover:text-white border border-zinc-200/90 hover:border-zinc-950 shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)] transition-all duration-300 active:scale-95 cursor-pointer select-none whitespace-nowrap"
              >
                {/* Left slot: Blue Dot in default, morphs to White Circle + ArrowRight on hover */}
                <div className="relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 shrink-0">
                  {/* Default state: Blue Dot (Gambar 1) */}
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-600 group-hover:scale-0 group-hover:opacity-0 transition-all duration-300 ease-out" />

                  {/* Hover state: White Circle with Black Right Arrow (Gambar 2 dengan background hitam) */}
                  <span className="absolute inset-0 rounded-full bg-white flex items-center justify-center scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-sm">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-950 stroke-[2.5]" />
                  </span>
                </div>

                {/* Button Text */}
                <span className="font-mono text-[10px] sm:text-xs md:text-sm font-bold tracking-wider uppercase transition-colors duration-300">
                  Get In Touch
                </span>
              </TransitionLink>
            </Magnetic>
          </div>
        </div>

            {/* =========================================================================
                INVITATION COPY (Hidden on mobile per user request)
               ========================================================================= */}
            <p
              data-connect-content
              className="hidden md:block text-zinc-600 text-base sm:text-lg md:text-xl max-w-2xl sm:max-w-3xl mx-auto mt-6 leading-relaxed font-sans"
            >
              Open for freelance projects and creative collaborations across web development, brand identity, and visual craft.
            </p>
          </>
        )}

        {/* Copy & Colophon */}
        <div className="w-full flex flex-col items-center justify-center text-center">
          {/* =========================================================================
              BOTTOM COLOPHON STRIP: Email, Socials, Local Time, Back to Top, Copyright
             ========================================================================= */}
          <div
            data-connect-content
            className={`relative ${
              isContact ? "mt-0 pt-6 sm:pt-8" : "mt-12 sm:mt-16 lg:mt-20 pt-10 sm:pt-12"
            } w-full space-y-8 sm:space-y-10 text-left`}
          >
            {/* Hairline Section Divider matching Section 01, 02, 03 style */}
            <div
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/80 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* Main Info Row: Email (Kiri), Socials (Tengah), Local Time (Kanan Atas) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 items-start">
              {/* Col 1: EMAIL */}
              <div className="space-y-2">
                <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-zinc-400 uppercase block">
                  Email
                </span>
                <a
                  href="mailto:ptaguss2@gmail.com"
                  className="font-sans text-sm sm:text-base font-semibold text-zinc-900 hover:text-zinc-500 transition-colors block"
                >
                  ptaguss2@gmail.com
                </a>
              </div>

              {/* Col 2: SOCIALS */}
              <div className="space-y-2">
                <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-zinc-400 uppercase block">
                  Socials
                </span>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm sm:text-base font-medium text-zinc-700">
                  <a
                    href="https://www.instagram.com/putuaguss?igsh=MWNldDl0MjYyN3o1MA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-zinc-950 transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.linkedin.com/in/iputuagusseniartawan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-zinc-950 transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/TugusArtaa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-zinc-950 transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://wa.me/6285173364754"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-zinc-950 transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Col 3: LOCAL TIME (Bali / WITA / UTC+8) - KANAN ATAS */}
              <div className="space-y-2 sm:text-right flex flex-col sm:items-end">
                <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-zinc-400 uppercase block">
                  Local Time (WITA)
                </span>
                <span className="font-mono text-sm sm:text-base font-semibold text-zinc-900 block tabular-nums">
                  {localTime || "03:00:00 PM"}
                </span>
              </div>
            </div>

            {/* Bottom Sub-Row: 'Created with love' (Kiri) & '© 2026 TUAGUSART' + 'Back To Top' (Kanan) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 sm:pt-4">
              {/* Kiri: Created with love by Tuagus. */}
              <span className="font-mono text-[11px] sm:text-xs text-zinc-500 tracking-wider inline-flex items-center gap-1.5 select-none">
                Created with <StudioHeartIcon className="w-3 h-3 text-zinc-900 fill-current inline shrink-0" /> by Tuagus.
              </span>

              {/* Kanan: © 2026 TUAGUSART & Back To Top */}
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="font-mono text-[11px] sm:text-xs text-zinc-400 tracking-wider uppercase select-none">
                  &copy; {new Date().getFullYear()} TUAGUSART
                </span>
                <span className="text-zinc-300 text-xs select-none">·</span>
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="group font-mono text-[11px] sm:text-xs font-semibold text-zinc-700 hover:text-zinc-950 tracking-wider uppercase transition-colors cursor-pointer inline-flex items-center gap-1.5 select-none"
                >
                  <span>Back To Top</span>
                  <ArrowUp className="w-3 h-3 text-zinc-700 group-hover:text-zinc-950 transition-colors stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
