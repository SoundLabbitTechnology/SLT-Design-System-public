# ブランド別サイト背景

文書番号: SLT-DS-001 §5.3

## 選択ルール

`BrandBackground` が現在の `data-theme` / `data-color-mode` と background registry を読み、ブランドに合う treatment を選びます。

| Theme | Treatment | 備考 |
|-------|-----------|------|
| `ai-dash` | wave mesh | dark / light の surface に追従 |
| `sound-laboratory` | graph-paper grid + parallax | reduced motion で parallax を停止 |
| `slt-corporate` | wave mesh | dark 固定 |
| `admin` | none | data readability を優先 |

複数 theme を扱う製品では、低レベル background を条件分岐せず `BrandBackground` を使います。

## 推奨 API

```tsx
import { BrandBackground } from '@soundlabbit/design-system/ui';

// html の theme / mode を自動読取
<BrandBackground />;

// 単一ブランドの明示指定
<BrandBackground brand="sound-laboratory" />;
```

```html
<html data-theme="sound-laboratory" data-color-mode="light">
```

## 低レベル API

| Component | 使う場合 |
|-----------|----------|
| `WaveBackground` | wave treatment を明示的に構成する shared shell |
| `GridBackground` | registry が提供する grid spec を使う Sound Laboratory shell |

低レベル API は registry から spec / palette を取得し、色や寸法を product 側で複製しません。Admin に装飾 background を追加する場合は、密度と performance を L0 / L5 で再評価します。

## Layering

- background は content より前面に出さず、`aria-hidden` にする。
- section が stacking context を持ち、content の操作を妨げないようにする。
- text surface を必要に応じて Card で確保し、背景の上へ直接低 contrast text を置かない。
- canvas / pointer effect が LCP、INP、scroll を悪化させないようにする。
- reduced motion でも静的 background とブランド識別を保つ。

## 変更時

1. registry と public types を更新する。
2. `BrandBackground` と低レベル component の Storybook を更新する。
3. light / dark、reduced motion、narrow viewport を確認する。
4. Landing Canvas と Docs site demo で組み合わせを確認する。
5. `npm run check` と必要な Chromatic review を行う。

背景はブランド表現として視覚影響が大きいため、値や treatment の変更は [ADR](../decisions/) と [CHANGELOG](../../CHANGELOG.md) の要否を判断します。
