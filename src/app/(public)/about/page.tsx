import type { About, Skill, Tool, Certificate } from "@prisma/client";
import SkillsSection from "@/components/About/SkillsSection";
import ToolsSection from "@/components/About/ToolsSection";
import CertificatesSection from "@/components/About/CertificatesSection";
import EducationSection from "@/components/About/EducationSection";
import ExperienceSection from "@/components/About/ExperienceSection";
import WhoAmISection from "@/components/About/WhoAmISection";
import QuoteSection from "@/components/About/QuoteSection";

// Fungsi fetch data dari API public
async function getData(endpoint: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/public/${endpoint}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  return res.json();
}

// Mock data untuk experience
const experiences = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Startup",
    startDate: "Jan 2023",
    endDate: "Present",
    location: "Remote",
    description:
      "Developed responsive web applications using React, Next.js, and Tailwind CSS. Collaborated with design team to implement pixel-perfect UI components and improved user experience across multiple platforms.",
    logo: "/logo/Web-logo.svg",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Creative Agency",
    startDate: "Jun 2022",
    endDate: "Dec 2022",
    location: "Bali, Indonesia",
    description:
      "Designed user interfaces for mobile and web applications. Created wireframes, prototypes, and conducted user research to improve user experience. Led design system implementation across 5+ projects.",
    logo: "/logo/Web-logo.svg",
  },
  {
    id: 3,
    title: "Graphic Designer",
    company: "Digital Marketing",
    startDate: "Mar 2021",
    endDate: "May 2022",
    location: "Jakarta, Indonesia",
    description:
      "Created visual content for social media campaigns, branding materials, and marketing collaterals. Worked with various clients across different industries and managed multiple design projects simultaneously.",
    logo: "/logo/Web-logo.svg",
  },
  {
    id: 4,
    title: "Joki Website",
    company: "Bisnis Pribadi",
    startDate: "Mar 2021",
    endDate: "May 2022",
    location: "Jakarta, Indonesia",
    description:
      "Created visual content for social media campaigns, branding materials, and marketing collaterals. Worked with various clients across different industries and managed multiple design projects simultaneously.",
    logo: "/logo/Web-logo.svg",
  },
];

export default async function AboutPage() {
  const [about, skills, tools, certificates]: [
    About[],
    Skill[],
    Tool[],
    Certificate[]
  ] = await Promise.all([
    getData("about"),
    getData("skill"),
    getData("tool"),
    getData("certificate"),
  ]);

  // Ambil masing-masing bagian about berdasarkan id
  const getAboutById = (id: string): About | undefined =>
    Array.isArray(about) ? about.find((item) => item.id === id) : undefined;

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
