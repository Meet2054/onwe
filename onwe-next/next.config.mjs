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
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  experimental: {
    // This will ignore errors during static generation
    workerThreads: false,
    cpus: 1,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
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
    // Configure Webpack to handle mp4 files
    config.module.rules.push({
      test: /\.mp4$/,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next/static/videos",
            outputPath: "static/videos",
            name: "[name].[hash].[ext]",
          },
        },
      ],
    });

    // Resolve fallbacks for client-side builds
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
