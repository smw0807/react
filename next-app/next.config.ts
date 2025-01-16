import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // 프록시 설정
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5001/api/:path*',
      },
    ];
  },
};

export default nextConfig;
