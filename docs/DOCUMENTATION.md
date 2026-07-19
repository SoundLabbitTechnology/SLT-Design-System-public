# ドキュメント運用標準

Markdown、Docs site（当面はローカル）、Storybook を一つの情報システムとして保守するための標準です。

## 役割分担

| 情報 | 正本 | 閲覧面 |
|------|------|--------|
| 原則・基盤・パターン・品質・技術運用（**public**） | `docs/` | Docs site（`npm run docs:dev`） |
| 企業戦略・製品移行・PII（**private**） | 社内 companion（本ミラー外） | 社内 GitHub のみ |
| モーションクラフト（外部原本） | `docs/L1-foundations/motion-craft.md` + `docs/reference/emilkowalski-skills/` | Docs site `/foundations/motion/`、Cursor `.cursor/skills/` |
| React API・props・型 | `src/` | Storybook Autodocs + Docs site の要約 |
| 状態・操作・テーマ差・a11y | `*.stories.tsx` | Storybook |
| トークン名と値 | semantic / component token files | Docs site のトークン表 |
| 設計判断 | `docs/decisions/` | GitHub（必要に応じ Docs site からリンク） |

同じ文章を複数面で全文管理しません。Docs site の Markdown ページは `docs/` を直接読み込み、コンポーネントページは利用判断だけを要約し、API はコードへ追従させます。

## 公開と内部の境界

本リポジトリは **Public ミラー**です（[MIRROR](./MIRROR.md)）。機微な試作・戦略文書は社内リポ側に置き、ここには載せません。

| Visibility | 定義 | 例 |
|------------|------|-----|
| **public** | Docs site / 本ミラーに載せてよい | [L0-principles](./L0-principles.md)（恒常原則）、L1〜L5、技術 L6 |
| **private** | 社内のみ。本ミラー・Docs site に載せない | 事業戦略、製品移行ログ、PII、私有 URL |

### Docs site に載せない（必須）

- 社内戦略メモ（`DOC_ROUTES` / content collection 禁止）
- primitive 生値の一覧表示（Docs site は semantic / component のみ）

### 本ミラーに載せない（必須）

- 個人メール・GCP・NotebookLM 等の私有 URL
- 未公開製品の具体名や社内専用リポジトリ名
- 社内 issue tracker への直リンク（番号参照は可、URL は付けない）

## 読者別の完了条件

| 読者 | 答えられるべき問い |
|------|--------------------|
| 導入者 | 何をインストールし、どの CSS と属性が必要か |
| 実装者 | どの部品・トークン・パターンを使うか |
| デザイナー | ブランド差、状態、禁止パターンは何か |
| レビュアー | 何を自動化し、何を人間が判断するか |
| 保守者 | 変更、非推奨、公開、ロールバックをどう行うか |
| AI エージェント | 読める正本、禁止ファイル、実行すべきゲートは何か |

## 変更時の同期表

| 変更 | 必ず更新 | 条件付きで更新 |
|------|----------|----------------|
| semantic token | L1 ガイド、CHANGELOG | Docs トークン表の説明、移行ガイド |
| component props / state | story、サイト component MDX、L2 索引 | L3 パターン、ADR |
| brand / mode | L0、L1、Theming MDX、切替 UI | 導入ガイド、監査 |
| harness command / gate | package scripts、L6 harness、AI 向けルール | CI、CONTRIBUTING |
| Docs ルート | site nav、doc-routes、content collection | README、リダイレクト |
| 横断用語・locale 方針 | [L4 用語](./L4-terminology.md)、[ADR-005](./decisions/ADR-005-i18n-locale-architecture.md) | product glossary、#39 |
| breaking change | CHANGELOG、RELEASING、移行ガイド | ADR、消費者監査 |
| 公開／private 境界 | [MIRROR](./MIRROR.md)、本節 | gate-docs |

## Docs site の基準

当面はローカル運用（固定のインターネット公開 URL は使わない。再開手順は [site/README.md](../site/README.md)）。

- 導入、基盤、全コンポーネント、パターン、コンテンツ、品質、運用へナビゲーションできる。
- すべてのコンポーネントに説明、デモ、最小コード、Props、Do/Don't または利用上の注意がある。
- サブパス配信でも内部リンクとアセットが解決する（将来の公開再開に備える）。
- semantic / component トークンだけを表示し、primitive 生値の一覧は出さない。
- `npm run docs:check` と CI の静的ビルドが通る（デプロイは含まない）。

## Storybook の基準

- `src/components/` の全公開コンポーネントに CSF ストーリーがある。
- 主要状態、キーボード操作、テーマ差、reduced motion を必要に応じて確認できる。
- Introduction / Theming / Accessibility が入口として機能する。
- P0 と判断用 Canvas は Chromatic 対象、その他はリスクに応じて追加する。
- Storybook は製品ページの代替にせず、サンプルは配布 API と明確に分離する。

## 文書の書き方

- 冒頭で文書の目的と正本を示す。
- 「現状」「必須」「将来」を混ぜず、将来項目は ROADMAP へ寄せる。
- 数値やテスト件数など変動しやすい情報を本文へ固定しない。
- raw 値ではなく semantic token 名と用途を説明する。
- 相対リンクを使い、リンク先の責務が分かるラベルを付ける。
- 監査には日付を入れ、現行仕様と誤認されない注記を付ける。
- 公開文書に事業戦略・PII・私有 URL・社内リポ名を書かない。

## 検証

```bash
npm run check:docs  # リンク、必須文書、component/story/site 対応
npm run docs:check  # 上記 + Docs site 静的ビルド
npm run storybook:check # G3 + Storybook 静的ビルド
npm run ci          # リポジトリ全体のリリース前検証
```

失敗した場合は生成物を直接直さず、正本を修正して同じコマンドを再実行します。
