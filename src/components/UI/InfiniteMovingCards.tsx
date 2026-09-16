"use client";

import { cn } from "@/lib/utils";
import type React from "react";
import { useRef } from "react";
import { Quote } from "lucide-react";

export interface Review {
  id: string;
  name: string;
  origin: string;
  review: string;
  createdAt: string;
}

export const InfiniteMovingCards = ({
  reviews,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  reviews: Review[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const minLoop = 2;
  const repeatCount =
    reviews.length < 6 ? Math.ceil(12 / reviews.length) : minLoop;
  const rollingReviews = Array(repeatCount).fill(reviews).flat();

  const animationDuration =
    speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
  const animationDirection = direction === "left" ? "forwards" : "reverse";

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
      style={
        {
          "--animation-duration": animationDuration,
          "--animation-direction": animationDirection,
        } as React.CSSProperties
      }
    >
      <ul
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4 animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {rollingReviews.map((review, idx) => (
          <li
            key={review.id + "-" + idx}
            className="relative flex flex-col bg-white rounded-2xl shadow-sm border border-zinc-200 px-4 py-4 w-[220px] sm:w-[260px] md:w-[300px] lg:w-[320px] xl:w-[340px] h-[180px] sm:h-[190px] md:h-[200px] lg:h-[210px] xl:h-[220px] max-w-full shrink-0"
          >
            {/* Tanggal */}
            <span className="absolute top-3 right-4 text-xs text-zinc-500 z-10">
              {new Date(review.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            {/* Ikon Kutipan */}
            <div className="absolute top-3 left-4 text-zinc-400 z-10">
              <Quote className="h-5 w-5" />
            </div>

            {/* Teks Ulasan */}
            <div className="flex-grow flex items-center justify-center px-2 mb-4">
              <p className="text-xs sm:text-sm font-medium text-zinc-700 leading-relaxed overflow-hidden text-ellipsis line-clamp-5 text-center">
                “{review.review}”
              </p>
            </div>

            {/* Avatar, Nama & Asal */}
            <div className="absolute bottom-2 left-2 flex items-center gap-1 max-w-[75%]">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-sm ring-1 ring-zinc-300 bg-zinc-100 text-zinc-900 mr-1">
                {review.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-[0.7rem] sm:text-xs text-zinc-900 truncate max-w-[200px] sm:max-w-[200px]">
                  {review.name}
                </span>
                <span className="text-[0.65rem] sm:text-xs text-zinc-500 truncate max-w-[220px] sm:max-w-[220px]">
                  {review.origin}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
