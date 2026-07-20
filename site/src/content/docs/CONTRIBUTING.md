# コントリビューションガイド

SLT Design System へ安全に変更を入れるための標準手順です。

## 変更前

1. [L0 原則](./L0-principles.md) と対象レイヤーの正本を確認する。
2. 既存 token、component、pattern で表現できないか検索する。
3. public API、視覚差分、消費者移行の有無を判定する。
4. 設計判断が長期間残る場合は [`decisions/`](./decisions/) に ADR を作る。

AI エージェントは [Private エージェント規則](../CLAUDE.md) を先に読み、非公開の primitive token source を読みません。

## 変更の種類

| 種類 | 例 | 必要な作業 |
|------|----|------------|
| Docs only | ガイド、リンク、説明 | `npm run docs:build`、影響面の目視 |
| Token | semantic / component token | build、G0/G1/G2、テーマ比較、CHANGELOG |
| Component | props、state、behavior || Component | props、state、behavior | component MDX、DoD、CHANGELOG |
| Pattern / content | L3/L4 の規約 | 例、a11y、関連 component へのリンク |
| Breaking | rename、remove、挙動変更 | ADR、移行ガイド、major 判定、非推奨期間 |

## コンポーネント変更

最低限、次を同じ変更に含めます。

- `src/components/<Name>/` の実装と型
- `*.stories.tsx` の主要状態、必要な `play` テスト
- `site/src/content/components/<slug>.mdx` のデモ、利用判断、Props
- [L2 索引](./L2-components/README.md) と [使用ガイド](./L2-components/guides.md)
- semantic / component token のみを使ったスタイル
- 破壊的操作、44px、フォーカス、キーボード、reduced motion の確認

完成条件は [L2 DoD](./L2-components/dod.md)、
## ローカルループ

```bash
npm run docs:build（Public ミラー）
npm run docs:build
npm run storybook       # 状態・操作・テーマの目視
npm run docs:dev        # Docs site（ローカル）とリンクの目視
```

`check` が失敗したら最初の失敗を正本側で修正し、green になるまで繰り返します。exit code 2 の場合は `Fix:` 行を実行可能な指示として扱います。

## レビュー依頼前

- [ ] 変更理由と利用者への影響が説明されている
- [ ] public API とトークンの互換性を判定した
- [ ] Storybook と Docs site の責務に沿って更新した
- [ ] keyboard、focus、contrast、touch target を確認した
- [ ] 全テーマ／対応モードで視覚確認した
- [ ] `npm run docs:build
- [ ] 公開面を変えた場合 `npm run ci` 相当を確認した
- [ ] CHANGELOG / migration / ADR の要否を判断した

## 禁止事項

- `dist/`、`dist-ui/`、`site/dist/` を正本として手編集する
- raw color / arbitrary spacing を追加する
- consumer 固有 URL やビジネスロジックを共有 component に入れる
- テスト失敗を許可リストだけで回避する
- 監査スナップショットを書き換えて現行仕様に見せる
