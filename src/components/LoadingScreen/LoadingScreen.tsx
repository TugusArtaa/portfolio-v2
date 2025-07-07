"use client";

import React from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import animationData from "../../../public/animations/Animation-Loading.json";

const LoadingScreen: React.FC = () => (
  <motion.div
    className="fixed inset-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg flex items-center justify-center z-[9999]"
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
      className="relative flex items-center justify-center"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.1,
      }}
    >
      {/* Lottie animation with smooth scale */}
      <motion.div
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
      >
        <Lottie
          animationData={animationData}
          loop
          className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 drop-shadow-lg"
        />
      </motion.div>
    </motion.div>
  </motion.div>
);

export default LoadingScreen;
