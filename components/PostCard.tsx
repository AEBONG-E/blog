import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { StatusLabel } from "./StatusLabel";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="post-card">
      <StatusLabel status={post.status} />
      <h3 className="post-card-title">
        <Link href={`/posts/${post.slug}/`}>{post.title}</Link>
      </h3>
      <p className="post-card-summary">{post.summary}</p>
      <p className="post-card-meta">
        {post.category} . {post.date}
        {post.readingTime ? ` . ${post.readingTime}분` : ""}
      </p>
    </article>
  );
}

export function PostGrid({ posts, emptyText = "조건에 맞는 글이 없습니다." }: { posts: PostMeta[]; emptyText?: string }) {
  if (posts.length === 0) return <p className="empty">{emptyText}</p>;
  return (
    <div className="post-grid">
      {posts.map((p) => (
        <PostCard key={p.slug} post={p} />
      ))}
    </div>
  );
}
