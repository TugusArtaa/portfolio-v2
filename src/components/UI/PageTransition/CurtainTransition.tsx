"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTransition } from "@/context/TransitionContext";
import TextScramble from "./TextScramble";
import InitialPreloader from "./InitialPreloader";

import { EASE_BEZIER } from "@/lib/motion";

export const CurtainTransition: React.FC = () => {
  const pathname = usePathname();
  const {
    isTransitioning,
    isInitialLoading,
    isInitialPageReveal,
    phase,
    targetInfo,
    cols,
    completeInitialLoading,
  } = useTransition();

  const shouldReduceMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const isHome = pathname === "/" || pathname === "";
  const showInitialHome = isInitialLoading && isHome;
  const showNavOverlay = isTransitioning || isInitialPageReveal;
  const isActive = showInitialHome || showNavOverlay;

  if (!hasMounted || (!isActive && phase === "idle")) {
    return null;
  }

  // Animation variants & timings
  const colDuration = shouldReduceMotion ? 0.05 : 0.7;
  const colStagger = shouldReduceMotion ? 0 : 0.09;

  // Determine column vertical position
  // Entering/Visible/Fadeout -> shutter at 0% (closed)
  // Exiting -> shutter slides UP to -100%
  const isShutterClosed =
    phase === "entering" || phase === "visible" || phase === "fadeout";

  const columnAnimate = isShutterClosed ? { y: "0%" } : { y: "-100%" };
  const columnInitial =
    phase === "entering" ? { y: "-100%" } : { y: "0%" };

  // Navigating overlay text visibility: visible during "visible" and "fadeout"
  const isContentVisible = phase === "visible" || phase === "fadeout";

  return (
    <div
      aria-hidden={!isActive}
      className="fixed inset-0 z-[99990] pointer-events-none overflow-hidden select-none"
    >
      {/* Mode 1: Opening Preloader when web is first opened or refreshed on Home ("/") */}
      {showInitialHome && (
        <InitialPreloader onComplete={completeInitialLoading} />
      )}

      {/* Mode 2: Shutter Columns & Navigating Overlay */}
      {showNavOverlay && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {/* Shutter Columns with internal 1px vertical divider lines */}
          {Array.from({ length: cols }).map((_, n) => (
            <motion.div
              key={n}
              className="absolute top-0 bottom-0 bg-[#0a0a0a] overflow-hidden shadow-2xl"
              style={{
                left: `${(n / cols) * 100}%`,
                width: `calc(${100 / cols}% + 1px)`,
                willChange: "transform",
              }}
              initial={columnInitial}
              animate={columnAnimate}
              transition={{
                duration: colDuration,
                delay: n * colStagger,
                ease: EASE_BEZIER,
              }}
            >
              {/* Vertical divider line attached inside each column */}
              {n > 0 && (
                <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-white/[0.1]" />
              )}
            </motion.div>
          ))}

          {/* Text & Content Overlay (Exact wildan.pics Module 4984 Layout) */}
          <AnimatePresence>
            {isContentVisible && (
              <motion.div
                key="nav-content"
                initial={{ opacity: isInitialPageReveal ? 1 : 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0.05 : 0.3,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-20 lg:px-24"
              >

                {/* Top 1px Horizontal Divider Line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />

                {/* Main Content Area */}
                <div className="flex flex-col relative z-10 w-full md:w-[80%]">
                  {/* Subhead: — NAVIGATING TO */}
                  <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-white/50 mb-5 relative z-10">
                    — NAVIGATING TO
                  </p>

                  {/* Giant Headline with Matrix Scramble (Static position, NO slide-up) */}
                  <div>
                    <h2
                      className="text-[14vw] sm:text-[11vw] md:text-[9vw] lg:text-[7.5vw] font-black uppercase leading-none tracking-tighter text-white antialiased drop-shadow-2xl select-none"
                    >
                      <TextScramble
                        key={targetInfo.title}
                        text={targetInfo.title}
                        active={!isInitialPageReveal && !shouldReduceMotion}
                        delay={80}
                        stepTime={35}
                        totalSteps={16}
                      />
                    </h2>
                  </div>

                  {/* Mobile Tagline (under headline) */}
                  {targetInfo.subtitle && (
                    <p className="md:hidden mt-6 text-white/60 text-xs sm:text-sm font-light tracking-wide leading-relaxed">
                      {targetInfo.subtitle}
                    </p>
                  )}
                </div>

                {/* Desktop Editorial Tagline (Column 5 Placement, static position) */}
                {targetInfo.subtitle && (
                  <div className="hidden md:flex absolute right-0 top-0 bottom-0 w-[20%] items-center justify-start px-6 lg:px-10 z-10">
                    <p className="text-white/60 text-xs sm:text-sm lg:text-base font-light tracking-wide leading-relaxed">
                      {targetInfo.subtitle}
                    </p>
                  </div>
                )}

                {/* Bottom 1px Horizontal Divider Line */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default CurtainTransition;
