import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { jhMeetings } from "@/features/demo/demo-data";
import { MeetingsClient } from "@/features/jh/meetings-client";

export default function JhMeetingsPage() {
  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Reuniones" subtitle="Organiza la agenda del H-204" />
      <MeetingsClient initialMeetings={jhMeetings} />
    </PageContainer>
  );
}
