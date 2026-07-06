/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/system/:path*',
        destination: 'http://127.0.0.1:8000/api/system/:path*',
      },
    ];
  },
};

export default nextConfig;
