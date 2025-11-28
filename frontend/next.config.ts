import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://flatmates-api.onrender.com/api/:path*", 
        // Replace with your actual backend URL (Render/Railway/EC2)
      },
    ];
  },
};

export default nextConfig;
