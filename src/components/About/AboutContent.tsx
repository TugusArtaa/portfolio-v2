"use client";

import SkillsSection from "@/components/About/SkillsSection";
import ToolsSection from "@/components/About/ToolsSection";
import CertificatesSection from "@/components/About/CertificatesSection";
import ExperienceSection from "@/components/About/ExperienceSection";
import WhoAmISection from "@/components/About/WhoAmISection";
import useAboutSectionAnimations from "@/hooks/useAboutSectionAnimations";
import {
  skills,
  tools,
  certificates,
  experiences,
  getAboutById,
} from "@/data/portfolio-data";

export default function AboutContent() {
  useAboutSectionAnimations();
  const whoAmI = getAboutById("who_am_i");

  return (
    <div className="relative w-full bg-[#FAFAF9] text-zinc-900 selection:bg-[#455ce9] selection:text-white">
      {/* Hero Section of About Page — Identity & Background */}
      <WhoAmISection whoAmI={whoAmI} />

      {/* Main Content Sections */}
      <SkillsSection skills={skills} />
      <ToolsSection tools={tools} />
      <ExperienceSection experiences={experiences} />
      <CertificatesSection certificates={certificates} />
    </div>
  );
}
