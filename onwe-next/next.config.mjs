// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["s3-alpha-sig.figma.com", "i1.sndcdn.com","encrypted-tbn0.gstatic.com"],
//   },
//   transpilePackages: ["lucide-react"],
// };

// export default nextConfig;
// next.config.js
/** @type {import('next').NextConfig} */
import { createProxyMiddleware } from "http-proxy-middleware";

const nextConfig = {
  images: {
    domains: [
      "s3-alpha-sig.figma.com",
      "i1.sndcdn.com",
      "encrypted-tbn0.gstatic.com",
      "www.pexels.com",
      "images.pexels.com",
    ],
    unoptimized: true,
  },
  transpilePackages: ["lucide-react"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://minimal-pursuant-mars-carey.trycloudflare.com", // Replace with your external API
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
};

export default nextConfig;
