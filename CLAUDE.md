# SLT Design System — AI Agent Rules

**Version**: v0.4.5

このリポジトリで UI を生成・編集する AI エージェント向けの必須ルール。

公開ドキュメントの閲覧面は **Astro Docs site（`site/`）**。Markdown 正本は `site/src/content/docs/`（DOC_ROUTES）と `site/src/content/components/`。設計・プロセスの長文執筆は Private。

## 変更後の必須手順（L1 ループ）

1. 変更中は `npm run check:fast`、handoff 前は `npm run check` を実行する
2. exit code 2 の場合、出力された `Fix:` 行を読み自己修正する
3. green になるまで繰り返す（G4 Chromatic は L1 に含まない — CI / `npm run check:g4`）

詳細: Docs site `/guidelines/harness/`（`npm run docs:dev`） / [.spec/constitution.toml](./.spec/constitution.toml)

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
| ✅ | Docs site: `site/src/content/docs/` + `site/src/content/components/` |
| ✅ | `.cursor/skills/`（モーション等のエージェント用スキル） |
| ❌ | `design-tokens/primitives.json`（ビルド用に同梱。AI は値を使わない） |
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
- モーションは Docs site `/foundations/motion/`。深掘りは `.cursor/skills/`

一覧・利用判断: Docs site `/components/`（`npm run docs:dev`）または Storybook。

## 禁止事項

- `design-tokens/primitives.json` を読んで値をコピーする／UI コードへ直書きする
- Tailwind v4 `@theme` に `--spacing-*` を追加（`max-w-md` 等と衝突）
- ブランドごとに異なるトークン名を invent する
- スタンドアロンの `docs/` ツリーを復活させる（公開 Markdown は `site/src/content/docs/`）

## ビルド

```bash
npm run build && npm run check:fast # トークン編集後
npm run check # handoff 前
npm run docs:dev # Docs site（ローカル）
```

## 詳細

- [site/README.md](./site/README.md) — Docs site
- Docs site `/guidelines/harness/` — ハーネス
- [llms.txt](./llms.txt) — 極短サマリ
