"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createAuthRepository } from "@/features/auth/auth-service";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const auth = useMemo(() => createAuthRepository(), []);
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await auth.logout();
    router.replace("/auth/login");
    router.refresh();
  }

  return (
    <Button disabled={loading} onClick={handleLogout} variant="secondary">
      <LogOut className="size-4" aria-hidden="true" />
      {loading ? "Saliendo..." : "Cerrar sesion"}
    </Button>
  );
}
