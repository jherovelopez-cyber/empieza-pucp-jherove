import Link from "next/link";
import { Bell, CalendarClock, Compass, MapPin, School, Sparkles } from "lucide-react";
import { ids } from "@/features/demo/demo-data";
import { getStudentOnboarding } from "@/features/onboarding/onboarding.repository";
import { PageContainer } from "@/components/layout/page-container";
import { AppHeader } from "@/components/layout/app-header";
import { ProgressCard } from "@/components/layout/progress-card";
import { SectionHeader } from "@/components/layout/section-header";
import { ActionCard } from "@/components/layout/action-card";

const nextSteps = [
  { title: "Conoce DAES", description: "Servicios de bienestar", icon: School, href: "/cachimbo/onboarding" },
  { title: "Ubica tus salones", description: "Ruta demo en campus", icon: MapPin, href: "/cachimbo/mapa" },
  { title: "Activa tus plataformas", description: "Correo y PAIDEIA", icon: Compass, href: "/cachimbo/onboarding" },
  { title: "Centro Federado", description: "Recursos de tu facultad", icon: Sparkles, href: "/cachimbo/onboarding" },
  { title: "Tu JH te dejo un consejo", description: "Punto de encuentro", icon: Bell, href: "/cachimbo/jh" },
  { title: "Tienes una fecha importante", description: "Primera semana", icon: CalendarClock, href: "/cachimbo/notificaciones" }
];

export default async function CachimboHomePage() {
  const onboarding = await getStudentOnboarding(ids.student);

  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Hola, Andrea" subtitle="Tu primera semana en la PUCP" />
      <ProgressCard title="Progreso de bienvenida" {...onboarding.progress} />
      <section className="space-y-3">
        <SectionHeader title="Tus proximos pasos" />
        <div className="grid gap-3 sm:grid-cols-2">
          {nextSteps.map((step) => (
            <Link key={step.title} href={step.href}>
              <ActionCard {...step} />
            </Link>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
