# リリースガイド

パッケージ、Storybook、Docs site を同じ設計状態として公開するための手順です。

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
4. `npm run ci` を実行する。
5. Chromatic の P0 / Canvas 差分を人間が確認する。
6. `npm pack --dry-run` で配布ファイルと exports を確認する。
7. Docs site の導入コードと component API が公開物に一致することを確認する。

## 公開物

| 公開物 | 確認 |
|--------|------|
| npm / Git tag | exports、型、CSS、CHANGELOG |
| Storybook | Autodocs、主要状態、テーマ、a11y、Chromatic baseline |
| Docs site | canonical URL、base path、内部リンク、ライブデモ |
| GitHub release | 変更要約、breaking / migration、既知の制約 |

## リリース後

- Git tag / GitHub release / 公開面の version が一致していることを確認する。
- 代表的な消費者で CSS import、theme attributes、主要 component を smoke test する。
- 問題があれば影響範囲、回避策、次の修正版を CHANGELOG と Issue に記録する。
- ロードマップの完了項目と残課題を更新する。

## ロールバック

既存 tag を上書きしません。問題のあるリリースを非推奨として記録し、互換修正版を新しい patch として公開します。破壊的な token 値変更は、直前の semantic mapping を復元してから原因を ADR または監査に残します。

詳細な所有権と非推奨ポリシーは [L6 ガバナンス](./L6-governance.md) を参照してください。
