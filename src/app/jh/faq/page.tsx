import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { jhFaqs } from "@/features/demo/demo-data";
import { FaqList } from "@/features/jh/faq-list";

export default function JhFaqPage() {
  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Preguntas frecuentes" subtitle="Respuestas rápidas para orientar a tus cachimbos" />
      <FaqList items={jhFaqs} />
    </PageContainer>
  );
}
