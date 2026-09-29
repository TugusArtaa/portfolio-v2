"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Hallmark · component: tech-token · genre: tactile-editorial · theme: Studio
 * Black Squircle with Signature Animated Brand-Color Moving Light Border Beam
 * pre-emit critique: P5 H5 E5 S5 R5 V5
 */

interface TechTokenProps {
  id: string;
  name: string;
  icon?: string | null;
  animationHook?: string; // e.g. "data-about-skills" or "data-about-tools"
}

// Luminous brand color palette for the moving border beam
const COLOR_MAP: Record<
  string,
  { brand: string; shadow: string }
> = {
  html: { brand: "#F97316", shadow: "rgba(249,115,22,0.4)" }, // HTML Orange
  css: { brand: "#3B82F6", shadow: "rgba(59,130,246,0.4)" }, // CSS Blue
  javascript: { brand: "#F59E0B", shadow: "rgba(245,158,11,0.4)" }, // JS Amber
  typescript: { brand: "#38BDF8", shadow: "rgba(56,189,248,0.4)" }, // TS Blue
  php: { brand: "#8B5CF6", shadow: "rgba(139,92,246,0.4)" }, // PHP Violet
  react: { brand: "#00D8FF", shadow: "rgba(0,216,255,0.4)" }, // React Cyan
  nextjs: { brand: "#FFFFFF", shadow: "rgba(255,255,255,0.35)" }, // Next.js White
  vuejs: { brand: "#10B981", shadow: "rgba(16,185,129,0.4)" }, // Vue Emerald
  laravel: { brand: "#EF4444", shadow: "rgba(239,68,68,0.4)" }, // Laravel Red
  tailwindcss: { brand: "#06B6D4", shadow: "rgba(6,182,212,0.4)" }, // Tailwind Cyan
  nodejs: { brand: "#22C55E", shadow: "rgba(34,197,94,0.4)" }, // Node Green
  mysql: { brand: "#0284C7", shadow: "rgba(2,132,199,0.4)" }, // MySQL Sky
  wordpress: { brand: "#38BDF8", shadow: "rgba(56,189,248,0.4)" }, // WordPress Blue
  framer: { brand: "#0055FF", shadow: "rgba(0,85,255,0.4)" }, // Framer Motion Blue
  vscode: { brand: "#007ACC", shadow: "rgba(0,122,204,0.4)" }, // VSCode
  antigravity: { brand: "#4285F4", shadow: "rgba(66,133,244,0.4)" }, // Google Antigravity
  figma: { brand: "#A855F7", shadow: "rgba(168,85,247,0.4)" }, // Figma
  github: { brand: "#E4E4E7", shadow: "rgba(255,255,255,0.35)" }, // GitHub
  postman: { brand: "#F97316", shadow: "rgba(249,115,22,0.4)" }, // Postman
  docker: { brand: "#0284C7", shadow: "rgba(2,132,199,0.4)" }, // Docker
  laragon: { brand: "#00BCD4", shadow: "rgba(0,188,212,0.4)" }, // Laragon
  photoshop: { brand: "#38BDF8", shadow: "rgba(56,189,248,0.4)" }, // Photoshop
  affinity: { brand: "#A7F175", shadow: "rgba(167,241,117,0.4)" }, // Affinity by Canva Lime
  canva: { brand: "#00C4CC", shadow: "rgba(0,196,204,0.4)" }, // Canva
  capcut: { brand: "#FFFFFF", shadow: "rgba(255,255,255,0.4)" }, // CapCut
  lightroom: { brand: "#31A8FF", shadow: "rgba(49,168,255,0.4)" }, // Adobe Lightroom
  word: { brand: "#2563EB", shadow: "rgba(37,99,235,0.4)" }, // Word
  excel: { brand: "#10B981", shadow: "rgba(16,185,129,0.4)" }, // Excel
};

// Normalized key lookup
function getPalette(name: string, id: string) {
  const normalized = (name + " " + id)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  for (const key of Object.keys(COLOR_MAP)) {
    if (normalized.includes(key)) {
      return COLOR_MAP[key];
    }
  }

  return {
    brand: "#A855F7",
    shadow: "rgba(168,85,247,0.35)",
  };
}

export default function TechToken({
  name,
  id,
  icon,
  animationHook,
}: TechTokenProps) {
  const [isHovered, setIsHovered] = useState(false);
  const palette = getPalette(name, id);
  const containerProps = animationHook ? { [animationHook]: true } : {};

  return (
    <div
      {...containerProps}
      className="relative inline-flex items-center justify-center group select-none cursor-pointer shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* =====================================================================
          REACT BITS ANIMATED TOOLTIP (Spring physics float)
         ===================================================================== */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 3, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 450, damping: 24 }}
            className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 z-40 px-2 py-0.5 rounded-md bg-zinc-950 text-white text-[11px] font-mono font-medium tracking-wide whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.4)] border border-white/10"
          >
            {name}
            {/* Tooltip Downward Caret */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-950 rotate-45 border-r border-b border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          BLACK SQUIRCLE WITH ANIMATED MOVING LIGHT BORDER BEAM
         ===================================================================== */}
      <motion.div
        animate={{
          y: isHovered ? -3 : 0,
          scale: isHovered ? 1.03 : 1,
        }}
        whileTap={{
          scale: 0.96,
        }}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
        style={{
          boxShadow: isHovered
            ? `0 6px 16px -4px rgba(0,0,0,0.5), 0 0 10px ${palette.brand}22`
            : "0 2px 8px -2px rgba(0,0,0,0.3)",
        }}
        className="relative p-[1.5px] rounded-[15px] sm:rounded-[18px] lg:rounded-[20px] overflow-hidden transition-shadow duration-300"
      >
        {/* Subtle static hairline backdrop ring */}
        <div className="absolute inset-0 rounded-[inherit] bg-zinc-800/80 pointer-events-none" />

        {/* Dynamic Running Light Streak: Conic Laser Beam orbiting around the border */}
        <div
          className="absolute inset-[-150%] animate-spin pointer-events-none"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, ${palette.brand} 325deg, #ffffff 352deg, ${palette.brand} 360deg)`,
            animationDuration: isHovered ? "2.8s" : "4s",
            animationTimingFunction: "linear",
          }}
        />

        {/* Inner Card: Deep Black Squircle with subtle brand atmosphere */}
        <div className="relative z-10 w-12 h-12 min-[390px]:w-[50px] min-[390px]:h-[50px] sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-[13px] min-[390px]:rounded-[14px] sm:rounded-[16px] lg:rounded-[18px] bg-zinc-950 flex items-center justify-center overflow-hidden border border-white/10">
          {/* Subtle radial brand glow behind icon */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at center, ${palette.brand}, transparent 70%)`,
              opacity: isHovered ? 0.18 : 0.06,
            }}
          />

          {/* Crisp, Authentic White SVG Icons from public/icons */}
          {icon ? (
            <div className="relative z-10 w-5 h-5 min-[390px]:w-5.5 min-[390px]:h-5.5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 flex items-center justify-center">
              <img
                src={icon}
                alt={name}
                className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] select-none pointer-events-none"
                loading="lazy"
              />
            </div>
          ) : (
            <span className="relative z-10 font-mono font-bold text-sm sm:text-base text-white">
              {name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}
