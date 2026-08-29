"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import type { ContentResource, ContentStatus } from "@/types/domain";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SourceBadge } from "@/components/feedback/source-badge";
import { StatusBadge } from "@/components/feedback/status-badge";

const tabs: { label: string; value: "all" | ContentStatus }[] = [{ label: "Todos", value: "all" }, { label: "Borradores", value: "draft" }, { label: "Publicados", value: "published" }, { label: "Programados", value: "scheduled" }];
const statusLabel = { draft: "Borrador", published: "Publicado", scheduled: "Programado" };

export function ContentManagerClient({ initialContent }: { initialContent: ContentResource[] }) {
  const [content, setContent] = useState(initialContent);
  const [tab, setTab] = useState<"all" | ContentStatus>("all");
  const [notice, setNotice] = useState("");
  const visible = tab === "all" ? content : content.filter((item) => item.status === tab);
  function publish(id: string) { setContent((current) => current.map((item) => item.id === id ? { ...item, status: "published", reviewedPercent: 100 } : item)); setNotice("Contenido aprobado y publicado en la demo."); }
  return <div className="space-y-4">
    <div className="flex gap-2 overflow-x-auto pb-1">{tabs.map((item) => <Button key={item.value} variant={tab === item.value ? "primary" : "secondary"} onClick={() => setTab(item.value)}>{item.label}</Button>)}</div>
    {notice ? <Card className="border-green-200 bg-pastel-green text-sm font-semibold text-navy" role="status">{notice}</Card> : null}
    <div className="space-y-3">{visible.map((resource) => <Card key={resource.id} className="space-y-3">
      <div className="flex flex-wrap gap-2"><SourceBadge source={resource.sourceType} /><StatusBadge tone={resource.status === "published" ? "green" : resource.status === "draft" ? "yellow" : "blue"}>{statusLabel[resource.status]}</StatusBadge></div>
      <div><h2 className="font-bold text-navy">{resource.title}</h2><p className="text-sm text-muted-foreground">{resource.description}</p></div>
      <div><div className="flex justify-between text-xs"><span>Revisión</span><strong>{resource.reviewedPercent}%</strong></div><div className="mt-1 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${resource.reviewedPercent}%` }} /></div></div>
      <p className="text-xs text-muted-foreground">Alcance: {resource.scope}</p>
      {resource.status !== "published" ? <Button className="w-full" onClick={() => publish(resource.id)}>Aprobar y publicar</Button> : <div className="grid grid-cols-2 gap-2"><Button onClick={() => setNotice(`“${resource.title}” enviado a JH.`)}><Send className="size-4" />A JH</Button><Button variant="secondary" onClick={() => setNotice(`“${resource.title}” enviado a cachimbos.`)}><Send className="size-4" />A cachimbos</Button></div>}
    </Card>)}</div>
  </div>;
}
