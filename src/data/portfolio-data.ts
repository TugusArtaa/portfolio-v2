// ==========================================
// Portfolio Data — Static Content
// Menggantikan seluruh data dari database (Prisma/Supabase)
// ==========================================

// ----- Type Definitions -----

export type Skill = {
  id: string;
  name: string;
  level: string | null;
  icon: string | null;
  createdAt: string;
};

export type Tool = {
  id: string;
  name: string;
  level: string | null;
  icon: string | null;
  createdAt: string;
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expireDate: string | null;
  image: string | null;
  userId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type About = {
  id: string;
  content: string;
  updatedAt: string;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  coverImage: string;
  url: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string | null;
  image1: string | null;
  image2: string | null;
  image3: string | null;
  category?: "Web Development" | "Branding" | "Graphic Design" | string;
};

export type Experience = {
  id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  logo: string;
};

// ----- Skills Data -----

export const skills: Skill[] = [
  {
    id: "html-j991dr",
    name: "HTML",
    level: "Expert",
    icon: "/icons/html.svg",
    createdAt: "2025-06-28T05:02:55.936Z",
  },
  {
    id: "css-ec801m",
    name: "CSS",
    level: "Expert",
    icon: "/icons/css.svg",
    createdAt: "2025-06-28T05:03:35.069Z",
  },
  {
    id: "javascript-js89kd",
    name: "JavaScript",
    level: "Advanced",
    icon: "/icons/javascript.svg",
    createdAt: "2025-06-28T05:04:12.000Z",
  },
  {
    id: "typescript-ts42op",
    name: "TypeScript",
    level: "Advanced",
    icon: "/icons/typescript.svg",
    createdAt: "2025-06-28T05:05:00.000Z",
  },
  {
    id: "php-ph71mn",
    name: "PHP",
    level: "Advanced",
    icon: "/icons/php.svg",
    createdAt: "2025-06-28T05:06:00.000Z",
  },
  {
    id: "react-cc2duf",
    name: "React",
    level: "Advanced",
    icon: "/icons/react.svg",
    createdAt: "2025-06-28T05:09:40.573Z",
  },
  {
    id: "next-js-fv1n7k",
    name: "Next.js",
    level: "Advanced",
    icon: "/icons/nextjs.svg",
    createdAt: "2025-06-28T05:11:05.943Z",
  },
  {
    id: "vue-js-i2odii",
    name: "Vue.js",
    level: "Intermediate",
    icon: "/icons/vue.svg",
    createdAt: "2025-06-28T05:16:19.001Z",
  },
  {
    id: "laravel-rfg9jw",
    name: "Laravel",
    level: "Advanced",
    icon: "/icons/laravel.svg",
    createdAt: "2025-06-28T05:09:06.633Z",
  },
  {
    id: "tailwind-css-icghcl",
    name: "Tailwind CSS",
    level: "Advanced",
    icon: "/icons/tailwindcss.svg",
    createdAt: "2025-06-28T05:12:19.747Z",
  },
  {
    id: "nodejs-nd83pl",
    name: "Node.js",
    level: "Intermediate",
    icon: "/icons/nodejs.svg",
    createdAt: "2025-06-28T05:17:00.000Z",
  },
  {
    id: "mysql-my92qw",
    name: "MySQL",
    level: "Advanced",
    icon: "/icons/mysql.svg",
    createdAt: "2025-06-28T05:18:00.000Z",
  },
  {
    id: "wordpress-wp38ct",
    name: "WordPress",
    level: "Intermediate",
    icon: "/icons/wordpress.svg",
    createdAt: "2025-06-28T05:23:00.000Z",
  },
  {
    id: "framer-motion-fm82pq",
    name: "Framer Motion",
    level: "Advanced",
    icon: "/icons/framer.svg",
    createdAt: "2025-06-28T05:25:00.000Z",
  },
];

// ----- Tools Data -----

export const tools: Tool[] = [
  {
    id: "vscode-jurrpp",
    name: "VS Code",
    level: "Expert",
    icon: "/icons/vscode.svg",
    createdAt: "2025-06-28T04:51:10.537Z",
  },
  {
    id: "antigravity-ag92kd",
    name: "Antigravity",
    level: "Expert",
    icon: "/icons/antigravity.svg",
    createdAt: "2025-06-28T04:51:20.000Z",
  },
  {
    id: "figma-ck8mcs",
    name: "Figma",
    level: "Advanced",
    icon: "/icons/figma.svg",
    createdAt: "2025-06-28T04:51:34.640Z",
  },
  {
    id: "github-uiwcep",
    name: "GitHub",
    level: "Intermediate",
    icon: "/icons/github.svg",
    createdAt: "2025-06-28T04:52:14.710Z",
  },
  {
    id: "postman-z3ehd0",
    name: "Postman",
    level: "Intermediate",
    icon: "/icons/postman.svg",
    createdAt: "2025-06-28T04:55:12.697Z",
  },
  {
    id: "docker-spknqs",
    name: "Docker",
    level: "Intermediate",
    icon: "/icons/docker.svg",
    createdAt: "2025-06-28T04:55:43.558Z",
  },
  {
    id: "laragon-lg82pw",
    name: "Laragon",
    level: "Advanced",
    icon: "/icons/laragon.svg",
    createdAt: "2025-06-28T04:56:00.000Z",
  },
  {
    id: "adobe-photoshop-6nzre9",
    name: "Photoshop",
    level: "Advanced",
    icon: "/icons/photoshop.svg",
    createdAt: "2025-06-28T04:58:40.446Z",
  },
  {
    id: "affinity-af83kp",
    name: "Affinity",
    level: "Intermediate",
    icon: "/icons/affinity.svg",
    createdAt: "2025-06-28T04:57:00.000Z",
  },
  {
    id: "canva-osa1fg",
    name: "Canva",
    level: "Expert",
    icon: "/icons/canva.svg",
    createdAt: "2025-06-28T04:57:32.935Z",
  },
  {
    id: "capcut-cc91mp",
    name: "CapCut",
    level: "Advanced",
    icon: "/icons/capcut.svg",
    createdAt: "2025-06-28T04:59:00.000Z",
  },
  {
    id: "adobe-lightroom-lr84kd",
    name: "Adobe Lightroom",
    level: "Intermediate",
    icon: "/icons/lightroom.svg",
    createdAt: "2025-06-28T05:00:00.000Z",
  },
];

// ----- Projects Data (sorted by createdAt desc) -----

export const projects: Project[] = [
  {
    id: "portofolio-website-yhe3dc",
    title: "Portfolio Website",
    slug: "portofolio-website",
    category: "Web Development",
    description:
      "A modern web application built with React and Next.js, designed to showcase projects, professional experience, and technical skills with high visual fidelity. The platform features dynamic project archives, certificate showcases, interactive skill matrices, and a customized administration dashboard. Data management is powered by Supabase and Prisma ORM, ensuring robust security, seamless content updates, and optimal query performance.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Prisma",
      "Supabase",
      "NextAuth.js",
      "React Sounds",
      "GSAP",
      "Three.js",
    ],
    coverImage: "/uploads/1753757923008-Cover-Portfolio.png",
    url: "https://portofolio-web-tugus.vercel.app/",
    createdAt: "2025-07-29T02:59:28.744Z",
    updatedAt: "2025-07-29T02:59:28.744Z",
    userId: null,
    image1: "/uploads/1753757934260-Portfolio-One.png",
    image2: "/uploads/1753757939890-Portfolio-Two.png",
    image3: "/uploads/1753757945161-Portfolio-Three.png",
  },
  {
    id: "startfolio-l1q1ln",
    title: "Startfolio",
    slug: "startfolio",
    category: "Web Development",
    description:
      "StartFolio is a Next.js-based web application designed to streamline the creation and management of digital portfolios and professional CVs. The platform features intuitive tools for curating projects, certifications, and technical proficiencies, paired with real-time responsive previews and ATS-friendly PDF export capabilities. Built with modern web architecture, StartFolio empowers developers and creators to present their career achievements cleanly and effectively.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Prisma ORM",
      "TailwindCSS",
      "React",
      "JWT",
    ],
    coverImage: "/uploads/1753757148467-Cover-StartFolio.png",
    url: "https://github.com/TugusArtaa/Startfolio.git",
    createdAt: "2025-07-29T02:46:28.799Z",
    updatedAt: "2025-07-29T02:46:28.799Z",
    userId: null,
    image1: "/uploads/1753757155905-StartFolio-One.png",
    image2: "/uploads/1753757161378-StartFolio-Two.png",
    image3: "/uploads/1753757168800-StartFolio-Three.png",
  },
  {
    id: "sipkl-website-fno5wx",
    title: "SIPKL Website",
    slug: "sipkl-website",
    category: "Web Development",
    description:
      "SIPKL (Internship Management Information System) is a Laravel-based web application engineered to streamline collegiate internship workflows. The platform digitizes the entire academic lifecycle—from initial student registration and faculty advisory requests to report submissions and final supervisor evaluations—enabling students, lecturers, and academic administrators to collaborate seamlessly within a unified, responsive interface.",
    techStack: [
      "Laravel 11",
      "Laravel Breeze",
      "Tailwind CSS",
      "Vite",
      "MySQL",
    ],
    coverImage: "/uploads/1753754523893-Cover-SIPKL.png",
    url: "https://github.com/TugusArtaa/SIPKL.git",
    createdAt: "2025-07-29T02:31:48.105Z",
    updatedAt: "2025-07-29T02:31:48.105Z",
    userId: null,
    image1: "/uploads/1753754542927-SIPKL-One.png",
    image2: "/uploads/1753754549866-SIPKL-Two.png",
    image3: "/uploads/1753754557859-SIPKL-Three.png",
  },
  {
    id: "s-mes-website-nnwau7",
    title: "S-MES Website",
    slug: "s-mes-website",
    category: "Web Development",
    description:
      "S-MES (Web Service Email System) is an enterprise email delivery management platform engineered for scheduled, high-volume messaging. Powered by Laravel, Vue.js, and RabbitMQ priority message queues, it provides real-time transmission monitoring, automated retry mechanisms, error alerting, and bulk recipient imports via spreadsheet upload, backed by an intuitive analytics dashboard for delivery performance tracking.",
    techStack: [
      "Vue",
      "TailwindCSS",
      "Laravel 10+",
      "PHP",
      "RabbitMQ",
      "MySQL",
      "Maatwebsite",
      "Vue-Chartjs",
      "Tippy.js",
    ],
    coverImage: "/uploads/1753753572840-Cover-SMES.png",
    url: "https://github.com/TugusArtaa/Email-Service-Web.git",
    createdAt: "2025-07-29T01:51:20.501Z",
    updatedAt: "2025-07-29T01:51:20.501Z",
    userId: null,
    image1: "/uploads/1753753835271-SMES-One.png",
    image2: "/uploads/1753753846326-SMES-Two.png",
    image3: "/uploads/1753753854127-SMES-Three.png",
  },
  {
    id: "tapyta-furniture-qhc569",
    title: "Tapyta Furniture",
    slug: "tapyta-furniture",
    category: "Web Development",
    description:
      "Tapyta Furniture is a full-featured e-commerce platform built with PHP and MySQL, offering a seamless online shopping experience for bespoke furniture. It integrates a dynamic product catalog, interactive cart, automated checkout via the Midtrans payment gateway, and customer order tracking. An integrated administrator dashboard enables efficient inventory control, category management, and sales reporting across desktop and mobile devices.",
    techStack: [
      "PHP",
      "MySQL",
      "JavaScript",
      "Chart.js",
      "Bootstrap",
      "HTML",
      "CSS",
      "jQuery",
      "Midtrans API",
    ],
    coverImage: "/uploads/1753752849132-Cover-Tapyta.png",
    url: "https://github.com/TugusArtaa/TapytaFurniture.git",
    createdAt: "2025-07-29T01:34:59.868Z",
    updatedAt: "2025-07-29T01:34:59.868Z",
    userId: null,
    image1: "/uploads/1753752858200-CoffeTalk-One.png",
    image2: "/uploads/1753752865924-Tapyta-Two.png",
    image3: "/uploads/1753752873869-Tapyta-Three.png",
  },
  {
    id: "coffee-talk-lm7afy",
    title: "Coffee Talk",
    slug: "coffee-talk",
    category: "Web Development",
    description:
      "CoffeeTalk is a contemporary brand identity and company profile website for an artisanal Bali coffee house. The platform presents digital food and beverage menus, barista team spotlights, customer testimonials, and location details through a responsive, mobile-first design crafted to enhance customer engagement and in-store visits.",
    techStack: ["HTML", "CSS", "JavaScript", "Bootstrap", "jQuery"],
    coverImage: "/uploads/1753752488104-Cover-CoffeTalk.png",
    url: "https://github.com/TugusArtaa/CoffeTalk.git",
    createdAt: "2025-07-29T01:28:58.284Z",
    updatedAt: "2025-07-29T01:28:58.284Z",
    userId: null,
    image1: "/uploads/1753752495072-CoffeTalk-One.png",
    image2: "/uploads/1753752501722-CoffeTalk-Two.png",
    image3: "/uploads/1753752509476-CoffeTalk-Three.png",
  },
  {
    id: "electrical-engineering-6mzthq",
    title: "Electrical Engineering",
    slug: "electrical-engineering",
    category: "Web Development",
    description:
      "An official departmental web portal developed for the Electrical Engineering Department at Politeknik Negeri Bali. It delivers academic program overviews, faculty profiles, campus activity galleries, and departmental announcements with a clean architectural layout and intuitive navigation.",
    techStack: ["HTML", "CSS"],
    coverImage: "/uploads/1753752052622-Cover-TeknikElektro.png",
    url: "https://github.com/TugusArtaa/JurusanTeknikElektro.git",
    createdAt: "2025-07-29T01:22:21.617Z",
    updatedAt: "2025-07-29T01:22:21.617Z",
    userId: null,
    image1: "/uploads/1753752045606-TeknikElektro-One.png",
    image2: "/uploads/1753752061175-TeknikElektro-Two.png",
    image3: "/uploads/1753752068087-TeknikElektro-Three.png",
  },
];

// ----- Certificates Data -----

export const certificates: Certificate[] = [
  {
    id: "microsoft-excel-basic-zak8vh",
    title: "Microsoft Excel Basic",
    issuer: "MySkill",
    issueDate: "2025-07-26T00:00:00.000Z",
    expireDate: null,
    image: "/uploads/1753759225091-Excel_Basic.png",
    userId: null,
    createdAt: "2025-07-29T03:12:57.606Z",
    updatedAt: "2025-07-29T03:20:41.173Z",
  },
  {
    id: "microsoft-excel-intermediate-x1x0ay",
    title: "Microsoft Excel Intermediate",
    issuer: "MySkill",
    issueDate: "2025-07-26T00:00:00.000Z",
    expireDate: null,
    image: "/uploads/1753759307191-Excel_Intermediate.png",
    userId: null,
    createdAt: "2025-07-29T03:21:55.727Z",
    updatedAt: "2025-07-29T03:21:55.727Z",
  },
  {
    id: "microsoft-word-5r3ot8",
    title: "Microsoft Word",
    issuer: "MySkill",
    issueDate: "2025-07-26T00:00:00.000Z",
    expireDate: null,
    image: "/uploads/1753759417400-Word.png",
    userId: null,
    createdAt: "2025-07-29T03:23:45.929Z",
    updatedAt: "2025-07-29T03:23:45.929Z",
  },
  {
    id: "microsoft-powerpoint-ybk9fp",
    title: "Microsoft PowerPoint",
    issuer: "MySkill",
    issueDate: "2025-07-26T00:00:00.000Z",
    expireDate: null,
    image: "/uploads/1753759487971-PowerPoint.png",
    userId: null,
    createdAt: "2025-07-29T03:24:52.412Z",
    updatedAt: "2025-07-29T03:24:52.412Z",
  },
];

// ----- About Data -----

export const aboutEntries: About[] = [
  {
    id: "who_am_i",
    content: `<strong>Hi! I'm Putu Agus</strong> — a <strong>Web Developer & Creative Enthusiast</strong> based in Bali. Currently in my 7th semester of <strong>Digital Business at Politeknik Negeri Bali</strong>, I build high-performance web applications where clean engineering meets bold visual craft.\n\nWith a <strong>13-month frontend tenure at PT. Bank BPD Bali</strong> developing enterprise systems and <strong>1 year directing media & visual content at BIM University</strong>, I don't just write code — I craft intuitive, conversion-focused digital experiences that leave a lasting impression.`,
    updatedAt: "2026-09-20T01:01:00.000Z",
  },
  {
    id: "gmail",
    content: "ptaguss2@gmail.com",
    updatedAt: "2025-06-30T20:15:05.477Z",
  },
  {
    id: "instagram",
    content:
      "https://www.instagram.com/putuaguss?igsh=MWNldDl0MjYyN3o1MA==",
    updatedAt: "2025-06-30T20:14:31.883Z",
  },
  {
    id: "linkedin",
    content: "https://www.linkedin.com/in/iputuagusseniartawan/",
    updatedAt: "2025-06-26T11:55:37.453Z",
  },
  {
    id: "github",
    content: "https://github.com/TugusArtaa",
    updatedAt: "2025-06-26T11:53:33.840Z",
  },
  {
    id: "whatsapp",
    content: "6285173364754",
    updatedAt: "2025-06-30T20:16:49.200Z",
  },
  {
    id: "discord",
    content: "Tugusartaa",
    updatedAt: "2025-07-01T10:51:21.981Z",
  },
  {
    id: "call_to_action",
    content:
      "Always open to new collaborations, freelance projects, or full-time opportunities. Let's build something great!",
    updatedAt: "2025-06-26T11:56:26.599Z",
  },
];

// ----- Experiences Data -----

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Social Media & Content Specialist",
    company: "BIM University",
    startDate: "2024",
    endDate: "2025",
    location: "Bali, Indonesia",
    description:
      "Directed digital content strategy, brand visual identity, and multimedia campaign production to enhance institutional visibility and audience engagement.",
    logo: "/logo/Web-logo.svg",
  },
  {
    id: 2,
    title: "Web Developer Intern",
    company: "PT. Bank Pembangunan Daerah Bali",
    startDate: "May 2024",
    endDate: "Jul 2025",
    location: "Denpasar, Bali",
    description:
      "Architected and engineered a centralized email management dashboard using Vue.js and Laravel, implementing dynamic template builders, multi-tier approval workflows, and secure REST API integrations.",
    logo: "/logo/BPD-Bali.svg",
  },
  {
    id: 3,
    title: "API Tester - SNAP BPD Bali",
    company: "Collaboration Project with PT. Bank BPD Bali",
    startDate: "May 2024",
    endDate: "Jun 2024",
    location: "Bali, Indonesia",
    description:
      "Conducted end-to-end SNAP Payment API integration testing across 88 institutional banking partners, developing cryptographic signature authorization scripts in PHP and validating transaction payloads via Postman.",
    logo: "/logo/BPD-Bali.svg",
  },
  {
    id: 4,
    title: "Lead Web Developer – Event Registration Platform",
    company: "PNBITC X ECO 2024",
    startDate: "Jul 2024",
    endDate: "Jul 2024",
    location: "Bali, Indonesia",
    description:
      "Developed a dedicated event registration platform using WordPress, engineered with custom CSS, dynamic JavaScript interactivity, and lightweight Lottie animations for a seamless user onboarding flow.",
    logo: "/logo/PNBITC.svg",
  },
  {
    id: 5,
    title: "Head of Division I – Academic Research & Reasoning",
    company: "Student Association of Information Technology",
    startDate: "Feb 2024",
    endDate: "Feb 2025",
    location: "Bali, Indonesia",
    description:
      "Spearheaded academic and scientific development initiatives across the department, directing large-scale national technology seminars and student competitions to cultivate technical excellence.",
    logo: "/logo/HMJ-TI.svg",
  },
];

// ----- Helper Functions -----

export function getAboutById(id: string): About | undefined {
  return aboutEntries.find((item) => item.id === id);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((item) => item.slug === slug);
}
