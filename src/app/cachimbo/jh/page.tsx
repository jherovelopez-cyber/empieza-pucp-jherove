import { MessageCircle, Users } from "lucide-react";
import { announcements, demoUsers, ids } from "@/features/demo/demo-data";
import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { ActionCard } from "@/components/layout/action-card";
import { Card } from "@/components/ui/card";

export default function StudentJhPage() {
  const jh = demoUsers.find((user) => user.id === ids.jh);
  const groupAnnouncements = announcements.filter((announcement) => announcement.authorId === ids.jh);

  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Tu JH" subtitle="Acompanamiento para el horario H-204" />
      <ActionCard title={jh?.fullName ?? "JH asignado"} description="Jefa de Horario H-204" icon={Users} />
      <section className="space-y-3">
        {groupAnnouncements.map((announcement) => (
          <Card key={announcement.id}>
            <MessageCircle className="mb-3 size-5 text-primary" aria-hidden="true" />
            <h2 className="font-bold text-navy">{announcement.title}</h2>
            <p className="text-sm text-muted-foreground">{announcement.content}</p>
          </Card>
        ))}
      </section>
    </PageContainer>
  );
}
