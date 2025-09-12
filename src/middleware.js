import { NextResponse } from "next/server";
import middlewareAuth from "./utils/middlewareAuth";

export async function middleware(req) {
  const url = req.url;
  const pathname = req.nextUrl.pathname;
  
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control');
  response.headers.set('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control',
        'Access-Control-Allow-Credentials': 'true'
      }
    });
  }

  if (pathname.startsWith("/profile") || pathname.startsWith("/admin-panel")) {
    try {
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
    } catch (error) {
      console.error('Authentication error:', error);
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/profile/:path*',
    '/admin-panel/:path*'
  ],
};