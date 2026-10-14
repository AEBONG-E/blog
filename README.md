# 기술 블로그

기술 주제를 동작 원리와 실무 관점까지 정리하는 기술블로그. 각 글 끝에 면접 질문 흐름과 연계 학습을 함께 정리한다. Next.js(App Router) 정적 빌드 + MDX, GitHub Pages 배포.

## 구조

```
app/                    페이지 (홈, /posts, /posts/[slug], /series, /series/[id], sitemap, robots)
components/             헤더(문구 + 대분류/소분류 메뉴 바), 상태 라벨, 글 카드, 상태 필터, 목차
components/viz/         MDX 에서 쓰는 시각화 컴포넌트 (index.ts 에 등록)
content/posts/          글 (*.mdx)
public/images/posts/    글 이미지 ({slug}/ 폴더)
docs/                   기준 문서 (guidelines, categories, prompts, topic-history)
lib/                    글 파싱, MDX 렌더링, 카테고리/상태 정의, 사이트 설정
.github/workflows/      GitHub Pages 배포
```

## 로컬 실행

```bash
npm ci
npm run dev        # http://localhost:3000
npm run build      # out/ 에 정적 파일 생성
```

## 글 작성 메모

- 경로: `content/posts/{slug}.mdx`, 파일 이름과 frontmatter 의 slug 가 같아야 한다.
- 필수 frontmatter: title, slug, category, date, status, summary (형식은 docs/guidelines.md 5.2)
- 선택 frontmatter: `subcategory` (docs/categories.md 의 소분류 이름 그대로, 예: `subcategory: Network`). 상단 소분류 메뉴에서 글을 거를 때 쓴다.
- category, status, subcategory 값이 정의에 없으면 빌드가 실패한다. (잘못된 글이 배포되지 않도록)
- `<!-- TODO -->`, `<!-- 확인 필요 -->` 주석은 그대로 써도 된다. 빌드 시 MDX 주석으로 바뀌고 화면에는 보이지 않는다.
- MDX 본문에서 `{` `}` 와 태그처럼 보이는 `<단어` 는 JSX 로 해석된다. 글자로 쓰려면 코드(`...`)로 감싼다.
- 이미지는 `/images/posts/{slug}/파일명` 으로 쓰면 basePath 가 자동으로 붙는다.
- 목차는 h2, h3 제목으로 자동 생성된다 (`components/Toc.tsx`, 넓은 화면 우측 고정 / 좁은 화면 상단 접이식).
- `## 면접으로 연결하기` 부터 글 끝까지는 섹션마다 접힌 아코디언으로 표시된다. 제목 문구가 정확히 같아야 한다 (`lib/mdx.tsx` 의 `FOLD_FROM_HEADING`).

## 설정 위치

- 고정 헤더 문구: `lib/site.ts` 의 `motto`
- 상태 라벨 색: `app/globals.css` 의 `--st-*` 변수
- 카테고리/소분류 목록, 메뉴 표시 이름: `lib/taxonomy.ts` (docs/categories.md 와 맞춰서 수정)

## 변경 관리

- 규칙(항상 적용되는 것)은 docs/ 의 .md 문서에 작성한다. 분류와 기록 방법은 docs/guidelines.md 8장.
- docs/guidelines.md, docs/categories.md, docs/prompts.md 는 Cowork 프로젝트 문서(claude/01_기본지침.md, 04_카테고리.md, 02_프롬프트.md)와 같은 내용을 유지한다.
- 사이트 변경 기록은 CHANGELOG.md (A, B 분류만).
