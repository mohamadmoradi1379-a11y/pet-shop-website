import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the Arena live-preview host to talk to the dev server.
  allowedDevOrigins: ["*.e2b.app", "*.arena.ai"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dkstatics-public.digikala.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'www.digikala.com',
      },
    ],
  },
};

export default nextConfig;
