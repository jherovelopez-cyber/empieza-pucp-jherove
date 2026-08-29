"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { CfJhSummary } from "@/types/domain";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/feedback/status-badge";

const filters = ["Todos", "Sin asignar", "Con riesgo", "Checklist pendiente"] as const;
const progressOf = (value: string) => { const [done, total] = value.split("/").map(Number); return total ? Math.round(done / total * 100) : 0; };

export function JhManagementClient({ jhs }: { jhs: CfJhSummary[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todos");
  const visible = useMemo(() => [...jhs].filter((jh) => {
    const matchesSearch = `${jh.fullName} ${jh.groupName ?? ""}`.toLowerCase().includes(query.trim().toLowerCase());
    const progress = progressOf(jh.checklistProgress);
    return matchesSearch && (filter === "Todos" || (filter === "Sin asignar" && !jh.groupName) ||
      (filter === "Con riesgo" && jh.risk) || (filter === "Checklist pendiente" && progress < 100));
  }).sort((a, b) => Number(b.risk) - Number(a.risk) || progressOf(a.checklistProgress) - progressOf(b.checklistProgress)), [filter, jhs, query]);

  return <div className="space-y-4">
    <label className="relative block"><span className="sr-only">Buscar JH o horario</span><Search className="pointer-events-none absolute left-3 top-3 size-5 text-muted-foreground" /><Input className="pl-10" placeholder="Buscar JH o horario" value={query} onChange={(e) => setQuery(e.target.value)} /></label>
    <div className="flex gap-2 overflow-x-auto pb-1">{filters.map((item) => <Button key={item} variant={filter === item ? "primary" : "secondary"} onClick={() => setFilter(item)}>{item}</Button>)}</div>
    <p className="text-sm text-muted-foreground">{visible.length} resultados · prioridad por riesgo</p>
    <div className="space-y-3">{visible.map((jh) => { const progress = progressOf(jh.checklistProgress); const alert = !jh.groupName || progress < 50; return <Card key={jh.id} className={`space-y-3 ${alert ? "border-pink-200 bg-pastel-pink/35" : ""}`}>
      <div className="flex items-start justify-between gap-3"><div><h2 className="font-bold text-navy">{jh.fullName}</h2><p className="text-sm text-muted-foreground">{jh.groupName ?? "Sin horario asignado"}</p></div><StatusBadge tone={jh.risk ? "pink" : "green"}>{jh.status}</StatusBadge></div>
      <div className="space-y-1"><div className="flex justify-between text-xs"><span>Checklist</span><strong>{jh.checklistProgress} · {progress}%</strong></div><div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} /></div></div>
      <Button variant="secondary" className="w-full">{jh.groupName ? "Contactar" : "Ver detalle"}</Button>
    </Card>; })}</div>
  </div>;
}
