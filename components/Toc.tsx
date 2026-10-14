"use client";

import { useEffect, useState, type MouseEvent } from "react";
import type { TocItem } from "@/lib/mdx";

const ACTIVE_OFFSET = 90; // 고정 헤더 높이 + 여유 (px)

// 접힌 섹션(details) 안에 있으면 펼친다.
function revealTarget(el: HTMLElement) {
  const details = el.closest("details");
  if (details && !details.open) details.open = true;
}

// 화면에 실제로 그려진 제목만 대상으로 한다. (접힌 섹션 안의 h3 제외)
function isRendered(el: HTMLElement) {
  return el.getClientRects().length > 0;
}

function useActiveId(ids: string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el || !isRendered(el)) continue;
        if (el.getBoundingClientRect().top <= ACTIVE_OFFSET) current = id;
        else break;
      }
      setActive(current ?? ids[0] ?? null);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("toggle", onScroll, true);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("toggle", onScroll, true);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids, enabled]);
  return active;
}

export function Toc({ items, variant }: { items: TocItem[]; variant: "aside" | "inline" }) {
  const ids = items.map((i) => i.id);
  const active = useActiveId(ids, variant === "aside");

  // 주소에 #id 가 붙어 들어왔는데 접힌 섹션 안이면 펼쳐서 보여준다.
  useEffect(() => {
    if (variant !== "aside") return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    const el = id ? document.getElementById(id) : null;
    if (el) {
      revealTarget(el);
      el.scrollIntoView({ block: "start" });
    }
  }, [variant]);

  const onClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    revealTarget(el);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${encodeURIComponent(id)}`);
  };

  const list = (
    <ol className="toc-list">
      {items.map((item) => (
        <li key={item.id} className={`toc-d${item.depth} ${active === item.id ? "toc-active" : ""}`}>
          <a href={`#${item.id}`} onClick={(e) => onClick(e, item.id)}>
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );

  if (variant === "inline") {
    return (
      <details className="toc-inline">
        <summary>
          목차 <span className="toc-count">{items.length}</span>
        </summary>
        {list}
      </details>
    );
  }

  return (
    <aside className="toc-aside" aria-label="목차">
      <div className="toc-sticky">
        <p className="toc-title">목차</p>
        {list}
      </div>
    </aside>
  );
}
