import path from "node:path";
import { fileURLToPath } from "node:url";

import { DOC_ROUTES, GITHUB_BASE } from "./src/lib/doc-routes.ts";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * docs/*.md 内の相対 Markdown リンクを書き換える remark プラグイン。
 * - DOC_ROUTES に載っているファイル → サイト内ルート（BASE_URL 付与）
 * - `/components/...` 等のサイト内絶対パス → BASE_URL 付与
 * - それ以外の repo 内ファイル（ADR 等） → GitHub blob URL
 * - 外部 URL / ページ内アンカーはそのまま
 */
export function remarkDocLinks() {
  const base = process.env.DOCS_BASE ?? "/";

  return (tree, file) => {
    const sourcePath = file?.path;
    if (!sourcePath) return;
    const sourceDir = path.dirname(sourcePath);

    visitLinks(tree, (node) => {
      const url = node.url;
      if (!url || /^[a-z]+:\/\//i.test(url) || url.startsWith("#") || url.startsWith("//")) {
        return;
      }

      if (url.startsWith("/")) {
        node.url = `${base.replace(/\/$/, "")}${url}`;
        return;
      }

      const [target, anchor] = url.split("#");
      if (!target) return;

      const isDir = target.endsWith("/");
      const absolute = path.resolve(sourceDir, target);
      const repoRelative = path.relative(REPO_ROOT, absolute).split(path.sep).join("/");
      const hash = anchor ? `#${anchor}` : "";

      const route = DOC_ROUTES[repoRelative];
      if (route) {
        node.url = `${base.replace(/\/$/, "")}${route}${hash}`;
      } else if (!repoRelative.startsWith("..")) {
        const kind = isDir ? "tree" : "blob";
        node.url = `${GITHUB_BASE}${kind}/main/${repoRelative}${hash}`;
      }
    });
  };
}

function visitLinks(node, callback) {
  if (node.type === "link") callback(node);
  if (node.children) {
    for (const child of node.children) visitLinks(child, callback);
  }
}
