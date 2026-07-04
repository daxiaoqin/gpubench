import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standard build — all pages are static, no server-side API calls
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
