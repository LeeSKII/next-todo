import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "@/lib/auth";

// This function can be marked `async` if using `await` inside
// middleware is only supports the Edge runtime ,so you can't use mongoose inside ,because mongoose is node.js api.
export async function middleware(request: NextRequest) {
  // validate the user is authenticated
  const verifiedToken = await verifyAuth(request).catch((err: Error) => {
    console.error("verifyAuth Error", err.message);
  });
  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else {
    return NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/nextui/:path*", "/todo/:path*"],
};
