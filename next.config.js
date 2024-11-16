const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true }
};

module.exports = withNextIntl({
  ...nextConfig,
  // This is the default, but feel free to override if needed
  defaultLocale: 'en',
  locales: ['en', 'zh']
});