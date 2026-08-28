import Link from "next/link";
import { ArrowRight, Map, Users, GraduationCap } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { Card } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <PageContainer className="flex flex-col justify-center gap-8 pb-8">
      <section className="space-y-5">
        <p className="text-sm font-bold text-primary">Empieza PUCP</p>
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-normal text-navy">
            La informacion ya existe. Lo que falta es una ruta para el que recien llega.
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            Una plataforma mobile-first para cachimbos, JH y Centros Federados con una ruta clara de adaptacion universitaria.
          </p>
        </div>
        <Link
          href="/auth/login"
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-primary/90"
        >
          Entrar al demo <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </section>
      <section className="grid gap-3 sm:grid-cols-3">
        {[
          { title: "Cachimbo", text: "Onboarding, mapa, cursos y tu JH.", icon: GraduationCap },
          { title: "JH", text: "Seguimiento del horario y checklist.", icon: Users },
          { title: "CF", text: "Coordinacion, contenido y reportes.", icon: Map }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="space-y-3">
              <Icon className="size-6 text-primary" aria-hidden="true" />
              <div>
                <h2 className="font-bold text-navy">{item.title}</h2>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            </Card>
          );
        })}
      </section>
    </PageContainer>
  );
}
