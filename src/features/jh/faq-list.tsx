"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { JhFaqItem } from "@/features/demo/demo-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function FaqList({ items }: { items: JhFaqItem[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function copyAnswer(item: JhFaqItem) {
    try {
      await navigator.clipboard.writeText(item.answer);
      setCopiedId(item.id);
      window.setTimeout(() => setCopiedId((current) => (current === item.id ? null : current)), 1800);
    } catch {
      setCopiedId(null);
    }
  }

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const copied = copiedId === item.id;
        return (
          <Card key={item.id} className="space-y-3">
            <h2 className="font-bold text-navy">{item.question}</h2>
            <p className="text-sm leading-6 text-muted-foreground">{item.answer}</p>
            <Button variant="secondary" className="w-full sm:w-auto" onClick={() => copyAnswer(item)}>
              {copied ? <Check className="size-4 text-green-700" /> : <Copy className="size-4" />}
              {copied ? "Respuesta copiada" : "Copiar respuesta"}
            </Button>
          </Card>
        );
      })}
      <p className="sr-only" aria-live="polite">{copiedId ? "Respuesta copiada al portapapeles" : ""}</p>
    </div>
  );
}
