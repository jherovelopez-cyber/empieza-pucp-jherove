import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { MessagesClient } from "@/features/jh/messages-client";
import { announcements, ids } from "@/features/demo/demo-data";

export default function JhMessagesPage() {
  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Mensajes" subtitle="Comunícate con los cachimbos del H-204" />
      <MessagesClient initialAnnouncements={announcements.filter((item) => item.authorId === ids.jh)} />
    </PageContainer>
  );
}
