import { contentResources } from "@/features/demo/demo-data";
import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { Card } from "@/components/ui/card";
import { SourceBadge } from "@/components/feedback/source-badge";

export default function JhResourcesPage() {
  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Recursos oficiales" subtitle="Material para acompanar a cachimbos" />
      {contentResources.map((resource) => (
        <Card key={resource.id} className="space-y-2">
          <SourceBadge source={resource.sourceType} />
          <h2 className="font-bold text-navy">{resource.title}</h2>
          <p className="text-sm text-muted-foreground">{resource.description}</p>
        </Card>
      ))}
    </PageContainer>
  );
}
