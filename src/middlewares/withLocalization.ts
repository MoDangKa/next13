import { languages } from "@/configs/language-config";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const defaultLocale = languages[0];
const avoid = ["api", "_next", "_vercel"].concat(languages).join("|");
const regex = new RegExp(`^/((?!${avoid}|.*\\..*).*)`);

export function withLocalization(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    if (regex.test(pathname)) {
      const nextLocale = "NEXT_LOCALE";
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
