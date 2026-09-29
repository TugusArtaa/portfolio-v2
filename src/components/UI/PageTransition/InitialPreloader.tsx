"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { EASE_BEZIER } from "@/lib/motion";

const GREETINGS = [
  "Hello",
  "Hola",
  "こんにちは",
  "안녕하세요",
  "Halo",
  "Om Swastiastu",
];

interface InitialPreloaderProps {
  onComplete: () => void;
}

export const InitialPreloader: React.FC<InitialPreloaderProps> = ({
  onComplete,
}) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [cols, setCols] = useState(5);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"in" | "fadeout" | "staircase">("in");
  const [greetingIndex, setGreetingIndex] = useState(0);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Responsive column count (3 for mobile < 768px, 5 for desktop)
  useEffect(() => {
    setHasMounted(true);
    const updateCols = () => {
      setCols(window.innerWidth < 768 ? 3 : 5);
    };
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  // Greeting cycling every 200ms while in "in" phase
  useEffect(() => {
    if (phase !== "in") return;
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 400);
    return () => clearInterval(interval);
  }, [phase]);

  // Organic counter progression from 0% to 100%
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    let current = 0;

    const timer = setInterval(() => {
      current += 0.8 + 0.8 * Math.random() * 0.4;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(timer);

        // Sequence: hold 400ms -> fadeout (350ms) -> staircase slide up
        const t1 = setTimeout(() => {
          setPhase("fadeout");
          const t2 = setTimeout(() => {
            setPhase("staircase");
            const t3 = setTimeout(() => {
              onCompleteRef.current();
            }, 750 + 80 * cols + 100);
            timers.push(t3);
          }, 350);
          timers.push(t2);
        }, 400);
        timers.push(t1);
      } else {
        setProgress(Math.floor(current));
      }
    }, 16);

    return () => {
      clearInterval(timer);
      timers.forEach(clearTimeout);
    };
  }, [cols]);

  if (!hasMounted) {
    return (
      <div className="fixed inset-0 z-[99999] bg-[#0a0a0a] pointer-events-none" />
    );
  }

  const currentYear = new Date().getFullYear();

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden h-[100dvh] min-h-[100dvh]">
      {/* 5 / 3 Shutter Columns with animated vertical divider lines */}
      {Array.from({ length: cols }).map((_, t) => (
        <motion.div
          key={t}
          className="absolute top-0 bottom-0 overflow-hidden bg-[#0a0a0a]"
          style={{
            left: `${(t / cols) * 100}%`,
            width: `calc(${100 / cols}% + 1px)`,
            willChange: "transform",
          }}
          animate={phase === "staircase" ? { y: "-100%" } : { y: "0%" }}
          transition={{
            duration: 0.75,
            delay: phase === "staircase" ? 0.09 * t : 0,
            ease: EASE_BEZIER,
          }}
        >
          {/* Vertical divider line animating with scaleY origin-center */}
          {t > 0 && (
            <motion.div
              className="absolute top-0 bottom-0 left-0 w-[1px] bg-white/[0.12] origin-center"
              initial={{ scaleY: 0 }}
              animate={{
                scaleY: phase === "fadeout" || phase === "staircase" ? 1 : 0,
              }}
              transition={{
                duration: 0.4,
                delay:
                  phase === "fadeout" || phase === "staircase" ? 0.05 * t : 0,
                ease: EASE_BEZIER,
              }}
            />
          )}
        </motion.div>
      ))}

      {/* Preloader UI Content */}
      <AnimatePresence>
        {(phase === "in" || phase === "fadeout") && (
          <motion.div
            key="preloader-content"
            className="absolute inset-0 z-10 flex flex-col justify-between p-8 md:p-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "fadeout" ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >

            {/* Top Bar */}
            <motion.div
              className="flex items-center justify-between relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                <p className="text-[10px] tracking-[0.35em] uppercase text-white font-light">
                  Portfolio — {currentYear}
                </p>
              </div>
              <p className="text-[10px] tracking-[0.35em] uppercase text-white font-light">
                Loading
              </p>
            </motion.div>

            {/* Center Greeting with popLayout reel effect */}
            <div className="flex items-center justify-center my-auto relative z-10">
              <div className="flex items-center">
                <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white flex-shrink-0 mr-3 md:mr-4" />
                <div className="relative h-[60px] min-w-[180px] md:min-w-[260px] flex items-center">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={greetingIndex}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "circOut" }}
                      className="absolute text-white font-body text-2xl md:text-4xl font-medium tracking-wide whitespace-nowrap"
                    >
                      {GREETINGS[greetingIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Bottom Status Bar & Progress Line */}
            <div className="w-full relative z-10">
              <motion.div
                className="flex items-end justify-between mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="text-white text-[10px] tracking-[0.25em] uppercase font-light">
                  Digital Creative &amp; Developer
                </p>
                <p className="text-white text-[11px] tracking-[0.3em] uppercase font-light tabular-nums">
                  {String(progress).padStart(2, "0")}%
                </p>
              </motion.div>

              {/* 1px Horizontal Progress Line */}
              <div className="w-full h-[1px] bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-white/50"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.08 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InitialPreloader;
