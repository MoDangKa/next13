// import createMiddleware from "next-intl/middleware";

// export default createMiddleware({
//   locales: ["en", "th"],
//   defaultLocale: "en",
//   localePrefix: "always",
// });

// export const config = {
//   matcher: ["/", "/(th|en)/:path*"],
// };

import { chain, withAuthentication, withLocalization } from "./src/middlewares";

export default chain([withLocalization, withAuthentication]);

export const config = {
  // matcher: ["/", "/(th|en)/:path*"],
  // matcher: ["/((?!api|_next|_vercel|robots.txt|.*\\..*).*)"],
  // matcher: "/((?!api|_next).*)",
  matcher: "/:path*",
};
