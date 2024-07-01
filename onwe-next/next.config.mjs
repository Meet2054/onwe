/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["s3-alpha-sig.figma.com", "i1.sndcdn.com","encrypted-tbn0.gstatic.com"],
  },
  transpilePackages: ["lucide-react"],
};

export default nextConfig;
