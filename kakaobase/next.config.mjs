// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // 개발 시 오류 감지 강화
  swcMinify: true, // 빌드 최적화 (기본값 true)
  experimental: {
    appDir: true, // ✅ src/app 사용 시 필수
  },
  output: 'standalone', // Docker 또는 pm2 배포 시 권장
};

export default nextConfig;
