import Link from "next/link";
import { getPostMetas, getSeriesMap } from "@/lib/posts";
import { CATEGORIES, STATUSES } from "@/lib/taxonomy";
import { PostGrid } from "@/components/PostCard";
import { StatusLabel } from "@/components/StatusLabel";

const RECENT_COUNT = 6;

export default function HomePage() {
  const posts = getPostMetas();
  const series = getSeriesMap();

  return (
    <>
      <section className="section">
        <h2 className="section-title">카테고리별 진행</h2>
        <div className="tile-grid">
          {CATEGORIES.map((c) => {
            const inCat = posts.filter((p) => p.category === c.id);
            const done = inCat.filter((p) => p.status === "완료").length;
            const ratio = inCat.length ? Math.round((done / inCat.length) * 100) : 0;
            return (
              <Link key={c.id} href={`/posts/?category=${c.id}`} className="tile">
                <span className="tile-name">{c.id}</span>
                <span className="tile-count">{inCat.length}</span>
                <span className="tile-bar" aria-hidden="true">
                  <span style={{ width: `${ratio}%` }} />
                </span>
                <span className="tile-sub">
                  완료 {done} / {inCat.length}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">상태별 현황</h2>
        <div className="status-row">
          {STATUSES.map((s) => (
            <Link key={s} href={`/posts/?status=${encodeURIComponent(s)}`}>
              <StatusLabel status={s} count={posts.filter((p) => p.status === s).length} />
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">최근 글</h2>
          <Link href="/posts/" className="more">
            전체 보기 -&gt;
          </Link>
        </div>
        <PostGrid posts={posts.slice(0, RECENT_COUNT)} emptyText="아직 작성된 글이 없습니다." />
      </section>

      {series.size > 0 && (
        <section className="section">
          <h2 className="section-title">시리즈</h2>
          <ul className="series-list">
            {[...series.entries()].map(([id, list]) => {
              const done = list.filter((p) => p.status === "완료").length;
              return (
                <li key={id}>
                  <Link href={`/series/${id}/`}>{id}</Link>
                  <span className="series-progress">
                    완료 {done} / {list.length}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
}
