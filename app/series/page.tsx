import type { Metadata } from "next";
import Link from "next/link";
import { getSeriesMap } from "@/lib/posts";

export const metadata: Metadata = { title: "시리즈", alternates: { canonical: "/series/" } };

export default function SeriesIndexPage() {
  const series = [...getSeriesMap().entries()];
  return (
    <section className="section">
      <h1 className="page-title">시리즈</h1>
      {series.length === 0 ? (
        <p className="empty">아직 시리즈가 없습니다.</p>
      ) : (
        <ul className="series-list">
          {series.map(([id, list]) => {
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
      )}
    </section>
  );
}
