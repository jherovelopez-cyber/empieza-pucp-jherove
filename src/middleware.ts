import { NextResponse, type NextRequest } from "next/server";
import { getRoleForPath, roleHome } from "@/constants/routes";
import type { UserRole } from "@/types/domain";

export function middleware(request: NextRequest) {
  const requiredRole = getRoleForPath(request.nextUrl.pathname);
  if (!requiredRole) return NextResponse.next();

  const role = request.cookies.get("empieza_role")?.value as UserRole | undefined;
  if (!role) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (role !== requiredRole) {
    return NextResponse.redirect(new URL(roleHome[role], request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cachimbo/:path*", "/jh/:path*", "/cf/:path*"]
};
