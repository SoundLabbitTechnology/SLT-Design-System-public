# L1. タイポグラフィ

正本: semantic `typography.*` token と生成済み CSS

判断の上位: [L0 明瞭さは装飾に優先する](../L0-principles.md#a-デザイン恒常原則core-values-の-ui-翻訳)

## 役割ベースのタイプスケール

| Token | 用途 |
|-------|------|
| `typography.display` | ヒーローなど限定的な最上位表現 |
| `typography.heading-1` | ページ見出し |
| `typography.heading-2` | 主要セクション見出し |
| `typography.heading-3` | 小セクション見出し |
| `typography.body` | 標準本文 |
| `typography.body-small` | 補助本文、表 |
| `typography.caption` | metadata、補足ラベル |
| `typography.code` | code、token 名、技術識別子 |

```css
.page-title {
 font: var(--typography-heading-1);
 color: var(--color-text-primary);
}

.page-description {
 font: var(--typography-body);
 color: var(--color-text-secondary);
}
```

## ブランド差

同じ `typography.*` の役割を共有し、font family と調整値だけをテーマで差し替えます。

| Theme | 主な方向性 |
|-------|------------|
| `ai-dash` | display にブランド性、本文は和文可読性を優先 |
| `sound-laboratory` | 柔らかい display、広めの行間、低密度 |
| `slt-corporate` | 信頼感のある一貫した見出しと本文 |
| `admin` | 高密度でも読み分けやすい階層 |

font asset は消費者アプリが配信します。Design System は font stack と役割を提供し、フォントファイル自体は同梱しません。

## 組版ルール

- ページ内の見出し階層を飛ばさない。
- display を長文やフォームラベルに使わない。
- 本文幅を制限し、長い日本語行を避ける。
- 英数字と日本語が混在する UI は実データで折返しを確認する。
- font weight や色だけに階層を依存せず、見出し構造を HTML に反映する。
- uppercase、letter spacing、装飾書体は短いラベルに限定する。

## フォント読み込み

消費者アプリはテーマに必要な font だけを読み込み、preload と `font-display` を設定します。表示の安定性を保つため、fallback stack と本番 font の差で CLS が増えないか確認します。

## レスポンシブ・多言語

- 文字サイズを固定幅レイアウトの都合で縮めない。
- 200% zoom と text spacing override で欠落・重なりがないことを確認する。
- ボタンや見出しは翻訳による伸長を許容する。
- 日付、数値、通貨は文言連結せず locale formatter を使う。

文章と用語のルールは [L4 コンテンツ](../L4-content.md) と [L4 用語](../L4-terminology.md)、検証は [L5 品質](../L5-quality.md) を参照してください。
