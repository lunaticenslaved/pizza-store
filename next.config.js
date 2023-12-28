/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dodopizza-a.akamaihd.net',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
