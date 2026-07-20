# ドキュメント運用標準

Markdown、Docs site（[Public Pages](https://soundlabbittechnology.github.io/SLT-Design-System-public/) / ローカル `docs:dev`）、Storybook を一つの情報システムとして保守するための標準です。

## 役割分担

| 情報 | 正本 | 閲覧面 |
|------|------|--------|
| 原則・基盤・パターン・品質・技術運用（**public-bound**） | Private の `site/src/content/docs/` | Docs site（Private: `site/src/content/docs/` を render / Public: `site/src/content/docs/`） |
| 企業戦略・製品移行詳細・監査・PII（**private**） | `（社内戦略・非公開）`、`site/src/content/docs/adoption/`（製品ログ）、`site/src/content/docs/audits/` | Private GitHub のみ（Public・Docs ナビ非掲載） |
| モーションクラフト（外部原本） | `site/src/content/docs/L1-foundations/motion-craft.md` + `site/src/content/docs/reference/emilkowalski-skills/` | Docs site `/foundations/motion/`、Cursor `.cursor/skills/` |
| React API・props・型 | `src/` | Storybook Autodocs + Docs site の要約 |
| 状態・操作・テーマ差・a11y | `*.stories.tsx` | Storybook（Private のみ） |
| トークン名と値 | semantic / component token files | Docs site のトークン表 |
| 設計判断 | `site/src/content/docs/decisions/` | Private GitHub（必要に応じ Docs site からリンク） |
| 時点監査（技術） | `site/src/content/docs/audits/` | Private GitHub |

同じ文章を複数面で全文管理しません。Private の Docs site は `site/src/content/docs/` を直接読み込み、Public へ出すときだけ `site/src/content/docs/` に変換します。コンポーネントページは利用判断だけを要約し、API はコードへ追従させます。

## 公開と内部の境界

本リポジトリは **Private 開発正本**です。Public 配布ミラー（`SLT-Design-System-public`）へ許可ツリーをスナップショット移行します（二リポ運用（Private 正本））。

| Visibility | Private 正本 | Public 反映先 |
|------------|--------------|---------------|
| **public-bound** | `site/src/content/docs/`（L0、L1、L3〜L6、CONTRIBUTING、RELEASING 等） | `site/src/content/docs/`（export 時に変換） |
| **public-bound** | `site/src/content/components/*.mdx`、`site/src/pages/getting-started.astro` | そのまま（導入例は Public tag） |
| **private-lab** | `（社内戦略・非公開）`、製品 adoption 詳細、audits、DUAL_REPO | 移行しない |
| **private-lab** | Storybook、harness、metrics、エージェント長文 | 移行しない |

自社 consumer（AI-Dash、Homepages 等）は **Public tag** を参照します（public-consumer-install.md（社内 adoption））。Private リポ URL を依存にしない。

### Docs site に載せない（必須）

- `（社内戦略・非公開）`（`DOC_ROUTES` / content collection 禁止）
- semantic 以外の primitive 生値

### Public ミラーに載せない（必須）

- 上記に加え、個人メール・GCP・NotebookLM 私有 URL・未公開製品一覧を含むファイル
- ルート `site/src/content/docs/`（Public は `site/src/content/docs/` のみ）
- 移行コマンド: `npm run check:public-export`

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
| Docs ルート | site nav、doc-routes、content collection | README、リダイレクト |
| 横断用語・locale 方針 | [L4 用語](./L4-terminology.md)、ADR-005（Private ADR） | product glossary、#39 |
| breaking change | CHANGELOG、RELEASING、移行ガイド | ADR、消費者監査 |

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
