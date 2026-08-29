"use client";
import { useState } from "react";
import type { CfGroupSummary } from "@/features/demo/demo-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/feedback/status-badge";

const labels = { assigned: "Asignado", unassigned: "Sin asignar", risk: "En riesgo" };
export function GroupsClient({ initialGroups }: { initialGroups: CfGroupSummary[] }) {
  const [groups, setGroups] = useState(initialGroups); const [notice, setNotice] = useState("");
  function assign(id: string) { setGroups((current) => current.map((group) => group.id === id ? { ...group, jhName: "JH por confirmar", status: "assigned", coverage: 25 } : group)); setNotice("Asignación demo registrada."); }
  return <div className="space-y-3">{notice ? <Card className="bg-pastel-green text-sm font-semibold" role="status">{notice}</Card> : null}{[...groups].sort((a, b) => a.coverage - b.coverage).map((group) => <Card key={group.id} className={`space-y-3 ${group.status === "unassigned" ? "border-pink-200 bg-pastel-pink/30" : ""}`}>
    <div className="flex justify-between gap-3"><div><h2 className="font-bold text-navy">{group.name}</h2><p className="text-sm text-muted-foreground">{group.students} cachimbos · {group.jhName ?? "Sin JH"}</p></div><StatusBadge tone={group.status === "assigned" ? "green" : group.status === "risk" ? "yellow" : "pink"}>{labels[group.status]}</StatusBadge></div>
    <div><div className="flex justify-between text-xs"><span>Cobertura</span><strong>{group.coverage}%</strong></div><div className="mt-1 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${group.coverage}%` }} /></div></div>
    {group.status === "unassigned" ? <Button className="w-full" onClick={() => assign(group.id)}>Asignar JH</Button> : <Button variant="secondary" className="w-full">Ver horario</Button>}
  </Card>)}</div>;
}
