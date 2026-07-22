# コントリビューションガイド（社内限定）

**Sound Labbit Technology の社内メンバーのみ**が、このデザインシステムへ変更を入れられます。

| 受け付ける | 受け付けない |
|------------|--------------|
| org メンバーによる Private リポへの PR | 外部からの PR / Issue / Fork のマージ |
| 社内チャネル経由の改善要望 | Public ミラーへの直接の機能追加 |

Public ミラー（`SLT-Design-System-public`）は**配布用のスナップショット**です。コードや文書の修正は必ず Private 正本で行い、export 手順 で反映します。外部の方は Issue を立てず、利用上の問題は社内の担当者へ連絡してください。

脆弱性の報告手順は [SECURITY.md](../../../SECURITY.md) を参照してください。

---

SLT Design System へ安全に変更を入れるための標準手順です。

## 変更前

1. [L0 原則](./L0-principles.md) と対象レイヤーの正本を確認する。
2. 既存 token、component、pattern で表現できないか検索する。
3. public API、視覚差分、消費者移行の有無を判定する。
4. 設計判断が長期間残る場合は設計記録を残す。

## 変更の種類

| 種類 | 例 | 必要な作業 |
|------|----|------------|
| Docs only | ガイド、リンク、説明 | `npm run docs:build`、影響面の目視 |
| Token | semantic / component token | build、G0/G1/G2、テーマ比較、CHANGELOG |
| Component | props、state、behavior | component MDX、DoD、CHANGELOG |
| Pattern / content | L3/L4 の規約 | 例、a11y、関連 component へのリンク |
| Breaking | rename、remove、挙動変更 | 設計記録、移行ガイド、major 判定、非推奨期間 |

## コンポーネント変更

最低限、次を同じ変更に含めます。

- `src/components/<Name>/` の実装と型
- `*.stories.tsx` の主要状態、必要な `play` テスト
- `site/src/content/components/<slug>.mdx` のデモ、利用判断、Props
- コンポーネント索引と使用ガイド
- semantic / component token のみを使ったスタイル
- 破壊的操作、44px、フォーカス、キーボード、reduced motion の確認

完成条件はコンポーネントの DoD に従います。

## レビュー依頼前

- [ ] 変更理由と利用者への影響が説明されている
- [ ] public API とトークンの互換性を判定した
- [ ] Storybook と Docs site の責務に沿って更新した
- [ ] keyboard、focus、contrast、touch target を確認した
- [ ] 全テーマ／対応モードで視覚確認した
- [ ] `npm run docs:build` が通った
- [ ] 公開面を変えた場合 `npm run ci` 相当を確認した
- [ ] CHANGELOG / migration の要否を判断した

## 禁止事項

- `dist/`、`dist-ui/`、`site/dist/` を正本として手編集する
- raw color / arbitrary spacing を追加する
- consumer 固有 URL やビジネスロジックを共有 component に入れる
- テスト失敗を許可リストだけで回避する
- 監査スナップショットを書き換えて現行仕様に見せる
- Public ミラーへ社内戦略・PII・秘密情報を載せる
