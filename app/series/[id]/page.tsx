import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSeriesMap } from "@/lib/posts";
import { StatusLabel } from "@/components/StatusLabel";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  const ids = [...getSeriesMap().keys()];
  // output: 'export' 는 빈 배열이면 빌드 오류가 나므로 시리즈가 없을 때 자리표시 경로 하나를 만든다.
  return ids.length > 0 ? ids.map((id) => ({ id })) : [{ id: "_none" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: `시리즈 ${id}`, alternates: { canonical: `/series/${id}/` } };
}

export default async function SeriesPage({ params }: Props) {
  const { id } = await params;
  const list = getSeriesMap().get(id);
  if (!list) notFound();

  const done = list.filter((p) => p.status === "완료").length;
  const ratio = Math.round((done / list.length) * 100);

  return (
    <section className="section">
      <h1 className="page-title">시리즈: {id}</h1>
      <div className="series-meter">
        <span className="tile-bar" aria-hidden="true">
          <span style={{ width: `${ratio}%` }} />
        </span>
        <span className="series-progress">
          완료 {done} / {list.length}
        </span>
      </div>
      <ol className="series-toc">
        {list.map((p) => (
          <li key={p.slug}>
            <StatusLabel status={p.status} />
            <Link href={`/posts/${p.slug}/`}>{p.title}</Link>
            <span className="post-card-meta">{p.date}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
