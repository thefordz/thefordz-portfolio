import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qwa5hd5dzn.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
