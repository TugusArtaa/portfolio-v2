import "@/styles/globals.css";
import React, { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import Providers from "@/components/Shared/Providers";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.tuagus.web.id"),
  title: {
    default: "Tuagus | Web Developer & Creative Enthusiast",
    template: "%s | Tuagus",
  },
  description:
    "Portfolio of I Putu Agus Seniartawan (Tuagus) — Web Developer & Creative Enthusiast in Bali. Crafting modern web apps with React, Next.js, and Laravel.",
  keywords: [
    // Primary Identity & Roles
    "Tuagus",
    "I Putu Agus Seniartawan",
    "Web Developer & Creative Enthusiast",
    "Web Developer Bali",
    "Creative Enthusiast Bali",
    "React Developer",
    "Next.js Developer",
    "Laravel Developer",
    "Frontend Developer Bali",
    "Bali Web Developer",
    // Core Disciplines (English)
    "Web Development",
    "Branding",
    "Branding Specialist",
    "Graphic Design",
    "Graphic Designer Bali",
    "Logo Design",
    "Social Media Direction",
    "Videography",
    "Photography",
    "Poster Illustrations",
    "Marketing Layouts",
    "Digital Assets",
    "UI/UX Design",
    // Local Indonesian Search Queries (High-Intent Local SEO)
    "Jasa Pembuatan Website Bali",
    "Web Developer Indonesia",
    "Jasa Web Developer Bali",
    "Jasa Desain Website Bali",
    "Desainer Grafis Bali",
    "Jasa Desain Logo Bali",
    "Jasa Branding Bali",
    "Portofolio Web Developer Indonesia",
  ],
  authors: [{ name: "I Putu Agus Seniartawan (Tuagus)" }],
  creator: "I Putu Agus Seniartawan",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Tuagus Portfolio",
    title: "Tuagus | Web Developer & Creative Enthusiast",
    description:
      "Web Developer & Creative Enthusiast based in Bali. Crafting high-performance web apps with React, Next.js, and clean engineering.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tuagus | Web Developer & Creative Enthusiast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tuagus | Web Developer & Creative Enthusiast",
    description:
      "Web Developer & Creative Enthusiast based in Bali. Crafting high-performance web apps with React, Next.js, and clean engineering.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

// Schema.org Structured Data (JSON-LD) for Google Rich Results
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.tuagus.web.id/#person",
      name: "I Putu Agus Seniartawan",
      alternateName: ["Tuagus", "Putu Agus", "I Putu Agus Seniartawan"],
      url: "https://www.tuagus.web.id",
      image: "https://www.tuagus.web.id/photo/tuagus_photo.webp",
      jobTitle: "Web Developer & Creative Enthusiast",
      description:
        "Web Developer & Creative Enthusiast based in Bali, Indonesia. Specializing in modern web development (React, Next.js, Laravel), branding (social media direction, videography, photography, logo design), and graphic design (promotional visuals, digital assets, poster illustrations).",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bali",
        addressCountry: "ID",
      },
      areaServed: [
        {
          "@type": "AdministrativeArea",
          name: "Bali",
        },
        {
          "@type": "Country",
          name: "Indonesia",
        },
      ],
      sameAs: [
        "https://github.com/putuaguss",
        "https://linkedin.com/in/putuaguss",
        "https://instagram.com/putuaguss",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services Offered",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Web Developer",
              alternateName: "Jasa Pembuatan Website & Web Development",
              description:
                "Specializing in modern, responsive web development using React, Next.js, and Laravel, with clean architecture, optimal performance, and intuitive user experiences.",
              areaServed: "Indonesia",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Branding",
              alternateName: "Jasa Branding & Identitas Visual",
              description:
                "Building impactful brand presence through creative social media direction, videography, photography, and distinctive logo design.",
              areaServed: "Indonesia",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Graphic Design",
              alternateName: "Jasa Desain Grafis & Desain Promosi",
              description:
                "Crafting compelling promotional visuals, digital assets, poster illustrations, and marketing layouts with balanced composition.",
              areaServed: "Indonesia",
            },
          },
        ],
      },
      knowsAbout: [
        "Web Development",
        "React",
        "Next.js",
        "Laravel",
        "TypeScript",
        "Tailwind CSS",
        "Pembuatan Website",
        "Jasa Web Development",
        "Branding",
        "Social Media Direction",
        "Videography",
        "Photography",
        "Logo Design",
        "Graphic Design",
        "Desain Grafis",
        "Poster Illustrations",
        "Marketing Layouts",
        "Digital Assets",
        "UI/UX Design",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.tuagus.web.id/#website",
      url: "https://www.tuagus.web.id",
      name: "Tuagus Portfolio",
      description:
        "Personal portfolio of I Putu Agus Seniartawan (Tuagus) — Web Developer & Creative Enthusiast based in Bali, Indonesia. Specializing in modern web development using React, Next.js, and Laravel, alongside impactful branding and balanced graphic design.",
      publisher: {
        "@id": "https://www.tuagus.web.id/#person",
      },
      inLanguage: "en-US",
    },
  ],
};

// Root layout untuk seluruh aplikasi
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@700;800;900&family=Anton&family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

