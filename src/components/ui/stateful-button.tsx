"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof motion.button> {
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
  success?: boolean;
}

export const Button = ({
  className,
  children,
  loading = false,
  success = false,
  ...props
}: ButtonProps) => {
  return (
    <motion.button
      layout
      layoutId="button"
      className={cn(
        "flex min-w-[120px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-600 to-sky-500 dark:from-sky-500 dark:to-sky-400 text-white px-4 py-2 font-medium ring-offset-2 transition duration-200 hover:ring-2 hover:ring-sky-400 dark:ring-offset-black",
        className
      )}
      disabled={props.disabled || loading}
      {...props}
    >
      <motion.div layout className="flex items-center gap-2">
        {loading && <Loader />}
        {success && !loading && <CheckIcon />}
        <motion.span layout>{children}</motion.span>
      </motion.div>
    </motion.button>
  );
};

const Loader = () => {
  return (
    <motion.svg
      animate={{
        rotate: [0, 360],
      }}
      initial={{
        scale: 0.5,
        width: 20,
        display: "block",
      }}
      transition={{
        duration: 0.7,
        repeat: Infinity,
        ease: "linear",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="loader text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3a9 9 0 1 0 9 9" />
    </motion.svg>
  );
};

const CheckIcon = () => {
  return (
    <motion.svg
      initial={{
        scale: 0.5,
        width: 20,
        display: "block",
      }}
      animate={{
        scale: 1,
        width: 20,
        display: "block",
      }}
      transition={{
        duration: 0.2,
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="check text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </motion.svg>
  );
};
