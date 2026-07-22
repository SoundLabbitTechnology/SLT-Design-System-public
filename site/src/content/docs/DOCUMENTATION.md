# ドキュメント運用標準

Markdown、Docs site（[Public Pages](https://soundlabbittechnology.github.io/SLT-Design-System-public/) / ローカル `docs:dev`）、Storybook を一つの情報システムとして保守するための標準です。

## 役割分担

| 情報 | 正本 | 閲覧面 |
|------|------|--------|
| 原則・基盤・パターン・品質・運用 | `site/src/content/docs/` | Docs site |
| モーションクラフト | `site/src/content/docs/L1-foundations/motion-craft.md` | Docs site `/foundations/motion/` |
| React API・props・型 | `src/` | Storybook Autodocs + Docs site の要約 |
| 状態・操作・テーマ差・a11y | `*.stories.tsx` | Storybook（Private のみ） |
| トークン名と値 | semantic / component token files | Docs site のトークン表 |

同じ文章を複数面で全文管理しません。コンポーネントページは利用判断だけを要約し、API はコードへ追従させます。

## 変更時の同期表

| 変更 | 必ず更新 | 条件付きで更新 |
|------|----------|----------------|
| semantic token | L1 ガイド、CHANGELOG | Docs トークン表の説明、移行ガイド |
| component props / state | story、サイト component MDX、L2 索引 | L3 パターン、設計記録 |
| brand / mode | L0、L1、Theming MDX、切替 UI | 導入ガイド、監査 |
| Docs ルート | site nav、doc-routes、content collection | README、リダイレクト |
| 横断用語・locale 方針 | [L4 用語](./L4-terminology.md) | product glossary |
| breaking change | CHANGELOG、RELEASING、移行ガイド | 設計記録、消費者監査 |

## Docs site の基準

公開面: [Public GitHub Pages](https://soundlabbittechnology.github.io/SLT-Design-System-public/)（Public `main` push で自動デプロイ）。開発中は `npm run docs:dev`（[site/README.md](../site/README.md)）。

- 導入、基盤、全コンポーネント、パターン、コンテンツ、品質、運用へナビゲーションできる。
- すべてのコンポーネントに説明、デモ、最小コード、Props、Do/Don't または利用上の注意がある。
- サブパス配信（`DOCS_BASE=/SLT-Design-System-public/`）でも内部リンクとアセットが解決する。
- semantic / component トークンだけを表示し、非公開の内部値を露出しない。
- `npm run docs:build

## 文書の書き方

- 冒頭で文書の目的と正本を示す。
- 「現状」「必須」「将来」を混ぜず、将来項目は CHANGELOG へ寄せる。
- 数値やテスト件数など変動しやすい情報を本文へ固定しない。
- raw 値ではなく semantic token 名と用途を説明する。
- 相対リンクを使い、リンク先の責務が分かるラベルを付ける。
- 監査には日付を入れ、現行仕様と誤認されない注記を付ける。
- 公開リポ向け文書に事業戦略・PII・私有 URL を書かない。

### 読者ティアと語彙

| 面 | 例 | 語彙 |
|----|-----|------|
| 導入面 | `getting-started`、トップ、L0 冒頭 | 日本語優先。技術語は初出でやさしい言い方 →（用語）。[L4 用語](./L4-terminology.md#基盤運用用語) へリンク可 |
| 運用面 | L5、L6、CONTRIBUTING | 社内向け。G0〜G5 等は用語集へ誘導し、外部貢献を招く文言を書かない |

- 英単語だけの見出し（Version / Theme 等）は導入面では使わない。
- 「必須 / 任意 / 開発者向け」を同じ段落に混ぜない。開発者向けは末尾節か折りたたみに寄せる。
- 貢献は社内限定（[CONTRIBUTING](./CONTRIBUTING.md)）。Public Docs に外部 PR / Issue の招待を書かない。

## 検証

```bash
npm run docs:build
npm run docs:build

npm run docs:build
```

失敗した場合は生成物を直接直さず、正本を修正して同じコマンドを再実行します。
