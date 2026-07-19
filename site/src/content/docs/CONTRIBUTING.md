# コントリビューションガイド

SLT Design System へ安全に変更を入れるための標準手順です。公開ドキュメントの入口は Docs site（`npm run docs:dev`）です。

品質ハーネス・Storybook・エージェント用ルールは Private リポジトリ側で運用します。本 Public ミラーは配布パッケージと Docs site の公開面です。

## 変更前

1. [L0 原則](./L0-principles.md) と対象レイヤーの正本を確認する。
2. 既存 token、component、pattern で表現できないか検索する。
3. public API、視覚差分、消費者移行の有無を判定する。
4. 長期に残す設計判断は CHANGELOG と関連ガイドへ要約し、必要なら GitHub Issue に背景を残す。

UI は semantic / component token のみ参照し、`primitives.json` の生値は UI へ直書きしません。

## 変更の種類

| 種類 | 例 | 必要な作業 |
|------|----|------------|
| Docs only | ガイド、リンク、説明 | `npm run docs:build`、影響面の目視 |
| Token | semantic / component token | `npm run build`、テーマ比較、CHANGELOG |
| Component | props、state、behavior | `src/`、site MDX、必要なら CHANGELOG |
| Pattern / content | L3/L4 の規約 | 例、a11y、関連 component へのリンク |
| Breaking | rename、remove、挙動変更 | 移行メモ、major 判定、非推奨期間、CHANGELOG |

## コンポーネント変更

最低限、次を同じ変更に含めます。

- `src/components/<Name>/` の実装と型
- `site/src/content/components/<slug>.mdx` のデモ、利用判断、Props、Do/Don't
- `site/src/lib/nav.ts` の `COMPONENT_NAV`（新規時）
- semantic / component token のみを使ったスタイル
- 破壊的操作、44px、フォーカス、キーボード、reduced motion の確認

利用判断の正本は Docs site の component MDX です。

## ローカルループ

```bash
npm run build:all    # tokens + UI
npm run docs:dev     # Docs site（ローカル）とリンクの目視
npm run docs:build   # 公開前の静的ビルド確認
```

## レビュー依頼前

- [ ] 変更理由と利用者への影響が説明されている
- [ ] public API とトークンの互換性を判定した
- [ ] Docs site の責務に沿って更新した
- [ ] keyboard、focus、contrast、touch target を確認した
- [ ] 全テーマ／対応モードで視覚確認した
- [ ] `npm run docs:build` が通った
- [ ] CHANGELOG / migration の要否を判断した

## 禁止事項

- `dist/`、`dist-ui/`、`site/dist/` を正本として手編集する
- raw color / arbitrary spacing を追加する
- consumer 固有 URL やビジネスロジックを共有 component に入れる
- Docs site に載らない長いドキュメントを `site/src/content/docs/` に追加する（入口は site に載せるか置かない）
