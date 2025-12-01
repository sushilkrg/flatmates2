import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "https://flatmates-api.onrender.com/api/v1/:path*", 
      },
    ];
  },
};

export default nextConfig;
