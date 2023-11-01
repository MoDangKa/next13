/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")("./i18n.ts");

const nextConfig = withNextIntl({
  output: "export",
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
    ];
  },
});

module.exports = nextConfig;
