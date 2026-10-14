import type { MetadataRoute } from "next";
import { BASE_PATH, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// 참고: {username}.github.io 저장소가 아닌 경우 robots.txt 는 하위 경로에 생성되어 검색엔진이 읽지 않는다.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: `${BASE_PATH}/admin/` },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
