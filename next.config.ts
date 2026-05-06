import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  transpilePackages: [
    "framer-motion",
    "@tsparticles/react",
    "@tsparticles/slim",
    "react-parallax-tilt",
  ],
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
