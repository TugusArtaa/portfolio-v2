"use client";

import HeroSection from "@/components/Home/HeroSection";
import AboutSection from "@/components/Home/AboutSection";
import ProjectsSection from "@/components/Home/ProjectsSection";
import ConnectSection from "@/components/Home/ConnectSection";
import useHomePageAnimations from "@/hooks/useHomePageAnimations";

export default function HomePage() {
  const { heroRef, aboutRef, projectsRef, connectRef } =
    useHomePageAnimations();

  return (
    <>
      <HeroSection ref={heroRef} />
      <AboutSection ref={aboutRef} />
      <ProjectsSection ref={projectsRef} />
      <ConnectSection ref={connectRef} />
    </>
  );
}
