# CLAUDE.md — 개인 기술블로그 (AEBONG-E/blog)

이 레포에서 작업하는 모든 세션(대화형 세션, 루틴)은 아래를 먼저 따른다.

## 작업 시작 전에 읽을 문서

1. `docs/guidelines.md` — 기본지침 (작성 규칙, frontmatter, 본문 템플릿, 권한, 변경 관리)
2. `docs/categories.md` — 대분류 순환 순서, 소분류 목록
3. 글 작성 작업이면 `docs/topic-history.md`, 프롬프트가 필요하면 `docs/prompts.md`

이 파일과 위 문서가 다르면 `docs/guidelines.md`를 우선한다.

## 보안·정보보호 규칙 (필수, 문서와 무관하게 항상 적용)

1. 토큰·키·비밀번호를 채팅이나 커밋에 넣지 않는다. 필요한 값은 GitHub Secrets / Cloudflare 환경변수에 본인이 직접 등록한다.
2. `.env`, `*.pem`, `*.key`, 인증 정보 파일은 커밋하지 않는다.
3. 회사 내부 정보 금지: 사내 코드, 시스템명, 내부 URL, 고객·매출 데이터, 장애 상세 내역은 글에 쓰지 않는다. 실무 경험은 일반화된 형태로만 작성한다.
4. 참고 자료의 원문을 대량 인용하지 않는다. 출처 링크와 내 말로 정리한 요약만 남긴다.
5. 보안 주제는 방어 관점만 다룬다. 공격 코드·우회 기법은 작성하지 않는다.

## 변경 범위 (docs/guidelines.md 3장)

- PR 없이 main에 직접 커밋 가능한 경로: `content/posts/`, `public/images/posts/`, `docs/topic-history.md`
- 그 외(컴포넌트, 설정, 워크플로, `public/admin/`, `docs/` 규칙 문서)는 PR로 올린다.
- `status: 완료`는 본인만 지정한다. 에이전트가 쓴 글은 항상 `status: 초안`.

## 커밋 전 점검

- `npm ci && npm run build` 가 통과해야 한다. (frontmatter의 category, subcategory, status가 정의에 없으면 빌드가 실패한다)
- 커밋 메시지 접두어: `post:`(글), `rule:`(규칙 문서), `feat:` `fix:` `chore:` `style:` (docs/guidelines.md 8.3)
- 출력(문서, 커밋 메시지, 코드 주석)에 이모지/유니코드 심볼을 쓰지 않는다. 허용: `[OK]` `[FAIL]` `[!]` `->` `=>`

## 응답 규칙

- 기본 언어: 한국어 (기술 용어는 영어 병기 가능)
- 작업 완료 시: 무엇을 했는지 한두 줄 + 본인이 할 일(있다면)
- 사실 / 추정 / 미확인을 구분해서 말한다.