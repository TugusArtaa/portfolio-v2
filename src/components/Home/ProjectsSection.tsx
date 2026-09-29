"use client";

import React, { forwardRef, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import TransitionLink from "@/components/UI/PageTransition/TransitionLink";
import { ArrowUpRight } from "lucide-react";

/* Hallmark · component: projects-section · genre: editorial-minimal · theme: Studio
 * layout: full-width typographic list rows with ReactBits HoverImageLinks pattern
 * hover: spring-physics cursor follower relative to row + liquid clip-path text reveal
 * states: default · hover · focus · active
 * contrast: pass (WCAG AAA on zinc-950, AA on zinc-600)
 */

interface FeaturedProject {
  id: string;
  title: string;
  displayTitle: string;
  category: "Web Developer" | "Branding" | "Graphic Design";
  categoryCode: string;
  year: string;
  description: string;
  coverImage: string;
  link: string;
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "web-dev-big-impact",
    title: "Big Impact",
    displayTitle: "BIG IMPACT",
    category: "Web Developer",
    categoryCode: "WEB DEVELOPER",
    year: "2025",
    description:
      "Modern web application and digital platform engineering built with high-performance architecture and responsive UX.",
    coverImage: "/uploads/1753757148467-Cover-StartFolio.png",
    link: "/projects",
  },
  {
    id: "branding-tenganan",
    title: "Tenganan",
    displayTitle: "TENGANAN",
    category: "Branding",
    categoryCode: "BRANDING",
    year: "2025",
    description:
      "Cinematic promotional videography, visual storytelling, and cultural documentary capturing the identity of Tenganan.",
    coverImage: "/photo/about_hero_1.webp",
    link: "/projects",
  },
  {
    id: "graphic-design-bim-university",
    title: "BIM University",
    displayTitle: "BIM UNIVERSITY",
    category: "Graphic Design",
    categoryCode: "GRAPHIC DESIGN",
    year: "2025",
    description:
      "Creative social media design feeds, promotional marketing campaigns, and branded digital visual assets.",
    coverImage: "/photo/photo_project_right_2.webp",
    link: "/projects",
  },
];

// =============================================================================
// REACTBITS HOVER IMAGE LINK ROW
// Uses local row coordinates so floating preview is 100% reliable & never breaks
// =============================================================================
const ProjectRowItem: React.FC<{ project: FeaturedProject }> = ({ project }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const rowRectRef = useRef<DOMRect | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Framer Motion spring physics tracking relative to the row
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 240, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const rotateSpring = useSpring(rotate, { damping: 18, stiffness: 200 });

  // ReactBits Magnetic Eye physics:
  // Dynamically tracks the magnetic pull vector between cursor position (x, y)
  // and the floating card center (springX, springY)
  const eyeRawX = useTransform([x, springX], ([latestX, latestSpringX]) => {
    const delta = (latestX as number) - (latestSpringX as number);
    return Math.max(-18, Math.min(18, delta * 0.28));
  });

  const eyeRawY = useTransform([y, springY], ([latestY, latestSpringY]) => {
    const delta = (latestY as number) - (latestSpringY as number);
    return Math.max(-14, Math.min(14, delta * 0.28));
  });

  const pupilRawX = useTransform([x, springX], ([latestX, latestSpringX]) => {
    const delta = (latestX as number) - (latestSpringX as number);
    return Math.max(-4.2, Math.min(4.2, delta * 0.08));
  });

  const pupilRawY = useTransform([y, springY], ([latestY, latestSpringY]) => {
    const delta = (latestY as number) - (latestSpringY as number);
    return Math.max(-3.2, Math.min(3.2, delta * 0.08));
  });

  const eyeSpringX = useSpring(eyeRawX, { damping: 16, stiffness: 260, mass: 0.08 });
  const eyeSpringY = useSpring(eyeRawY, { damping: 16, stiffness: 260, mass: 0.08 });
  const pupilSpringX = useSpring(pupilRawX, { damping: 18, stiffness: 320, mass: 0.05 });
  const pupilSpringY = useSpring(pupilRawY, { damping: 18, stiffness: 320, mass: 0.05 });

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    rowRectRef.current = rect;
    const initX = e.clientX - rect.left;
    const initY = e.clientY - rect.top;
    x.set(initX);
    y.set(initY);
    setIsHovered(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = rowRectRef.current || rowRef.current?.getBoundingClientRect();
    if (!rect) return;
    const posX = e.clientX - rect.left;
    const posY = e.clientY - rect.top;
    x.set(posX);
    y.set(posY);

    // Dynamic tilt based on horizontal cursor offset from row center
    const xPct = posX / rect.width - 0.5;
    rotate.set(xPct * 16);
  };

  const handleMouseLeave = () => {
    rowRectRef.current = null;
    setIsHovered(false);
    rotate.set(0);
  };

  return (
    <div
      ref={rowRef}
      data-project-card
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative w-full border-b border-zinc-200/80"
    >
      {/* =====================================================================
          DESKTOP VIEW (md:block)
          Full row clickable link with liquid curtain wipe & floating preview
         ===================================================================== */}
      <div className="hidden md:block">
        <TransitionLink
          href={project.link}
          className="block w-full py-8 sm:py-10 lg:py-12 select-none cursor-pointer"
        >
          <div className="flex items-center justify-between gap-8">
            {/* LEFT: Display Title with Liquid Curtain Wipe */}
            <div className="flex items-baseline text-left">
              <div className="relative inline-block pr-2 sm:pr-4">
                {/* Layer 1: Hollow Outline Base (Balanced Crisp Zinc Outline) */}
                <span className="block font-anton text-6xl md:text-7xl lg:text-[5.75rem] xl:text-[6.25rem] tracking-tight uppercase leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(24,24,27,0.65)] select-none pr-1">
                  {project.displayTitle}
                </span>

                {/* Layer 2: Solid Fill on Hover with Smooth Wipe Left to Right */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 font-anton text-6xl md:text-7xl lg:text-[5.75rem] xl:text-[6.25rem] tracking-tight uppercase leading-none text-zinc-950 select-none pointer-events-none transition-[clip-path] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] [clip-path:inset(0%_100%_0%_0%)] group-hover:[clip-path:inset(0%_0%_0%_0%)] pr-1"
                >
                  {project.displayTitle}
                </span>
              </div>
            </div>

            {/* RIGHT: Category Meta + Year + Circular Action Arrow Button */}
            <div className="flex items-center justify-end gap-6 sm:gap-8 lg:gap-12">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] text-zinc-500 uppercase group-hover:text-zinc-950 transition-colors duration-400">
                {project.categoryCode}
              </span>
              <span className="font-mono text-xs sm:text-sm text-zinc-400">
                {project.year}
              </span>
              {/* Circular Arrow Action Button */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-300/80 bg-white group-hover:bg-black group-hover:border-black hover:bg-black hover:border-black flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm">
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white hover:text-white transition-colors duration-300" />
              </div>
            </div>
          </div>
        </TransitionLink>
      </div>

      {/* =====================================================================
          MOBILE VIEW (md:hidden)
          - Big condensed display title
          - Subline: Category & Year on left
          - Interactive VIEW + / CLOSE - toggle button on right corner
          - Expandable preview image with 'View Project' button only
         ===================================================================== */}
      <div className="block md:hidden py-6 sm:py-7">
        {/* Mobile Title with Liquid Wipe connected to isMobileOpen */}
        <TransitionLink
          href={project.link}
          className="block select-none active:opacity-80 transition-opacity"
        >
          <div className="relative inline-block pr-1 sm:pr-2">
            {/* Layer 1: Hollow Outline Base (100% Identical to Desktop) */}
            <span className="block font-anton text-[clamp(2.85rem,12vw,4.75rem)] tracking-tight uppercase leading-[0.92] text-transparent [-webkit-text-stroke:1.5px_rgba(24,24,27,0.65)] select-none pr-1">
              {project.displayTitle}
            </span>

            {/* Layer 2: Solid Fill controlled by isMobileOpen (Wipes Left to Right) */}
            <span
              aria-hidden="true"
              className={`absolute inset-0 font-anton text-[clamp(2.85rem,12vw,4.75rem)] tracking-tight uppercase leading-[0.92] text-zinc-950 select-none pointer-events-none transition-[clip-path] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] pr-1 ${
                isMobileOpen
                  ? "[clip-path:inset(0%_0%_0%_0%)]"
                  : "[clip-path:inset(0%_100%_0%_0%)]"
              }`}
            >
              {project.displayTitle}
            </span>
          </div>
        </TransitionLink>

        {/* Subline: Category & Year on Left, VIEW + / CLOSE - on Right */}
        <div className="flex items-center justify-between mt-3 sm:mt-3.5 text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-500 uppercase tracking-[0.14em] font-medium">
            <span className="font-semibold text-zinc-700">{project.categoryCode}</span>
            <span className="text-zinc-300">·</span>
            <span className="text-zinc-400">{project.year}</span>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-expanded={isMobileOpen}
            className="inline-flex items-center gap-1 text-xs font-mono font-semibold tracking-[0.15em] uppercase text-zinc-600 hover:text-zinc-950 active:opacity-70 transition-colors cursor-pointer select-none p-0 bg-transparent border-none"
          >
            <span>{isMobileOpen ? "CLOSE" : "VIEW"}</span>
            <span className="font-medium text-sm leading-none">{isMobileOpen ? "−" : "+"}</span>
          </button>
        </div>

        {/* Expandable Image Preview */}
        <AnimatePresence initial={false}>
          {isMobileOpen && (
            <motion.div
              key="mobile-preview"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              className="overflow-hidden pt-3.5"
            >
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-zinc-200/90 shadow-sm bg-zinc-950">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top"
                />
                {/* Overlay with View Project button only */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent flex items-end justify-end p-3 sm:p-4">
                  <TransitionLink
                    href={project.link}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-950/90 hover:bg-black text-white font-mono text-xs font-semibold tracking-wider uppercase border border-white/20 shadow-md active:scale-95 transition-all"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </TransitionLink>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =========================================================================
          REACTBITS FLOATING IMAGE PREVIEW MODAL
          Positioned absolute inside row — 100% reliable, zero fixed-coordinate bugs
         ========================================================================= */}
      <motion.div
        style={{
          left: springX,
          top: springY,
          translateX: "-50%",
          translateY: "-50%",
          rotate: rotateSpring,
        }}
        initial={{ opacity: 0, scale: 0.65 }}
        animate={
          isHovered
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.65 }
        }
        transition={{
          duration: 0.32,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="pointer-events-none absolute z-40 hidden md:block w-[340px] lg:w-[380px] aspect-[16/10] overflow-hidden rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.25)] border border-zinc-200/90 bg-zinc-950"
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="380px"
          className="object-cover object-top"
        />
        {/* ReactBits Magnetic Eye Badge: follows cursor with organic spring physics */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            style={{
              x: eyeSpringX,
              y: eyeSpringY,
            }}
            className="relative w-12 h-12 rounded-full bg-zinc-950/70 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-[0_12px_32px_rgba(0,0,0,0.55),0_0_20px_rgba(255,255,255,0.08)]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5 select-none"
            >
              <defs>
                <clipPath id={`eye-clip-${project.id}`}>
                  <path d="M2 12s3.8-6.5 10-6.5 10 6.5 10 6.5-3.8 6.5-10 6.5S2 12 2 12Z" />
                </clipPath>
              </defs>
              {/* Eye Contour Sclera */}
              <path
                d="M2 12s3.8-6.5 10-6.5 10 6.5 10 6.5-3.8 6.5-10 6.5S2 12 2 12Z"
                fill="rgba(255, 255, 255, 0.06)"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-95"
              />
              {/* Pupil & highlight clipped inside eye contour */}
              <g clipPath={`url(#eye-clip-${project.id})`}>
                <motion.circle
                  cx={12}
                  cy={12}
                  r={3.2}
                  style={{
                    x: pupilSpringX,
                    y: pupilSpringY,
                  }}
                  fill="white"
                />
                <motion.circle
                  cx={13.2}
                  cy={10.8}
                  r={1}
                  style={{
                    x: pupilSpringX,
                    y: pupilSpringY,
                  }}
                  fill="#09090b"
                />
              </g>
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const ProjectsSection = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props, ref) => {
  return (
    <section
      ref={ref as React.Ref<HTMLElement>}
      id="projects-section"
      className="relative w-full pt-20 sm:pt-24 lg:pt-32 pb-0 px-6 sm:px-8 lg:px-16 bg-[#FAFAF9] text-zinc-950"
    >
      {/* Hairline tactile anchor connecting from Services Section */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/80 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* =========================================================================
            HEADER: Section Eyebrow & Editorial Title (100% Konsisten dengan Section 01 & 02)
           ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 sm:pb-14 lg:pb-16 border-b border-zinc-200/80">
          <div className="space-y-5 sm:space-y-6 max-w-2xl text-left">
            {/* Architectural Section Coordinate */}
            <div data-projects-text className="inline-flex items-center gap-2.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-zinc-950 shrink-0"
                aria-hidden="true"
              />
              <h2 className="font-mono text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
                03 // SELECTED PROJECTS
              </h2>
            </div>

            {/* Display Headline */}
            <h3
              data-projects-text
              className="font-brutal text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-[-0.03em] text-zinc-950 leading-[1.18] text-left"
            >
              Recent Work <br />
              &amp; Featured Craft.
            </h3>
          </div>

          {/* Subtitle / Measure */}
          <div
            data-projects-text
            className="md:max-w-xs lg:max-w-sm text-left text-zinc-600 text-sm sm:text-base leading-relaxed font-sans md:pb-1.5"
          >
            <p>
              A curated selection of flagship projects across web engineering,
              brand identity, and visual design.
            </p>
          </div>
        </div>

        {/* =========================================================================
            FULL-WIDTH EDITORIAL PROJECT ROWS
            Powered by ReactBits HoverImageLinks Architecture
           ========================================================================= */}
        <div className="w-full flex flex-col">
          {FEATURED_PROJECTS.map((project) => (
            <ProjectRowItem key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
});

ProjectsSection.displayName = "ProjectsSection";
export default ProjectsSection;
