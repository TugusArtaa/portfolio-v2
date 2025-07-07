import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useContactSectionAnimations() {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const mobileSettings = {
      duration: isMobile ? 0.8 : 1.2,
      stagger: isMobile ? 0.1 : 0.15,
      yOffset: isMobile ? 30 : 60,
      scale: isMobile ? 0.98 : 0.95,
      ease: "power2.out",
    };

    const ctx = gsap.context(() => {
      // Contact Title & Divider
      gsap.utils
        .toArray("[data-contact-title]")
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
              duration: mobileSettings.duration,
              ease: mobileSettings.ease,
              delay: i * mobileSettings.stagger,
              overwrite: "auto",
              scrollTrigger: {
                trigger: el,
                start: isMobile ? "top 90%" : "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none",
              },
            }
          );
        });

      // Contact Form
      gsap.utils
        .toArray("[data-contact-form]")
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
              duration: mobileSettings.duration,
              ease: mobileSettings.ease,
              delay: i * mobileSettings.stagger,
              overwrite: "auto",
              scrollTrigger: {
                trigger: el,
                start: isMobile ? "top 90%" : "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none",
              },
            }
          );
        });

      // Contact Social Media
      gsap.utils
        .toArray("[data-contact-social]")
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
              duration: mobileSettings.duration,
              ease: mobileSettings.ease,
              delay: i * (mobileSettings.stagger * 1.2),
              overwrite: "auto",
              scrollTrigger: {
                trigger: el,
                start: isMobile ? "top 90%" : "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none",
              },
            }
          );
        });
    });

    return () => ctx.revert();
  }, []);
}
