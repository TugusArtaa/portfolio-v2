"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import TransitionLink from "@/components/UI/PageTransition/TransitionLink";
import {
  EASE_BEZIER,
  SCRAMBLE_CHARSET_FULL,
  SCRAMBLE_CHARSET_ALPHA,
} from "@/lib/motion";
import Magnetic from "@/components/UI/Magnetic";

const ALL_NAV_ITEMS = [
  { id: "01", label: "Home", href: "/" },
  { id: "02", label: "About", href: "/about" },
  { id: "03", label: "Projects", href: "/projects" },
  { id: "04", label: "Contact", href: "/contact" },
];

/** Social links data — centralised to avoid hardcoding in JSX */
const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/iputuagusseniartawan/",
  },
  { label: "GitHub", href: "https://github.com/TugusArtaa" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/putuaguss?igsh=MWNldDl0MjYyN3o1MA==",
  },
] as const;

/** Drawer item animation variants — defined once outside component to avoid recreation on each render */
const DRAWER_ITEM_VARIANTS = {
  initial: { x: 60, opacity: 0 },
  animate: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.05 * i + 0.15,
      duration: 0.5,
      ease: EASE_BEZIER,
    },
  }),
  exit: (i: number) => ({
    x: 60,
    opacity: 0,
    transition: { delay: 0.03 * i, duration: 0.3 },
  }),
} as const;

// Interactive Brand Logo matching wildan.pics exact cipher hover
function BrandLogo({
  textDefault = "TUAGUSART",
  textHover = "TUAGUSDEV",
  suffix = "®",
}: {
  textDefault?: string;
  textHover?: string;
  suffix?: string;
}) {
  const [text, setText] = useState(textDefault);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = useCallback(
    (targetText: string) => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      let step = 0;
      intervalRef.current = setInterval(() => {
        step++;
        const progress = step / 14;
        setText(
          targetText
            .split("")
            .map((char, index) =>
              char === " "
                ? " "
                : index < Math.floor(progress * targetText.length)
                ? char
                : SCRAMBLE_CHARSET_FULL[
                    Math.floor(Math.random() * SCRAMBLE_CHARSET_FULL.length)
                  ]
            )
            .join("")
        );
        if (step >= 14) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setText(targetText);
        }
      }, 35);
    },
    [] // intervalRef is stable; SCRAMBLE_CHARSET_FULL is a module-level constant
  );

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span
      className="inline-flex items-center cursor-pointer select-none font-bold tracking-wider uppercase text-white"
      onMouseEnter={() => scramble(textHover)}
      onMouseLeave={() => scramble(textDefault)}
    >
      <span>{text}</span>
      {suffix && <sup className="text-[9px] font-medium ml-0.5">{suffix}</sup>}
    </span>
  );
}



// TextScramble cipher component matching wildan.pics module 17881
function NavTextScramble({
  text,
  className = "",
  trigger,
}: {
  text: string;
  className?: string;
  trigger?: boolean;
}) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const stepRef = useRef(0);

  const startScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    stepRef.current = 0;
    intervalRef.current = setInterval(() => {
      stepRef.current++;
      const progress = stepRef.current / 10;
      setDisplayText(
        text
          .split("")
          .map((char, index) =>
            char === " "
              ? " "
              : index < Math.floor(progress * text.length)
              ? char
              : SCRAMBLE_CHARSET_ALPHA[
                  Math.floor(Math.random() * SCRAMBLE_CHARSET_ALPHA.length)
                ]
          )
          .join("")
      );
      if (stepRef.current >= 10) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, 20);
  }, [text]);

  const stopScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(text);
  }, [text]);

  useEffect(() => {
    if (trigger === true) {
      startScramble();
    } else if (trigger === false) {
      stopScramble();
    }
  }, [trigger, startScramble, stopScramble]);

  useEffect(() => {
    setDisplayText(text);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  return (
    <span
      className={cn("inline-block", className)}
      onMouseEnter={startScramble}
      onMouseLeave={stopScramble}
    >
      {displayText}
    </span>
  );
}

// Desktop Navigation Item with Magnetic pull and TextScramble hover
function DesktopNavItem({
  item,
  isActive,
}: {
  item: { id: string; label: string; href: string };
  isActive: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Magnetic>
      <TransitionLink
        href={item.href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative inline-flex items-center gap-2 px-3 py-2 text-white/90 hover:text-white transition-opacity cursor-pointer bg-transparent border-none text-inherit select-none"
      >
        <span
          className={cn(
            "inline-block w-1.5 h-1.5 rounded-full bg-white transition-transform duration-300 ease-out flex-shrink-0",
            isActive ? "scale-100" : "scale-0 group-hover:scale-100"
          )}
        />
        <NavTextScramble text={item.label} trigger={isHovered} />
      </TransitionLink>
    </Magnetic>
  );
}

// Drawer Navigation Item with slide translation, TextScramble, and arrow ↗
function DrawerNavItem({
  item,
  index,
  isActive,
  onClose,
}: {
  item: { id: string; label: string; href: string };
  index: number;
  isActive: boolean;
  onClose: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={DRAWER_ITEM_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      className="group border-b border-white/[0.08] last:border-none"
    >
      <TransitionLink
        href={item.href}
        onClick={onClose}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full flex items-center justify-between py-6 sm:py-7 bg-transparent border-none cursor-pointer text-left select-none"
      >
        <div className="flex items-baseline gap-4 sm:gap-6">
          <span className="text-[11px] text-white/30 font-mono tabular-nums">
            {item.id}
          </span>
          <span className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white leading-none group-hover:translate-x-3 transition-transform duration-500 ease-out inline-block">
            <NavTextScramble text={item.label} trigger={isHovered} />
          </span>
        </div>

        <div className="flex items-center gap-3">
          {isActive && (
            <span className="w-1.5 h-1.5 rounded-full bg-white scale-100" />
          )}
          <span
            className={cn(
              "text-white/40 text-xl font-light transition-all duration-300 inline-block",
              isHovered
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-2"
            )}
          >
            ↗
          </span>
        </div>
      </TransitionLink>
    </motion.div>
  );
}

export function Navbar({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Scroll detection — hamburger appears after scrolling past hero (~100px)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile detection via matchMedia (event-driven — no polling, no resize listener overhead)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isHomePage = pathname === "/";

  // When on the home page, "Home" is omitted matching wildan.pics reference.
  // On other pages (/about, /projects, /contact), "Home" is available so users can navigate back.
  const navItems = isHomePage
    ? ALL_NAV_ITEMS.filter((item) => item.href !== "/").map((item, idx) => ({
        ...item,
        id: String(idx + 1).padStart(2, "0"),
      }))
    : ALL_NAV_ITEMS;

  // Hamburger is visible on mobile (always) OR when scrolled past hero (desktop) OR when menu is open
  const showHamburger = isMenuOpen || isMobile || isScrolled;

  return (
    <>
      {/* Header with mix-blend-difference (absolute so it scrolls away naturally, leaving only hamburger on scroll) */}
      <header
        className={cn(
          "absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-8 md:px-12 pointer-events-none select-none text-white mix-blend-difference",
          className
        )}
        style={style}
      >
        {/* Left: Interactive Brand Logo with cipher text scramble on hover */}
        <div className="font-body text-base sm:text-lg font-bold tracking-tight pointer-events-auto">
          <TransitionLink
            href="/"
            className="inline-flex items-center select-none group"
            onClick={() => setIsMenuOpen(false)}
          >
            <BrandLogo textDefault="TUAGUSART" textHover="TUAGUSDEV" suffix="®" />
          </TransitionLink>
        </div>

        {/* Center: Desktop Navigation with Magnetic effect and TextScramble */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 text-[15px] font-medium tracking-[0.05em] capitalize pointer-events-auto">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <DesktopNavItem
                key={item.href}
                item={item}
                isActive={isActive}
              />
            );
          })}
        </nav>
      </header>

      {/* Right: Menu Toggle Button (fixed, appears on scroll on desktop; always visible on mobile) */}
      <motion.div
        data-navbar-toggle
        className="fixed top-0 right-0 h-[88px] md:h-[92px] px-6 md:px-12 flex items-center justify-end z-[100] text-white mix-blend-difference select-none"
        initial={false}
        animate={{
          scale: showHamburger ? 1 : 0,
          opacity: showHamburger ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: EASE_BEZIER }}
        style={{ pointerEvents: showHamburger ? "auto" : "none" }}
      >
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          onMouseEnter={() => setIsMenuHovered(true)}
          onMouseLeave={() => setIsMenuHovered(false)}
          className="group flex flex-col items-end gap-[5px] cursor-pointer bg-transparent border-none p-2 -mr-2 focus:outline-none"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {/* Morphing hamburger lines matching wildan.pics exact widths (10 / 15 / 20 -> 20 / 20 / 20) */}
          <div className="flex flex-col items-end gap-[5px]">
            <motion.span
              className="block h-[1.5px] bg-white rounded-full origin-center"
              animate={{
                width: isMenuOpen || isMenuHovered ? 20 : 10,
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 6.5 : 0,
              }}
              transition={{ duration: 0.4, ease: EASE_BEZIER }}
            />
            <motion.span
              className="block h-[1.5px] bg-white rounded-full"
              animate={{
                width: isMenuOpen ? 0 : isMenuHovered ? 20 : 15,
                opacity: isMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3, ease: EASE_BEZIER }}
            />
            <motion.span
              className="block h-[1.5px] bg-white rounded-full origin-center"
              animate={{
                width: 20,
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -6.5 : 0,
              }}
              transition={{ duration: 0.4, ease: EASE_BEZIER }}
            />
          </div>
        </button>
      </motion.div>

      {/* Slide-In Sidebar Drawer matching wildan.pics */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[80] bg-black/60 pointer-events-auto backdrop-blur-sm select-none"
            />

            {/* Sidebar Drawer Container */}
            <motion.div
              variants={{
                initial: { x: "100%" },
                animate: {
                  x: "0%",
                  transition: { duration: 0.5, ease: EASE_BEZIER },
                },
                exit: {
                  x: "100%",
                  transition: { duration: 0.4, ease: EASE_BEZIER },
                },
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed top-0 right-0 h-screen w-full sm:w-[440px] bg-[#0f0f0f] z-[90] flex flex-col justify-between p-8 sm:p-12 md:p-14 overflow-hidden text-white pointer-events-auto shadow-2xl select-none"
            >
              {/* Left 1px subtle divider line animating scaleY */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/[0.08]"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              />

              {/* Top: Section Header */}
              <div className="pt-8">
                <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/30">
                  Navigation
                </p>
              </div>

              {/* Middle: Numbered Navigation Links with TextScramble & slide */}
              <div className="flex flex-col my-auto">
                {navItems.map((item, index) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <DrawerNavItem
                      key={item.href}
                      item={item}
                      index={index}
                      isActive={isActive}
                      onClose={() => setIsMenuOpen(false)}
                    />
                  );
                })}
              </div>

              {/* Bottom: Social Media Links with Magnetic hover */}
              <div className="pb-4">
                <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/30 mb-3">
                  Connect
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono tracking-wider text-white/70">
                  {SOCIAL_LINKS.map((link) => (
                    <Magnetic key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors block py-1"
                      >
                        • {link.label}
                      </a>
                    </Magnetic>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;

