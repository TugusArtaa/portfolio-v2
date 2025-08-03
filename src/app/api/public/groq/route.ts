import { NextResponse } from "next/server";
import Groq from "groq-sdk";

// Inisialisasi Groq SDK dengan API Key dari environment variable
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Data konteks portfolio Tuagus yang akan digunakan sebagai referensi bot
const portfolioContext = `# Tuagus - Portfolio Information

## Personal Information
- Full Name: I Putu Agus SeniArtawan
- Location: Bali, Indonesia
- Education: Diploma 3 in Informatics Management, Politeknik Negeri Bali (2022–2025), GPA 3.98
- Professional Focus: UI/UX Design, Front-end Development, and Graphic Design
- Experience: 13-month internship as Front-end Web Developer at Bank BPD Bali
- Quote: "Code is like poetry. Simple, elegant, and built to solve." — Tuagus
- Keywords: putu agus, bali, informatics, ui/ux, frontend, graphic design, developer
- Priority: 5

## Professional Summary
- Current Status: Recent graduate actively seeking collaboration opportunities, freelance projects, or full-time positions
- Specialization: Creating user-centric, responsive, and intuitive digital product designs
- Approach: Always committed to continuous learning and staying updated with latest technology trends
- Team Experience: Active in campus organizations and collaborative development projects
- Open to Learning: Interested in exploring new fields and opportunities for growth
- Keywords: collaboration, freelance, full-time, creative team, contribution, learning
- Priority: 4

## Technical Skills
### Frontend Development
- Languages: HTML, CSS, JavaScript, TypeScript
- Frameworks & Libraries: React.js, Next.js, Vue.js
- Styling: Tailwind CSS, Bootstrap, SCSS/SASS
- Animation: GSAP, Framer Motion, Three.js

### Backend Development
- Languages: PHP
- Frameworks: Laravel
- Databases: MySQL, Supabase
- ORM: Prisma ORM
- Authentication: JWT, NextAuth, OAuth, Google Auth
- Message Queuing: RabbitMQ

### Design & Tools
- UI/UX Design: Figma, Adobe Photoshop, Canva
- Development Tools: Git, GitHub, VSCode, Postman
- Containerization: Docker
- Office Suite: Microsoft Excel, Microsoft Word
- Prototyping: Interactive design, user testing

### Additional Skills
- Content Creation & Social Media Management
- Administrative Tasks & Organization
- Digital Marketing & Community Management
- Quick Learning & Adaptability

Note: Skills and tools are continuously upgraded and updated. For the most complete and up-to-date information, please visit the About page on the website.

Keywords: frontend, backend, ui/ux, figma, react, next.js, laravel, docker, git, github, admin, social media
Priority: 5

## Professional Experience
### Bank BPD Bali - Front-end Web Developer Intern
- Duration: 13 months
- Responsibilities: 
  - Developed user interfaces for internal banking applications
  - Conducted comprehensive application testing and debugging
  - Collaborated with senior developers on enterprise-level projects
  - Implemented responsive design principles for cross-device compatibility

### Campus Leadership
- Role: Social media manager for official campus organization accounts
- Skills Developed: Content creation, community management, digital marketing

Keywords: internship, bpd bali, frontend, banking applications, testing, leadership, social media
Priority: 4

## Featured Projects
### 1. Coffee Talk
- Description: Modern coffee shop company profile website for Bali-based business
- Technologies: HTML5, CSS3, JavaScript, Bootstrap, jQuery
- Features: Responsive design, interactive elements, modern UI
- Repository: https://github.com/TugusArtaa/CoffeTalk.git

### 2. Portfolio Website
- Description: Personal portfolio built with React & Next.js featuring admin dashboard
- Technologies: React, Next.js, Supabase, Prisma ORM
- Features: Content management, responsive design, dark/light theme
- Live Demo: https://portofolio-web-tugus.vercel.app/

### 3. S-MES (Smart Mail Email Service)
- Description: Web-based email management system supporting bulk email and monitoring
- Technologies: Vue.js, TailwindCSS, Laravel, RabbitMQ
- Features: Bulk email sending, delivery tracking, queue management
- Repository: https://github.com/TugusArtaa/Email-Service-Web.git

### 4. SIPKL (Internship Information System)
- Description: Laravel-based system for managing internship programs
- Technologies: Laravel, PHP, MySQL
- Features: Student management, company partnerships, reporting
- Repository: https://github.com/TugusArtaa/SIPKL.git

### 5. Startfolio
- Description: Platform for creating portfolios and CVs with PDF export functionality
- Technologies: Next.js, React, PDF generation
- Features: Template customization, real-time preview, export options
- Repository: https://github.com/TugusArtaa/Startfolio.git

### 6. Tapyta Furniture
- Description: E-commerce platform for furniture with integrated payment system
- Technologies: PHP, Midtrans Payment Gateway
- Features: Product catalog, shopping cart, secure payments
- Repository: https://github.com/TugusArtaa/TapytaFurniture.git

### 7. Electrical Engineering Department Website
- Description: Static website for Politeknik Negeri Bali Electrical Engineering Department
- Technologies: HTML5, CSS3
- Features: Department information, program details, responsive layout
- Repository: https://github.com/TugusArtaa/JurusanTeknikElektro.git

Note: Projects are continuously updated and new ones are added. For the most complete and up-to-date project portfolio, please visit the Projects page on the website.

Keywords: projects, portfolio, coffee talk, sipkl, startfolio, tapyta, email service
Priority: 4

## Contact Information
1. Email: ptaguss2@gmail.com
2. LinkedIn: https://www.linkedin.com/in/iputuagusseniartawan
3. Instagram: https://www.instagram.com/putuaguss
4. GitHub: https://github.com/TugusArtaa
5. WhatsApp: https://wa.me/6285173364754
6. Discord: Tugusartaa

Keywords: contact, email, linkedin, instagram, github, whatsapp, discord
Priority: 3

## Certifications & Continuous Learning
- Has several certificates related to courses and technology experience
- Commitment to ongoing professional development through courses and certifications
- Focus areas: Modern web development, UI/UX best practices, emerging technologies
- Always exploring new tools and frameworks to enhance skill set
- Continuously striving for development and improvement
- Note: All certificates can be viewed directly on the About page of the website

Keywords: certifications, certificates, training, continuous learning, professional development, sertifikat
Priority: 4

## Career Opportunities & Openness
- Primary Expertise: UI/UX Design, Frontend Development, Graphic Design
- Open to Learning: Administrative roles, Social Media Management, Content Creation, Digital Marketing
- Approach: Eager to learn and grow in new fields, both technical and non-technical
- Contact for Opportunities: Available for discussion about any interesting opportunities

Keywords: career, opportunities, learning, growth, admin, social media, marketing
Priority: 4

## Website Navigation
- Home Page: https://portofolio-web-tugus.vercel.app
- About Page: https://portofolio-web-tugus.vercel.app/about (Contains complete information about skills, tools, experience, education, and certificates)
- Projects Page: https://portofolio-web-tugus.vercel.app/projects (Contains detailed information about all projects and work samples)
- Contact Page: https://portofolio-web-tugus.vercel.app/contact (Contains all contact information and ways to get in touch)

## Bot Identity
- Name: TuagusBot
- Role: Personal AI assistant for Tuagus
- Purpose: Provide information about Tuagus background, skills, and portfolio
- Personality: Professional, helpful, and knowledgeable

Keywords: tuagusbot, assistant, ai helper
Priority: 2
`;

// Kumpulan kata kunci untuk mengkategorikan pertanyaan user
const commonQuestions = {
  greeting: [
    "hello",
    "hi",
    "hey",
    "good morning",
    "good afternoon",
    "good evening",
    "halo",
    "hai",
  ],
  about: [
    "about",
    "who are you",
    "tell me about",
    "background",
    "introduction",
    "siapa",
    "tentang",
  ],
  skills: [
    "skills",
    "technologies",
    "what can you do",
    "expertise",
    "abilities",
    "keahlian",
    "kemampuan",
    "tools",
    "software",
  ],
  experience: [
    "experience",
    "work",
    "job",
    "internship",
    "career",
    "pengalaman",
    "kerja",
    "magang",
  ],
  projects: [
    "projects",
    "portfolio",
    "work samples",
    "what have you built",
    "proyek",
    "karya",
  ],
  contact: [
    "contact",
    "reach",
    "email",
    "phone",
    "social media",
    "get in touch",
    "kontak",
    "hubungi",
  ],
  education: [
    "education",
    "study",
    "university",
    "college",
    "degree",
    "pendidikan",
    "kuliah",
  ],
  location: ["where", "location", "bali", "indonesia", "dimana", "lokasi"],
  availability: [
    "available",
    "hiring",
    "freelance",
    "work together",
    "collaborate",
    "tersedia",
    "kerjasama",
  ],
  certificates: [
    "certificate",
    "certification",
    "certified",
    "sertifikat",
    "sertifikasi",
    "course",
    "training",
    "kursus",
    "pelatihan",
  ],
  jobOffer: [
    "job offer",
    "position",
    "vacancy",
    "hiring",
    "recruitment",
    "opportunity",
    "role",
    "admin",
    "administrator",
    "social media specialist",
    "marketing",
    "content creator",
    "lowongan",
    "posisi",
    "pekerjaan",
  ],
};

// Fungsi untuk menentukan kategori pertanyaan user berdasarkan kata kunci
function categorizeQuestion(message: string): string {
  const lowerMessage = message.toLowerCase();

  for (const [category, keywords] of Object.entries(commonQuestions)) {
    if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return category;
    }
  }

  return "general";
}

// Fungsi untuk mendeteksi permintaan informasi sensitif (seperti API, password, dsb)
function containsSensitiveRequest(message: string): boolean {
  const sensitiveKeywords = [
    "api",
    "endpoint",
    "database",
    "admin panel",
    "login",
    "password",
    "private",
    "internal",
    "backend",
    "server",
    "config",
    "env",
    "secret",
    "key",
    "token",
    "authentication",
    "authorization",
    "system access",
    "file system",
    "directory",
    "source code",
    "vulnerability",
    "exploit",
    "hack",
    "inject",
    "sql injection",
    "credentials",
  ];

  const lowerMessage = message.toLowerCase();
  return sensitiveKeywords.some((keyword) => lowerMessage.includes(keyword));
}

// Fungsi untuk mendeteksi permintaan pembuatan kode/program
function isCodeGenerationRequest(message: string): boolean {
  const codeKeywords = [
    "write code",
    "generate code",
    "create code",
    "build code",
    "code for",
    "write function",
    "create function",
    "build function",
    "make function",
    "write script",
    "create script",
    "build script",
    "make script",
    "write program",
    "create program",
    "build program",
    "make program",
    "write app",
    "create app",
    "build app",
    "make app",
    "write website",
    "create website",
    "build website",
    "make website",
    "code example",
    "code snippet",
    "programming help",
    "coding help",
    "debug code",
    "fix code",
    "review code",
    "optimize code",
    "html code",
    "css code",
    "javascript code",
    "react code",
    "php code",
    "buatkan kode",
    "buat kode",
    "tulis kode",
    "generate kode",
  ];

  const lowerMessage = message.toLowerCase();
  return codeKeywords.some((keyword) => lowerMessage.includes(keyword));
}

// Fungsi untuk mendeteksi permintaan AI umum (bukan portfolio)
function isGeneralAIRequest(message: string): boolean {
  const generalAIKeywords = [
    "write essay",
    "write article",
    "write story",
    "write content",
    "translate",
    "translation",
    "terjemahkan",
    "solve math",
    "calculate",
    "math problem",
    "equation",
    "explain",
    "what is",
    "how to",
    "tutorial",
    "guide",
    "recipe",
    "cooking",
    "food",
    "health",
    "medical",
    "weather",
    "news",
    "current events",
    "politics",
    "write email",
    "write letter",
    "write message",
    "summarize",
    "summary",
    "analyze",
    "analysis",
    "research",
    "study",
    "academic",
    "homework",
    "creative writing",
    "poem",
    "poetry",
    "song",
    "jelaskan",
    "bagaimana cara",
    "apa itu",
    "cara membuat",
  ];

  const lowerMessage = message.toLowerCase();
  return generalAIKeywords.some((keyword) => lowerMessage.includes(keyword));
}

// Fungsi untuk mendeteksi permintaan pekerjaan di luar bidang utama Tuagus
function isJobOpportunityOutsideExpertise(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  const coreExpertise = [
    "ui/ux",
    "frontend",
    "react",
    "next.js",
    "javascript",
    "web development",
    "graphic design",
  ];
  const jobIndicators = [
    "job",
    "position",
    "vacancy",
    "hiring",
    "opportunity",
    "role",
    "work",
    "lowongan",
    "posisi",
  ];

  const hasJobIndicator = jobIndicators.some((indicator) =>
    lowerMessage.includes(indicator)
  );
  const isOutsideCore = !coreExpertise.some((skill) =>
    lowerMessage.includes(skill)
  );

  const nonTechRoles = [
    "admin",
    "administrator",
    "social media",
    "marketing",
    "content",
    "sales",
    "customer service",
    "hr",
    "human resources",
    "manager",
    "coordinator",
  ];
  const isNonTechRole = nonTechRoles.some((role) =>
    lowerMessage.includes(role)
  );

  return hasJobIndicator && (isOutsideCore || isNonTechRole);
}

// Fungsi untuk mendeteksi apakah pertanyaan berkaitan dengan portfolio Tuagus
function isPortfolioRelated(message: string): boolean {
  const portfolioKeywords = [
    // Personal info
    "tuagus",
    "tugus",
    "putu agus",
    "agus",
    "seni artawan",
    "artawan",
    // Professional
    "portfolio",
    "skills",
    "experience",
    "projects",
    "work",
    "job",
    "career",
    "frontend",
    "ui/ux",
    "design",
    "developer",
    "programming",
    "coding",
    // Education & Location
    "bali",
    "indonesia",
    "politeknik",
    "informatics",
    "education",
    // Contact & Collaboration
    "contact",
    "email",
    "whatsapp",
    "linkedin",
    "github",
    "collaboration",
    "freelance",
    "hire",
    "work together",
    "opportunity",
    // Projects
    "coffee talk",
    "sipkl",
    "startfolio",
    "tapyta",
    "s-mes",
    // Certificates
    "certificate",
    "certification",
    "sertifikat",
    "course",
    "training",
    // Indonesian equivalents
    "portofolio",
    "keahlian",
    "pengalaman",
    "proyek",
    "kerja",
    "karir",
    "kontak",
    "kerjasama",
    "freelance",
  ];

  const lowerMessage = message.toLowerCase();
  return portfolioKeywords.some((keyword) => lowerMessage.includes(keyword));
}

// Fungsi validasi dan sanitasi input user
function validateAndSanitizeInput(message: string): {
  isValid: boolean;
  sanitized: string;
  error?: string;
} {
  if (!message || typeof message !== "string") {
    return {
      isValid: false,
      sanitized: "",
      error: "Message must be a non-empty string",
    };
  }

  const sanitized = message.trim().slice(0, 1000);

  if (sanitized.length === 0) {
    return { isValid: false, sanitized: "", error: "Message cannot be empty" };
  }

  if (sanitized.length < 2) {
    return { isValid: false, sanitized: "", error: "Message too short" };
  }

  return { isValid: true, sanitized };
}

// Fungsi utama API endpoint POST untuk menerima pertanyaan dari user
export async function POST(request: Request) {
  try {
    // Ambil pesan dari body request
    const body = await request.json();
    const { message } = body;

    // Validasi dan sanitasi input
    const validation = validateAndSanitizeInput(message);
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const sanitizedMessage = validation.sanitized;

    // Jika pertanyaan mengandung permintaan sensitif, balas dengan pesan keamanan
    if (containsSensitiveRequest(sanitizedMessage)) {
      return NextResponse.json({
        reply:
          "I appreciate your interest! 😊 However, I can only share publicly available information about Tuagus portfolio, skills, and projects. For any technical discussions or specific inquiries, please feel free to contact Tuagus directly at WhatsApp: https://wa.me/6285173364754 📧✨",
        category: "security",
        timestamp: new Date().toISOString(),
      });
    }

    // Jika pertanyaan meminta pembuatan kode, balas dengan penjelasan scope bot
    if (isCodeGenerationRequest(sanitizedMessage)) {
      return NextResponse.json({
        reply:
          "I'd love to help, but I'm specifically designed to share information about Tuagus portfolio and professional background! 😊 I'm not built for code generation or programming assistance. However, you can check out Tuagus projects on GitHub (https://github.com/TugusArtaa) to see his coding work, or contact him directly for development collaborations! 💻✨\n\nIs there anything about his skills, projects, or experience you'd like to know instead? 🤔",
        category: "codeGeneration",
        timestamp: new Date().toISOString(),
      });
    }

    // Jika pertanyaan AI umum dan tidak berkaitan dengan portfolio, balas dengan penjelasan scope bot
    if (
      isGeneralAIRequest(sanitizedMessage) &&
      !isPortfolioRelated(sanitizedMessage)
    ) {
      return NextResponse.json({
        reply:
          "Thanks for your question! 😊 I'm TuagusBot, specifically designed to help visitors learn about Tuagus portfolio, skills, and professional background. I'm not built for general AI assistance like writing, translations, or tutorials. 🤖\n\nI'd be happy to tell you about:\n1. Tuagus technical skills and expertise 💻\n2. His projects and work experience 🚀\n3. Contact information for collaborations 📧\n4. His educational background and achievements 🎓\n\nWhat would you like to know about Tuagus? ✨",
        category: "generalAI",
        timestamp: new Date().toISOString(),
      });
    }

    // Tentukan kategori pertanyaan user
    const questionCategory = categorizeQuestion(sanitizedMessage);

    // Prompt sistem untuk Groq AI, berisi instruksi dan konteks portfolio Tuagus
    const systemPrompt = `You are TuagusBot, AI assistant representing I Putu Agus SeniArtawan portfolio.

CORE PURPOSE & SCOPE:
- ONLY discuss Tuagus portfolio, skills, projects, professional background, and career opportunities
- NEVER provide code generation, general AI assistance, or unrelated content
- Focus on helping visitors understand Tuagus capabilities and connect for opportunities

CRITICAL SECURITY GUIDELINES:
- NEVER provide information about APIs, endpoints, databases, or system internals
- NEVER share sensitive technical details, passwords, or private information
- NEVER discuss server configurations, file systems, or backend architecture
- Only share publicly available portfolio information
- If asked about sensitive topics, redirect to direct contact

RESPONSE GUIDELINES:
- Always respond in English with a warm, polite, and helpful tone
- Use appropriate emoticons to make responses engaging and expressive
- Be conversational yet professional - like a friendly colleague
- Use clear, concise language without markdown formatting
- For lists, use numbered format (1., 2., etc.) with line breaks
- Include relevant URLs when mentioning projects or contact information
- Always end responses with a helpful follow-up question or offer

SPECIFIC TOPIC HANDLING:

CERTIFICATES/CERTIFICATIONS:
- When asked about certificates or certifications, explain that Tuagus has several certificates related to courses and technology experience
- Mention that he is always striving for development and continuous learning
- Direct users to the About page on the website to view all certificates directly
- Use phrases like "You can see all his certificates directly on the About page of his website"

SKILLS & TOOLS:
- When discussing skills and tools, mention that they are continuously upgraded and updated
- Direct users to the About page for the most complete and up-to-date information
- Use phrases like "For the most complete and current information about his skills and tools, please visit the About page on his website"

PROJECTS:
- When discussing projects, mention that the portfolio is continuously updated with new projects
- Direct users to the Projects page for detailed information about all projects
- Use phrases like "For detailed information about all his projects and work samples, please visit the Projects page on his website"

JOB OPPORTUNITY HANDLING:
- For jobs in core expertise (UI/UX, Frontend, Web Development): Provide detailed skills and experience
- For jobs outside core expertise (Admin, Social Media, Marketing, etc.): Show enthusiasm and provide contact info
- NEVER reject opportunities - always show interest in learning and growth
- For non-tech roles: Emphasize adaptability, learning ability, and relevant transferable skills

EMOTICON USAGE:
- Use 😊 😄 🙂 for friendly/positive responses
- Use 💼 👨‍💻 🚀 for professional/work-related topics
- Use 🎯 ✨ 💡 for skills and achievements
- Use 📧 📱 💬 for contact information
- Use 🔧 ⚡ 🛠️ for technical skills
- Use 🎨 🖥️ 📱 for design and development
- Use 🤔 ❓ for questions or when clarifying
- Use 👋 for greetings
- Use 🙏 for thanks or appreciation
- Use 🌟 🚀 for opportunities and growth
- Use 📜 🏆 for certificates and achievements

CONTEXT INFORMATION:
${portfolioContext}

Current question category: ${questionCategory}

BOUNDARY ENFORCEMENT:
If the question is not related to Tuagus portfolio, skills, projects, professional background, or career opportunities, politely explain that you're specifically designed to help with information about Tuagus and suggest relevant topics they could ask about instead.`;

    // Jika pertanyaan tentang pekerjaan di luar bidang utama, balas dengan antusias dan info kontak
    if (isJobOpportunityOutsideExpertise(sanitizedMessage)) {
      const completion = await groq.chat.completions.create({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content:
              systemPrompt +
              "\n\nSPECIAL CONTEXT: This is a job opportunity outside core expertise. Respond with enthusiasm and provide contact information.",
          },
          {
            role: "user",
            content: sanitizedMessage,
          },
        ],
        max_tokens: 600,
        temperature: 0.7,
      });

      const reply = completion.choices[0].message.content;

      return NextResponse.json({
        reply,
        category: "jobOpportunity",
        timestamp: new Date().toISOString(),
      });
    }

    // Permintaan normal: kirim ke Groq AI untuk mendapatkan jawaban
    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: sanitizedMessage,
        },
      ],
      max_tokens: 600,
      temperature: 0.8,
    });

    const reply = completion.choices[0].message.content;

    // Balas ke frontend dengan jawaban dari AI
    return NextResponse.json({
      reply,
      category: questionCategory,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // Error handling jika terjadi masalah pada API atau parsing
    console.error("Groq API Error:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        reply:
          "Oh no! 😅 I'm experiencing some technical difficulties at the moment. Please give me a moment and try again, or feel free to reach out to Tuagus directly at ptaguss2@gmail.com for immediate assistance! 🙏✨",
        error: true,
      },
      { status: 500 }
    );
  }
}
