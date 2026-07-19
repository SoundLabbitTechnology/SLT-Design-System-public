# SLT Design Tokens

Sound Labbit Technology の DTCG token source です。利用者向けの概念とコード例は Docs site のトークンガイド（`npm run docs:dev` → `/foundations/tokens/`）を正とします。

## 公開レイヤー

| Source | 役割 | UI / Docs site |
|--------|------|----------------|
| `semantic.{brand}.{mode}.json` | theme 間で共有する用途語彙 | 参照可 |
| `components.json` | component 固有の決定 | component 実装で参照可 |
| `primitives.json` | build 用の生 scale（alias 解決の正本） | **リポ同梱・ビルド可**。UI / Docs site は値を直接参照しない |

`primitives.json` はビルド再現性のために本ミラーへ含めます。機密分類ではなく、**ハードコード防止のための参照境界**です。

## Theme matrix

| Theme | Mode | 既定 |
|-------|------|------|
| `ai-dash` | light / dark | dark |
| `sound-laboratory` | light / dark | dark |
| `slt-corporate` | dark | dark |
| `admin` | light | light |

すべての対応 theme / mode で semantic key を一致させ、値だけを差し替えます。

## 変更手順

1. [L0 原則](../site/src/content/docs/L0-principles.md)と利用例を確認する。
2. 既存 semantic / component token で意図を表せないか確認する。
3. 用途ベースの名前、全 theme mapping、description を追加する。
4. `npm run build`（必要なら `npm run build:all`）を実行する。

`primitives.json` の変更が必要な場合は owner がレビューします。

## 生成物

| Output | 用途 |
|--------|------|
| `dist/{brand}/{mode}/tokens.css` | 単一 theme import |
| `dist/slt-tokens.css` | 全 theme bundle |
| `dist/slt-tokens.ts` / `.json` | TypeScript / tool integration |
| `src/types/semantic-tokens.d.ts` | token key type |

Figma Variants ↔ React props の対応は `design-tokens/figma-manifest.json` と component 実装を正とします。

## 検証

- ビルド: `npm run build:all`
- Docs: `npm run docs:build`
- 変更管理: [L6 ガバナンス](../site/src/content/docs/L6-governance.md)
- release: [RELEASING](../site/src/content/docs/RELEASING.md)
