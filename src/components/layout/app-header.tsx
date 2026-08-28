export function AppHeader({
  eyebrow = "Empieza PUCP",
  title,
  subtitle
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="space-y-1 py-3">
      <p className="text-sm font-bold text-primary">{eyebrow}</p>
      <h1 className="text-2xl font-bold tracking-normal text-navy">{title}</h1>
      {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
    </header>
  );
}
