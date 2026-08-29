"use client";

import { FormEvent, useMemo, useState } from "react";
import { CalendarDays, Clock, MapPin, Plus, X } from "lucide-react";
import type { JhMeeting } from "@/features/demo/demo-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/feedback/status-badge";

const week = [
  { label: "Lun", day: "16", date: "2027-03-16" },
  { label: "Mar", day: "17", date: "2027-03-17" },
  { label: "Mié", day: "18", date: "2027-03-18" },
  { label: "Jue", day: "19", date: "2027-03-19" },
  { label: "Vie", day: "20", date: "2027-03-20" },
  { label: "Sáb", day: "21", date: "2027-03-21" },
  { label: "Dom", day: "22", date: "2027-03-22" }
];

function formatMeetingDate(date: string) {
  return new Intl.DateTimeFormat("es-PE", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(
    new Date(`${date}T12:00:00Z`)
  );
}

export function MeetingsClient({ initialMeetings }: { initialMeetings: JhMeeting[] }) {
  const [meetings, setMeetings] = useState(initialMeetings);
  const [selectedDate, setSelectedDate] = useState(week[0].date);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("09:00");
  const [location, setLocation] = useState("");

  const orderedMeetings = useMemo(
    () => [...meetings].sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)),
    [meetings]
  );

  function addMeeting(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !location.trim()) return;
    setMeetings((current) => [
      ...current,
      {
        id: `meeting-local-${Date.now()}`,
        title: title.trim(),
        date: selectedDate,
        time,
        location: location.trim(),
        type: "reunion"
      }
    ]);
    setTitle("");
    setLocation("");
    setShowForm(false);
  }

  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Semana</p>
            <h2 className="font-bold text-navy">16–22 de marzo</h2>
          </div>
          <CalendarDays className="size-5 text-primary" />
        </div>
        <div className="grid grid-cols-7 gap-1" aria-label="Agenda semanal">
          {week.map((day) => {
            const hasEvents = meetings.some((meeting) => meeting.date === day.date);
            return (
              <button
                key={day.date}
                type="button"
                onClick={() => setSelectedDate(day.date)}
                className={`relative rounded-lg px-1 py-2 text-center transition ${
                  selectedDate === day.date ? "bg-primary text-white" : "bg-muted text-navy hover:bg-pastel-blue"
                }`}
                aria-pressed={selectedDate === day.date}
              >
                <span className="block text-[10px] font-semibold sm:text-xs">{day.label}</span>
                <span className="block text-sm font-bold">{day.day}</span>
                {hasEvents ? <span className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-current" /> : null}
              </button>
            );
          })}
        </div>
        <Button className="w-full" onClick={() => setShowForm((current) => !current)}>
          {showForm ? <X className="size-4" /> : <Plus className="size-4" />}
          {showForm ? "Cancelar" : "Añadir evento"}
        </Button>
      </Card>

      {showForm ? (
        <Card>
          <form className="space-y-4" onSubmit={addMeeting}>
            <h2 className="font-bold text-navy">Nuevo evento</h2>
            <label className="block space-y-1">
              <span className="text-sm font-semibold text-navy">Título</span>
              <Input value={title} onChange={(event) => setTitle(event.target.value)} required />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block space-y-1">
                <span className="text-sm font-semibold text-navy">Fecha</span>
                <Input type="date" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} required />
              </label>
              <label className="block space-y-1">
                <span className="text-sm font-semibold text-navy">Hora</span>
                <Input type="time" value={time} onChange={(event) => setTime(event.target.value)} required />
              </label>
            </div>
            <label className="block space-y-1">
              <span className="text-sm font-semibold text-navy">Lugar o canal</span>
              <Input value={location} onChange={(event) => setLocation(event.target.value)} required />
            </label>
            <Button className="w-full" type="submit">Guardar evento</Button>
          </form>
        </Card>
      ) : null}

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-navy">Próximos eventos</h2>
        {orderedMeetings.map((meeting) => (
          <Card
            key={meeting.id}
            className={`space-y-3 ${meeting.date === selectedDate ? "border-primary bg-pastel-blue/30" : ""}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold capitalize text-primary">{formatMeetingDate(meeting.date)}</p>
                <h3 className="font-bold text-navy">{meeting.title}</h3>
              </div>
              <StatusBadge tone={meeting.type === "recorrido" ? "green" : meeting.type === "recordatorio" ? "yellow" : "blue"}>
                {meeting.type}
              </StatusBadge>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Clock className="size-4" />{meeting.time}</span>
              <span className="inline-flex items-center gap-1"><MapPin className="size-4" />{meeting.location}</span>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
