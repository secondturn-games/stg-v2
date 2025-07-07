import withPWA from "next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ...other config
};

const pwaConfig = withPWA(nextConfig);

export default {
  ...pwaConfig,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
};
