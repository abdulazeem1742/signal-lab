import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Keep this project as the Turbopack root when a parent lockfile exists.
    root: process.cwd(),
  },
};

export default nextConfig;
