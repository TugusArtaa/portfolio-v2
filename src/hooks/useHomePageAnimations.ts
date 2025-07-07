import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useHomePageAnimations() {
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const connectRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      const mobileSettings = {
        duration: isMobile ? 0.8 : 1.2,
        stagger: isMobile ? 0.1 : 0.15,
        yOffset: isMobile ? 30 : 60,
        xOffset: isMobile ? 40 : 80,
        scale: isMobile ? 0.98 : 0.95,
        ease: "power2.out",
      };

      // Hero Section Animation
      gsap.utils.toArray("[data-hero-text]").forEach((el: any, i: number) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: mobileSettings.yOffset,
            scale: mobileSettings.scale,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: mobileSettings.duration,
            ease: mobileSettings.ease,
            scrollTrigger: {
              trigger: el,
              start: isMobile ? "top 90%" : "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none none",
            },
          }
        );
      });
      gsap.fromTo(
        "[data-hero-card]",
        {
          opacity: 0,
          y: isMobile ? 40 : 80,
          scale: isMobile ? 0.95 : 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: mobileSettings.duration * 0.9,
          ease: mobileSettings.ease,
          scrollTrigger: {
            trigger: "[data-hero-card]",
            start: isMobile ? "top 90%" : "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        }
      );

      // About Section Animation
      gsap.fromTo(
        "[data-about-image]",
        {
          opacity: 0,
          x: isMobile ? 0 : -80,
          y: isMobile ? 40 : 0,
          scale: isMobile ? 0.9 : 0.8,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: mobileSettings.duration,
          ease: mobileSettings.ease,
          scrollTrigger: {
            trigger: "[data-about-image]",
            start: isMobile ? "top 85%" : "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.utils
        .toArray("[data-about-content]")
        .forEach((el: any, i: number) => {
          gsap.fromTo(
            el,
            {
              opacity: 0,
              y: mobileSettings.yOffset,
              scale: mobileSettings.scale,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: mobileSettings.duration * 0.9,
              ease: mobileSettings.ease,
              delay: i * (mobileSettings.stagger * 1.2),
              scrollTrigger: {
                trigger: el,
                start: isMobile ? "top 85%" : "top 75%",
                end: "bottom 25%",
                toggleActions: "play none none none",
              },
            }
          );
        });

      // Projects Section Animation
      gsap.utils
        .toArray("[data-projects-content]")
        .forEach((el: any, i: number) => {
          gsap.fromTo(
            el,
            {
              opacity: 0,
              y: mobileSettings.yOffset,
              scale: mobileSettings.scale,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: mobileSettings.duration * 0.9,
              ease: mobileSettings.ease,
              delay: i * (mobileSettings.stagger * 1.3),
              scrollTrigger: {
                trigger: el,
                start: isMobile ? "top 85%" : "top 75%",
                end: "bottom 25%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      gsap.utils
        .toArray("[data-projects-images]")
        .forEach((el: any, i: number) => {
          gsap.fromTo(
            el,
            {
              opacity: 0,
              x: isMobile ? 0 : 80,
              y: isMobile ? 40 : 0,
              scale: isMobile ? 0.9 : 0.8,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: mobileSettings.duration,
              ease: mobileSettings.ease,
              delay: i * (mobileSettings.stagger * 0.8),
              scrollTrigger: {
                trigger: el,
                start: isMobile ? "top 85%" : "top 75%",
                end: "bottom 25%",
                toggleActions: "play none none none",
              },
            }
          );
        });

      // Connect Section Animation
      const connectEls = gsap.utils.toArray(
        "[data-connect-content]"
      ) as HTMLElement[];
      connectEls.forEach((el: HTMLElement) => {
        // Skip animasi jika elemen hidden di mobile
        if (
          isMobile &&
          el.classList.contains("hidden") &&
          el.classList.contains("sm:block")
        ) {
          gsap.set(el, { opacity: 1, y: 0, scale: 1 });
          return;
        }
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: isMobile ? 20 : 50,
            scale: isMobile ? 0.98 : 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: mobileSettings.duration * 0.9,
            ease: mobileSettings.ease,
            delay: 0,
            scrollTrigger: {
              trigger: el,
              start: isMobile ? "top 98%" : "top 90%",
              end: "bottom 20%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Mobile-specific performance optimization
      if (isMobile) {
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
          gsap.set(
            "[data-hero-text], [data-hero-card], [data-about-image], [data-about-content], [data-projects-content], [data-projects-images], [data-connect-content]",
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }
          );
        }
      }

      // Handle orientation change on mobile
      const handleOrientationChange = () => {
        if (isMobile) {
          ScrollTrigger.refresh();
        }
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

  return { heroRef, aboutRef, projectsRef, connectRef };
}
