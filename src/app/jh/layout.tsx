import { MobileBottomNav, type NavItem } from "@/components/navigation/mobile-bottom-nav";

const items: NavItem[] = [
  { href: "/jh", label: "Inicio", icon: "home" },
  { href: "/jh/grupo", label: "Grupo", icon: "users" },
  { href: "/jh/checklist", label: "Checklist", icon: "check" },
  { href: "/jh/mensajes", label: "Mensajes", icon: "messages" },
  { href: "/jh/perfil", label: "Perfil", icon: "user" }
];

export default function JhLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <MobileBottomNav items={items} />
    </>
  );
}
