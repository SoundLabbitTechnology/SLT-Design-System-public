# Storybook 標準

文書番号: SLT-DS-001 §5.2

Storybook は public component の状態・操作・テーマ・アクセシビリティを確認する正本です。

## 情報の境界

| Storybook に置く | Docs site / Markdown に置く |
|------------------|-----------------------------|
| props、states、controls、play tests | 導入、原則、パターン、運用 |
| theme / mode の live comparison | 長い利用ガイド、migration |
| component 単体と判断用 sample | product 固有の完成ページ |

## ディレクトリ

```text
.storybook/
├── main.ts
├── preview.tsx
└── story-meta.ts

src/components/<Name>/
├── <Name>.tsx
└── <Name>.stories.tsx

stories/
├── Introduction.mdx
├── L1/Theming.mdx
├── L1/Accessibility.mdx
└── samples/
```

## Title

| 種別 | Pattern |
|------|---------|
| P0〜P2 | `SLT Design System/L2 Components/{tier}/{Name}` |
| Sample | `SLT Design System/Samples/{Name}` |
| Foundation docs | `SLT Design System/L1 Foundations/{Topic}` |

CSF の `title` は Storybook の static analysis のため文字列 literal で指定します。

Autodocs の story ID 接尾辞は英語の `--docs` に固定します（`.storybook/main.ts` の `docs.defaultName: "docs"`）。Introduction などからの deep link は `...?path=/docs/...--docs` 形式に揃えてください。

```tsx
const meta = {
  title: 'SLT Design System/L2 Components/P0/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: storyParameters('P0', 'Button', 'centered'),
} satisfies Meta<typeof Button>;
```

## Layout

| Layout | 用途 |
|--------|------|
| `centered` | Button、field、Card など小さな component |
| `padded` | Table、複合 content |
| `fullscreen` | Header、background、page sample |

Storybook 自体の grid overlay と `GridBackground` は別物です。背景を確認するときは toolbar の Grid visibility を off にします。

## Story coverage

最小構成は代表 story + 該当 states + interaction test です。

| 種別 | 例 |
|------|----|
| Representative | `Default`, `Primary`, `Basic` |
| Variants | `AllVariants`, `Glass`, `Dark` |
| State | `Disabled`, `Error`, `Loading`, `Empty` |
| Interaction | `KeyboardFocus`, `KeyboardEscape`, `KeyboardSort` |
| Composition | `DangerWithCancel`, `WithCard` |

hover / active を静的 story として重複させる必要はありません。重要な状態だけを story または pseudo-state / visual test で固定します。

## Tests

```bash
npm run test:stories      # G3: smoke + axe + play
npm run build-storybook   # static build
npm run storybook:check   # 上記の公開前セット
```

- CI / vitest では a11y violation を error にする。
- keyboard behavior、focus、dismiss、sort、selection などを `play` で検証する。
- content の自然さ、visual hierarchy、全 theme の contrast は人間が確認する。
- Accessibility の手順は Storybook の `L1 Foundations/Accessibility` を参照する。

## Chromatic

P0 と Landing Canvas を baseline とし、P1 / P2 は影響範囲とリスクに応じて追加します。snapshot 無効化を変更する場合は、速度だけでなく visual regression の価値をレビューします。

## Landing Canvas

Landing Canvas は複数 component を組み合わせたブランド判断用 sample です。

- package export に含めない。
- product 固有 logic や tracking を含めない。
- sample の copy source と typography note を `stories/samples/` に保持する。
- 再利用可能性が確認された構成だけを [L3 pattern](../L3-patterns.md) に昇格する。

## 新規 component checklist

1. implementation と public export を追加する。
2. literal title、tier、layout を設定する。
3. 代表 state と必要な `play` test を追加する。
4. site component MDX と L2 索引 / guide を更新する。
5. `npm run check`、`npm run storybook:check`、`npm run docs:check` を通す。

全体の完成条件は [DoD](./dod.md)、情報同期は [DOCUMENTATION](../DOCUMENTATION.md) を参照してください。
