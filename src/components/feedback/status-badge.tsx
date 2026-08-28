import { cn } from "@/lib/utils";

export function StatusBadge({
  children,
  tone = "blue"
}: {
  children: React.ReactNode;
  tone?: "blue" | "green" | "yellow" | "pink" | "violet";
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold text-navy",
        tone === "blue" && "bg-pastel-blue",
        tone === "green" && "bg-pastel-green",
        tone === "yellow" && "bg-pastel-yellow",
        tone === "pink" && "bg-pastel-pink",
        tone === "violet" && "bg-pastel-violet"
      )}
    >
      {children}
    </span>
  );
}
