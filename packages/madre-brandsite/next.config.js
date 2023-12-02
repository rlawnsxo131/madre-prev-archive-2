/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@madre/shared'],
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;
