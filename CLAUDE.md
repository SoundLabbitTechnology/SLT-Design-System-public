# SLT Design System — AI Agent Rules

**Version**: v0.4.5

このリポジトリで UI を生成・編集する AI エージェント向けの必須ルール。

## 変更後の必須手順（L1 ループ）

1. 変更中は `npm run check:fast`、handoff 前は `npm run check` を実行する
2. exit code 2 の場合、出力された `Fix:` 行を読み自己修正する
3. green になるまで繰り返す（G4 Chromatic は L1 に含まない — CI / `npm run check:g4`）

詳細: [docs/L6-harness-and-loops.md](./docs/L6-harness-and-loops.md) / [.spec/constitution.toml](./.spec/constitution.toml)

## トークン参照（最重要）

1. **色・余白・角丸・タイポグラフィは semantic / component トークンのみ使用する**
2. **raw hex（`#0F172A`）や raw px（`16px`）のハードコードを禁止**
3. CSS では `var(--color-surface-primary)` 等の生成変数を使用
4. Tailwind では `@theme` 経由の `bg-surface-primary` 等を使用

## 参照可能なファイル

| 参照可 | パス |
|--------|------|
| ✅ | `design-tokens/semantic.*.json` |
| ✅ | `design-tokens/components.json` |
| ✅ | `src/components/` / `dist-ui/`（`@soundlabbit/design-system/ui`） |
| ✅ | `styles/components.css` |
| ✅ | `docs/L0-principles.md` 〜 `docs/L6-governance.md`、`docs/L1-foundations/motion-craft.md` |

| ✅ | `docs/reference/emilkowalski-skills/`（モーションクラフト原本） |

| ❌ | `design-tokens/primitives.json`（リポには含まれるが **AI は読まない**。値の直書き禁止） |
| ❌ | `tokens/`（非推奨・旧形式） |

## ブランド適用

```html
<html data-theme="ai-dash" data-color-mode="dark">
<html data-theme="sound-laboratory" data-color-mode="light">
<html data-theme="admin" data-color-mode="light">
```

- `data-color-mode` 未指定: プロダクトブランドは `dark`、`admin` は `light`
- トークン名はブランド・モード間で同一。値のみ差し替わる

## コンポーネントルール

- React では `import { Button, Input, ... } from '@soundlabbit/design-system/ui'` を優先
- `components.css` をプロジェクトに import すること
- `button.danger` は**必ずキャンセルボタンと併置**
- タップターゲット最小 44px（`button.min-height` / `input.min-height`）
- フォーカスリング必須（`focus.ring-width`）
- 破壊的操作には確認ダイアログ
- モーションは [docs/L1-foundations/motion-craft.md](./docs/L1-foundations/motion-craft.md)（トークン対応）。原本は [docs/reference/emilkowalski-skills/](./docs/reference/emilkowalski-skills/README.md)

### 利用可能コンポーネント（v0.4.5）

| Tier | 名前 |
|------|------|
| P0 | Button, Input, Textarea, Card, Dialog, Badge, Checkbox, Radio, Select, Switch, Heading, Divider, NoticeBlock |
| P1 | BrandBackground, WaveBackground, GridBackground, Toast (+ ToastProvider), SiteHeader, Breadcrumb, Tabs, Accordion, Disclosure, List, DescriptionList, Blockquote, Chip, PageNavigation, StepNavigation, ProgressIndicator, SearchBox |
| P2 | Skeleton (+ SkeletonCard/List), Table (+ DataTable), ScrollTopButton, UtilityLink, HamburgerMenuButton, Drawer, FileUpload, TableOfContents, ResourceList, Image, HorizontalMenu, MenuList, BottomNavigation, MobileMenu |

一覧: [docs/L2-components/README.md](./docs/L2-components/README.md)

## 禁止事項

- `design-tokens/primitives.json` を読んで値をコピーする／UI コードへ直書きする（ファイルはビルド用に同梱。参照層は semantic / component のみ）
- Tailwind v4 `@theme` に `--spacing-*` を追加（`max-w-md` 等と衝突）
- ブランドごとに異なるトークン名を invent する（既存の semantic 名を使う）

## ビルド

トークン JSON を編集したら:

```bash
npm run build
npm run check:fast
```

フル検証（Storybook a11y + docs contract 含む）:

```bash
npm run check
```

静的ビルド検証:

```bash
npm run storybook:check
npm run docs:check
```

ドキュメントサイト（ローカル）:

```bash
npm run docs:dev
```

## 詳細

- [llms.txt](./llms.txt) — 機械可読サマリ
- [site/README.md](./site/README.md) — Astro docs サイト
- [docs/README.md](./docs/README.md) — ドキュメント索引
- [docs/L6-governance.md](./docs/L6-governance.md) — ガバナンス・AI 可読性標準
- [docs/ROADMAP.md](./docs/ROADMAP.md) — ロードマップ
