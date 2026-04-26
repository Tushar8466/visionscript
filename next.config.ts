import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "sharp",
    "onnxruntime-node",
    "canvas",        // ✅ keep canvas
    // ❌ removed tfjs-node
  ],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;