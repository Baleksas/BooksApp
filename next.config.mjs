/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.daisyui.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "books.google.com",
        port: "",
        pathname: "/books/**",
      },
      {
        protocol: "http",
        hostname: "books.google.com",
        port: "",
        pathname: "/books/**",
      },
      {
        protocol: "https",
        hostname: "s.gravatar.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
