import { NextResponse } from "next/server";
import middlewareAuth from "./utils/middlewareAuth";

export async function middleware(req) {
  const url = req.url;
  const pathname = req.nextUrl.pathname;
  const user = await middlewareAuth(req);

  if (pathname.startsWith("/profile")) {
    if (!user) return NextResponse.redirect(new URL("/auth/signin", url));
  }
  if (pathname.startsWith("/admin-panel")) {
    if (!user) return NextResponse.redirect(new URL("/auth/signin", url));
    if (user && user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", url));
    }
  }
}

export const config = {
  matcher: ["/admin-panel/:path*", "/profile/:path*"],
};
