import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  // const role = req.cookies.get("role")?.value;
  console.log("token middleware-", token);
  

  const { pathname } = req.nextUrl;

  const publicPaths = ["/login", "signup"];

  if (!token && !publicPaths.includes(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  //   // 👮‍♂️ Role-based protection
  //   if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
  //     const url = req.nextUrl.clone();
  //     url.pathname = "/unauthorized";
  //     return NextResponse.redirect(url);
  //   }

  return NextResponse.next();
}

export const config = {
  matcher: [ ],

  //"/add", "/dashboard/:path*",
};
