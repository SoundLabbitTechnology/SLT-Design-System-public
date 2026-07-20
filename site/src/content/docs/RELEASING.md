# リリースガイド

このリポジトリは **配布ミラー**です。品質ゲート（Storybook / Chromatic / harness）は Private で実施し、公開してよい成果物だけをここに反映して tag します。

## バージョン判定

| 変更 | SemVer | 例 |
|------|--------|----|
| 互換性のある修正 | patch | docs 修正、a11y bug fix、見た目を変えない内部修正 |
| 互換性のある追加 | minor | 新 token、新 component、新 props、意図した token 値変更 |
| 破壊的変更 | major | token / export / props の削除・改名、既定挙動の非互換変更 |

token 値変更は視覚影響が大きいため minor を基本とします。緊急のコントラスト修正など例外は CHANGELOG に理由を記録します。

## 公開前チェック

1. `package.json` の version と CHANGELOG の先頭リリースを一致させる。
2. 追加・変更・修正・非推奨・破壊的変更を CHANGELOG に分類する。
3. breaking change には移行ガイドと、可能な場合は最低 1 minor の非推奨期間を設ける。
4. Private で品質ゲートを通す（本ミラー外）。
5. 本ミラーで `npm run docs:build` を通す。
6. Docs site の導入コードと component API が公開物に一致することを確認する。

## 公開物

| 公開物 | 確認 |
|--------|------|
| Public Git tag | exports、型、CSS、CHANGELOG |
| Docs site | `site/` — 内部リンク、導入例、コンポーネント要約 |
| GitHub release | 変更要約、breaking / migration、既知の制約 |

## リリース後

- Public の Git tag / GitHub release / `package.json` version が一致していることを確認する。
- 代表 consumer（AI-Dash 等）の依存を **Public tag** に bump する。
- 代表的な消費者で CSS import、theme attributes、主要 component を smoke test する。
- 問題があれば影響範囲、回避策、次の修正版を CHANGELOG に記録する。

## ロールバック

既存 tag を上書きしません。問題のあるリリースを非推奨として記録し、互換修正版を新しい patch として公開します。

詳細な所有権と非推奨ポリシーは [L6 ガバナンス](./L6-governance.md) を参照してください。
