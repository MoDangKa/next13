/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")("./i18n.ts");

const nextConfig = withNextIntl({
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
    ];
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "cloudflare-ipfs.com",
      "nb6uld796oapyje7.public.blob.vercel-storage.com",
    ],
  },
});

module.exports = nextConfig;
