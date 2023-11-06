import { jwtVerify } from "jose";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

export function withAuthentication(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    const authenticatedAPIRoutes = [
      pathname.startsWith("/api/users"),
      pathname.startsWith("/api/posts"),
      pathname.startsWith("/api/follows"),
    ];

    if (authenticatedAPIRoutes.includes(true)) {
      const cookie = request.cookies.get(process.env.NEXT_PUBLIC_JWT_TOKEN!);

      if (!cookie || !cookie?.value) {
        return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
      }

      try {
        const secret = new TextEncoder().encode(
          process.env.NEXT_PUBLIC_JWT_SECRET
        );
        await jwtVerify(cookie.value, secret);
      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
      }
    }

    return middleware(request, event);
  };
}
