"use client";

import HeroSection from "@/components/Home/HeroSection";
import SummarySection from "@/components/Home/SummarySection";
import ServicesSection from "@/components/Home/ServicesSection";
import ProjectsSection from "@/components/Home/ProjectsSection";
import Footer from "@/components/Shared/Footer";
import useHomePageAnimations from "@/hooks/useHomePageAnimations";

export default function HomeContent() {
  const { heroRef, summaryRef, servicesRef, projectsRef, connectRef } =
    useHomePageAnimations();

  return (
    <>
      {/* Hero Section — Sticky top-0 isolate z-[1] matching wildan.pics */}
      <HeroSection ref={heroRef} />

      {/* Main Content Section — Pure white surface with flat top edge and shadow sliding over Hero */}
      <section className="relative w-full z-40 bg-white text-zinc-900 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] selection:bg-[#455ce9] selection:text-white">
        <SummarySection ref={summaryRef} />
        <ServicesSection ref={servicesRef} />
        <ProjectsSection ref={projectsRef} />
        <Footer ref={connectRef} />
      </section>
    </>
  );
}
