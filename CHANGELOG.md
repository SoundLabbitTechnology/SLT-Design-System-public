# Changelog

## 0.4.6 — 2026-07-20

### Changed

- 配布ミラーとして README / Docs 運用文言を整理（Private 開発資産への誤リンクを除去）
- CONTRIBUTING / DOCUMENTATION / RELEASING / L6 governance を Public 向けに再構成
- getting-started の CSS 例を Tailwind `@layer` パターンに更新
- 自社アプリは `github:SoundLabbitTechnology/SLT-Design-System-public#v0.4.6` を標準参照とする

## 0.4.5 — 2026-07-10

### Added

- Storybook **Samples / Landing Canvas** — 本番統合前の判断用一枚もの LP（6 ストーリー + Smoke play、製品配布外）
- Sound Laboratory 公式コピー正本 — `stories/samples/sound-laboratory-home-content.ts`、`SoundLaboratoryHome.tsx`
- `src/lib/brand-labels.ts` — ブランド正式表示名（`BRAND_DISPLAY_NAMES`）
- [audits/sample-landing-review-2026-07-09.md](docs/audits/sample-landing-review-2026-07-09.md) — キャンバス網羅レビュー
- [audits/sound-laboratory-breakdown-2026-07-09.md](docs/audits/sound-laboratory-breakdown-2026-07-09.md) — 公式サイト ↔ DS トークン差分
- [audits/storybook-signoff-2026-07-10.md](docs/audits/storybook-signoff-2026-07-10.md) — Landing Canvas / SiteHeader 目視サインオフ

### Changed

- `semantic.sound-laboratory.{light,dark}` — coral 主導から **gold/クリーム基調**（公式 sound-laboratory.org 準拠）
- `SiteHeader` — `variant: marketing`（全幅ブラー、右寄せ nav、下線アクティブ）
- Landing Canvas: ブランド別コピー、Sound Lab 公式構成、container 統一、CTA 階層
- Storybook: `stories/**/*.stories` を main に追加、Grid visibility 既定 OFF

### Fixed

- `GridBackground` — Chromium で横線が消える問題（background-size 分離）
- 問い合わせフォーム — Card 内収まり、タイトル/ラベル左端揃え
- `SiteHeader` ストーリー — ロゴ「Sound Labbit」省略表記を正式名に修正
- `Input` / `Textarea` — `box-sizing: border-box`（Card 内幅 100% のはみ出し防止）

## 0.4.4 — 2026-07-09

### Added

- L0 ハイブリッド二層構成 — MVV/Core Values 由来の恒常原則（A-1〜A-4）+ v1.0 戦略原則（B-1〜B-3 + 参考 A/B）— [L0-principles.md](docs/L0-principles.md)
- L0 ハイブリッド二層構成の導入記録（恒常原則 A + 戦略原則 B）。戦略正本は以降 private companion に移管

### Changed

- L3 — 恒常原則のパターン適用例（人間承認フロー = A-4）
- L4 / L2 guides — B-3（ナラティブ課金）の禁止パターンを明示
- L6 四半期原則ループ — 戦略原則の反証チェック項目

### Fixed

- Storybook / テーマ overlay: `button.*` 等 Tier 3 トークンが `[data-theme]` 切替に追従（#21）
- ダーク semantic の `feedback.*-surface` を alpha 15% に統一
- `BrandBackground` / `GridBackground`: Storybook decorator の `data-theme` を正しく読取
- ダーク Grid 線のコントラスト（`color.grid.*-dark` → alpha トークン）

## 0.4.3 — 2026-07-09

### Added

- P2 `Skeleton` — rect / text / circle + `SkeletonCard` / `SkeletonList`
- P2 `Table` — compound API + `DataTable`（ソート・行選択・全選択）
- G3: Table キーボードソート / 選択 play テスト
- `design-tokens/components.json` に `skeleton.*` / `table.*`
- `docs/ROADMAP.md`, `docs/L2-components/README.md`

### Changed

- 全ドキュメントを P0〜P2 完了状態に同期（README / docs 索引 / Storybook MDX / AGENTS / CLAUDE / llms.txt）

## 0.4.2 — 2026-07-09

### Added

- P1 `Toast` — Radix Toast + `ToastProvider` / `useToast`、5 トーン + G3 キーボード dismiss
- P1 `SiteHeader` — スロット API（logo / nav / actions）、モバイルドロワー
- [ADR-002](docs/decisions/ADR-002-site-header-slots.md) — SiteHeader 設計決定
- `design-tokens/components.json` に `toast.*` / `site-header.*`

## 0.4.1 — 2026-07-09

### Added

- P1 `WaveBackground` — トークン CSS 変数ベースの palette（`ai-dash` / `sound-laboratory` / `slt-corporate`）
- P0 DoD: [guides.md](docs/L2-components/guides.md), [figma-props-mapping.md](docs/L2-components/figma-props-mapping.md)
- [ADR-001](docs/decisions/ADR-001-coral-brand-colors.md) — coral 正式値（判断待ち）
- [docs/adoption/](docs/adoption/) — AI-Dash / Homepages 導入手順
- Storybook キーボードフォーカス play テスト（Button / Input）

### Changed

- G1: `styles/utilities.css` をトークン参照に全面移行（hex 除去）
- `dist-ui` に `"use client"` バナー（Next.js 互換）
- AI-Dash / Homepages: DS `WaveBackground` + tokens import（Phase 1 置換）

## 0.4.0 — 2026-07-09

### Added

- DS ハーネス: `npm run check` / `check:fast`（G0〜G3 + isotc）
- `scripts/harness/` — gate-g0-tokens, gate-g1-no-raw-values, generate-token-types, metrics
- `isotc-cli` + `.spec/constitution.toml`（DS 向けレイヤー憲法）
- G2: `src/types/semantic-tokens.d.ts` 自動生成 + `tsc` 接続
- G3: P0 Storybook vitest（30 tests）+ a11y strict（vitest 時）
- [docs/L6-harness-and-loops.md](docs/L6-harness-and-loops.md), [docs/ROADMAP.md](docs/ROADMAP.md)
- P0 ストーリー拡充: disabled / error / loading 状態（Textarea, Dialog, Card, Badge）
- Dialog: `confirmLoading` / `confirmDisabled` props

### Changed

- `npm run ci` → `npm run check` + `build-storybook`
- CI: Playwright chromium + ハーネス統合
- `lint:tokens` → G0 ゲートへ委譲
- semantic light JSON 3 件に `color.interactive.*` を追加（G0 キー一致）
- `vitest` / `@vitest/*` を 4.1.9 にピン（npm registry 互換）

## 0.3.0 — 2026-07-09

### Added

- P0 React コンポーネント 6 種: Button, Input, Textarea, Card, Dialog, Badge
- `@soundlabbit/design-system/ui` エクスポート（`dist-ui/`）
- `styles/components.css` — トークン参照コンポーネントスタイル
- Storybook 10（ブランド × モード切替、a11y アドオン）
- Radix UI Dialog（フォーカストラップ内包）

### Changed

- `npm run ci` に `build:ui` と `build-storybook` を追加
- [docs/L2-components/dod.md](docs/L2-components/dod.md) に React / Storybook 手順を追記

## 0.2.0 — 2026-07-09

### Added

- DTCG format `design-tokens/` (primitives + semantic×6 + components)
- Light/dark dual mode for `ai-dash` and `sound-laboratory`
- Build pipeline `scripts/build-dtcg.mjs` → `dist/{brand}/{mode}/tokens.css`
- Token lint `scripts/lint-tokens.mjs` (raw hex ban in semantic/components)
- 7-layer documentation (L0–L6) under `docs/`
- AI readability: `CLAUDE.md`, `llms.txt`, `AGENTS.md`
- Style Dictionary v4 as devDependency

### Changed

- `npm run build` now uses DTCG pipeline (legacy: `npm run build:legacy`)
- `tokens/*.json` marked deprecated (kept for migration reference)
- Docs reorganized into layer-based structure

### Notes

- Sound Laboratory `color.coral.*` in `primitives.json` are **placeholder values**
- Swap `primitives.json` → `color.coral` section only when brand colors are finalized

## 0.1.0 — 2026-07-09

### Added

- Initial design token sources: `tokens/foundation.json`, `semantic.json`, `brand.json`
- Build script `scripts/build-tokens.mjs` → `dist/slt-tokens.{css,ts,json}`
- Shared utilities: `styles/utilities.css` (glass-card, glow, scrollbar, a11y)
- Docs: brand guide, colors, typography, components inventory, product audit template
- CI workflow for token build verification
