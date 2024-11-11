import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        // pathname: '/account123/**',
      },
    ],
  },
};

export default nextConfig;
