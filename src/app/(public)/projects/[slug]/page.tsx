import { notFound } from "next/navigation";
import ProjectDetailSection from "@/components/Projects/ProjectDetailSection";

type ProjectDetail = {
  id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[] | null;
  coverImage: string;
  url?: string | null;
  userId?: string | null;
  image1?: string | null;
  image2?: string | null;
  image3?: string | null;
  createdAt: string;
  updatedAt: string;
};

async function getProject(slug: string): Promise<ProjectDetail> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/public/project/${slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error("Failed to fetch project");
  }
  return res.json();
}

async function getAllProjects(): Promise<ProjectDetail[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/public/project`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch projects");
  return await res.json();
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await getProject(slug);
  if (!project) return notFound();

  const allProjects = await getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);

  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  let anotherProjects: ProjectDetail[] = [];
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
