import React from "react";
import ConditionalLayout from "@/components/Shared/ConditionalLayout";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConditionalLayout>{children}</ConditionalLayout>;
}
