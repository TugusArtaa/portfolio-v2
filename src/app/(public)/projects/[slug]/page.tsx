import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailSection from "@/components/Projects/ProjectDetailSection";
import { projects, getProjectBySlug } from "@/data/portfolio-data";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description.slice(0, 160),
    openGraph: {
      title: `${project.title} | Tuagus`,
      description: project.description.slice(0, 160),
      images: project.coverImage ? [project.coverImage] : [],
    },
    alternates: {
      canonical: `/projects/${slug}`,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  const allProjects = projects;
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);

  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  const anotherProjects: typeof allProjects = [];
  for (let i = 1; anotherProjects.length < 4 && i < allProjects.length; i++) {
    const idx = (currentIndex + i) % allProjects.length;
    if (allProjects[idx].slug !== slug) {
      anotherProjects.push(allProjects[idx]);
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tuagus.web.id";
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.description,
    image: project.coverImage ? `${baseUrl}${project.coverImage}` : undefined,
    url: `${baseUrl}/projects/${project.slug}`,
    author: {
      "@type": "Person",
      name: "I Putu Agus Seniartawan",
      url: baseUrl,
    },
    dateCreated: project.createdAt,
    keywords: project.techStack.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <ProjectDetailSection
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
        anotherProjects={anotherProjects}
        allProjects={allProjects}
      />
    </>
  );
}
