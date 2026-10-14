import Link from "next/link";
import { Suspense } from "react";
import { siteConfig } from "@/lib/site";
import { getPostMetas } from "@/lib/posts";
import { CategoryNav, CategoryNavFallback, type NavData } from "./CategoryNav";

// 줄1: 문구(가운데, 상단 고정) / 줄2: 대분류 메뉴 / 줄3: 선택한 대분류의 소분류 메뉴
export function SiteHeader() {
  const posts = getPostMetas();
  const data: NavData = {
    postIndex: Object.fromEntries(posts.map((p) => [p.slug, [p.category, p.subcategory ?? ""]])),
    categoryCount: {},
    subCount: {},
  };
  for (const p of posts) {
    data.categoryCount[p.category] = (data.categoryCount[p.category] ?? 0) + 1;
    if (p.subcategory) {
      const key = `${p.category}|${p.subcategory}`;
      data.subCount[key] = (data.subCount[key] ?? 0) + 1;
    }
  }

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="motto">
            {siteConfig.motto}
          </Link>
          <nav className="site-links" aria-label="바로가기">
            <Link href="/posts/">전체 글</Link>
            <Link href="/series/">시리즈</Link>
          </nav>
        </div>
      </header>
      {/* 선택 상태는 주소(쿼리)를 읽어 정하므로 클라이언트에서 그린다. 그 전에는 선택 없이 대분류 줄만 보인다. */}
      <Suspense fallback={<CategoryNavFallback data={data} />}>
        <CategoryNav data={data} />
      </Suspense>
    </>
  );
}
