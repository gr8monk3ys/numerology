/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Lint is run separately; don't fail production builds on lint rules.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
