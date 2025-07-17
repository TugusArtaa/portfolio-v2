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
    title: "System Analyst & UI/UX Designer",
    company: "Smart Camping Bali - Case Study Project",
    startDate: "Sept 2023",
    endDate: "Feb 2024",
    location: "Bali, Indonesia",
    description:
      "Analyzed and designed the tent reservation system using SDLC. Created UI/UX prototypes with Figma and designed the system database using MySQL Workbench.",
    logo: "/logo/SmartCamping.svg",
  },
  {
    id: 2,
    title: "E-Commerce Website Developer",
    company: "Tapyta Furniture - Final Project",
    startDate: "Sept 2023",
    endDate: "Feb 2024",
    location: "Bali, Indonesia",
    description:
      "Developed an e-commerce website for furniture sales with Midtrans payment gateway integration using PHP Native and MySQL.",
    logo: "/logo/Ecommerce.svg",
  },
  {
    id: 3,
    title: "Web Developer Intern",
    company: "PT. Bank Pembangunan Daerah Bali",
    startDate: "May 2024",
    endDate: "Jul 2025",
    location: "Denpasar, Bali",
    description:
      "Designed and developed a centralized email management system dashboard using Vue.js and Laravel. Built email template features, approval flows, and integrated frontend with API services.",
    logo: "/logo/BPD-Bali.svg",
  },
  {
    id: 4,
    title: "API Tester - SNAP BPD Bali",
    company: "Collaboration Project with PT. Bank BPD Bali",
    startDate: "May 2024",
    endDate: "Jun 2024",
    location: "Bali, Indonesia",
    description:
      "Performed testing of SNAP Payment API for 88 Bank BPD partners. Created API signature authorization using PHP and conducted system testing via Postman.",
    logo: "/logo/BPD-Bali.svg",
  },
  {
    id: 5,
    title: "Website Developer for Competition Registration",
    company: "PNBITC X ECO 2024",
    startDate: "Jul 2024",
    endDate: "Jul 2024",
    location: "Bali, Indonesia",
    description:
      "Built a registration website using WordPress with custom CSS, JavaScript adjustments, and Lottie animations to enhance user experience.",
    logo: "/logo/PNBITC.svg",
  },
  {
    id: 6,
    title: "Poster Designer",
    company: "SIGUNA Team - PIMNAS",
    startDate: "Jul 2024",
    endDate: "Jul 2024",
    location: "Bali, Indonesia",
    description:
      "Designed an informative and graphical poster for the final stage of the Indonesian Student Scientific Week (PIMNAS). Managed layout, color palette, and visual content.",
    logo: "/logo/PIMNAS.svg",
  },
  {
    id: 7,
    title: "Finalist of National Poster Creation Competition",
    company: "HMJ Pendidikan Dasar - Undiksha",
    startDate: "Nov 2024",
    endDate: "Nov 2024",
    location: "Singaraja, Bali",
    description:
      "Participated as a finalist in the National Poster Creation Competition 2024, organized individually. Achieved 5th place in the competition organized by the Elementary Education Student Association of Universitas Pendidikan Ganesha.",
    logo: "/logo/Undiksha.svg",
  },
  {
    id: 8,
    title: "Head of Division 1 Reasoning and Science",
    company: "Student Association of Information Technology",
    startDate: "Feb 2024",
    endDate: "Feb 2025",
    location: "Bali, Indonesia",
    description:
      "Led programs to improve academic and scientific achievements among students, including organizing national seminars and competitions.",
    logo: "/logo/HMJ-TI.svg",
  },
  {
    id: 9,
    title: "1st Winner of Poster Design Competition",
    company: "CITICE 2024",
    startDate: "Jun 2024",
    endDate: "Jun 2024",
    location: "Bali, Indonesia",
    description:
      "Won the first place in poster design competition during the Creative Competition of Information Technology X Intern Competition of Electro.",
    logo: "/logo/CITICE.svg",
  },
  {
    id: 10,
    title: "PKL Management Web Application Developer",
    company: "Personal Project (Freelance Service)",
    startDate: "May 2025",
    endDate: "May 2025",
    location: "Bali, Indonesia",
    description:
      "Developed a web application to streamline the internship (PKL) management process for the Department of Information Technology at Politeknik Negeri Bali. The system covers PKL registration, guidance submission, report upload, and final assessment by supervisors. Built with Laravel 11, Laravel Breeze (Auth), Tailwind CSS, Vite, and MySQL.",
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
