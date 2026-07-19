// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

import { remarkDocLinks } from "./remark-doc-links.mjs";

// site/ は npm パッケージではなく monorepo 内のドキュメントサイトなので、
// DS 本体を npm 依存にはせず、公開エントリポイントへの Vite エイリアスで参照する。
// （npm ワークスペース経由で "@soundlabbit/design-system" を site の依存に置くと、
//   ルートパッケージ自身の名前と一致するため node_modules に自己参照シンボリックリンクが
//   でき、自己参照シンボリックリンクが無限ループを起こす — 実際に踏んだ地雷）
const ROOT = fileURLToPath(new URL("..", import.meta.url));

// 公開先は未定のため、site / base は環境変数で差し替え可能にしておく。
//   DOCS_BASE=/docs/ npm run docs:build
export default defineConfig({
  output: "static",
  site: process.env.DOCS_SITE,
  base: process.env.DOCS_BASE ?? "/",
  integrations: [react(), mdx()],
  markdown: {
    remarkPlugins: [remarkDocLinks],
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    },
  },
  vite: {
    resolve: {
      alias: {
        "@soundlabbit/design-system/css": path.join(ROOT, "dist/slt-tokens.css"),
        "@soundlabbit/design-system/components.css": path.join(ROOT, "styles/components.css"),
        "@soundlabbit/design-system/utilities.css": path.join(ROOT, "styles/utilities.css"),
        "@soundlabbit/design-system/tokens.json": path.join(ROOT, "dist/slt-tokens.json"),
        "@soundlabbit/design-system/ui": path.join(ROOT, "dist-ui/index.js"),
      },
    },
  },
});
