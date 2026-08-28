export function ErrorState({ label = "No pudimos cargar esta vista." }: { label?: string }) {
  return <p className="py-8 text-center text-sm font-medium text-rose-700">{label}</p>;
}
