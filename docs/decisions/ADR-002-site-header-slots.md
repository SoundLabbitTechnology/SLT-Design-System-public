# ADR-002: SiteHeader スロット API

**Status**: Accepted  
**Date**: 2026-07-09

## Context

消費者プロダクト間でナビゲーションの情報設計が異なる。完全共通化は優先度が低く、プロダクト固有のリンク構成・CTA・認証状態を DS が握ると変更コストが高い。

## Decision

`SiteHeader` は **スロットベース** のシェルコンポーネントとする。

| スロット | 用途 |
|----------|------|
| `logo` | ブランドマーク（`<a>` / `Link` は呼び出し側） |
| `nav` | 主要ナビリンク（`SiteHeaderLink` 推奨） |
| `actions` | 右端 CTA・ユーザーメニュー等 |

- デスクトップ（≥768px）: 横並びレイアウト
- モバイル: `menu` ボタン + ドロワー（同一 `nav` / `actions` を再利用）
- プロダクト固有ロジック（認証・ルーティング）は **composition** で逃がす

## Consequences

- DS はレイアウト・a11y・トークンスタイルのみ提供
- レイアウト正本は **sticky full-bleed シェル + 内側バー**。縦は `site-header.height`（64px）と flex 中央寄せ、横は `padding-x`。上下 padding で高さを膨らませない
- 本文幅と揃えるときは `contentMaxWidth` prop と `--site-header-padding-x`（Docs の `--docs-content-max` / `--docs-gutter`）を使う。コンポーネント CSS の上書きはしない
- 各プロダクトは `nav` / `actions` に自前の Link / Button を渡す
- 将来、サイドナビ付きダッシュボードは別コンポーネント（`AppShell` 等）として検討

## Alternatives considered

1. **固定リンク配列 props** — 柔軟性が低く、消費者プロダクト間の差分を吸収できない
2. **Radix Navigation Menu 全面採用** — P1 時点では過剰。ドロップダウンが必要になったら拡張
