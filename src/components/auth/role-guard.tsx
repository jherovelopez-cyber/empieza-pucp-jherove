"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { createAuthRepository } from "@/features/auth/auth-service";
import { queryKeys } from "@/lib/query-keys";
import { roleHome } from "@/constants/routes";
import type { UserRole } from "@/types/domain";
import { LoadingState } from "@/components/feedback/loading-state";

export function RoleGuard({
  role,
  children
}: {
  role: UserRole;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const auth = createAuthRepository();
  const { data: user, isLoading } = useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: () => auth.getCurrentUser()
  });

  useEffect(() => {
    if (!isLoading && !user) router.replace("/auth/login");
    if (!isLoading && user && user.role !== role) router.replace(roleHome[user.role]);
  }, [isLoading, role, router, user]);

  if (isLoading || !user || user.role !== role) return <LoadingState />;

  return <>{children}</>;
}
