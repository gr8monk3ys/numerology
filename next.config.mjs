/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root so a stray lockfile in a parent directory can't
  // confuse Next's root inference (silences the multi-lockfile warning).
  outputFileTracingRoot: import.meta.dirname,
  eslint: {
    // Lint is run separately; don't fail production builds on lint rules.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
