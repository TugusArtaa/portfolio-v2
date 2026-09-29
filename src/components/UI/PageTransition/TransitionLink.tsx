"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { useTransition } from "@/context/TransitionContext";

export interface TransitionLinkProps
  extends React.ComponentPropsWithoutRef<typeof Link> {
  children: React.ReactNode;
}

export const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  (
    {
      href,
      children,
      className,
      style,
      target,
      rel,
      onClick,
      ...props
    },
    ref
  ) => {
    const { navigateTo } = useTransition();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      // If external link or user opens in new tab (Ctrl/Cmd/Shift/Alt)
      if (
        target === "_blank" ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0
      ) {
        if (onClick) onClick(e);
        return;
      }

      const hrefStr = typeof href === "object" ? href.pathname || "" : href;

      // If anchor link on the same page (#something)
      if (hrefStr.startsWith("#")) {
        if (onClick) onClick(e);
        return;
      }

      // If external full URL
      if (hrefStr.startsWith("http://") || hrefStr.startsWith("https://")) {
        if (onClick) onClick(e);
        return;
      }

      e.preventDefault();
      if (onClick) onClick(e);
      navigateTo(hrefStr);
    };

    return (
      <Link
        ref={ref}
        href={href}
        className={className}
        style={style}
        target={target}
        rel={rel}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

TransitionLink.displayName = "TransitionLink";

export default TransitionLink;
