import type { MetadataRoute } from "next";
import { getPostMetas, getSeriesMap } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPostMetas();
  return [
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/posts/` },
    { url: `${SITE_URL}/series/` },
    ...posts.map((p) => ({ url: `${SITE_URL}/posts/${p.slug}/`, lastModified: p.updated })),
    ...[...getSeriesMap().keys()].map((id) => ({ url: `${SITE_URL}/series/${id}/` })),
  ];
}
