import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { isCategory, isStatus, isSubcategory, type CategoryId, type Status } from "./taxonomy";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  title: string;
  slug: string;
  category: CategoryId;
  subcategory?: string; // 선택. docs/categories.md 의 소분류 이름
  series?: string;
  seriesOrder?: number;
  date: string; // YYYY-MM-DD
  updated: string; // YYYY-MM-DD
  status: Status;
  tags: string[];
  summary: string;
  readingTime?: number;
};

export type Post = PostMeta & { body: string };

// YAML 이 날짜를 Date 객체로 읽는 경우가 있어 문자열로 통일한다.
function toDateString(v: unknown, file: string, field: string): string {
  if (v instanceof Date && !Number.isNaN(v.getTime())) return v.toISOString().slice(0, 10);
  if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}/.test(v)) return v.slice(0, 10);
  throw new Error(`[posts] ${file}: '${field}' 는 YYYY-MM-DD 형식이어야 합니다.`);
}

function parseFile(fileName: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  const fileSlug = fileName.replace(/\.mdx$/, "");

  const required = ["title", "slug", "category", "date", "status", "summary"];
  for (const key of required) {
    if (data[key] === undefined || data[key] === null || data[key] === "") {
      throw new Error(`[posts] ${fileName}: 필수 필드 '${key}' 가 없습니다.`);
    }
  }
  if (String(data.slug) !== fileSlug) {
    throw new Error(`[posts] ${fileName}: slug('${data.slug}')가 파일 이름과 다릅니다.`);
  }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(fileSlug)) {
    throw new Error(`[posts] ${fileName}: slug 는 영문 소문자, 숫자, 하이픈만 사용합니다.`);
  }
  if (!isCategory(data.category)) {
    throw new Error(`[posts] ${fileName}: 알 수 없는 category '${data.category}'`);
  }
  if (!isStatus(data.status)) {
    throw new Error(`[posts] ${fileName}: 알 수 없는 status '${data.status}'`);
  }

  if (data.subcategory !== undefined && data.subcategory !== null && data.subcategory !== "") {
    if (!isSubcategory(data.category, data.subcategory)) {
      throw new Error(`[posts] ${fileName}: '${data.category}' 에 없는 subcategory '${data.subcategory}'`);
    }
  }

  const date = toDateString(data.date, fileName, "date");
  const updated = data.updated ? toDateString(data.updated, fileName, "updated") : date;

  return {
    title: String(data.title),
    slug: fileSlug,
    category: data.category,
    subcategory: data.subcategory ? String(data.subcategory) : undefined,
    series: data.series ? String(data.series) : undefined,
    seriesOrder: typeof data.seriesOrder === "number" ? data.seriesOrder : undefined,
    date,
    updated,
    status: data.status,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    summary: String(data.summary),
    readingTime: typeof data.readingTime === "number" ? data.readingTime : undefined,
    body: content,
  };
}

let cache: Post[] | null = null;

// 전체 글 (최신 날짜 순)
export function getAllPosts(): Post[] {
  if (cache) return cache;
  if (!fs.existsSync(POSTS_DIR)) return (cache = []);
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  cache = files
    .map(parseFile)
    .sort((a, b) => (a.date === b.date ? a.slug.localeCompare(b.slug) : b.date.localeCompare(a.date)));
  return cache;
}

export function getPostMetas(): PostMeta[] {
  return getAllPosts().map(({ body: _body, ...meta }) => meta);
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

// 시리즈 id -> 글 목록 (seriesOrder 순)
export function getSeriesMap(): Map<string, PostMeta[]> {
  const map = new Map<string, PostMeta[]>();
  for (const p of getPostMetas()) {
    if (!p.series) continue;
    const list = map.get(p.series) ?? [];
    list.push(p);
    map.set(p.series, list);
  }
  for (const list of map.values()) {
    list.sort((a, b) => (a.seriesOrder ?? 9999) - (b.seriesOrder ?? 9999) || a.date.localeCompare(b.date));
  }
  return map;
}
