"use client";

import React, { useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

// Config pegas optimal (responsif, organik, dan tanpa osilasi berlebih)
const SPRING_CONFIG = {
  stiffness: 150,
  damping: 15,
  mass: 0.1,
};

export default function Magnetic({
  children,
  className = "",
  strength = 0.4,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Motion value murni: bypass React state render cycle untuk performa 60-120fps
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Fisika pegas otomatis ditangani di level hardware/GPU compositor
  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);

  // Cache bounding box pada mouseenter untuk mencegah layout thrashing / reflow
  const handleMouseEnter = useCallback(() => {
    if (shouldReduceMotion) return;
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      // Kompensasi posisi spring saat ini agar titik koordinat anchor tetap stabil dan tidak drifting
      rectRef.current = {
        width: rect.width,
        height: rect.height,
        left: rect.left - springX.get(),
        top: rect.top - springY.get(),
        bottom: rect.bottom - springY.get(),
        right: rect.right - springX.get(),
        x: rect.x - springX.get(),
        y: rect.y - springY.get(),
        toJSON: () => {},
      };
    }
  }, [shouldReduceMotion, springX, springY]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || !rectRef.current) return;
      const { clientX, clientY } = e;
      const { width, height, left, top } = rectRef.current;
      x.set(strength * (clientX - (left + width / 2)));
      y.set(strength * (clientY - (top + height / 2)));
    },
    [shouldReduceMotion, strength, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    rectRef.current = null;
    x.set(0);
    y.set(0);
  }, [x, y]);

  // Accessibility: Jika user mengaktifkan prefers-reduced-motion, render elemen statis
  if (shouldReduceMotion) {
    return <div className={cn("inline-block", className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={cn("inline-block will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
