import ProjectSection from "@/components/Projects/ProjectSection";
import ConnectSection from "@/components/Projects/ConnectSection";

type ProjectPublic = {
  title: string;
  slug: string;
  description: string;
  techStack: string[] | null;
  coverImage: string;
  url?: string | null;
};

async function getProjects(): Promise<ProjectPublic[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/public/project`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch projects");
  return await res.json();
}

export default async function ProjectPage() {
  const projects = await getProjects();
  return (
    <>
      <ProjectSection projects={projects} />
      <ConnectSection />
    </>
  );
}
