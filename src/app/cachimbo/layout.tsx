import { MobileBottomNav, type NavItem } from "@/components/navigation/mobile-bottom-nav";
import { requireRole } from "@/features/auth/server";

const items: NavItem[] = [
  { href: "/cachimbo", label: "Inicio", icon: "home" },
  { href: "/cachimbo/mapa", label: "Mapa", icon: "map" },
  { href: "/cachimbo/cursos", label: "Cursos", icon: "book" },
  { href: "/cachimbo/jh", label: "JH", icon: "users" },
  { href: "/cachimbo/perfil", label: "Perfil", icon: "user" }
];

export default async function CachimboLayout({ children }: { children: React.ReactNode }) {
  await requireRole("student");

  return (
    <>
      {children}
      <MobileBottomNav items={items} />
    </>
  );
}
