import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useHomePageAnimations() {
  const heroRef = useRef<HTMLElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const connectRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // ReactBits-inspired calm & comfortable scroll reveal configuration
      // Subtle 14-20px elevation, pure opacity transition, zero scale distortion
      const config = {
        yOffset: isMobile ? 14 : 20,
        duration: isMobile ? 0.7 : 0.85,
        stagger: isMobile ? 0.05 : 0.08,
        ease: "power3.out", // silky smooth quintic deceleration curve
        start: isMobile ? "top 92%" : "top 86%", // triggers right as item enters natural eye comfort zone
      };

      // -----------------------------------------------------------------------
      // 01 // ABOUT ME (Summary Section Animation)
      // -----------------------------------------------------------------------
      const summaryTexts = gsap.utils.toArray("[data-hero-text]") as HTMLElement[];
      if (summaryTexts.length) {
        gsap.fromTo(
          summaryTexts,
          {
            opacity: 0,
            y: config.yOffset,
          },
          {
            opacity: 1,
            y: 0,
            duration: config.duration,
            stagger: config.stagger,
            ease: config.ease,
            scrollTrigger: {
              trigger: summaryTexts[0],
              start: config.start,
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }

      const summaryCard = document.querySelector("[data-hero-card]");
      if (summaryCard) {
        gsap.fromTo(
          summaryCard,
          {
            opacity: 0,
            y: config.yOffset * 1.2,
          },
          {
            opacity: 1,
            y: 0,
            duration: config.duration * 1.05,
            ease: config.ease,
            delay: isMobile ? 0 : 0.1,
            scrollTrigger: {
              trigger: summaryCard,
              start: config.start,
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }

      // -----------------------------------------------------------------------
      // 02 // SERVICES & EXPERTISE (Services Section Animation)
      // -----------------------------------------------------------------------
      const servicesTexts = gsap.utils.toArray("[data-services-text]") as HTMLElement[];
      if (servicesTexts.length) {
        gsap.fromTo(
          servicesTexts,
          {
            opacity: 0,
            y: config.yOffset,
          },
          {
            opacity: 1,
            y: 0,
            duration: config.duration,
            stagger: config.stagger,
            ease: config.ease,
            scrollTrigger: {
              trigger: servicesTexts[0],
              start: config.start,
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }

      const serviceCards = gsap.utils.toArray("[data-service-card]") as HTMLElement[];
      serviceCards.forEach((card) => {
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
              start: config.start,
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      // -----------------------------------------------------------------------
      // 03 // SELECTED PROJECTS (Projects Section Animation)
      // -----------------------------------------------------------------------
      const projectsTexts = gsap.utils.toArray("[data-projects-text]") as HTMLElement[];
      if (projectsTexts.length) {
        gsap.fromTo(
          projectsTexts,
          {
            opacity: 0,
            y: config.yOffset,
          },
          {
            opacity: 1,
            y: 0,
            duration: config.duration,
            stagger: config.stagger,
            ease: config.ease,
            scrollTrigger: {
              trigger: projectsTexts[0],
              start: config.start,
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }

      const projectCards = gsap.utils.toArray("[data-project-card]") as HTMLElement[];
      projectCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: config.yOffset,
          },
          {
            opacity: 1,
            y: 0,
            duration: config.duration * 0.95,
            ease: config.ease,
            delay: isMobile ? 0 : index * 0.06,
            scrollTrigger: {
              trigger: card,
              start: isMobile ? "top 94%" : "top 88%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      // -----------------------------------------------------------------------
      // 04 // FOOTER / CONNECT (Connect Section Animation)
      // -----------------------------------------------------------------------
      const connectEls = gsap.utils.toArray("[data-connect-content]") as HTMLElement[];
      connectEls.forEach((el, index) => {
        // Skip animating elements that are intentionally hidden on mobile
        if (
          isMobile &&
          el.classList.contains("hidden") &&
          (el.classList.contains("sm:block") || el.classList.contains("md:block"))
        ) {
          gsap.set(el, { opacity: 1, y: 0 });
          return;
        }

        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: config.yOffset * 1.1,
          },
          {
            opacity: 1,
            y: 0,
            duration: config.duration,
            ease: config.ease,
            delay: isMobile ? 0 : index * 0.08,
            scrollTrigger: {
              trigger: el,
              start: isMobile ? "top 95%" : "top 88%",
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
          "[data-hero-text], [data-hero-card], [data-services-text], [data-service-card], [data-projects-text], [data-project-card], [data-connect-content]",
          {
            opacity: 1,
            y: 0,
            clearProps: "all",
          }
        );
      }

      // Handle orientation change smoothly
      const handleOrientationChange = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("orientationchange", handleOrientationChange);

      return () => {
        window.removeEventListener("orientationchange", handleOrientationChange);
      };
    });

    return () => ctx.revert();
  }, []);

  return { heroRef, summaryRef, servicesRef, projectsRef, connectRef };
}
