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
    icon: "https://cdn-icons-png.flaticon.com/512/732/732212.png",
    createdAt: "2025-06-28T05:02:55.936Z",
  },
  {
    id: "css-ec801m",
    name: "CSS",
    level: "Expert",
    icon: "https://cdn-icons-png.flaticon.com/512/732/732190.png",
    createdAt: "2025-06-28T05:03:35.069Z",
  },
  {
    id: "laravel-rfg9jw",
    name: "Laravel",
    level: "Advanced",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1969px-Laravel.svg.png",
    createdAt: "2025-06-28T05:09:06.633Z",
  },
  {
    id: "react-cc2duf",
    name: "React",
    level: "Beginner",
    icon: "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",
    createdAt: "2025-06-28T05:09:40.573Z",
  },
  {
    id: "next-js-fv1n7k",
    name: "Next.js",
    level: "Intermediate",
    icon: "https://images.icon-icons.com/2148/PNG/512/nextjs_icon_132160.png",
    createdAt: "2025-06-28T05:11:05.943Z",
  },
  {
    id: "tailwind-css-icghcl",
    name: "Tailwind CSS",
    level: "Advanced",
    icon: "https://www.ayoadesanya.com/_next/static/media/tailwind.01004e3d.png",
    createdAt: "2025-06-28T05:12:19.747Z",
  },
  {
    id: "bootstrap-s85wkl",
    name: "Bootstrap",
    level: "Advanced",
    icon: "https://images.seeklogo.com/logo-png/38/2/bootstrap-5-logo-png_seeklogo-386607.png",
    createdAt: "2025-06-28T05:14:52.384Z",
  },
  {
    id: "vue-js-i2odii",
    name: "Vue.js",
    level: "Intermediate",
    icon: "https://cdn.iconscout.com/icon/free/png-256/free-vue-dot-js-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-7-pack-logos-icons-3030285.png?f=webp",
    createdAt: "2025-06-28T05:16:19.001Z",
  },
];

// ----- Tools Data -----

export const tools: Tool[] = [
  {
    id: "vscode-jurrpp",
    name: "VSCode",
    level: "Expert",
    icon: "https://cdn-icons-png.flaticon.com/512/906/906324.png",
    createdAt: "2025-06-28T04:51:10.537Z",
  },
  {
    id: "figma-ck8mcs",
    name: "Figma",
    level: "Advanced",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
    createdAt: "2025-06-28T04:51:34.640Z",
  },
  {
    id: "github-uiwcep",
    name: "GitHub",
    level: "Intermediate",
    icon: "https://cdn-icons-png.flaticon.com/512/733/733553.png",
    createdAt: "2025-06-28T04:52:14.710Z",
  },
  {
    id: "postman-z3ehd0",
    name: "Postman",
    level: "Intermediate",
    icon: "https://cdn.iconscout.com/icon/free/png-256/free-postman-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-brand-vol-5-pack-logos-icons-2945092.png",
    createdAt: "2025-06-28T04:55:12.697Z",
  },
  {
    id: "docker-spknqs",
    name: "Docker",
    level: "Intermediate",
    icon: "https://cdn-icons-png.flaticon.com/512/919/919853.png",
    createdAt: "2025-06-28T04:55:43.558Z",
  },
  {
    id: "canva-osa1fg",
    name: "Canva",
    level: "Expert",
    icon: "https://freepnglogo.com/images/all_img/1691829322canva-app-logo-png.png",
    createdAt: "2025-06-28T04:57:32.935Z",
  },
  {
    id: "adobe-photoshop-6nzre9",
    name: "Adobe Photoshop",
    level: "Advanced",
    icon: "https://w7.pngwing.com/pngs/587/253/png-transparent-adobe-photoshop-hd-logo-thumbnail.png",
    createdAt: "2025-06-28T04:58:40.446Z",
  },
  {
    id: "microsoft-word-jocmrz",
    name: "Microsoft Word",
    level: "Expert",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg/2203px-Microsoft_Office_Word_%282019%E2%80%93present%29.svg.png",
    createdAt: "2025-06-28T04:59:41.599Z",
  },
  {
    id: "microsoft-excel-tqrthb",
    name: "Microsoft Excel",
    level: "Expert",
    icon: "https://static.vecteezy.com/system/resources/thumbnails/027/179/363/small/microsoft-excel-icon-logo-symbol-free-png.png",
    createdAt: "2025-06-28T05:00:25.650Z",
  },
];

// ----- Projects Data (sorted by createdAt desc) -----

export const projects: Project[] = [
  {
    id: "portofolio-website-yhe3dc",
    title: "Portofolio Website",
    slug: "portofolio-website",
    description:
      "Portfolio Website is a React and Next.js-based web application designed to showcase your work, experience, and skills professionally. This system provides comprehensive features such as project management, certificates, skills, tools, and a personal profile that can be managed through the admin dashboard. With a modern, responsive, and easy-to-use interface, this website helps enhance personal branding and facilitates dynamic content management for users. Data on this website is managed using Supabase and Prisma as databases and ORM, making data storage and retrieval processes more efficient and secure.",
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
    description:
      "StartFolio is a Next.js based web application designed to simplify the creation and management of digital portfolios and CVs. The platform offers comprehensive features such as project, certificate, and skills creation, with interactive and responsive previews. StartFolio supports CV export to PDF format, making it easy for users to share their results professionally. With modern technology and a user-friendly interface, StartFolio helps users efficiently build attractive and ATS-friendly portfolios.",
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
    description:
      "SIPKL (Field Work Practice Information System) is a Laravel-based web application designed to simplify the management of the internship process on campus. This system provides comprehensive features, from internship registration and guidance requests to report uploads, to final assessment by the supervising lecturer. With a modern and responsive interface, SIPKL facilitates students, lecturers, and administrators in managing the entire internship process digitally and efficiently.",
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
    description:
      "The Web Service Email System is a web-based email delivery management application that supports bulk email delivery, priority queues using RabbitMQ, and real-time delivery status monitoring. This application allows users to manage integrated applications, send individual or bulk emails (via Excel upload), and monitor delivery logs with retry and error notification features. This system is designed for enterprises that require scheduled, integrated, and secure email delivery, with an analytical dashboard to monitor delivery performance.",
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
    description:
      "Tapyta Furniture is a PHP-based e-commerce application designed to make it easier for users to search, select, and purchase furniture products online. This website offers comprehensive features, from a product catalog, product details, a shopping cart, checkout with Midtrans payment integration, to order management and user profiles. It also includes an admin panel for managing products, categories, customers, orders, FAQs, and database import and export features. Tapyta Furniture is designed with a modern and responsive design, making it comfortable to access on various devices.",
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
    description:
      "Semester 3 Project - CoffeeTalk is a company profile website for a modern coffee shop located in Bali. This website displays comprehensive information about services, drink and food menus, barista team profiles, customer testimonials, and the coffee shop's contact information and location. With a responsive and interactive design, CoffeeTalk makes it easy for customers to learn about and contact the coffee shop online.",
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
    description:
      "Semester 2 Project - Static website for the Electrical Engineering Department of Bali State Polytechnic, featuring study program information, department profiles, a photo gallery of activities, and contact information. This website is designed as the department's official information medium with a simple appearance and easy-to-use navigation.",
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
    content: `<strong>Hi! I'm Putu Agus</strong>, a recent <strong>Diploma 3 Informatics Management</strong> graduate from Bali State Polytechnic. I have a strong interest in <strong>UI/UX design, front-end development, and graphic design.</strong>\n\nDuring my studies, I was actively involved in student organizations, managing their official accounts. I also completed a <strong>13-month internship as a Front-end Web Developer at Bank BPD Bali</strong>, where I focused on creating internal application interfaces and testing.\n\nI enjoy building clean, functional, and user-centered digital products. With a user-first mindset and attention to detail, <strong>I'm ready to contribute to a creative and development team.</strong> Let's build something great together!`,
    updatedAt: "2025-06-26T11:45:25.340Z",
  },
  {
    id: "quote",
    content: `"Code is like poetry. Simple, elegant, and built to solve." — Tugus Arta`,
    updatedAt: "2025-06-26T11:50:45.873Z",
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
  {
    id: "education",
    content: `Aspiring to become a professional Frontend Developer with a strong foundation in UI/UX design, I recently completed my Diploma in Informatics Management at Politeknik Negeri Bali (2022–2025), graduating Magna Cum Laude with a GPA of 3.98.\n\nMy academic journey has been shaped by a deep passion for designing user-centric digital products that not only function smoothly but also feel intuitive and visually compelling. Rather than treating design and development as separate silos, I see them as a continuous creative process — one that transforms ideas into interactive, meaningful experiences.\n\nThroughout my studies, I've worked on various real-world projects and design prototypes that emphasized responsiveness, accessibility, and clarity. This experience, combined with a strong design sense and problem-solving mindset, has driven me to explore the intersection between frontend engineering and human-centered design.\n\nI'm continuously learning, experimenting, and building — excited to bring ideas to life, improve the way people interact with technology, and shape digital experiences that truly matter.`,
    updatedAt: "2025-06-30T20:15:53.597Z",
  },
];

// ----- Experiences Data -----

export const experiences: Experience[] = [
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
    company: "Personal - Freelance",
    startDate: "May 2025",
    endDate: "May 2025",
    location: "Bali, Indonesia",
    description:
      "Developed a web application to simplify the internship (PKL) management process on campus. This system includes PKL registration, submission of guidelines, report upload, and final assessment by the supervising lecturer. The system was built using Laravel 11, Laravel Breeze (Auth), Tailwind CSS, Vite, and MySQL.",
    logo: "/logo/Web-logo.svg",
  },
];

// ----- Helper Functions -----

export function getAboutById(id: string): About | undefined {
  return aboutEntries.find((item) => item.id === id);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((item) => item.slug === slug);
}
