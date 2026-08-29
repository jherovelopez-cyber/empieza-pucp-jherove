import { getCfContent } from "@/features/cf/cf.repository";
import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { ContentManagerClient } from "@/features/cf/content-manager-client";

export default async function CfContentPage() {
  const content = await getCfContent();
  return <PageContainer className="space-y-6"><AppHeader title="Contenido oficial" subtitle="Aprobación y difusión de recursos" /><ContentManagerClient initialContent={content} /></PageContainer>;
}
