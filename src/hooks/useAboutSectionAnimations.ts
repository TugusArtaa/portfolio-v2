import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useAboutSectionAnimations() {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const mobileSettings = {
      duration: isMobile ? 0.8 : 1.2,
      stagger: isMobile ? 0.1 : 0.15,
      yOffset: isMobile ? 30 : 60,
      xOffset: isMobile ? 40 : 80,
      scale: isMobile ? 0.98 : 0.95,
      ease: "power2.out",
    };

    const ctx = gsap.context(() => {
      // WhoAmI Section (Text & Gallery)
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
            delay: i * mobileSettings.stagger,
            overwrite: "auto",
            scrollTrigger: {
              trigger: el,
              start: isMobile ? "top 90%" : "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      // Quote Section
      gsap.utils.toArray("[data-about-quote]").forEach((el: any, i: number) => {
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
            delay: i * mobileSettings.stagger,
            overwrite: "auto",
            scrollTrigger: {
              trigger: el,
              start: isMobile ? "top 98%" : "top 85%", // ubah dari 92% ke 98%
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      // Experience Section (Timeline Cards)
      gsap.utils
        .toArray("[data-about-experience]")
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
              delay: i * (mobileSettings.stagger * 1.1),
              overwrite: "auto",
              scrollTrigger: {
                trigger: el,
                start: isMobile ? "top 92%" : "top 85%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });

      // Education Section (Info, Courses, Story)
      gsap.utils
        .toArray("[data-about-education]")
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
              delay: i * (mobileSettings.stagger * 1.1),
              overwrite: "auto",
              scrollTrigger: {
                trigger: el,
                start: isMobile ? "top 92%" : "top 85%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });

      // Skills Section (Skill Badges)
      gsap.utils
        .toArray("[data-about-skills]")
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
              duration: mobileSettings.duration * 0.5,
              ease: mobileSettings.ease,
              delay: i * (mobileSettings.stagger * 0.35),
              overwrite: "auto",
              scrollTrigger: {
                trigger: el,
                start: isMobile ? "top 95%" : "top 90%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });

      // Tools Section (Tool Badges)
      gsap.utils.toArray("[data-about-tools]").forEach((el: any, i: number) => {
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
            duration: mobileSettings.duration * 0.5,
            ease: mobileSettings.ease,
            delay: i * (mobileSettings.stagger * 0.35),
            overwrite: "auto",
            scrollTrigger: {
              trigger: el,
              start: isMobile ? "top 95%" : "top 90%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      // Certificates Section (Certificate Cards)
      gsap.utils
        .toArray("[data-about-certificates]")
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
              duration: mobileSettings.duration * 0.5,
              ease: mobileSettings.ease,
              delay: i * (mobileSettings.stagger * 0.35),
              overwrite: "auto",
              scrollTrigger: {
                trigger: el,
                start: isMobile ? "top 92%" : "top 85%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
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
            "[data-hero-text], [data-about-quote], [data-about-experience], [data-about-education], [data-about-skills], [data-about-tools], [data-about-certificates]",
            {
              opacity: 1,
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
}
