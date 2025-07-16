"use client";

import { useState, useEffect } from "react";

interface TimeDisplayProps {
  className?: string;
  showIcon?: boolean;
}

export default function TimeDisplay({
  className = "",
  showIcon = true,
}: TimeDisplayProps) {
  const [currentTime, setCurrentTime] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) return null;

  return (
    <div
      className={`hidden lg:flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 px-3 py-2 rounded-lg ${className}`}
    >
      {showIcon && (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
      <span>{currentTime}</span>
    </div>
  );
}
