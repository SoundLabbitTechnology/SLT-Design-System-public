# Docs site (`site/`)

SLT Design System のドキュメント閲覧面（Astro）。  
**当面の運用はローカルのみ**です。固定の公開 URL は使いません。

| 項目 | 値 |
|------|-----|
| 運用 | `npm run docs:dev`（ローカル） |
| 公開デプロイ | **見送り**（再開時は #28 / 下記「公開を再開するとき」） |
| 技術 | Astro + MDX + React デモ |
| テーマ | `data-theme` / `data-color-mode`（DS トークン） |

## 正本との役割

| 内容 | 正本 | Site の役割 |
|------|------|-------------|
| L0 / L1 / L3〜L6 | [`docs/`](../docs/) | 直接 render |
| Component usage | `site/src/content/components/*.mdx` | demo と要約 |
| React API | [`src/`](../src/) | props 表へ要約 |
| Token values | 生成済み `dist/slt-tokens.json` | semantic / component のみ表示 |
| 情報設計 | [DOCUMENTATION](../docs/DOCUMENTATION.md) | nav と route へ反映 |

長文を site 固有ファイルへ複製せず、canonical Markdown を content collection から読み込みます。

## 起動と検証（ローカル運用）

リポジトリ root から:

```bash
npm run docs:dev       # build:all + Astro dev → http://localhost:4321
npm run docs:check     # docs contract + static build
npm run docs:build     # build:all + static build → site/dist/
npm run docs:preview   # site/dist を preview
```

日常の閲覧は **`docs:dev`** で十分です。`npm run ci` は package / Storybook / Docs 静的ビルドをまとめて検証します（デプロイは含みません）。

## ページ構成

| Route | 内容 / Source |
|-------|---------------|
| `/` | 対象読者と主要入口 |
| `/getting-started/` | install、theme、CSS、React、verification |
| `/principles/` | `docs/L0-principles.md` |
| `/foundations/*` | L1 Markdown + live token reference |
| `/components/*` | public component の demo / code / props / usage |
| `/guidelines/*` | L2 authoring、L3〜L6、contributing、releasing 等 |

ADR、consumer 固有 migration、監査 snapshot、roadmap は GitHub へリンクし、ガイド本文へ混在させません。

## 主要ファイル

| Path | 責務 |
|------|------|
| `src/lib/nav.ts` | sidebar と component / guideline 順序 |
| `src/lib/doc-routes.ts` | canonical Markdown と route の対応 |
| `src/content.config.ts` | content collections |
| `src/content/components/*.mdx` | component ごとの demo / usage summary |
| `remark-doc-links.mjs` | Markdown / MDX の内部リンクを base path / GitHub へ変換 |

`npm run check:docs` が component 実装、Storybook story、component MDX、nav の対応と local Markdown link を検証します。

## 環境変数（ローカルでは通常不要）

| Variable | 用途 | ローカル既定 |
|----------|------|--------------|
| `DOCS_SITE` | canonical origin | 未設定で可 |
| `DOCS_BASE` | サブパス配信の base | `/` |

## 公開を再開するとき

ワークフロー [`.github/workflows/docs-deploy.yml`](../.github/workflows/docs-deploy.yml) は **手動 `workflow_dispatch` のみ**残してあります（`main` push ではデプロイしません）。

再開手順の概要:

1. Issue #28 を再開または更新
2. リポジトリ Settings → Pages（Source: GitHub Actions）を確認
3. `docs-deploy.yml` に `push: branches: [main]` を戻すか、Actions から手動実行
4. 候補値例: `DOCS_SITE=https://soundlabbittechnology.github.io` / `DOCS_BASE=/SLT-Design-System-public/`
5. ルート README / ROADMAP に固定 URL を再掲
