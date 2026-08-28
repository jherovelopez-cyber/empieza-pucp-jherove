import { Card } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  helper
}: {
  label: string;
  value: string | number;
  helper?: string;
}) {
  return (
    <Card className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold text-navy">{value}</p>
      {helper ? <p className="text-xs text-muted-foreground">{helper}</p> : null}
    </Card>
  );
}
