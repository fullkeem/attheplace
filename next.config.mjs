/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '10010',
        pathname: '/images/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '10010',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'naveropenapi.apigw.ntruss.com',
        port: '',
        pathname: '/map-static/v2/raster',
      },
    ],
  },
};

export default nextConfig;
