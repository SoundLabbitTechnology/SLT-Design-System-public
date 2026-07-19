# ADR-001: Sound Laboratory coral ブランドカラー

| 項目 | 内容 |
|------|------|
| 状態 | **保留** — デザイン判断待ち |
| イシュー | #14 |
| 影響範囲 | `design-tokens/primitives.json` → `color.coral.*`（Path B 時は semantic 追加） |

## コンテキスト

Sound Laboratory のコーラル系は `primitives.json` に **仮値スケール**（50〜900）として定義されている。2026-07-09 の公式サイト整合で **semantic sound-laboratory は gold/クリーム基調**に移行済みであり、coral は UI から切り離されている（`{color.coral.*}` 参照 0 件）。

正式値の確定はブランド stakeholder の判断が必要。確定後は原則 **primitives のみ差し替え**で dist 全体に伝播する（Path A）。semantic へ再採用する場合のみ Path B で mapping PR を追加する。

## 現行仮値（primitives）

| トークン | 仮値 |
|----------|------|
| `color.coral.50` | `#FFF4F1` |
| `color.coral.100` | `#FFE3DB` |
| `color.coral.200` | `#FFC5B8` |
| `color.coral.300` | `#FF9F8A` |
| `color.coral.400` | `#F97662` |
| `color.coral.500` | `#E85A45` |
| `color.coral.600` | `#C74533` |
| `color.coral.700` | `#A13629` |
| `color.coral.800` | `#7C2A20` |
| `color.coral.900` | `#521B14` |

## 判断フレームワーク（stakeholder 向け）

| Path | 説明 | 推奨条件 |
|------|------|----------|
| **A — 予備スケール** | primitives に確定値を入れるが semantic は gold のまま | 公式サイトが gold 正本の間、将来アクセント用にスケールだけ整備 |
| **B — semantic 採用** | sound-laboratory 等の semantic が coral を参照 | ブランドガイドで coral が CTA/アクセントとして確定 |
| **C — 廃止** | `color.coral` スケールを削除 | coral をブランドから完全除外 — **major** 扱い |

**判断基準**: 公式 [sound-laboratory.org](https://sound-laboratory.org/) との整合、WCAG 2.2 AA（方眼紙グリッド上の本文）、[design-tokens README](../../design-tokens/README.md)。

**却下した選択肢**

- semantic ファイルごとに coral 値を直書き → **却下**（ブランド×モード整合が崩れる）
- ブランドごとに異なる coral トークン名を invent → **却下**（G0 key parity 違反）

## 確定時の手順

1. 本 ADR の「決定」表に Path と 50〜900 の hex を記入し、状態を **Accepted** に更新
2. `design-tokens/primitives.json` の `color.coral` セクションのみ更新（token owner）
3. Path B の場合: `semantic.sound-laboratory.*.json` の mapping を PR で更新
4. `npm run build && npm run check`
5. CHANGELOG に **minor** として記載
6. 仮値注記を削除: `CHANGELOG.md` Notes、`docs/L0-principles.md` 該当行、primitives `$description` の「仮」
7. `npm run tokens:coral-audit` で参照ゼロ（Path A）または意図した参照（Path B）を確認

## 決定（未記入）

| 項目 | 値 |
|------|-----|
| 採用 Path | _TBD_（A / B / C） |
| 確定日 | _TBD_ |
| 決定者 | _TBD_ |

| スケール | 確定値 |
|----------|--------|
| 50 | _TBD_ |
| 100 | _TBD_ |
| 200 | _TBD_ |
| 300 | _TBD_ |
| 400 | _TBD_ |
| 500 | _TBD_ |
| 600 | _TBD_ |
| 700 | _TBD_ |
| 800 | _TBD_ |
| 900 | _TBD_ |

## 関連

- [CHANGELOG](../../CHANGELOG.md) — gold 移行の経緯
- #14
