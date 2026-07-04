import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",       // Fully static — no Node.js runtime needed
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
