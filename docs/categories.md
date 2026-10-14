# 카테고리 정의 — 개인 기술블로그

> 아티클 주제 선정의 기준 문서. 대분류 순서대로 하루 1편씩 순환한다.
> 대분류·소분류 추가는 요청 시 이 문서에 반영하고 하단 변경 이력에 기록한다.

---

## 대분류 (순환 순서)

| 순서 | 대분류 | category 값 |
|---|---|---|
| 1 | Programming Language | `language` |
| 2 | DB | `database` |
| 3 | Framework / Runtime | `framework` |
| 4 | CS (Network / OS / Web / 자료구조 / 알고리즘 / 컴퓨터 구조) | `cs` |
| 5 | 아키텍처 / 설계 | `architecture` |
| 6 | 인프라 / DevOps | `devops` |
| 7 | 데이터 엔지니어링 (빅데이터) | `data` |
| 8 | 보안 | `security` |
| 9 | 도메인 기본지식 | `domain` |

---

## 1. Programming Language

| 소분류 | 예시 주제 |
|---|---|
| 언어 공통 개념 | 컴파일 vs 인터프리터, 정적/동적 타입, 메모리 관리, 동시성 모델 |
| C / C++ | 포인터, 메모리 할당, RAII, 스마트 포인터 |
| Java / Kotlin | JVM, GC, 컬렉션, 제네릭, 스트림, 코루틴 |
| C# | CLR, LINQ, async/await, 값/참조 타입 |
| Python | GIL, 제너레이터, 데코레이터 |
| JavaScript / TypeScript | 이벤트 루프, 클로저, 프로토타입, 타입 시스템 |
| PHP | 실행 모델, Composer |
| Go / Dart | 고루틴, Isolate |

## 2. DB

| 소분류 | 예시 주제 |
|---|---|
| DB 기본 개념 | DBMS 구조, 데이터 모델, 키, 무결성 |
| RDBMS | MySQL, PostgreSQL, Oracle, MSSQL 특징 비교 |
| SQL | JOIN, 서브쿼리, 윈도우 함수 |
| 설계 | 정규화, ERD, 반정규화 |
| 성능 | 인덱스, 실행 계획, 쿼리 튜닝 |
| 트랜잭션·동시성 | ACID, 격리 수준, 락 |
| NoSQL | Redis, MongoDB, Elasticsearch, CAP 정리 |
| 운영 | 복제, 샤딩, 백업·복구 |

## 3. Framework / Runtime

| 소분류 | 예시 주제 |
|---|---|
| Spring / Spring Boot | IoC, AOP, @Transactional, Security |
| ORM | JPA/Hibernate, MyBatis, EF Core |
| .NET | ASP.NET Core, 미들웨어, DI |
| Node.js | Express, NestJS, 비동기 I/O |
| Python 웹 | Django, FastAPI |
| PHP 웹 | Laravel |
| 프론트엔드 | React, Next.js, Vue |
| 모바일 | Flutter |

## 4. CS

| 소분류 | 예시 주제 |
|---|---|
| Network | OSI 7계층, TCP/UDP, DNS, 로드밸런싱 |
| OS | 프로세스/스레드, 스케줄링, 메모리, 데드락 |
| Web | HTTP, 쿠키/세션, CORS, 브라우저 렌더링, REST |
| 자료구조 | 배열, 리스트, 해시, 트리, 그래프 |
| 알고리즘 | 정렬, 탐색, DP, 시간 복잡도 |
| 컴퓨터 구조 | CPU, 캐시, 메모리 계층 |

## 5. 아키텍처 / 설계

| 소분류 | 예시 주제 |
|---|---|
| 객체지향 | SOLID, 캡슐화, 상속 vs 조합 |
| 디자인 패턴 | 전략, 팩토리, 싱글톤, 옵저버, 프록시 |
| 애플리케이션 구조 | 계층형, 헥사고날, 클린 아키텍처 |
| 도메인 주도 설계 | 엔티티, 값 객체, 애그리거트 |
| 분산 시스템 | MSA vs 모놀리스, API Gateway, 서비스 간 통신 |
| 메시징 | Kafka, RabbitMQ, 이벤트 기반 아키텍처 |
| 캐싱 | 캐시 전략, 캐시 무효화, Redis 활용 |
| API 설계 | REST 설계 원칙, 버전 관리, GraphQL 개요 |
| 테스트 | 단위·통합 테스트, TDD, 테스트 더블 |

## 6. 인프라 / DevOps

| 소분류 | 예시 주제 |
|---|---|
| Linux | 프로세스 관리, 파일 권한, 쉘, 로그 확인 |
| 컨테이너 | Docker 이미지·레이어, Docker Compose |
| 오케스트레이션 | Kubernetes 기본 (Pod, Service, Deployment) |
| CI/CD | GitHub Actions, Jenkins, 배포 전략 (Blue-Green, Canary) |
| 클라우드 | AWS / Azure 핵심 서비스, IaaS·PaaS·SaaS |
| 웹 서버 | Nginx, Apache, IIS, 리버스 프록시 |
| 모니터링 | 로그 수집, 메트릭, APM, 알림 |
| 형상 관리 | Git 브랜치 전략, rebase vs merge |

## 7. 데이터 엔지니어링 (빅데이터)

> DB가 "데이터를 저장·조회하는 시스템"이라면, 데이터 엔지니어링은 "데이터를 모으고, 옮기고, 가공해서 분석할 수 있게 만드는 흐름"을 다룬다.

| 소분류 | 예시 주제 |
|---|---|
| 기본 개념 | 빅데이터 3V/5V, OLTP vs OLAP, 배치 vs 스트리밍 |
| 데이터 파이프라인 | ETL vs ELT, CDC(변경 데이터 캡처), 워크플로 오케스트레이션(Airflow) |
| 분산 처리 | Hadoop(HDFS, MapReduce), Spark, 파티셔닝 |
| 스트리밍 처리 | Kafka, Flink, Spark Streaming, 이벤트 시간 vs 처리 시간 |
| 저장 구조 | 데이터 웨어하우스, 데이터 레이크, 레이크하우스 |
| 파일 포맷 | 행 기반 vs 열 기반, Parquet, ORC, Avro |
| 데이터 모델링 | 스타 스키마, 스노우플레이크 스키마, 팩트·차원 테이블 |
| 클라우드 데이터 플랫폼 | BigQuery, Snowflake, Redshift, Databricks 개요 |
| 데이터 품질·거버넌스 | 데이터 검증, 리니지, 메타데이터 관리, 개인정보 비식별화 |

## 8. 보안

| 소분류 | 예시 주제 |
|---|---|
| 웹 보안 | OWASP Top 10, XSS, CSRF, SQL Injection 방어 |
| 인증·인가 | 세션, JWT, OAuth2, SSO |
| 암호화 | 대칭/비대칭, 해시, TLS |
| 시큐어 코딩 | 입력 검증, 비밀 정보 관리 |
| 인프라 보안 | 방화벽, WAF, 접근 제어 |

> 방어 관점의 개념 정리만 다룬다. 공격 코드·우회 기법은 작성하지 않는다.

## 9. 도메인 기본지식

| 소분류 | 예시 주제 |
|---|---|
| 이커머스 | 주문, 장바구니, 재고, 프로모션 |
| 결제·정산 | PG 연동 흐름, 멱등성, 정산 구조 |
| 회원 | 회원 등급, 포인트, 탈퇴·휴면 처리 |
| 글로벌 서비스 | 다국어, 다통화, 타임존 |
| 법규·컴플라이언스 | 개인정보보호법, GDPR 기본 |

> 일반 개념으로만 작성한다. 사내 시스템·정책·데이터는 포함하지 않는다.

---

## 운영 규칙

- 대분류는 위 순서대로 하루 1개씩 순환한다 (9일 = 1바퀴).
- 소분류는 대분류 안에서 아직 다루지 않은 것을 우선 선택한다.
- 작성한 주제는 작성 이력에 기록해 중복을 막는다.
- 대분류·소분류 추가 요청 시 이 문서를 수정하고 변경 이력에 남긴다.
- 글 frontmatter의 `subcategory` 값은 위 표의 소분류 이름을 그대로 쓴다 (예: `Network`, `Java / Kotlin`).
- 대분류·소분류를 바꾸면 사이트 코드 `lib/taxonomy.ts`도 함께 수정한다 (기본지침 8.4).

## 변경 이력

| 날짜 | 변경 내용 | 이유 |
|---|---|---|
| 2026-10-13 | 최초 정의 (대분류 8개) | 사용자 요청 |
| 2026-10-13 | 9번 대분류 "데이터 엔지니어링 (빅데이터)" 추가, 순환 8일 → 9일 | 사용자 요청 (DB와 구분되는 영역) |
| 2026-10-13 | 데이터 엔지니어링을 7번(인프라/DevOps 다음)으로 이동, 보안 7→8, 도메인 기본지식 8→9 | 사용자 요청 |
| 2026-10-14 | 운영 규칙에 subcategory 표기 규칙과 lib/taxonomy.ts 동시 수정 규칙 추가 | 기본지침 5.2 subcategory 필드 추가, 8장 변경 관리 |
