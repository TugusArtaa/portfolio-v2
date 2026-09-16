import SkillsSection from "@/components/About/SkillsSection";
import ToolsSection from "@/components/About/ToolsSection";
import CertificatesSection from "@/components/About/CertificatesSection";
import EducationSection from "@/components/About/EducationSection";
import ExperienceSection from "@/components/About/ExperienceSection";
import WhoAmISection from "@/components/About/WhoAmISection";
import QuoteSection from "@/components/About/QuoteSection";
import {
  skills,
  tools,
  certificates,
  experiences,
  getAboutById,
} from "@/data/portfolio-data";

export default function AboutPage() {
  const whoAmI = getAboutById("who_am_i");
  const quote = getAboutById("quote");

  return (
    <div className="min-h-screen py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Who Am I Section */}
        <WhoAmISection whoAmI={whoAmI} />

        {/* Skills Section */}
        <SkillsSection skills={skills} />

        {/* Tools Section */}
        <ToolsSection tools={tools} />

        {/* Experience Section */}
        <ExperienceSection experiences={experiences} />

        {/* Education Section */}
        <EducationSection />

        {/* Certificates Section */}
        <CertificatesSection certificates={certificates} />

        {/* Quote Section */}
        <QuoteSection quote={quote} />
      </div>
    </div>
  );
}
