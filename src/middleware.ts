import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
// middleware is only supports the Edge runtime ,so you can't use mongoose inside ,because mongoose is node.js api.
export async function middleware(request: NextRequest) {
  let userId = request.cookies.get("userId")?.value;
  if (userId) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/login", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - login、register (login page)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!login|register|_next/static|_next/image|favicon.ico).*)",
  ],
};
