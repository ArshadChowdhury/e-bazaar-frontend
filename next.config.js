/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // or 'http' if appropriate
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https", // or 'http' if appropriate
        hostname: "picsum.photos",
      },
    ],
  },
};

module.exports = nextConfig;
