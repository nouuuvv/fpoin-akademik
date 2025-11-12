import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.pathname;

  // belum login, coba masuk halaman admin/mahasiswa
  if (!token && (url.startsWith("/admin") || url.startsWith("/mahasiswa"))) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // sudah login tapi buka /auth
  if (token && url === "/auth") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/mahasiswa/:path*", "/auth"],
};
