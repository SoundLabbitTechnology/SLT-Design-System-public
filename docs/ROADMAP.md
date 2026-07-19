# ロードマップ

**現行バージョン**: v0.4.5（2026-07-13 時点）

この文書は現在地と未完了事項の正本です。変更履歴は [CHANGELOG](../CHANGELOG.md) を参照してください。

## 利用可能な基盤

| 領域 | 現在の状態 |
|------|------------|
| Token | DTCG、4 themes / 6 theme-mode sets、CSS / TS / JSON build。semantic 層に space / shape / elevation / link-hover を公開済み |
| Components | P0〜P2 の 44 public components、typed React exports |
| Storybook | 全 public component、Theming、Accessibility、Landing Canvas、G3 / G4 |
| Docs | L0〜L6、導入、用語、contributing、releasing、documentation standard |
| Docs site | canonical Markdown、全 component pages、live tokens / demos。**当面はローカルのみ**（`npm run docs:dev`）。固定公開 URL は見送り（#28） |
| Harness | G0〜G3、docs contract、isotc、Chromatic、CI static artifacts |
| Adoption | 代表消費者プロダクトの主要移行を完了 |

## 次の優先順位

| Priority | 領域 | Issue | 状態 |
|----------|------|-------|------|
| P1 | DADS wave 3 backlog | #34 | 12/19 完了。残7種は需要待ち |
| P2 | 四半期 L0 review | #17 | Runbook 済。初回 2026-Q3（07-21 週） |
| P2 | 四半期 DADS 同期 | #35 | Runbook 済。#17 と同週 |
| P2 | Figma Variables | #15 | Runbook + manifest/drift scripts 済。初回 sync は Figma 権限待ち |
| P2 | Consumer G5 | #37 | Runbook + テンプレ済。consumer repo 適用待ち |
| P3 | Brand decision | #14 | Runbook + 監査 + ADR-001 判断枠 済。正式値は stakeholder 待ち |
| P3 | Build pipeline | #16 | Runbook + SD spike + parity script 済。Phase 2 custom transforms 待ち |
| P3 | i18n / terminology | #38 | ADR-005 + L6 方針済。最初の `en` 拡張は #39 |
| 運用 | L3 metrics | #4（closed） | Runbook 済。週次実行継続 |
| 保留 | Docs 固定公開 | #28 | ローカル運用。再開時に着手 |

## Issue 索引

| 種別 | Issue | 備考 |
|------|-------|------|
| 親トラッカー | #30 DADS Phase A〜E | #32 #33 closed |
| Backlog | #34 wave 3 残 | 需要順 |
| 四半期 | #17 L0 / #35 DADS | 同周期 |
| Tokens | #14 #15 #16 | |
| 完了参照 | #4 metrics / #36 Laws of UX | 継続は運用・#17 |

## フェーズ

| Phase | 状態 | 残り |
|-------|------|------|
| 1 Foundation | 完了 | 継続保守のみ |
| 2 Components | 完了 | consumer feedback による改善 |
| 3 Adoption / publishing | 進行中 | Docs はローカル運用（固定公開は保留）、Figma、G5（DS 側 Runbook 済・consumer 適用待ち） |
| 4 Operations | 着手 | metrics Runbook 完了（#4）。四半期 Runbook 完了（#17/#35、初回 2026-Q3）。G5 Runbook 完了（#37、consumer green 待ち）。i18n 方針完了（#38 / ADR-005）。次: #39 `en` 用語列 |
| 5 DADS alignment | 着手 | Phase C / D 完了。E は 12/19（#34 backlog）。四半期同期 #35。トラッカー #30 |
| 6 UX reference（Laws of UX） | 初期適用完了 | [ADR-004](./decisions/ADR-004-laws-of-ux.md) / #36。継続監視は #17 |


## 完了判定

項目を完了へ移すときは、code だけでなく Storybook、Docs site、harness、consumer migration、ownership が揃っていることを確認します。release ごとの変更は [RELEASING](./RELEASING.md) に従います。
