import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // 프록시 설정
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
