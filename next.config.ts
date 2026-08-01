import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Static export can't use the Image Optimization API.
    unoptimized: true,
  },
};

export default nextConfig;
