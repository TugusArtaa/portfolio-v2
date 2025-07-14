import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useProjectSectionAnimations(
  ref?: React.RefObject<HTMLElement>
) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const mobileSettings = {
        duration: isMobile ? 0.8 : 1.2,
        stagger: isMobile ? 0.1 : 0.15,
        yOffset: isMobile ? 30 : 60,
        scale: isMobile ? 0.98 : 0.95,
        ease: "power2.out",
      };

      // Animate section title and description
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
              duration: mobileSettings.duration,
              ease: mobileSettings.ease,
              delay: i * mobileSettings.stagger,
              scrollTrigger: {
                trigger: el,
                start: isMobile ? "top 90%" : "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none",
              },
            }
          );
        });

      // Animate each project card
      gsap.utils
        .toArray("[data-project-card]")
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
    }, ref);

    return () => ctx.revert();
  }, [ref]);
}
