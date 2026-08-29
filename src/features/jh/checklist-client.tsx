"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChecklistStatus, JhChecklistItem } from "@/types/domain";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/feedback/status-badge";
import { ProgressCard } from "@/components/layout/progress-card";

const tabs = ["Todos", "Pendientes", "Completados"] as const;
const storageKey = "empieza-jh-checklist";

export function ChecklistClient({ items }: { items: JhChecklistItem[] }) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Todos");
  const [localItems, setLocalItems] = useState(items);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return;
    try {
      setLocalItems(JSON.parse(saved) as JhChecklistItem[]);
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  const completed = localItems.filter((item) => item.status === "completed").length;

  const visibleItems = useMemo(() => {
    if (activeTab === "Pendientes") return localItems.filter((item) => item.status !== "completed");
    if (activeTab === "Completados") return localItems.filter((item) => item.status === "completed");
    return localItems;
  }, [activeTab, localItems]);

  function setStatus(id: string, status: ChecklistStatus) {
    setLocalItems((current) => {
      const updated = current.map((item) =>
        item.id === id
          ? { ...item, status, completedAt: status === "completed" ? new Date().toISOString() : undefined }
          : item
      );
      window.localStorage.setItem(storageKey, JSON.stringify(updated));
      return updated;
    });
  }

  return (
    <div className="space-y-4">
      <ProgressCard
        title="Avance del checklist"
        completed={completed}
        total={localItems.length}
        percent={localItems.length ? (completed / localItems.length) * 100 : 0}
      />
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <Button key={tab} variant={activeTab === tab ? "primary" : "secondary"} onClick={() => setActiveTab(tab)}>
            {tab}
          </Button>
        ))}
      </div>
      {visibleItems.map((item) => (
        <Card key={item.id} className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-bold text-navy">{item.title}</h2>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <StatusBadge tone={item.status === "completed" ? "green" : item.status === "scheduled" ? "blue" : "yellow"}>
              {item.status === "completed" ? "Completado" : item.status === "scheduled" ? "Programado" : "Pendiente"}
            </StatusBadge>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="secondary" onClick={() => setStatus(item.id, "completed")}>
              Completar
            </Button>
            <Button variant="secondary" onClick={() => setStatus(item.id, "scheduled")}>
              Programar
            </Button>
            <Button variant="secondary" onClick={() => setStatus(item.id, "pending")}>
              Recordar
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
