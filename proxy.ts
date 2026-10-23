import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminSession = request.cookies.get("admin_session")?.value;
  const isAuthenticated = adminSession === "true";

  // Check if trying to access admin pages
  if (pathname.startsWith("/admin")) {
    const isAuthPage = pathname === "/admin/login" || pathname === "/admin/forgot-password";

    if (isAuthenticated) {
      // If authenticated and trying to access login/forgot-password, redirect to admin index
      if (isAuthPage) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    } else {
      // If not authenticated and trying to access dashboard pages, redirect to login
      if (!isAuthPage) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
