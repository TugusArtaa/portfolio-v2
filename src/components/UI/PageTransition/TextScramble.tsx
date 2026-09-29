"use client";

import React, { useEffect, useState, useRef } from "react";

import { SCRAMBLE_CHARSET_FULL } from "@/lib/motion";

interface TextScrambleProps {
  text: string;
  className?: string;
  active?: boolean;
  delay?: number; // ms before scramble starts (wildan: 80ms)
  stepTime?: number; // ms per frame (wildan: 35ms)
  totalSteps?: number; // total cadence steps (wildan: 16)
  characterSet?: string;
}

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  className = "",
  active = true,
  delay = 80,
  stepTime = 35,
  totalSteps = 16,
  characterSet = SCRAMBLE_CHARSET_FULL,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // If not active (e.g. page refresh reveal), render solid text without scrambling
    if (!active || !text) {
      setDisplayText(text);
      return;
    }

    // Wildan exact sequence: delay 80ms, then 16 steps at 35ms per tick
    timeoutRef.current = setTimeout(() => {
      let step = 0;
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        step++;
        const progress = step / totalSteps;
        const resolvedCount = Math.floor(progress * text.length);

        const scrambled = text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "•") return char;
            if (index < resolvedCount) return char;
            return characterSet[Math.floor(Math.random() * characterSet.length)];
          })
          .join("");

        setDisplayText(scrambled);

        if (step >= totalSteps) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setDisplayText(text);
        }
      }, stepTime);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, active, delay, stepTime, totalSteps, characterSet]);

  return <span className={className}>{displayText}</span>;
};

export default TextScramble;
