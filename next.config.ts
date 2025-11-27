import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  watchOptions: {
    pollIntervalMs: 1000,
  },
  images: {
    domains: ["image.tmdb.org"]
  }
};

export default nextConfig;
