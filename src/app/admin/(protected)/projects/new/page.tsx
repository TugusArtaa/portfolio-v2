"use client";

import ProjectForm from "../_form";
import { useState, useEffect } from "react";
import LoadingSkeleton from "@/components/Shared/LoadingSkeleton";

export default function NewProjectPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSkeleton variant="form" />;
  }

  return (
    <ProjectForm onSuccess={() => (window.location.href = "/admin/projects")} />
  );
}
