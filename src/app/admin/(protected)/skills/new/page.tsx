"use client";

import SkillForm from "../_form";
import { useState, useEffect } from "react";
import LoadingSkeleton from "@/components/Shared/LoadingSkeleton";

export default function NewSkillPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSkeleton variant="form" />;
  }

  return (
    <SkillForm onSuccess={() => (window.location.href = "/admin/skills")} />
  );
}
