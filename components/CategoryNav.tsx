"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { CATEGORIES, getCategory, isCategory, isSubcategory } from "@/lib/taxonomy";

export type NavData = {
  postIndex: Record<string, [string, string]>; // slug -> [category, subcategory]
  categoryCount: Record<string, number>;
  subCount: Record<string, number>; // "category|subcategory" -> count
};

function postsHref(category?: string, sub?: string) {
  const q = new URLSearchParams();
  if (category) q.set("category", category);
  if (sub) q.set("sub", sub);
  const qs = q.toString();
  return qs ? `/posts/?${qs}` : "/posts/";
}

type Params = { get(name: string): string | null } | null;

function getSelection(data: NavData, pathname: string, params: Params) {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/posts") {
    const c = params?.get("category") ?? null;
    const s = params?.get("sub") ?? null;
    const category = isCategory(c) ? c : null;
    const sub = category && isSubcategory(category, s) ? s : null;
    return { onPosts: true, category, sub };
  }
  const m = path.match(/^\/posts\/([^/]+)$/);
  if (m && data.postIndex[m[1]]) {
    const [category, sub] = data.postIndex[m[1]];
    return { onPosts: false, category, sub: sub || null };
  }
  return { onPosts: false, category: null, sub: null };
}

// 쿼리를 읽는 버전 (Suspense 안에서 사용)
export function CategoryNav({ data }: { data: NavData }) {
  const pathname = usePathname();
  const params = useSearchParams();
  return <CategoryNavView data={data} selection={getSelection(data, pathname, params)} />;
}

// 정적 HTML 단계(Suspense fallback)용: 쿼리 없이 경로만으로 선택 상태를 정한다.
export function CategoryNavFallback({ data }: { data: NavData }) {
  const pathname = usePathname();
  return <CategoryNavView data={data} selection={getSelection(data, pathname, null)} />;
}

function CategoryNavView({
  data,
  selection,
}: {
  data: NavData;
  selection: { onPosts: boolean; category: string | null; sub: string | null };
}) {
  const { onPosts, category, sub } = selection;
  const current = category ? getCategory(category) : undefined;
  const rootRef = useRef<HTMLDivElement>(null);

  // 모바일에서 선택된 항목이 화면 밖에 있으면 가로 스크롤을 옮겨 보이게 한다.
  useEffect(() => {
    rootRef.current?.querySelectorAll<HTMLElement>(".scroll-row").forEach((row) => {
      const active = row.querySelector<HTMLElement>("a.on");
      if (!active || row.scrollWidth <= row.clientWidth) return;
      row.scrollLeft = active.offsetLeft - (row.clientWidth - active.offsetWidth) / 2;
    });
  }, [category, sub]);

  return (
    <div className="cat-nav" ref={rootRef}>
      <nav className="cat-main" aria-label="대분류">
        <div className="scroll-row">
          <Link href="/posts/" className={onPosts && !category ? "on" : ""}>
            전체
          </Link>
          {CATEGORIES.map((c) => (
            <Link key={c.id} href={postsHref(c.id)} className={category === c.id ? "on" : ""}>
              {c.short}
            </Link>
          ))}
          <Link href="/series/" className="mobile-only">
            시리즈
          </Link>
        </div>
      </nav>
      {current && (
        <nav className="cat-sub" aria-label={`${current.short} 소분류`}>
          <div className="scroll-row">
            <Link href={postsHref(current.id)} className={!sub ? "on" : ""}>
              전체<span className="n">{data.categoryCount[current.id] ?? 0}</span>
            </Link>
            {current.subs.map((s) => (
              <Link key={s} href={postsHref(current.id, s)} className={sub === s ? "on" : ""}>
                {s}
                <span className="n">{data.subCount[`${current.id}|${s}`] ?? 0}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
