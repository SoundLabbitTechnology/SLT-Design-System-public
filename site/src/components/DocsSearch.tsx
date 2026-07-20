import { useEffect, useId, useRef, useState } from "react";

export interface DocsSearchProps {
  /** Astro `BASE_URL`（末尾スラッシュあり想定） */
  base: string;
}

declare global {
  interface Window {
    PagefindUI?: new (opts: {
      element: string | HTMLElement;
      showImages?: boolean;
      showSubResults?: boolean;
      resetStyles?: boolean;
      bundlePath?: string;
      translations?: Record<string, string>;
    }) => { destroy?: () => void };
  }
}

function bundlePathFor(base: string): string {
  const normalized = base.endsWith("/") ? base : `${base}/`;
  return `${normalized}pagefind/`;
}

function loadScript(src: string): Promise<void> {
  const existing = document.querySelector<HTMLScriptElement>(`script[data-pagefind-src="${src}"]`);
  if (existing) {
    return existing.dataset.loaded === "true"
      ? Promise.resolve()
      : new Promise((resolve, reject) => {
          existing.addEventListener("load", () => resolve(), { once: true });
          existing.addEventListener("error", () => reject(new Error("script failed")), {
            once: true,
          });
        });
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.pagefindSrc = src;
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        resolve();
      },
      { once: true },
    );
    script.addEventListener("error", () => reject(new Error("script failed")), { once: true });
    document.head.appendChild(script);
  });
}

function ensureStylesheet(href: string) {
  if (document.querySelector(`link[data-pagefind-ui]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.dataset.pagefindUi = "true";
  document.head.appendChild(link);
}

export default function DocsSearch({ base }: DocsSearchProps) {
  const reactId = useId();
  const elementId = `docs-pagefind-${reactId.replace(/:/g, "")}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    let ui: { destroy?: () => void } | undefined;

    async function mount() {
      const path = bundlePathFor(base);
      ensureStylesheet(`${path}pagefind-ui.css`);

      try {
        await loadScript(`${path}pagefind-ui.js`);
      } catch {
        if (!cancelled) setFailed(true);
        return;
      }

      if (cancelled || !containerRef.current || !window.PagefindUI) {
        if (!cancelled) setFailed(true);
        return;
      }

      containerRef.current.innerHTML = "";
      ui = new window.PagefindUI({
        element: containerRef.current,
        showImages: false,
        showSubResults: true,
        resetStyles: false,
        bundlePath: path,
        translations: {
          placeholder: "ドキュメントを検索…",
          clear_search: "クリア",
          load_more: "さらに表示",
          search_label: "サイト内検索",
          filters_label: "フィルタ",
          zero_results: "[SEARCH_TERM] に一致するページはありません",
          many_results: "[COUNT] 件の結果",
          one_result: "[COUNT] 件の結果",
          alt_search:
            "[SEARCH_TERM] の検索結果はありません。[DIFFERENT_TERM] の結果を表示しています",
          search_suggestion: "次の候補も試せます:",
          searching: "[SEARCH_TERM] を検索中…",
        },
      });
      if (!cancelled) setReady(true);

      const input = containerRef.current.querySelector("input");
      input?.focus();
    }

    void mount();

    return () => {
      cancelled = true;
      ui?.destroy?.();
    };
  }, [open, base]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="docs-search">
      <button
        type="button"
        className="docs-search__trigger"
        aria-expanded={open}
        aria-controls={elementId}
        onClick={() => {
          setFailed(false);
          setReady(false);
          setOpen((value) => !value);
        }}
      >
        検索
      </button>
      {open ? (
        <div
          className="docs-search__dialog"
          role="dialog"
          aria-modal="true"
          aria-label="サイト内検索"
          id={elementId}
        >
          <div className="docs-search__panel">
            <div className="docs-search__toolbar">
              <p className="docs-search__hint">ドキュメント内を検索します</p>
              <button type="button" className="docs-search__close" onClick={() => setOpen(false)}>
                閉じる
              </button>
            </div>
            {failed ? (
              <p className="docs-search__error">
                検索インデックスが見つかりません。`npm run docs:build` 後に再度お試しください。
              </p>
            ) : null}
            <div
              ref={containerRef}
              className="docs-search__pagefind"
              data-ready={ready ? "true" : "false"}
              hidden={failed}
            />
          </div>
          <button
            type="button"
            className="docs-search__backdrop"
            aria-label="検索を閉じる"
            onClick={() => setOpen(false)}
          />
        </div>
      ) : null}
    </div>
  );
}
