import { Send } from "lucide-react";
import { getCfContent } from "@/features/cf/cf.repository";
import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SourceBadge } from "@/components/feedback/source-badge";
import { StatusBadge } from "@/components/feedback/status-badge";

export default async function CfContentPage() {
  const content = await getCfContent();

  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Contenido oficial" subtitle="Recursos para JH y cachimbos" />
      <div className="flex gap-2 overflow-x-auto">
        {["Borradores", "Publicado", "Programado"].map((tab) => (
          <Button key={tab} variant={tab === "Publicado" ? "primary" : "secondary"}>
            {tab}
          </Button>
        ))}
      </div>
      <div className="space-y-3">
        {content.map((resource) => (
          <Card key={resource.id} className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <SourceBadge source={resource.sourceType} />
              <StatusBadge tone={resource.status === "published" ? "green" : "yellow"}>
                {resource.status}
              </StatusBadge>
            </div>
            <div>
              <h2 className="font-bold text-navy">{resource.title}</h2>
              <p className="text-sm text-muted-foreground">{resource.description}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Alcance: {resource.scope} · Revisado: {resource.reviewedPercent}%
            </p>
          </Card>
        ))}
      </div>
      <Card className="space-y-3">
        <h2 className="font-bold text-navy">Difusion rapida</h2>
        <div className="grid grid-cols-2 gap-3">
          <Button>
            <Send className="size-4" aria-hidden="true" />
            Enviar a JH
          </Button>
          <Button variant="secondary">
            <Send className="size-4" aria-hidden="true" />
            Enviar a cachimbos
          </Button>
        </div>
      </Card>
    </PageContainer>
  );
}
