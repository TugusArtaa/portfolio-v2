import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useProjectSectionAnimations(
  ref?: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const config = {
      yOffset: isMobile ? 16 : 24,
      duration: isMobile ? 0.7 : 0.85,
      stagger: isMobile ? 0.05 : 0.08,
      ease: "power3.out",
      start: isMobile ? "top 92%" : "top 86%",
    };

    const ctx = gsap.context(() => {
      // Animate secondary project scroll contents if present
      const scrollItems = gsap.utils.toArray(
        "[data-projects-scroll]"
      ) as HTMLElement[];
      scrollItems.forEach((el, i) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: config.yOffset,
          },
          {
            opacity: 1,
            y: 0,
            duration: config.duration,
            ease: config.ease,
            delay: isMobile ? 0 : i * config.stagger,
            scrollTrigger: {
              trigger: el,
              start: config.start,
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      // Respect prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) {
        gsap.set("[data-projects-scroll]", {
          opacity: 1,
          y: 0,
          clearProps: "all",
        });
      }

      // Handle orientation change
      const handleOrientationChange = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("orientationchange", handleOrientationChange);

      return () => {
        window.removeEventListener(
          "orientationchange",
          handleOrientationChange
        );
      };
    }, ref?.current || undefined);

    return () => ctx.revert();
  }, [ref]);
}
