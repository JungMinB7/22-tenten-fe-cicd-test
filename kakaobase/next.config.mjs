/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['s3-kakaobase-bucket.s3.ap-northeast-2.amazonaws.com'],
  },
  experimental: {
    logging: true,
  },
};


export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['s3-kakaobase-bucket.s3.ap-northeast-2.amazonaws.com'],
//   },
//   experimental: {
//     logging: true,
//   },
//   rewrites: async () => [
//     {
//       source: '/api/:path*',
//       destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/:path*`,
//     },
//   ],
// };

// export default nextConfig;




