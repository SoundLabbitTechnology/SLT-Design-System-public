# L2 コンポーネント — Figma Variants ↔ Props 対応表

Storybook / コードの props が Figma Variants と 1:1 になるよう設計する。Figma 未整備の Variant はコードを正本とする。

## Button

| Figma Variant | Prop | 値 |
|---------------|------|-----|
| Type=Primary | `variant` | `"primary"` |
| Type=Secondary | `variant` | `"secondary"` |
| Type=Danger | `variant` | `"danger"` |
| Type=Ghost | `variant` | `"ghost"` |
| State=Default | — | デフォルト |
| State=Disabled | `disabled` | `true` |
| State=Loading | `loading` | `true` |
| State=Hover / Active | — | CSS `:hover` / `:active`（Storybook Controls 不要） |

## Input / Textarea

| Figma Variant | Prop | 値 |
|---------------|------|-----|
| State=Default | — | デフォルト |
| State=Error | `error` | `true` + `errorMessage` |
| State=Disabled | `disabled` | `true` |
| With hint | `hint` | 文字列 |
| State=Focus | — | CSS `:focus-visible` + `KeyboardFocus` ストーリー |

## Textarea

Input と同一 props 体系。Figma では Input=Single line / Textarea=Multi line として分離可。

## Card

| Figma Variant | Prop | 値 |
|---------------|------|-----|
| Style=Default | `variant` | `"default"` |
| Style=Glass | `variant` | `"glass"` |
| State=Loading | `aria-busy` | `true` |

## Dialog

| Figma Variant | Prop | 値 |
|---------------|------|-----|
| Type=Default | `destructive` | `false` |
| Type=Destructive | `destructive` | `true` |
| Confirm loading | `confirmLoading` | `true` |
| Confirm disabled | `confirmDisabled` | `true` |

## Badge

| Figma Variant | Prop | 値 |
|---------------|------|-----|
| Tone=Default | `variant` | `"default"` |
| Tone=Success | `variant` | `"success"` |
| Tone=Warning | `variant` | `"warning"` |
| Tone=Danger | `variant` | `"danger"` |
| Tone=Info | `variant` | `"info"` |
| State=Disabled | `aria-disabled` | `true` |

## Toast

| Figma Variant | Prop | 値 |
|---------------|------|-----|
| Tone=Default | `variant` | `"default"` |
| Tone=Success | `variant` | `"success"` |
| Tone=Warning | `variant` | `"warning"` |
| Tone=Danger | `variant` | `"danger"` |
| Tone=Info | `variant` | `"info"` |
| With description | `description` | 文字列 |
| Duration | `duration` | ms（Provider デフォルト 5000） |

## SiteHeader

| Figma スロット | Prop | 内容 |
|----------------|------|------|
| Logo | `logo` | ReactNode |
| Navigation | `nav` | ReactNode（`SiteHeaderLink` 推奨） |
| Actions | `actions` | ReactNode |
| Link active | `SiteHeaderLink` `active` | `true` → `aria-current="page"` |

## Skeleton

| Figma Variant | Prop | 値 |
|---------------|------|-----|
| Shape=Rect | `variant` | `"rect"` |
| Shape=Text | `variant` | `"text"` |
| Shape=Circle | `variant` | `"circle"` |
| Width / Height | `width` / `height` | CSS 値 |

プリセット: `SkeletonCard`, `SkeletonList`

## Table

| Figma / 用途 | Prop / コンポーネント | 値 |
|--------------|----------------------|-----|
| Sortable column | `TableHead` `sortable` | `true` |
| Sort direction | `sortDirection` | `"asc"` / `"desc"` |
| Row selected | `TableRow` `selected` | `true` |
| Row checkbox | `TableCheckboxCell` | `checked` / `onChange` |
| Data-driven | `DataTable` | `columns`, `rows`, `onSort`, `selectedKeys` |

## トークン対応（`components.json`）

| コンポーネント | プレフィックス |
|----------------|----------------|
| Button | `button.*` |
| Input | `input.*` |
| Card | `card.*` |
| Dialog | `dialog.*` |
| Badge | `badge.*` |
| Toast | `toast.*` |
| SiteHeader | `site-header.*` |
| Skeleton | `skeleton.*` |
| Table | `table.*` |
