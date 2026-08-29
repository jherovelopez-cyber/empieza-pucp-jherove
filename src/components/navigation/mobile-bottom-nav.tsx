"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CalendarDays,
  CheckSquare,
  FileText,
  Home,
  Map,
  MessageCircle,
  User,
  Users
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type IconKey =
  | "book"
  | "calendar"
  | "check"
  | "content"
  | "home"
  | "map"
  | "messages"
  | "user"
  | "users";

export type NavItem = {
  href: string;
  label: string;
  icon: IconKey;
};

const icons: Record<IconKey, LucideIcon> = {
  book: BookOpen,
  calendar: CalendarDays,
  check: CheckSquare,
  content: FileText,
  home: Home,
  map: Map,
  messages: MessageCircle,
  user: User,
  users: Users
};

export function MobileBottomNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 backdrop-blur">
      <div
        className={cn(
          "mx-auto grid max-w-3xl pb-3 pt-2",
          items.length > 5 ? "grid-cols-6 px-1" : "grid-cols-5 px-2"
        )}
      >
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = icons[item.icon];
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-0.5 text-[10px] font-semibold text-muted-foreground sm:text-xs",
                active && "bg-pastel-blue text-primary"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="size-5" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
