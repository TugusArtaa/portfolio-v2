import ProjectSection from "@/components/Projects/ProjectSection";
import ConnectSection from "@/components/Projects/ConnectSection";
import { projects } from "@/data/portfolio-data";

export default function ProjectPage() {
  return (
    <>
      <ProjectSection projects={projects} />
      <ConnectSection />
    </>
  );
}
