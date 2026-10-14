import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { withBasePath } from "./site";
import { vizComponents } from "@/components/viz";

// MDX 는 HTML 주석(<!-- -->)을 지원하지 않는다.
// 글 작성 규칙의 <!-- TODO --> / <!-- 확인 필요 --> 표기를 그대로 쓸 수 있도록
// 코드 블록과 인라인 코드 밖의 HTML 주석만 MDX 주석({/* */})으로 바꾼다. (화면에는 표시되지 않음)
export function convertHtmlComments(source: string): string {
  const lines = source.split("\n");
  const out: string[] = [];
  let inFence = false;
  let fenceMarker = "";
  let buffer: string[] = [];

  const flush = () => {
    if (buffer.length === 0) return;
    const text = buffer.join("\n");
    // 인라인 코드(`...`)는 건드리지 않는다.
    const parts = text.split(/(`[^`\n]*`)/);
    const replaced = parts
      .map((part) =>
        part.startsWith("`")
          ? part
          : part.replace(/<!--([\s\S]*?)-->/g, (_m, inner: string) => `{/*${inner.replace(/\*\//g, "* /")}*/}`),
      )
      .join("");
    out.push(replaced);
    buffer = [];
  };

  for (const line of lines) {
    const fence = line.match(/^\s*(```+|~~~+)/);
    if (fence) {
      if (!inFence) {
        flush();
        inFence = true;
        fenceMarker = fence[1][0];
      } else if (fence[1][0] === fenceMarker) {
        inFence = false;
      }
      out.push(line);
      continue;
    }
    if (inFence) out.push(line);
    else buffer.push(line);
  }
  flush();
  return out.join("\n");
}

// 이 제목의 h2 섹션부터 글 끝까지, h2 섹션마다 접힌 아코디언(details)으로 감싼다. (docs/guidelines.md 5.3)
export const FOLD_FROM_HEADING = "면접으로 연결하기";

type MdNode = { type: string; depth?: number; value?: string; children?: MdNode[]; [key: string]: unknown };

function nodeText(node: MdNode): string {
  if (typeof node.value === "string") return node.value;
  return (node.children ?? []).map(nodeText).join("");
}

function remarkFoldSections() {
  return (tree: MdNode) => {
    const children = tree.children ?? [];
    const start = children.findIndex(
      (n) => n.type === "heading" && n.depth === 2 && nodeText(n).trim() === FOLD_FROM_HEADING,
    );
    if (start < 0) return;

    const before = children.slice(0, start);
    const folded: MdNode[] = [];
    let current: MdNode | null = null;
    for (const node of children.slice(start)) {
      if (node.type === "heading" && node.depth === 2) {
        current = {
          type: "mdxJsxFlowElement",
          name: "details",
          attributes: [{ type: "mdxJsxAttribute", name: "className", value: "fold" }],
          children: [{ type: "mdxJsxFlowElement", name: "summary", attributes: [], children: [node] }],
        };
        folded.push(current);
      } else if (current) {
        current.children!.push(node);
      }
    }
    tree.children = [...before, ...folded];
  };
}

// 목차: h2, h3 제목에 id 를 붙이고 목차 항목으로 모은다.
export type TocItem = { id: string; text: string; depth: 2 | 3 };

function slugify(text: string): string {
  const s = text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return s || "section";
}

function remarkHeadingIds(options: { toc: TocItem[] }) {
  return (tree: MdNode) => {
    const used = new Map<string, number>();
    const walk = (node: MdNode) => {
      if (node.type === "heading" && (node.depth === 2 || node.depth === 3)) {
        const text = nodeText(node).trim();
        const base = slugify(text);
        const n = used.get(base) ?? 0;
        used.set(base, n + 1);
        const id = n === 0 ? base : `${base}-${n + 1}`;
        const data = (node.data as { hProperties?: Record<string, unknown> } | undefined) ?? {};
        node.data = { ...data, hProperties: { ...(data.hProperties ?? {}), id } };
        options.toc.push({ id, text, depth: node.depth as 2 | 3 });
      }
      (node.children ?? []).forEach(walk);
    };
    walk(tree);
  };
}

// 표: 본문 너비에 맞춰 꽉 채우고, 열이 많아 넘치면 표 영역 안에서만 가로 스크롤
const tableComponents = {
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="table-wrap">
      <table {...props} />
    </div>
  ),
};

// 사이트 내부 링크와 이미지에 basePath 를 붙인다. (/images/posts/... 형태로 써도 동작)
const baseComponents = {
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => {
    if (href.startsWith("/")) return <Link href={href} {...props} />;
    const external = /^https?:\/\//.test(href);
    return <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...props} />;
  },
  img: ({ src, alt = "", ...props }: ComponentPropsWithoutRef<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={typeof src === "string" ? withBasePath(src) : src} alt={alt} loading="lazy" {...props} />
  ),
};

// 본문과 목차를 함께 만든다.
export async function renderMdx(source: string) {
  const toc: TocItem[] = [];
  const { default: Content } = await evaluate(convertHtmlComments(source), {
    ...runtime,
    remarkPlugins: [remarkGfm, [remarkHeadingIds, { toc }], remarkFoldSections],
  });
  const content = <Content components={{ ...baseComponents, ...tableComponents, ...vizComponents }} />;
  return { content, toc };
}
