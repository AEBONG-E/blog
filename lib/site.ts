// 사이트 공통 설정. 문구를 바꾸려면 이 파일만 수정한다.
export const siteConfig = {
  // 최상단 고정 헤더 문구 (사이트 이름으로도 사용)
  motto: "God helps those who help themselves.",
  description: "기술 주제를 동작 원리와 실무 관점까지 정리하고, 면접 질문과 연계 학습으로 이어 보는 기술블로그",
  lang: "ko",
};

// 배포 시 워크플로가 주입한다. 예: https://username.github.io 또는 https://username.github.io/repo
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

// next/link 를 쓰지 않는 경로(정적 파일, /admin 등)에 붙일 basePath
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}

// Sveltia CMS 글 편집 화면 경로 (Phase 2 에서 컬렉션 이름을 posts 로 설정)
export function cmsEditPath(slug: string): string {
  return withBasePath(`/admin/#/collections/posts/entries/${encodeURIComponent(slug)}`);
}
