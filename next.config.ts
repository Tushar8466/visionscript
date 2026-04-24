import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "sharp", 
    "onnxruntime-node", 
    "@tensorflow/tfjs-node", 
    "canvas"
  ],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;



