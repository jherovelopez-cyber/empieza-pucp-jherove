import { MobileBottomNav, type NavItem } from "@/components/navigation/mobile-bottom-nav";
import { requireRole } from "@/features/auth/server";

const items: NavItem[] = [
  { href: "/cf", label: "Inicio", icon: "home" },
  { href: "/cf/jh", label: "JH", icon: "users" },
  { href: "/cf/horarios", label: "Horarios", icon: "calendar" },
  { href: "/cf/contenido", label: "Contenido", icon: "content" },
  { href: "/cf/perfil", label: "Perfil", icon: "user" }
];

export default async function CfLayout({ children }: { children: React.ReactNode }) {
  await requireRole("cf");

  return (
    <>
      {children}
      <MobileBottomNav items={items} />
    </>
  );
}
