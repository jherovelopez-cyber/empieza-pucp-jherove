import { MobileBottomNav, type NavItem } from "@/components/navigation/mobile-bottom-nav";

const items: NavItem[] = [
  { href: "/cachimbo", label: "Inicio", icon: "home" },
  { href: "/cachimbo/mapa", label: "Mapa", icon: "map" },
  { href: "/cachimbo/cursos", label: "Cursos", icon: "book" },
  { href: "/cachimbo/jh", label: "JH", icon: "users" },
  { href: "/cachimbo/perfil", label: "Perfil", icon: "user" }
];

export default function CachimboLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <MobileBottomNav items={items} />
    </>
  );
}
