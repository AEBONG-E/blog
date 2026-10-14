import type { Metadata } from "next";
import { Suspense } from "react";
import { getPostMetas } from "@/lib/posts";
import { PostFilter } from "@/components/PostFilter";
import { PostGrid } from "@/components/PostCard";

export const metadata: Metadata = { title: "글 목록", alternates: { canonical: "/posts/" } };

export default function PostsPage() {
  const posts = getPostMetas();
  return (
    <section className="section">
      {/* JS 가 실행되기 전(또는 비활성)에는 전체 목록을 보여준다 */}
      <Suspense
        fallback={
          <>
            <h1 className="page-title">전체 글</h1>
            <PostGrid posts={posts} />
          </>
        }
      >
        <PostFilter posts={posts} />
      </Suspense>
    </section>
  );
}
