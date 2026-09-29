"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REACTBITS_EASE } from "@/lib/motion";
import { useTransition } from "@/context/TransitionContext";
import StarBorder from "@/components/UI/StarBorder";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  ref?: React.Ref<HTMLElement>;
}

const HeroSection = ({ ref }: HeroSectionProps) => {
  const { isInitialLoading } = useTransition();
  const [isReady, setIsReady] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const firstText = useRef<HTMLSpanElement>(null);
  const secondText = useRef<HTMLSpanElement>(null);

  // Synchronize Hero reveal right after initial preloader completes
  useEffect(() => {
    if (!isInitialLoading) {
      const timer = setTimeout(() => setIsReady(true), 60);
      return () => clearTimeout(timer);
    }
    // Safety fallback to ensure Hero renders even if preloader is skipped/delayed
    const fallback = setTimeout(() => setIsReady(true), 3200);
    return () => clearTimeout(fallback);
  }, [isInitialLoading]);

  useEffect(() => {
    let xPercent = 0;
    let direction = -1;
    let isVisible = true;

    // Pause ticker when hero is not visible to save CPU & GPU cycles
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    // Initialize 3D acceleration once to prevent layer re-rasterization
    if (firstText.current && secondText.current) {
      gsap.set([firstText.current, secondText.current], { force3D: true });
    }

    // High-performance direct setters (bypasses tween creation & garbage collection)
    const setFirstX = firstText.current
      ? gsap.quickSetter(firstText.current, "xPercent")
      : null;
    const setSecondX = secondText.current
      ? gsap.quickSetter(secondText.current, "xPercent")
      : null;

    const onTick = (_time: number, deltaTime: number) => {
      if (!isVisible || !setFirstX || !setSecondX) return;

      // Normalize speed across 60Hz, 120Hz (ProMotion), and 144Hz+ monitors
      const delta = Math.min(deltaTime / 16.67, 2);

      // Seamless continuous loop preserving fractional remainder
      if (xPercent <= -100) xPercent += 100;
      else if (xPercent >= 0) xPercent -= 100;

      // Direct write to GPU compositor tree
      setFirstX(xPercent);
      setSecondX(xPercent);

      xPercent += 0.035 * direction * delta;
    };

    gsap.ticker.add(onTick);

    let tween: gsap.core.Tween | null = null;
    if (slider.current) {
      gsap.set(slider.current, { force3D: true });
      tween = gsap.to(slider.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 0.15,
          start: "top top",
          end: "bottom top",
          onUpdate: (self) => {
            if (self.direction !== 0) direction = -1 * self.direction;
          },
        },
        x: "-500px",
        ease: "none",
      });
    }

    return () => {
      gsap.ticker.remove(onTick);
      tween?.kill();
      observer.disconnect();
    };
  }, []);

  const handleScrollDown = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Sticky Visual Layer: Foto, lingkaran, spotlight, dan floating card */}
      <div
        ref={(node) => {
          sectionRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref && "current" in ref)
            (ref as React.MutableRefObject<HTMLElement | null>).current =
              node;
        }}
        className="sticky top-0 w-full h-[100dvh] min-h-[680px] bg-[#050505] text-white overflow-hidden flex flex-col justify-end border-b border-white/[0.08] z-[1]"
      >
        {/* Atmospheric stage spotlight bloom - creates subtle stage depth */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isReady ? { opacity: 0.75, scale: 1 } : { opacity: 0, scale: 0.85 }}
          transition={{ duration: 1.4, ease: REACTBITS_EASE }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[920px] h-[550px] bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.14),_rgba(255,255,255,0.02)_50%,_transparent_75%)] pointer-events-none z-0 blur-3xl"
          aria-hidden="true"
        />

        {/* Outer wireframe ring - smooth expanding opacity entrance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
          transition={{ duration: 1.2, ease: REACTBITS_EASE, delay: 0.05 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[1040px] h-[1040px] sm:w-[1120px] sm:h-[1120px] md:w-[850px] md:h-[850px] lg:w-[990px] lg:h-[990px] xl:w-[1080px] xl:h-[1080px] rounded-full border border-white/[0.08] pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Inner frosted glass dome - smooth expanding blur pedestal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={isReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
          transition={{ duration: 1.1, ease: REACTBITS_EASE, delay: 0.12 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[760px] h-[760px] sm:w-[820px] sm:h-[820px] md:w-[640px] md:h-[640px] lg:w-[740px] lg:h-[740px] xl:w-[800px] xl:h-[800px] rounded-full bg-gradient-to-t from-zinc-800/60 via-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_0_60px_rgba(255,255,255,0.03)] pointer-events-none z-[4]"
          aria-hidden="true"
        />

        {/* 25+ floating card (desktop only) - positioned in front of circles with ReactBits StarBorder */}
        <motion.div
          initial={{ opacity: 0, x: 28, y: 12, filter: "blur(6px)" }}
          animate={isReady ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" } : { opacity: 0, x: 28, y: 12, filter: "blur(6px)" }}
          transition={{ duration: 0.9, ease: REACTBITS_EASE, delay: 0.45 }}
          whileHover={{ scale: 1.04, y: -2 }}
          className="hidden md:block absolute md:bottom-56 lg:bottom-[38vh] xl:bottom-[40vh] left-1/2 md:translate-x-[160px] lg:translate-x-[190px] xl:translate-x-[220px] z-20 pointer-events-auto cursor-pointer"
        >
          <StarBorder
            as="div"
            color="#ffffff"
            speed="5s"
            thickness={1}
            className="rounded-2xl bg-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(255,255,255,0.12)] transition-shadow duration-300"
            innerClassName="px-4 py-3 sm:px-4.5 sm:py-3.5 rounded-[15px] bg-zinc-900/95 backdrop-blur-xl border border-white/10 min-w-[145px] sm:min-w-[165px]"
          >
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 font-semibold">
                Completed
              </span>
              {/* Google Verified Badge SVG */}
              <svg
                className="w-3.5 h-3.5 shrink-0 select-none"
                viewBox="0 0 24 24"
                fill="none"
                aria-label="Verified"
              >
                <path
                  d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12z"
                  fill="#1a73e8"
                />
                <path
                  d="M10.09 16.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"
                  fill="#ffffff"
                />
              </svg>
            </div>
            <div className="text-lg sm:text-xl font-bold text-white tracking-tight leading-none font-mono">
              25+ Projects
            </div>
          </StarBorder>
        </motion.div>

        {/* Portrait photo - cinematic blur-to-sharp upward glide */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 flex items-end justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
            animate={isReady ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 36, filter: "blur(8px)" }}
            transition={{ duration: 1.15, ease: REACTBITS_EASE, delay: 0.15 }}
            className="group relative w-[680px] sm:w-[740px] md:w-[520px] lg:w-[600px] xl:w-[680px] 2xl:w-[740px] h-[86vh] sm:h-[88vh] md:h-[75vh] lg:h-[82vh] xl:h-[85vh] flex items-end justify-center pointer-events-auto cursor-default"
          >
            <Image
              src="/photo/hero_photo.webp"
              alt="Putu Agus - Web Developer & Creative Enthusiast"
              fill
              priority
              sizes="(max-width: 640px) 680px, (max-width: 1024px) 520px, 740px"
              className="object-contain object-bottom select-none"
            />
          </motion.div>
        </div>
      </div>

      {/* Scrolling UI Layer: Ticker, headline, badge, scroll indicator */}
      <div className="relative -mt-[100dvh] w-full h-[100dvh] min-h-[680px] pointer-events-none z-[10] overflow-hidden flex flex-col justify-end">
        {/* Ticker running text - smooth blur fade entrance */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={isReady ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 24, filter: "blur(6px)" }}
          transition={{ duration: 1.0, ease: REACTBITS_EASE, delay: 0.28 }}
          className="absolute bottom-32 sm:bottom-36 md:bottom-[4.75rem] lg:bottom-20 w-full pointer-events-none flex flex-col items-center"
          aria-hidden="true"
        >
          <div className="relative z-20 w-full text-white">
            <div className="relative flex whitespace-nowrap">
              <div
                ref={slider}
                className="relative flex m-0 will-change-transform [transform:translateZ(0)]"
              >
                <span
                  ref={firstText}
                  className="druk-text text-[18vw] sm:text-[14vw] md:text-[10vw] lg:text-[8.8vw] leading-none tracking-tight m-0 pr-12 md:pr-16 select-none font-bold will-change-transform [backface-visibility:hidden] [transform:translateZ(0)]"
                >
                  TUAGUSART - TUAGUSDEV - TUAGUSART - TUAGUSDEV -
                </span>
                <span
                  ref={secondText}
                  className="absolute left-full top-0 druk-text text-[18vw] sm:text-[14vw] md:text-[10vw] lg:text-[8.8vw] leading-none tracking-tight m-0 pr-12 md:pr-16 select-none font-bold will-change-transform [backface-visibility:hidden] [transform:translateZ(0)]"
                >
                  TUAGUSART - TUAGUSDEV - TUAGUSART - TUAGUSDEV -
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Role headline */}
        <motion.div
          initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
          animate={isReady ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 22, filter: "blur(6px)" }}
          transition={{ duration: 0.95, ease: REACTBITS_EASE, delay: 0.3 }}
          className="absolute bottom-12 sm:bottom-14 left-6 md:bottom-auto md:top-[26vh] lg:top-[28vh] md:left-12 max-w-[280px] sm:max-w-[320px] md:max-w-[340px] z-30 pointer-events-auto"
        >
          <h1 className="m-0 text-[25px] sm:text-[27px] md:text-[24px] lg:text-[26px] font-normal leading-[1.22] tracking-tight text-white">
            Web Developer &amp; <br />
            Creative Enthusiast
          </h1>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.85, ease: REACTBITS_EASE, delay: 0.6 }}
          className="absolute bottom-12 sm:bottom-14 right-6 md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:right-auto flex justify-center items-center pointer-events-auto z-30"
        >
          <button
            onClick={handleScrollDown}
            type="button"
            aria-label="Scroll down to next section"
            className="group flex flex-col items-center gap-1.5 sm:gap-2 cursor-pointer bg-transparent border-none p-1.5 outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded-full"
          >
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.3em] uppercase text-white/70 group-hover:text-white transition-colors duration-300 select-none">
              SCROLL
            </span>
            <div className="w-[16px] h-[26px] sm:w-[18px] sm:h-[30px] border border-white/40 group-hover:border-white/90 rounded-full flex justify-center p-0.5 sm:p-1 transition-colors duration-300">
              <motion.div
                animate={{
                  y: [0, 8, 0],
                  opacity: [1, 0.2, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                  ease: "easeInOut",
                }}
                className="w-1 h-1.5 bg-white/90 rounded-full"
              />
            </div>
          </button>
        </motion.div>
      </div>
    </>
  );
};

HeroSection.displayName = "HeroSection";
export default HeroSection;
