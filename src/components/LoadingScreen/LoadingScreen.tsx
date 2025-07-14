"use client";
import type React from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import animationData from "../../../public/animations/Animation-Loading.json";

const LoadingScreen: React.FC = () => (
  <motion.div
    className="fixed inset-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg flex items-center justify-center z-[9999] overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    }}
  >
    {/* Background blur effect */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-sky-50/30 to-slate-100/30 dark:from-slate-900/30 dark:to-slate-800/30"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.2, opacity: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    />

    {/* Loading content container */}
    <motion.div
      className="relative flex items-center justify-center px-4"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.1,
      }}
    >
      {/* Subtle pulsing rings */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 rounded-full border border-sky-300/25 dark:border-sky-400/15 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{
            scale: [0.9, 1.3 + i * 0.2, 0.9],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.6,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Lottie animation with smooth interactions */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0.3, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0.3, rotate: 45 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 1,
          delay: 0.2,
        }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
      >
        <Lottie
          animationData={animationData}
          loop
          className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 xl:w-72 xl:h-72 drop-shadow-lg filter brightness-105"
        />
      </motion.div>
    </motion.div>

    {/* Copyright */}
    <motion.div
      className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 px-4"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.4,
      }}
    >
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-center font-medium">
        © 2025 I Putu Agus Seniartawan. All rights reserved.
      </p>
    </motion.div>
  </motion.div>
);

export default LoadingScreen;
