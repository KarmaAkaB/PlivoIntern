import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Your existing config options...
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
