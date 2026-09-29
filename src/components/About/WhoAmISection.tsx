"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { About } from "@/data/portfolio-data";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTransition } from "@/context/TransitionContext";
import { REACTBITS_EASE } from "@/lib/motion";

/* Hallmark · component: who-am-i · genre: editorial-minimal · theme: Studio
 * layout: asymmetric editorial diptych with overlapping matted candid plate
 * imagery: 2 curated portraits (hero portrait + tactile cantilever archive plate)
 * contrast: pass (WCAG AAA on zinc-950, AA on zinc-600)
 * pre-emit critique: P5 H5 E5 S5 R5 V5
 */

interface WhoAmISectionProps {
  whoAmI?: About;
}

export default function WhoAmISection({ whoAmI }: WhoAmISectionProps) {
  const { isLoading } = useTransition();
  const [isReady, setIsReady] = useState(false);

  // Track hovered card for luxury playing card fanned deck interaction
  const [hoveredCard, setHoveredCard] = useState<"left" | "right" | null>(null);

  // Synchronize Hero reveal right after page transition completes
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setIsReady(true), 60);
      return () => clearTimeout(timer);
    }
    // Safety fallback
    const fallback = setTimeout(() => setIsReady(true), 1200);
    return () => clearTimeout(fallback);
  }, [isLoading]);

  // Refresh ScrollTrigger when component mounts or whoAmI changes
  useEffect(() => {
    if (typeof window !== "undefined" && ScrollTrigger) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [whoAmI]);

  // Safely parse content paragraphs
  const paragraphs = whoAmI?.content
    ? whoAmI.content
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

  return (
    <section className="relative w-full min-h-[100dvh] lg:h-[100dvh] lg:min-h-[680px] bg-[#FAFAF9] text-zinc-950 flex flex-col justify-center pt-28 sm:pt-32 lg:pt-20 pb-16 sm:pb-20 lg:pb-12 px-6 sm:px-8 lg:px-16 overflow-hidden">
      {/* Full-width hairline tactile anchor connecting from top */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/80 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* =====================================================================
              LEFT COLUMN: Crafted Editorial Typography & Identity (lg:w-3/5)
              Staggered blur-glide entrance matching Home Hero
             ===================================================================== */}
          <div className="flex flex-col justify-center w-full lg:w-3/5 space-y-6 text-left">
            {/* Eyebrow: Clean Architectural Coordinate */}
            <motion.div
              initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
              animate={
                isReady
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 18, filter: "blur(4px)" }
              }
              transition={{ duration: 0.8, ease: REACTBITS_EASE, delay: 0.05 }}
            >
              <h2 className="font-mono text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
                ABOUT // IDENTITY &amp; BACKGROUND
              </h2>
            </motion.div>

            {/* Title: Matching font-brutal and non-capslock style */}
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={
                isReady
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 24, filter: "blur(6px)" }
              }
              transition={{ duration: 0.95, ease: REACTBITS_EASE, delay: 0.12 }}
              className="space-y-2.5"
            >
              <h1 className="font-brutal text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold tracking-[-0.035em] text-zinc-950 leading-[1.05] text-left">
                Get to Know Me
              </h1>
            </motion.div>

            {/* Bio Description: Focused Measure with Comfortable Leading */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={
                isReady
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 20, filter: "blur(4px)" }
              }
              transition={{ duration: 0.9, ease: REACTBITS_EASE, delay: 0.22 }}
              className="text-base sm:text-lg text-zinc-600 leading-[1.7] max-w-xl text-left font-sans space-y-4"
            >
              {paragraphs.length > 0 ? (
                paragraphs.map((para, idx) => (
                  <p
                    key={idx}
                    className="text-left [&>strong]:text-zinc-950 [&>strong]:font-semibold"
                    dangerouslySetInnerHTML={{ __html: para }}
                  />
                ))
              ) : (
                <p className="text-zinc-500">No biography information available.</p>
              )}
            </motion.div>

            {/* Status Colophon: Authentic Editorial Proof Strip matching other sections */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={
                isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
              }
              transition={{ duration: 0.85, ease: REACTBITS_EASE, delay: 0.32 }}
              className="pt-6 border-t border-zinc-200 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs font-mono text-zinc-500 max-w-xl"
            >
              <div className="inline-flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                </span>
                <span className="tracking-wider uppercase font-semibold text-zinc-800">
                  Available for work
                </span>
              </div>

              <div className="inline-flex items-center gap-2 text-zinc-500">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-zinc-300"
                  aria-hidden="true"
                />
                <span className="tracking-wider uppercase">
                  Based in Bali, Indonesia
                </span>
              </div>
            </motion.div>
          </div>

          {/* =====================================================================
              RIGHT COLUMN: Full-Bleed Luxury Playing Card Deck (A♥ & K♦ Pair)
              Interactive ReactBits Fanned Card Physics with Initial Entrance Stagger
             ===================================================================== */}
          <div className="flex justify-center lg:justify-end items-center w-full lg:w-2/5 mb-8 lg:mb-0">
            <div className="relative w-full max-w-[430px] sm:max-w-[470px] lg:max-w-[510px] h-[480px] sm:h-[520px] lg:h-[560px] flex items-center justify-center">
              {/* Soft atmospheric radial anchor */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={
                  isReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }
                }
                transition={{ duration: 1.2, ease: REACTBITS_EASE }}
                className="absolute inset-0 rounded-full bg-radial from-zinc-300/40 via-zinc-200/20 to-transparent blur-3xl pointer-events-none -z-10"
                aria-hidden="true"
              />

              {/* =================================================================
                  CARD 1 (LEFT / UNDERNEATH): K♦ — King of Diamonds (K Kubik)
                  White Card Outline with Authentic Inner Hairline & Uncramped Index
                 ================================================================= */}
              <motion.div
                onMouseEnter={() => setHoveredCard("left")}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setHoveredCard((prev) => (prev === "left" ? null : "left"))}
                style={{ willChange: "transform", backfaceVisibility: "hidden" }}
                initial={{ opacity: 0, x: 0, y: 40, rotate: 0, scale: 0.92, filter: "blur(6px)" }}
                animate={
                  !isReady
                    ? { opacity: 0, x: 0, y: 40, rotate: 0, scale: 0.92, filter: "blur(6px)" }
                    : hoveredCard === "left"
                    ? { opacity: 1, x: -50, y: -20, rotate: -2, scale: 1.05, zIndex: 30, filter: "blur(0px)" }
                    : hoveredCard === "right"
                    ? { opacity: 1, x: -38, y: 26, rotate: -11, scale: 0.92, zIndex: 10, filter: "blur(0px)" }
                    : { opacity: 1, x: -28, y: 16, rotate: -7, scale: 0.96, zIndex: 10, filter: "blur(0px)" }
                }
                transition={
                  !isReady
                    ? { duration: 0.3 }
                    : {
                        type: "spring",
                        stiffness: 280,
                        damping: 22,
                        delay: isReady && hoveredCard === null ? 0.15 : 0,
                      }
                }
                whileTap={{ scale: 0.96 }}
                className="absolute w-[270px] sm:w-[305px] lg:w-[335px] xl:w-[350px] aspect-[3/4] rounded-2xl sm:rounded-3xl bg-white p-1 sm:p-1.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18),0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_28px_60px_-15px_rgba(0,0,0,0.25),0_8px_20px_rgba(0,0,0,0.08)] cursor-pointer select-none group border border-zinc-200/80 transform-gpu"
              >
                {/* Inner Photo Canvas framed cleanly by the white rim */}
                <div className="relative w-full h-full rounded-[13px] sm:rounded-[20px] overflow-hidden bg-zinc-950">
                  {/* Full-bleed Photo inside the frame */}
                  <Image
                    src="/photo/about_hero_1.webp"
                    alt="Putu Agus - Milestone & Archive"
                    fill
                    sizes="(max-width: 640px) 70vw, 350px"
                    className="object-cover object-top filter grayscale contrast-[1.08] group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-[1.04] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />

                  {/* Top-Left Rank & Suit: K♦ (King of Diamonds / K Kubik) - Crisp without shadow */}
                  <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-20 flex flex-col items-center leading-none select-none pointer-events-none text-white">
                    <span className="font-serif font-black text-2xl sm:text-3xl lg:text-[2rem] tracking-tighter">
                      K
                    </span>
                    <span className="text-xl sm:text-2xl lg:text-[1.65rem] leading-none -mt-0.5 sm:-mt-1">
                      ♦
                    </span>
                  </div>

                  {/* Bottom-Right Inverted Rank & Suit: K♦ */}
                  <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 z-20 flex flex-col items-center leading-none rotate-180 select-none pointer-events-none text-white">
                    <span className="font-serif font-black text-2xl sm:text-3xl lg:text-[2rem] tracking-tighter">
                      K
                    </span>
                    <span className="text-xl sm:text-2xl lg:text-[1.65rem] leading-none -mt-0.5 sm:-mt-1">
                      ♦
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* =================================================================
                  CARD 2 (RIGHT / TOP): A♥ — Ace of Hearts (As Hati)
                  White Card Outline with Clean Photo Canvas & Uncramped Index
                 ================================================================= */}
              <motion.div
                onMouseEnter={() => setHoveredCard("right")}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setHoveredCard((prev) => (prev === "right" ? null : "right"))}
                style={{ willChange: "transform", backfaceVisibility: "hidden" }}
                initial={{ opacity: 0, x: 0, y: 40, rotate: 0, scale: 0.92, filter: "blur(6px)" }}
                animate={
                  !isReady
                    ? { opacity: 0, x: 0, y: 40, rotate: 0, scale: 0.92, filter: "blur(6px)" }
                    : hoveredCard === "right"
                    ? { opacity: 1, x: 40, y: -26, rotate: 1, scale: 1.06, zIndex: 30, filter: "blur(0px)" }
                    : hoveredCard === "left"
                    ? { opacity: 1, x: 46, y: 8, rotate: 10, scale: 0.93, zIndex: 10, filter: "blur(0px)" }
                    : { opacity: 1, x: 28, y: -14, rotate: 6, scale: 1, zIndex: 20, filter: "blur(0px)" }
                }
                transition={
                  !isReady
                    ? { duration: 0.3 }
                    : {
                        type: "spring",
                        stiffness: 280,
                        damping: 22,
                        delay: isReady && hoveredCard === null ? 0.25 : 0,
                      }
                }
                whileTap={{ scale: 0.96 }}
                className="absolute w-[270px] sm:w-[305px] lg:w-[335px] xl:w-[350px] aspect-[3/4] rounded-2xl sm:rounded-3xl bg-white p-1 sm:p-1.5 shadow-[0_24px_55px_-12px_rgba(0,0,0,0.22),0_6px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_32px_68px_-15px_rgba(0,0,0,0.3),0_10px_24px_rgba(0,0,0,0.1)] cursor-pointer select-none group border border-zinc-200/80 transform-gpu"
              >
                {/* Inner Photo Canvas framed cleanly by the white rim */}
                <div className="relative w-full h-full rounded-[13px] sm:rounded-[20px] overflow-hidden bg-zinc-950">
                  {/* Full-bleed Photo inside the frame */}
                  <Image
                    src="/photo/about_hero_2.webp"
                    alt="Putu Agus - Formal Studio Portrait"
                    fill
                    priority
                    sizes="(max-width: 640px) 70vw, 350px"
                    className="object-cover object-top filter grayscale contrast-[1.06] group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-[1.04] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />

                  {/* Top-Left Rank & Suit: A♥ (Ace of Hearts / As Hati) - Crisp without shadow */}
                  <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-20 flex flex-col items-center leading-none select-none pointer-events-none text-white">
                    <span className="font-serif font-black text-2xl sm:text-3xl lg:text-[2rem] tracking-tighter">
                      A
                    </span>
                    <span className="text-xl sm:text-2xl lg:text-[1.65rem] leading-none -mt-0.5 sm:-mt-1">
                      ♥
                    </span>
                  </div>

                  {/* Bottom-Right Inverted Rank & Suit: A♥ */}
                  <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 z-20 flex flex-col items-center leading-none rotate-180 select-none pointer-events-none text-white">
                    <span className="font-serif font-black text-2xl sm:text-3xl lg:text-[2rem] tracking-tighter">
                      A
                    </span>
                    <span className="text-xl sm:text-2xl lg:text-[1.65rem] leading-none -mt-0.5 sm:-mt-1">
                      ♥
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
