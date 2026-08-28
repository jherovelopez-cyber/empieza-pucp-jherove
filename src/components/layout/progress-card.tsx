import { Card } from "@/components/ui/card";
import { formatPercent } from "@/lib/utils";

export function ProgressCard({
  title,
  completed,
  total,
  percent
}: {
  title: string;
  completed: number;
  total: number;
  percent: number;
}) {
  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">{title}</p>
          <p className="text-xl font-bold text-navy">
            Has completado {completed} de {total} pasos importantes
          </p>
        </div>
        <span className="text-2xl font-bold text-primary">{formatPercent(percent)}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-muted" aria-label={`Progreso ${formatPercent(percent)}`}>
        <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, percent)}%` }} />
      </div>
    </Card>
  );
}
