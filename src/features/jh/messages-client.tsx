"use client";

import { FormEvent, useEffect, useState } from "react";
import { Megaphone, Send } from "lucide-react";
import type { Announcement } from "@/types/domain";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const storageKey = "empieza-jh-announcements";

export function MessagesClient({ initialAnnouncements }: { initialAnnouncements: Announcement[] }) {
  const [messages, setMessages] = useState(initialAnnouncements);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [confirmation, setConfirmation] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return;
    try {
      setMessages(JSON.parse(saved) as Announcement[]);
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  function submitAnnouncement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanTitle = title.trim();
    const cleanContent = content.trim();
    if (!cleanTitle || !cleanContent) return;

    const announcement: Announcement = {
      id: `ann-jh-${Date.now()}`,
      authorId: "usr-maria",
      targetType: "group",
      targetId: "grp-h-204",
      title: cleanTitle,
      content: cleanContent,
      createdAt: new Date().toISOString()
    };
    const updated = [announcement, ...messages];
    setMessages(updated);
    window.localStorage.setItem(storageKey, JSON.stringify(updated));
    setTitle("");
    setContent("");
    setConfirmation("Anuncio publicado para el H-204.");
  }

  return (
    <div className="space-y-6">
      <Card>
        <form className="space-y-4" onSubmit={submitAnnouncement}>
          <div>
            <h2 className="font-bold text-navy">Nuevo anuncio</h2>
            <p className="text-sm text-muted-foreground">Será visible para los cachimbos de tu horario.</p>
          </div>
          <label className="block space-y-1">
            <span className="text-sm font-semibold text-navy">Asunto</span>
            <Input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={80} required />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-semibold text-navy">Mensaje</span>
            <textarea
              className="min-h-28 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              maxLength={500}
              required
            />
          </label>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-muted-foreground">{content.length}/500</span>
            <Button type="submit" disabled={!title.trim() || !content.trim()}>
              <Send className="size-4" /> Publicar
            </Button>
          </div>
          {confirmation ? <p className="text-sm font-semibold text-green-700" role="status">{confirmation}</p> : null}
        </form>
      </Card>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-navy">Anuncios del horario</h2>
        {messages.map((message) => (
          <Card key={message.id} className="space-y-2">
            <div className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-pastel-blue text-primary">
                <Megaphone className="size-4" />
              </span>
              <div>
                <h3 className="font-bold text-navy">{message.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{message.content}</p>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
