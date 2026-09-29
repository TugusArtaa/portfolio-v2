import type { Metadata } from "next";
import ProjectSection from "@/components/Projects/ProjectSection";
import { projects } from "@/data/portfolio-data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore projects by Tuagus (Web Developer & Creative Enthusiast) across Web Development (React, Next.js, Laravel), Branding, and Graphic Design.",
  openGraph: {
    title: "Projects | Tuagus",
    description:
      "Explore projects by Tuagus (Web Developer & Creative Enthusiast) across Web Development (React, Next.js, Laravel), Branding, and Graphic Design.",
  },
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectPage() {
  return <ProjectSection projects={projects} />;
}

