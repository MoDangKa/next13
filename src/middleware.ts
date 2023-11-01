import { chain, withAuthentication, withLocalization } from "./middlewares";

export default chain([withLocalization, withAuthentication]);

export const config = {
  matcher: "/:path*",
};
