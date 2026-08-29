import { contentResources } from "@/features/demo/demo-data";
import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { Card } from "@/components/ui/card";
import { SourceBadge } from "@/components/feedback/source-badge";
import { ExternalLink } from "lucide-react";

export default function JhResourcesPage() {
  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Recursos oficiales" subtitle="Material para acompañar a cachimbos" />
      {contentResources.map((resource) => (
        <Card key={resource.id} className="space-y-3">
          <SourceBadge source={resource.sourceType} />
          <h2 className="font-bold text-navy">{resource.title}</h2>
          <p className="text-sm text-muted-foreground">{resource.description}</p>
          {resource.url ? (
            <a
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 break-all rounded-lg bg-muted px-3 py-2 text-sm font-semibold text-primary hover:bg-pastel-blue"
            >
              <ExternalLink className="size-4 shrink-0" aria-hidden="true" />
              {resource.url}
            </a>
          ) : null}
        </Card>
      ))}
    </PageContainer>
  );
}
