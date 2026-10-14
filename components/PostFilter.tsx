"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { STATUSES, getCategory, isCategory, isStatus, isSubcategory } from "@/lib/taxonomy";
import type { PostMeta } from "@/lib/posts";
import { PostGrid } from "./PostCard";
import { StatusLabel } from "./StatusLabel";

// 글 목록. 대분류/소분류는 상단 메뉴 바(?category=, ?sub=)에서, 상태는 이 화면의 필터(?status=)에서 고른다.
// 선택 값은 URL 쿼리에 남아 링크로 공유할 수 있다.
export function PostFilter({ posts }: { posts: PostMeta[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const categoryParam = params.get("category");
  const category = isCategory(categoryParam) ? categoryParam : null;
  const subParam = params.get("sub");
  const sub = category && isSubcategory(category, subParam) ? subParam : null;
  const statusParam = params.get("status");
  const status = isStatus(statusParam) ? statusParam : null;

  const setStatus = (value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set("status", value);
    else next.delete("status");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  // 상태 개수는 현재 대분류/소분류 범위 안에서 센다.
  const scoped = posts.filter((p) => (!category || p.category === category) && (!sub || p.subcategory === sub));
  const filtered = scoped.filter((p) => !status || p.status === status);

  const title = category ? [getCategory(category)?.short, sub].filter(Boolean).join(" / ") : "전체 글";

  return (
    <>
      <h1 className="page-title">{title}</h1>
      <div className="filter-row" role="group" aria-label="상태 필터">
        <span className="filter-title">상태</span>
        <button className={`chip ${!status ? "chip-on" : ""}`} onClick={() => setStatus(null)}>
          전체
        </button>
        {STATUSES.map((s) => (
          <button
            key={s}
            className={`chip chip-status ${status === s ? "chip-on" : ""}`}
            onClick={() => setStatus(status === s ? null : s)}
          >
            <StatusLabel status={s} count={scoped.filter((p) => p.status === s).length} />
          </button>
        ))}
      </div>
      <p className="result-count">{filtered.length}편</p>
      <PostGrid posts={filtered} />
    </>
  );
}
