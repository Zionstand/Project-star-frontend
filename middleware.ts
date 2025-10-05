// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   const url = req.nextUrl.clone();
//   const protectedPaths = [`/a`];
//   const pathname = req.nextUrl.pathname;

//   if (protectedPaths.some((p) => pathname.startsWith(p))) {
//     const access = req.cookies.get("accessToken")?.value;

//     if (!access) {
//       url.pathname = "/";
//       url.searchParams.set("unauthenticated", "true"); // ✅ correct way
//       return NextResponse.redirect(url);
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/a/:path*"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const protectedPaths = ["/a"];
  const pathname = req.nextUrl.pathname;

  if (protectedPaths.some((p) => pathname.startsWith(p))) {
    const access = req.cookies.get("accessToken")?.value;

    if (!access) {
      const redirectUrl = new URL("/", req.url);
      // redirectUrl.searchParams.set("unauthenticated", "true");
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/a/:path*"],
};
