"use client";
import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const audiences = { jh: "JH de EEGGCC", students: "Cachimbos de EEGGCC", all: "JH y cachimbos" };
export function AnnouncementComposer() {
  const [title, setTitle] = useState(""); const [message, setMessage] = useState(""); const [audience, setAudience] = useState<keyof typeof audiences>("all"); const [sent, setSent] = useState(false);
  function submit(event: FormEvent) { event.preventDefault(); setSent(true); }
  return <div className="space-y-4"><Card><form className="space-y-4" onSubmit={submit}>
    <label className="block space-y-1"><span className="text-sm font-semibold">Asunto</span><Input value={title} onChange={(e) => { setTitle(e.target.value); setSent(false); }} required /></label>
    <label className="block space-y-1"><span className="text-sm font-semibold">Audiencia</span><select className="min-h-11 w-full rounded-lg border bg-white px-3 text-sm" value={audience} onChange={(e) => { setAudience(e.target.value as keyof typeof audiences); setSent(false); }}>{Object.entries(audiences).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
    <label className="block space-y-1"><span className="text-sm font-semibold">Mensaje</span><textarea className="min-h-32 w-full rounded-lg border bg-white p-3 text-sm" value={message} onChange={(e) => { setMessage(e.target.value); setSent(false); }} maxLength={500} required /></label>
    <Button className="w-full" type="submit" disabled={!title.trim() || !message.trim()}><Send className="size-4" />Enviar anuncio</Button>
  </form></Card>
  <Card className="space-y-2 bg-pastel-blue/30"><p className="text-xs font-bold uppercase text-primary">Vista previa · {audiences[audience]}</p><h2 className="font-bold text-navy">{title || "Asunto del anuncio"}</h2><p className="whitespace-pre-wrap text-sm text-muted-foreground">{message || "Tu mensaje aparecerá aquí."}</p></Card>
  {sent ? <Card className="border-green-200 bg-pastel-green text-sm font-semibold text-navy" role="status">Anuncio enviado correctamente a {audiences[audience]}.</Card> : null}</div>;
}
