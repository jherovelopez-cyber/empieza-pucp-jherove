export function LoadingState({ label = "Cargando..." }: { label?: string }) {
  return <p className="py-8 text-center text-sm text-muted-foreground">{label}</p>;
}
