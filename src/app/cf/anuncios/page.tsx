import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { AnnouncementComposer } from "@/features/cf/announcement-composer";
export default function CfAnnouncementsPage() { return <PageContainer className="space-y-6"><AppHeader title="Anuncios masivos" subtitle="Difusión demo para EEGGCC" /><AnnouncementComposer /></PageContainer>; }
