# L1. カラー

正本: [`design-tokens/semantic.*.json`](../../design-tokens/)

UI と AI は semantic / component token だけを参照します。

## カラーは用途で選ぶ

| カテゴリ | Token 例 | 用途 |
|----------|----------|------|
| Surface | `color.surface.primary` / `secondary` / `tertiary` / `overlay` | ページ、カード、浮いた面、overlay |
| Text | `color.text.primary` / `secondary` / `disabled` / `inverse` / `link` / `link-hover` | 情報階層と状態 |
| Border | `color.border.default` / `strong` / `focus` | 境界、強調、focus |
| Action | `color.action.primary` / `primary-hover` / `secondary` | 操作の優先順位 |
| Feedback | `color.feedback.success` / `warning` / `danger` / `info` | 状態の意味 |
| Interactive | `color.interactive.hover` / `active` | 行や control の状態 |

```css
.notice {
  color: var(--color-text-primary);
  background: var(--color-feedback-info-surface);
  border: 1px solid var(--color-feedback-info);
}
```

## 選択ルール

- 近い色を探すのではなく、対象の役割を決めて token を選ぶ。
- hover / active / selected は同じ action または interactive family を使う。
- feedback color は色だけで意味を伝えず、ラベル、アイコン、説明を併記する。
- `text.disabled` を通常本文に使わない。
- ブランド差は theme mapping に閉じ込め、component 側で条件分岐しない。
- surface と text の組み合わせを変えたらコントラストを再確認する。

## ブランドの方向性

| Theme | 表現 | 実装上の注意 |
|-------|------|--------------|
| `ai-dash` | 論理的、ダークファースト、ゴールドの主要 action | データ可読性を装飾より優先 |
| `sound-laboratory` | 温かいゴールド／クリーム、低密度 | グリッド背景上の本文コントラストを確認 |
| `slt-corporate` | 信頼感、ダーク、抑制したアクセント | dark mode 固定 |
| `admin` | ライト、高密度、明確な操作階層 | feedback と selected を混同しない |

正確な現在値は Docs site（`npm run docs:dev` → foundations）のスウォッチまたは生成済み CSS で確認します。説明文に raw 値を複製しません。

## Component token

Button や Input の見た目は component token が semantic token を参照します。

```css
.slt-btn--primary {
  background: var(--button-primary-bg);
  color: var(--button-primary-text);
}
```

component 利用側はこれらを上書きせず、props で意図を指定します。新しい見た目が必要なら [L2 DoD](../L2-components/dod.md) に沿って variant と token を設計します。

## アクセシビリティ

- 通常テキストは WCAG 2.2 AA のコントラストを満たす。
- focus ring は周囲の surface に対して識別できる。
- error / warning / success は非色覚情報を持つ。
- disabled は読めることと、操作不能が支援技術へ伝わることを分けて確認する。

検証方法は [L5 品質基準](../L5-quality.md) を参照してください。
