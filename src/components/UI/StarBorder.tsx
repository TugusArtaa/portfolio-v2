import React from "react";

interface StarBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "span" | "section" | "article";
  className?: string;
  innerClassName?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: string;
  thickness?: number;
}

export default function StarBorder({
  as: Component = "div",
  className = "",
  innerClassName = "",
  color = "#ffffff",
  speed = "6s",
  thickness = 1,
  children,
  style,
  ...rest
}: StarBorderProps) {

  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-2xl ${className}`}
      style={{
        padding: `${thickness}px`,
        ...style,
      }}
      {...rest}
    >
      {/* Bottom star streak */}
      <div
        className="absolute w-[300%] h-[50%] opacity-80 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed,
        }}
      />
      {/* Top star streak */}
      <div
        className="absolute w-[300%] h-[50%] opacity-80 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed,
        }}
      />
      {/* Inner card content wrapper */}
      <div className={`relative z-[1] rounded-[inherit] ${innerClassName}`}>
        {children}
      </div>
    </Component>
  );
}
