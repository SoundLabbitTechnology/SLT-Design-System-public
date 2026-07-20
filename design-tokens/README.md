# SLT Design Tokens

Sound Labbit Technology の DTCG token source です。利用者向けの概念とコード例は [L1 トークン標準](../docs/L1-foundations/tokens.md) を正とします。

## 公開レイヤー

| Source | 役割 | UI / AI |
|--------|------|---------|
| `semantic.{brand}.{mode}.json` | theme 間で共有する用途語彙 | 参照可 |
| `components.json` | component 固有の決定 | component 実装で参照可 |
| internal primitive source | build 内部の生値と scale | 参照・公開禁止 |

AI エージェントは [`CLAUDE.md`](../CLAUDE.md) / [`AGENTS.md`](../AGENTS.md) に従い、semantic と component source だけを読みます。

## Theme matrix

| Theme | Mode | 既定 |
|-------|------|------|
| `ai-dash` | light / dark | dark |
| `sound-laboratory` | light / dark | dark |
| `slt-corporate` | dark | dark |
| `admin` | light | light |

すべての対応 theme / mode で semantic key を一致させ、値だけを差し替えます。未対応 mode を追加する場合は、token source、build、Storybook toolbar、Docs site、導入ガイドを同じ変更で更新します。

## 変更手順

1. [L0 原則](../docs/L0-principles.md)と利用例を確認する。
2. 既存 semantic / component token で意図を表せないか確認する。
3. 用途ベースの名前、全 theme mapping、description を追加する。
4. breaking impact と migration の要否を判定する。
5. build と harness を実行する。

```bash
npm run build
npm run check:fast
```

内部 primitive source の変更が必要な場合は、owner が別途レビューします。AI に値を取得・置換させず、semantic key、contrast、影響 component、visual diff を変更記録に残します。

## 生成物

| Output | 用途 |
|--------|------|
| `dist/{brand}/{mode}/tokens.css` | 単一 theme import |
| `dist/slt-tokens.css` | 全 theme bundle |
| `dist/slt-tokens.ts` / `.json` | TypeScript / tool integration |
| `src/types/semantic-tokens.d.ts` | token key type |

## Style Dictionary 統合（[#16](（Private issue）)）

現行 build は `scripts/build-dtcg.mjs`。`style-dictionary` v4 は devDependency だが本番 build 未使用。

| 項目 | 参照 |
|------|------|
| Runbook（フェーズ計画・互換・rollback） | [style-dictionary-runbook.md](./style-dictionary-runbook.md) |
| SD spike（単一 theme、`.cache` 出力） | `npm run tokens:sd-spike` |
| build-dtcg との parity 検査 | `npm run tokens:sd-parity` |

Phase 2（custom transforms）完了まで本番 `npm run build` は `build-dtcg.mjs` のまま。

`dist/` は手編集しません。

## 検証

- G0: DTCG reference、semantic key parity、raw value、dist。
- G1: source code / component CSS の raw value。
- G2: generated token types と TypeScript。
- G3 / G4: component behavior と visual impact。
- Docs contract: 公開文書に正しい用途と route があること。

変更管理は [L6 ガバナンス](../docs/L6-governance.md)、release 手順は [RELEASING](../docs/RELEASING.md) を参照してください。

## Figma Variables 同期（[#15](（Private issue）)）

Git の DTCG JSON が正本。Figma は設計面への投影。

| 項目 | 参照 |
|------|------|
| Runbook（コレクション構成・mode 対応・Tokens Studio 手順） | [figma-sync-runbook.md](./figma-sync-runbook.md) |
| Component Variants ↔ props | [figma-props-mapping.md](../docs/L2-components/figma-props-mapping.md) |
| Parity manifest 生成 | `npm run tokens:figma-manifest` |
| Export との key drift 検査 | `npm run tokens:figma-drift -- design-tokens/figma-export/<file>.json` |

初回 sync は Figma edit 権限と Tokens Studio ライセンスが必要（Runbook 参照）。API なしでも manifest 生成と G0 key parity まで検証可能。

## coral 正式値差し替え（[#14](（Private issue）)）

`color.coral.*` は primitives の仮値スケール。semantic / UI からは切り離し済み（gold 基調）。

| 項目 | 参照 |
|------|------|
| Runbook（判断フレームワーク・確定後手順） | [coral-swap-runbook.md](./coral-swap-runbook.md) |
| ADR | [ADR-001](../docs/decisions/ADR-001-coral-brand-colors.md) |
| 使用状況監査 | [coral-usage-audit-2026-07-16](../docs/audits/coral-usage-audit-2026-07-16.md) |
| 参照箇所の再検査 | `npm run tokens:coral-audit` |

正式値の確定はブランド stakeholder の判断待ち。確定後は primitives の `color.coral` のみ更新（Path B 時は semantic mapping を別 PR）。
