// GitHub Pages 정적 배포 설정
// - NEXT_PUBLIC_BASE_PATH: 저장소가 {username}.github.io 이면 빈 값, 그 외에는 "/{repo}"
//   배포 워크플로(.github/workflows/deploy.yml)에서 자동으로 넣어준다.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
