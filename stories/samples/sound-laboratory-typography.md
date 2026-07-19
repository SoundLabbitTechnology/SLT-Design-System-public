# Sound Laboratory — テキスト役割マップ（Landing Canvas）

| 項目 | 内容 |
|------|------|
| 正本コピー | [`sound-laboratory-home-content.ts`](./sound-laboratory-home-content.ts) |
| 本番参照 | [sound-laboratory.org](https://sound-laboratory.org/) |
| DS トークン | [`docs/L1-foundations/typography.md`](../../docs/L1-foundations/typography.md) |

Storybook **Samples → Landing Canvas → Sound Laboratory** で使うテキスト階層と CSS クラスの対応表。

## 役割一覧

| 役割 | 用途（本番） | CSS クラス | フォント | サイズ | 色 | ウェイト |
|------|-------------|-----------|----------|--------|-----|----------|
| **Display** | ヒーロー上のブランド名 | `.slt-sample-typo--display` | `--font-family-display` | `--font-size-2xl` | `--color-text-brand` | 700 |
| **Hero** | ヒーロー H1（キャッチ） | `.slt-sample-typo--hero` | `--font-family-display` | `clamp(1.75rem, 4vw, 2.75rem)` | `--color-text-primary` | 700 |
| **Lede** | ヒーローリード文 | `.slt-sample-typo--lede` | `--font-family-jp` | `--font-size-lg` | `--color-text-secondary` | 400 |
| **Eyebrow** | SectionCard 英字ラベル | `.slt-sample-typo--eyebrow` | `--font-family-en` | `--font-size-sm` | `--color-text-brand` | 600 |
| **Section title** | セクション H2 | `.slt-sample-typo--section-title` | `--font-family-jp` | `clamp(1.5rem, 3vw, 2.25rem)` | `--color-text-primary` | 800 |
| **Section lede** | セクション導入文 | `.slt-sample-typo--section-lede` | `--font-family-jp` | `--font-size-md` | `--color-text-secondary` | 400 |
| **Subsection** | SNS 見出し H3 等 | `.slt-sample-typo--subsection` | `--font-family-jp` | `--font-size-xl` | `--color-text-primary` | 700 |
| **Card title** | カード見出し | `.slt-sample-typo--card-title` | `--font-family-jp` | `--font-size-lg` | `--color-text-primary` | 700 |
| **Card body** | カード本文・説明 | `.slt-sample-typo--card-body` | `--font-family-jp` | `--font-size-md` | `--color-text-secondary` | 400 |
| **Caption** | カテゴリ・日付行 | `.slt-sample-typo--caption` | `--font-family-en` | `--font-size-sm` | `--color-text-secondary` | 500 |
| **Mono label** | SYSTEM ONLINE | `.slt-sample-typo--mono` | `--font-family-mono` | `--font-size-xs` | `--color-feedback-success` | 500 |
| **FAQ question** | 質問見出し | `.slt-sample-typo--faq-q` | `--font-family-jp` | `--font-size-lg` | `--color-text-primary` | 700 |
| **Footer** | フッター・法務 | `.slt-sample-typo--footer` | `--font-family-jp` | `--font-size-sm` | `--color-text-secondary` | 400 |

## ページ内の配置

```
[SiteHeader]     logo = Display 相当（テキストロゴ）
[Hero]
  .display       Sound Laboratory
  .hero          音楽とテクノロジーの力で…
  .lede          感性と論理を掛け合わせ…
  CTA            Button primary / secondary（文言は content.ts）

[SectionCard ×4]
  .eyebrow       NEW CONTENT / SOCIAL MEDIA / MEDIA / PROJECTS
  .section-title 新着コンテンツ / 公式SNS / …
  .section-lede  各セクション導入（content.ts）
  .mono          SYSTEM ONLINE（右上）

  新着           .card-title + .caption（category · date）
  SNS / Media    .card-title + .card-body
  Projects       .card-title + .caption（subtitle）+ .card-body

[FAQ]
  .eyebrow       FAQ
  .section-title よくある質問
  .faq-q + .card-body

[Footer]
  .footer        連絡先・運営・著作権
```

## 使い分けルール

1. **見出しは階層を飛ばさない** — Hero (h1) → Section (h2) → Card (h3/h4)
2. **英字ラベルは Eyebrow** — 全大文字・letter-spacing は CSS 側で統一
3. **和文本文は `--font-family-jp`** — Display はブランド・ヒーローのみ
4. **色は semantic のみ** — `text.brand` / `primary` / `secondary`（raw hex 禁止）
5. **コピー変更は `sound-laboratory-home-content.ts` のみ** — TSX にハードコードしない

## DS 判断用セクションとの分離

| ストーリー | 表示 |
|-----------|------|
| Sound Laboratory / Marketing | 上記公式コピーのみ（パーツ一覧・スウォッチは非表示） |
| AI-DASH / Admin 等 | 従来の判断用コピー（`sample-landing-content.ts`） |
