// 카테고리와 상태 라벨 정의 (docs/categories.md, docs/guidelines.md 5.2.1 기준)

// id: frontmatter category 값 / name: 전체 이름 / short: 메뉴 바 표시 이름 / subs: 소분류 (frontmatter subcategory 값)
export const CATEGORIES = [
  {
    id: "language",
    name: "Programming Language",
    short: "Language",
    subs: ["언어 공통 개념", "C / C++", "Java / Kotlin", "C#", "Python", "JavaScript / TypeScript", "PHP", "Go / Dart"],
  },
  {
    id: "database",
    name: "DB",
    short: "DB",
    subs: ["DB 기본 개념", "RDBMS", "SQL", "설계", "성능", "트랜잭션·동시성", "NoSQL", "운영"],
  },
  {
    id: "framework",
    name: "Framework / Runtime",
    short: "Framework",
    subs: ["Spring / Spring Boot", "ORM", ".NET", "Node.js", "Python 웹", "PHP 웹", "프론트엔드", "모바일"],
  },
  {
    id: "cs",
    name: "CS",
    short: "CS",
    subs: ["Network", "OS", "Web", "자료구조", "알고리즘", "컴퓨터 구조"],
  },
  {
    id: "architecture",
    name: "아키텍처 / 설계",
    short: "아키텍처",
    subs: ["객체지향", "디자인 패턴", "애플리케이션 구조", "도메인 주도 설계", "분산 시스템", "메시징", "캐싱", "API 설계", "테스트"],
  },
  {
    id: "devops",
    name: "인프라 / DevOps",
    short: "DevOps",
    subs: ["Linux", "컨테이너", "오케스트레이션", "CI/CD", "클라우드", "웹 서버", "모니터링", "형상 관리"],
  },
  {
    id: "data",
    name: "데이터 엔지니어링",
    short: "데이터",
    subs: [
      "기본 개념",
      "데이터 파이프라인",
      "분산 처리",
      "스트리밍 처리",
      "저장 구조",
      "파일 포맷",
      "데이터 모델링",
      "클라우드 데이터 플랫폼",
      "데이터 품질·거버넌스",
    ],
  },
  {
    id: "security",
    name: "보안",
    short: "보안",
    subs: ["웹 보안", "인증·인가", "암호화", "시큐어 코딩", "인프라 보안"],
  },
  {
    id: "domain",
    name: "도메인 기본지식",
    short: "도메인",
    subs: ["이커머스", "결제·정산", "회원", "글로벌 서비스", "법규·컴플라이언스"],
  },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export function getCategory(id: string) {
  return CATEGORIES.find((c) => c.id === id);
}

export function isSubcategory(category: string, sub: unknown): sub is string {
  const c = getCategory(category);
  return typeof sub === "string" && !!c && (c.subs as readonly string[]).includes(sub);
}

export const STATUSES = ["초안", "작성중", "확인필요", "완료", "갱신필요"] as const;
export type Status = (typeof STATUSES)[number];

// 상태별 CSS 클래스 (색상은 app/globals.css 에서 정의)
export const STATUS_CLASS: Record<Status, string> = {
  초안: "status-draft",
  작성중: "status-wip",
  확인필요: "status-check",
  완료: "status-done",
  갱신필요: "status-stale",
};

export function categoryName(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.name ?? id;
}

export function isCategory(v: unknown): v is CategoryId {
  return typeof v === "string" && CATEGORIES.some((c) => c.id === v);
}

export function isStatus(v: unknown): v is Status {
  return typeof v === "string" && (STATUSES as readonly string[]).includes(v);
}
