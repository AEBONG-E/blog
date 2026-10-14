import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, getSeriesMap } from "@/lib/posts";
import { categoryName } from "@/lib/taxonomy";
import { cmsEditPath } from "@/lib/site";
import { renderMdx } from "@/lib/mdx";
import { Toc } from "@/components/Toc";
import { StatusLabel } from "@/components/StatusLabel";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = getAllPosts().map((p) => ({ slug: p.slug }));
  // output: 'export' 는 빈 배열이면 빌드 오류가 나므로 글이 없을 때 자리표시 경로 하나를 만든다.
  return slugs.length > 0 ? slugs : [{ slug: "_none" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/posts/${post.slug}/` },
    openGraph: { type: "article", title: post.title, description: post.summary, url: `/posts/${post.slug}/` },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const seriesPosts = post.series ? getSeriesMap().get(post.series) ?? [] : [];
  const idx = seriesPosts.findIndex((p) => p.slug === post.slug);
  const prev = idx > 0 ? seriesPosts[idx - 1] : undefined;
  const next = idx >= 0 && idx < seriesPosts.length - 1 ? seriesPosts[idx + 1] : undefined;
  const { content, toc } = await renderMdx(post.body);

  return (
    <article className="post">
      <header className="post-header">
        <div className="post-meta-top">
          <StatusLabel status={post.status} />
          <Link href={`/posts/?category=${post.category}`} className="post-category">
            {categoryName(post.category)}
          </Link>
          {post.series && (
            <Link href={`/series/${post.series}/`} className="post-series">
              시리즈 {post.series}
              {post.seriesOrder ? ` #${post.seriesOrder}` : ""}
            </Link>
          )}
        </div>
        <h1 className="post-title">{post.title}</h1>
        <p className="post-summary">{post.summary}</p>
        <p className="post-dates">
          작성 {post.date}
          {post.updated !== post.date ? ` . 수정 ${post.updated}` : ""}
          {post.readingTime ? ` . ${post.readingTime}분` : ""}
        </p>
        {post.tags.length > 0 && (
          <ul className="tag-list">
            {post.tags.map((t) => (
              <li key={t}>#{t}</li>
            ))}
          </ul>
        )}
      </header>

      {/* 좁은 화면: 본문 위 접이식 목차 */}
      {toc.length > 1 && <Toc items={toc} variant="inline" />}

      <div className="prose">{content}</div>

      {seriesPosts.length > 1 && (
        <nav className="series-nav" aria-label="시리즈 이동">
          {prev ? (
            <Link href={`/posts/${prev.slug}/`}>&lt;- {prev.title}</Link>
          ) : (
            <span />
          )}
          {next ? <Link href={`/posts/${next.slug}/`}>{next.title} -&gt;</Link> : <span />}
        </nav>
      )}

      <footer className="post-footer">
        <a href={cmsEditPath(post.slug)} className="edit-link" rel="nofollow">
          수정
        </a>
      </footer>

      {/* 넓은 화면: 본문 오른쪽에 스크롤을 따라오는 목차 */}
      {toc.length > 1 && <Toc items={toc} variant="aside" />}
    </article>
  );
}
