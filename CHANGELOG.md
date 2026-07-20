# Changelog

## Unreleased

### Changed

- Docs に **Pagefind サイト内検索**、導入面の平易化、[L4 用語](docs/L4-terminology.md) に基盤・運用用語を追加
- 貢献を **社内限定**に明文化（CONTRIBUTING / L6 / Public Issues オフ）。[SECURITY.md](SECURITY.md) を追加
- Public export: 機微スキャン強化、devDependencies 縮小、Dependabot / CODEOWNERS、CI `permissions: contents: read`

## 0.4.6 — 2026-07-20

### Changed

- Docs を **Private 実験場 / Public ミラー**の二リポ運用に再編（DUAL_REPO（Private）、`npm run check:public-export`）。戦略は `（社内戦略・非公開）` に戻し、site には恒常原則のみ
- Docs site を Public ミラーの **GitHub Pages** で公開（`main` push 自動デプロイ）。URL: https://soundlabbittechnology.github.io/SLT-Design-System-public/（#28）

### Added

- G5 consumer harness — [Runbook](（社内 adoption）)、`templates/consumer-g5/`（Lighthouse CI + E2E smoke checklist）、L6 cadence / ownership（#37）
- DADS（デジタル庁デザインシステム）参照モデル追従の方針・ギャップ分析 — [ADR-003](docs/decisions/ADR-003-dads-alignment.md) / [dads-alignment-audit-2026-07-16.md](（社内監査）)
- semantic token カテゴリ `space`（xs〜2xl）/ `shape`（radius-sm〜full）/ `elevation`（raised / overlay / modal）— 全 6 semantic ファイルに追加、primitives の薄いラッパーとして公開
- `color.text.link-hover` — 全 6 semantic ファイルに追加
- `color.blue.400` / `color.gold.700` / `color.gold.800` primitives — コントラスト 4.5:1 棚卸しで検出した未達リンク色の是正用
- [コントラスト 4.5:1 棚卸し監査](（社内監査）) — 全 6 semantic ファイル × text/surface 60 ペアを実測、2 件の未達を是正
- L1 基盤にアイコン配置原則・レイアウト原則（DADS 基本デザイン準拠）を追記
- `Checkbox` component（P0）— DADS「チェックボックス」に対応。DADS コンポーネント拡充 wave 1 #32 着手分
- Docs site デプロイ workflow（`.github/workflows/docs-deploy.yml`）— Public ミラーで `main` push → GitHub Pages（#28）
- [ADR-004](docs/decisions/ADR-004-laws-of-ux.md) — Laws of UX を UX 参照モデルとする。L0 / L3 に原則対応表を追加
- Laws of UX P1 適用 — `.slt-field-stack`（Proximity）、Primary 1 ビュー 1 つ（DoD / guides）、Doherty &lt;400ms 方針（L3 / motion）
- `SiteHeader`: sticky full-bleed + 内側バー（高さ 64px・左右ガターのみ）。本文揃えは `contentMaxWidth` + `--site-header-padding-x`
- Input: `readOnly` 見た目、`layout="horizontal"`（DADS Readonly / ラベル横並び）
- Table / DataTable: `striped`、セル結合作例（`colSpan` / `rowSpan`）
- ドキュメント契約ゲート — local link、canonical docs、version、component / Storybook / Docs site / nav の同期を検証
- L1 spacing / motion、L4 terminology、contributing、releasing、documentation operations の正本
- Storybook Accessibility ガイドと `GridBackground` の専用 stories
- Docs site の guideline index、保守者向けページ、canonical metadata
- L3 metrics 週次運用 — `--since` / `--base` / `--save`、`metrics/thresholds.json`、`metrics/history/`、3× override テンプレ、L6 Runbook（#4）
- `Breadcrumb`（P1）— DADS パンくずリスト。`wrap` / `scroll`、aria-current、component tokens（#33 wave 2 着手）
- `Tabs`（P1）— `Tabs` / `TabList` / `Tab` / `TabPanel`、矢印キー、horizontal / vertical（#33）
- `Accordion` / `Disclosure`（P1）— DADS の開閉区別。Accordion は同種連続、Disclosure は `details` による補足（#33）
- `List` / `DescriptionList` / `Blockquote` / `Chip`（P1）— 箇条書き（項番は地テキスト）、説明リスト、引用、チップタグ（#33）
- `PageNavigation` / `StepNavigation` / `ProgressIndicator` / `SearchBox`（P1）— wave 2 完了（#33）
- DADS wave 3 需要優先バッチ（P2）— `ScrollTopButton` / `UtilityLink` / `HamburgerMenuButton` / `Drawer` / `FileUpload` / `TableOfContents` / `ResourceList` / `Image`（#34）
- wave 3 続: `HorizontalMenu` / `MenuList` / `BottomNavigation` / `MobileMenu`（#34）

### Changed

- `design-tokens/components.json` — `radius.*` / `space.*` / `shadow.*`（primitives 直接参照）を `shape.radius-*` / `space.*` / `elevation.*`（semantic 参照）に是正。ヘッダー注記「semantic層のみを参照する」との不整合を解消
- ルート README と L0〜L6 文書を読者 task と正本責務に沿って再編
- `npm run check` に docs contract、`npm run ci` に Docs site static build を追加
- Storybook / Docs site / Markdown の役割分担と Docs 完了条件を明文化
- L3 metrics を diff-only の token compliance signal に変更

## 0.4.5 — 2026-07-10

### Added

- Storybook **Samples / Landing Canvas** — 本番統合前の判断用一枚もの LP（6 ストーリー + Smoke play、製品配布外）
- Sound Laboratory 公式コピー正本 — `stories/samples/sound-laboratory-home-content.ts`、`SoundLaboratoryHome.tsx`
- `src/lib/brand-labels.ts` — ブランド正式表示名（`BRAND_DISPLAY_NAMES`）
- [audits/sample-landing-review-2026-07-09.md](（社内監査）) — キャンバス網羅レビュー
- [audits/sound-laboratory-breakdown-2026-07-09.md](（社内監査）) — 公式サイト ↔ DS トークン差分
- [audits/storybook-signoff-2026-07-10.md](（社内監査）) — Landing Canvas / SiteHeader 目視サインオフ

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
- `CHANGELOG`, `docs/L2-components/README.md`

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
- [（社内 adoption）](（社内 adoption）) — AI-Dash / Homepages 導入手順
- Storybook キーボードフォーカス play テスト（Button / Input）

### Changed

- G1: `styles/utilities.css` をトークン参照に全面移行（hex 除去）
- `dist-ui` に `"use client"` バナー（Next.js 互換）
- AI-Dash / Homepages: DS `WaveBackground` + tokens import（Phase 1 置換）

## 0.4.0 — 2026-07-09

### Added

- DS ハーネス: `npm run check` / `check:fast`（G0〜G3 + isotc）
- `（Private harness）` — gate-g0-tokens, gate-g1-no-raw-values, generate-token-types, metrics
- `isotc-cli` + `.spec/constitution.toml`（DS 向けレイヤー憲法）
- G2: `src/types/semantic-tokens.d.ts` 自動生成 + `tsc` 接続
- G3: P0 Storybook vitest（30 tests）+ a11y strict（vitest 時）
- [docs/L6-harness-and-loops.md](docs/L6-harness-and-loops.md), [CHANGELOG](CHANGELOG)
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
