# コントリビューションガイド

このリポジトリは **配布ミラー**です。実装・品質ゲート・Storybook の変更は Private リポジトリで行い、公開してよい差分だけをここに反映します。

Public ミラー上で直接大きな機能追加は行わないでください。

## Public で直してよいもの

- Docs site の誤字・リンク切れ・導入例の修正（`site/src/content/docs/`、`site/src/content/components/*.mdx`）
- README / CHANGELOG の公開向け文言
- ビルド成果物の再生成（`npm run build:all`）が必要な場合の追随

## 変更の流れ（概要）

1. Private で実装・ハーネス・レビュー
2. Private から Public へ許可ツリーを export
3. 本リポで `npm run docs:build` が通ることを確認
4. version / CHANGELOG / tag を揃えて公開

## ローカル確認（本ミラー）

```bash
npm ci
npm run docs:build
npm run docs:dev
```

## レビュー依頼前

- [ ] 変更理由と利用者への影響が説明されている
- [ ] public API とトークンの互換性を判定した
- [ ] `npm run docs:build` が通る
- [ ] 導入例（README / getting-started）が公開物と一致する

## 関連

- リリース手順: [RELEASING.md](./RELEASING.md)
- ドキュメント運用: [DOCUMENTATION.md](./DOCUMENTATION.md)
- ガバナンス概要: [L6-governance.md](./L6-governance.md)
