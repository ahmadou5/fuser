import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Add the external hostname to the domains array
    domains: [
      "static.asterdex.com",
      "images.unsplash.com",
      "cdn.infusewallet.com",
      "infusewallet.com",
      "x.com",
      "pbs.twimg.com",
      // Add any other external domains you use (e.g., 'cdn.shopify.com', 'images.unsplash.com')
    ],
  },
};

export default nextConfig;
