import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Permitimos imágenes de Unsplash
      },
    ],
  },
};

export default nextConfig;