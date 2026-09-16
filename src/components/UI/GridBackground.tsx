import { cn } from "@/lib/utils";

export default function GridBackground() {
  return (
    <div
      className={cn(
        "fixed inset-0 z-0",
        "[background-size:40px_40px]",
        "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
        "bg-white",
        "pointer-events-none"
      )}
    />
  );
}
