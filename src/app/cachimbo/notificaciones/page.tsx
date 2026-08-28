import { announcements } from "@/features/demo/demo-data";
import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { Card } from "@/components/ui/card";

export default function NotificationsPage() {
  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Notificaciones" subtitle="Avisos importantes para tu inicio" />
      <div className="space-y-3">
        {announcements.map((announcement) => (
          <Card key={announcement.id}>
            <h2 className="font-bold text-navy">{announcement.title}</h2>
            <p className="text-sm text-muted-foreground">{announcement.content}</p>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
