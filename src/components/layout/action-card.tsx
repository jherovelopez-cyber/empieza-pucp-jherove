import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export function ActionCard({
  title,
  description,
  icon: Icon
}: {
  title: string;
  description?: string;
  icon: LucideIcon;
}) {
  return (
    <Card className="flex items-center gap-3">
      <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-pastel-blue text-primary">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span>
        <span className="block text-sm font-bold text-navy">{title}</span>
        {description ? <span className="text-xs text-muted-foreground">{description}</span> : null}
      </span>
    </Card>
  );
}
