/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@madre/shared'],
  sassOptions: {
    prependData: '@use "@madre/shared/variables.scss" as *;',
  },
};

module.exports = nextConfig;
