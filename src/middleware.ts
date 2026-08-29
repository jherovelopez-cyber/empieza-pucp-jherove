import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/config/env";
import { getHomeRouteForRole, getRoleForPath, isUserRole } from "@/constants/routes";
import { updateSupabaseSession } from "@/services/supabase/middleware";

export async function middleware(request: NextRequest) {
  if (!env.NEXT_PUBLIC_DEMO_MODE) {
    return updateSupabaseSession(request);
  }

  const requiredRole = getRoleForPath(request.nextUrl.pathname);
  if (!requiredRole) return NextResponse.next();

  const role = request.cookies.get("empieza_role")?.value;
  if (!isUserRole(role)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (role !== requiredRole) {
    return NextResponse.redirect(new URL(getHomeRouteForRole(role), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/cachimbo/:path*", "/jh/:path*", "/cf/:path*"]
};
