# Consumer G5 — Lighthouse / E2E 最小テンプレート

DS リポジトリから **コピーして** 消費者リポジトリに配置するファイル群です。  
正本の運用ルール: 本ディレクトリの README / checklist。詳細ハーネスは [L6 G5](../../docs/L6-harness-and-loops.md#g5--代表消費者プロダクト)。

## 含まれるもの

| ファイル | 用途 |
|----------|------|
| `lighthouserc.json` | Lighthouse CI の収集 URL と assertion（L5 CWV 整合） |
| `github-actions-lighthouse.yml` | GitHub Actions 用 workflow（`.github/workflows/` へリネーム配置） |
| `e2e-smoke-checklist.md` | E2E 最小シナリオ（Playwright 等への落とし込み用） |

## 導入チェックリスト

### 前提

- [ ] 本番相当の `build` / `start`（または `preview`）コマンドが CI で動く
- [ ] 代表 URL が 1 本以上決まっている（トップ + 主要画面）
- [ ] `<html data-theme>` / `data-color-mode` が product 仕様どおり

### Lighthouse CI

- [ ] `npm install -D @lhci/cli`（または consumer の package manager で同等）
- [ ] `lighthouserc.json` をリポジトリルートにコピー
- [ ] `collect.url` を実 URL に変更
- [ ] `collect.startServerCommand` を `npm run start` 等に合わせる
- [ ] `github-actions-lighthouse.yml` → `.github/workflows/lighthouse-ci.yml`
- [ ] workflow 内の `node-version`・`install`・`build` を product に合わせる
- [ ] 初回 PR で workflow green（または warn のみで意図を issue に記録）

### E2E smoke（最小）

- [ ] Playwright（推奨）または既存 E2E フレームワークを導入
- [ ] [e2e-smoke-checklist.md](./e2e-smoke-checklist.md) の **必須** 3 項目を自動化
- [ ] CI で main / release ブランチに紐づける（PR optional 可）
- [ ] DS minor 更新時に 1 回手動実行する手順を product README に 1 行追記

### 記録

- [ ] 初回 green の日付・代表 URL を社内トラッカー #37 にコメント
- [ ] performance budget（任意）を consumer の `docs/` に記載

## カスタマイズの指針

- **accessibility** は原則 `error` のまま（DS コンポーネント前提の最低ライン）
- **performance** は初回 `warn` → 改善後に `error` へ ratchet（本 README の指針）
- 認証必須画面は `lhci` の `settings.extraHeaders` または storage state 付き E2E で扱う（product 実装）
- 閾値緩和は product issue に根拠・期限を残す。DS テンプレの既定値は安易に下げない
