import type { Metadata } from "next";
import AboutContent from "@/components/About/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Tuagus (I Putu Agus Seniartawan) — Web Developer & Creative Enthusiast based in Bali. Specializing in modern web development (React, Next.js, Laravel), branding, and graphic design.",
  openGraph: {
    title: "About | Tuagus",
    description:
      "Learn more about Tuagus (I Putu Agus Seniartawan) — Web Developer & Creative Enthusiast based in Bali. Specializing in modern web development (React, Next.js, Laravel), branding, and graphic design.",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}

