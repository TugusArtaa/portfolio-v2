import { notFound } from "next/navigation";
import ProjectDetailSection from "@/components/Projects/ProjectDetailSection";
import { projects, getProjectBySlug } from "@/data/portfolio-data";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
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

  let anotherProjects: typeof allProjects = [];
  for (let i = 1; anotherProjects.length < 4 && i < allProjects.length; i++) {
    const idx = (currentIndex + i) % allProjects.length;
    if (allProjects[idx].slug !== slug) {
      anotherProjects.push(allProjects[idx]);
    }
  }

  return (
    <ProjectDetailSection
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
      anotherProjects={anotherProjects}
      allProjects={allProjects}
    />
  );
}
