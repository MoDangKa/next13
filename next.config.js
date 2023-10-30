/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")("./i18n.ts");

const nextConfig = withNextIntl({ reactStrictMode: false });

module.exports = nextConfig;
