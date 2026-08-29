import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export function ActionCard({
  title,
  description,
  icon: Icon,
  href
}: {
  title: string;
  description?: string;
  icon: LucideIcon;
  href?: string;
}) {
  const content = (
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

  return href ? (
    <Link href={href} className="block rounded-xl transition hover:-translate-y-0.5" aria-label={title}>
      {content}
    </Link>
  ) : content;
}
