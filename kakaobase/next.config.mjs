/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['s3-kakaobase-bucket.s3.ap-northeast-2.amazonaws.com'],
  },
  experimental: {
    logging: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://dev.kakaobase.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;




