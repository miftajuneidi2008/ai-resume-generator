import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "axe0mz9mzr.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
