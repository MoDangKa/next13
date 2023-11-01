import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const defaultLocale = "en";
const regex = new RegExp("^/((?!api|_next|_vercel|en|th|.*\\..*).*)");

export function withLocalization(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    if (regex.test(pathname)) {
      const nextLocale = process.env.NEXT_PUBLIC_NEXT_LOCALE!;
      const cookie = request.cookies.get(nextLocale);
      const locale = !cookie || !cookie?.value ? defaultLocale : cookie.value;
      const url = `/${locale}${pathname}`;
      const response = NextResponse.redirect(new URL(url, request.url));
      if (!cookie || !cookie?.value) response.cookies.set(nextLocale, locale);
      return response;
    }
    return middleware(request, event);
  };
}
