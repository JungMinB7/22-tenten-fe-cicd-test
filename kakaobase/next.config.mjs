// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['s3-kakaobase-bucket.s3.ap-northeast-2.amazonaws.com'],
//   },
//   experimental: {
//     logging: true,
//   },
// };


// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['s3-kakaobase-bucket.s3.ap-northeast-2.amazonaws.com'],
  },
  experimental: {
    logging: true,
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: '__NEXT_PUBLIC_API_BASE_URL__',
  },
};

export default nextConfig;
