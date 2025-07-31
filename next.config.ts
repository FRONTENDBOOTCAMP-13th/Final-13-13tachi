import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fesp-api.koyeb.app',
        port: '',
        pathname: '/market/files/febc13-final13-emjf/**',
      },
      {
        protocol: 'http',
        hostname: '*.kakaocdn.net',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.pstatic.net',
        pathname: '**',
      },
    ],
    domains: ['fesp-api.koyeb.app'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
