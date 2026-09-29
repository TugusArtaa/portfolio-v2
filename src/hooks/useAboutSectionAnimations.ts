import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useAboutSectionAnimations() {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    // ReactBits-inspired calm & comfortable scroll reveal configuration
    // Subtle elevation, pure opacity transition, silky smooth quintic deceleration
    const config = {
      yOffset: isMobile ? 16 : 24,
      duration: isMobile ? 0.7 : 0.85,
      stagger: isMobile ? 0.025 : 0.035,
      ease: "power3.out",
      start: isMobile ? "top 94%" : "top 88%",
    };

    const ctx = gsap.context(() => {
      // -----------------------------------------------------------------------
      // 01 // SECTION HEADERS (Consistent editorial headline reveals)
      // -----------------------------------------------------------------------
      const sectionHeaders = gsap.utils.toArray(
        "[data-section-header]"
      ) as HTMLElement[];
      sectionHeaders.forEach((header) => {
        gsap.fromTo(
          header,
          {
            opacity: 0,
            y: config.yOffset,
          },
          {
            opacity: 1,
            y: 0,
            duration: config.duration,
            ease: config.ease,
            scrollTrigger: {
              trigger: header,
              start: config.start,
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      // -----------------------------------------------------------------------
      // 02 // SKILLS BADGES (Gentle staggered wave reveal)
      // -----------------------------------------------------------------------
      const skillsTokens = gsap.utils.toArray(
        "[data-about-skills]"
      ) as HTMLElement[];
      if (skillsTokens.length) {
        gsap.fromTo(
          skillsTokens,
          {
            opacity: 0,
            y: config.yOffset * 0.8,
            scale: 0.94,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: config.stagger,
            ease: config.ease,
            scrollTrigger: {
              trigger: skillsTokens[0],
              start: isMobile ? "top 95%" : "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }

      // -----------------------------------------------------------------------
      // 03 // TOOLS BADGES (Gentle staggered wave reveal)
      // -----------------------------------------------------------------------
      const toolsTokens = gsap.utils.toArray(
        "[data-about-tools]"
      ) as HTMLElement[];
      if (toolsTokens.length) {
        gsap.fromTo(
          toolsTokens,
          {
            opacity: 0,
            y: config.yOffset * 0.8,
            scale: 0.94,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: config.stagger,
            ease: config.ease,
            scrollTrigger: {
              trigger: toolsTokens[0],
              start: isMobile ? "top 95%" : "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }

      // -----------------------------------------------------------------------
      // 04 // EXPERIENCE TIMELINE CARDS
      // -----------------------------------------------------------------------
      const expCards = gsap.utils.toArray(
        "[data-about-experience]"
      ) as HTMLElement[];
      expCards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: config.yOffset * 1.15,
          },
          {
            opacity: 1,
            y: 0,
            duration: config.duration,
            ease: config.ease,
            scrollTrigger: {
              trigger: card,
              start: isMobile ? "top 92%" : "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      // -----------------------------------------------------------------------
      // 05 // CERTIFICATES CARDS (Staggered grid reveal)
      // -----------------------------------------------------------------------
      const certCards = gsap.utils.toArray(
        "[data-about-certificates]"
      ) as HTMLElement[];
      certCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: config.yOffset * 1.15,
          },
          {
            opacity: 1,
            y: 0,
            duration: config.duration,
            ease: config.ease,
            delay: isMobile ? 0 : (index % 3) * 0.08,
            scrollTrigger: {
              trigger: card,
              start: isMobile ? "top 94%" : "top 87%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      // -----------------------------------------------------------------------
      // Performance: Respect Reduced Motion Preferences
      // -----------------------------------------------------------------------
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) {
        gsap.set(
          "[data-section-header], [data-about-skills], [data-about-tools], [data-about-experience], [data-about-certificates]",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            clearProps: "all",
          }
        );
      }

      // Handle orientation change on mobile smoothly
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
    });

    return () => ctx.revert();
  }, []);
}
