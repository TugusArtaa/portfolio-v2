import { cn } from "@/lib/utils";

export default function GridBackground() {
  return (
    <div
      className={cn(
        "fixed inset-0 z-0",
        "[background-size:40px_40px]",
        "[background-image:linear-gradient(to_right,#f1f1f1_1px,transparent_1px),linear-gradient(to_bottom,#f1f1f1_1px,transparent_1px)]",
        "dark:[background-image:linear-gradient(to_right,#0f172b_1px,transparent_1px),linear-gradient(to_bottom,#0f172b_1px,transparent_1px)]",
        "bg-white dark:bg-slate-950",
        "pointer-events-none"
      )}
    />
  );
}
