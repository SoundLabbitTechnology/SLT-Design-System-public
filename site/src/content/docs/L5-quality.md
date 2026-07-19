# L5. 品質基準

文書番号: SLT-DS-001 §8

品質は component 単体、公開面、消費者プロダクトの三段階で確認します。

## 品質モデル

| 層 | 自動検証 | 人間の確認 |
|----|----------|------------|
| Token / code | `npm run build:all` | 命名と意図 |
| Component | Docs site demo / MDX | visual、content、keyboard flow |
| Documentation | `npm run docs:build` | 読者の task 完了、デモ |
| Visual regression | Private（Chromatic 等） | 意図した差分か、全 theme の妥当性 |
| Product | G5 Lighthouse / product tests | 実データ、end-to-end、支援技術（consumer CI） |

自動テストが通ることは必要条件であり、UX や視覚品質の十分条件ではありません。

## アクセシビリティ

最低ラインは WCAG 2.2 AA です。

| 領域 | 必須要件 | 検証 |
|------|----------|------|
| Semantics | native element と正しい name / role / state | Accessibility tree、axe |
| Keyboard | 全操作、論理的な順序、escape / focus return | Docs demo + 手動 |
| Focus | 常に視認でき、overlay で失われない | theme ごとの手動確認 |
| Contrast | 通常 text 4.5:1、large text / UI 3:1 を基準（[DADS](https://design.digital.go.jp/dads/foundations/) の統一方針に整合） | token review + 実画面 |
| Target size | 主要操作は 44px 以上 | component spec + mobile |
| Motion | reduced motion で不要な動きを停止。頻度・easing・GPU 制約は [motion-craft](./L1-foundations/motion-craft.md) | OS setting + craft review |
| Zoom / reflow | 200% zoom、狭幅で欠落しない | browser 手動確認 |
| Content | 色だけに依存せず、error の回復手段がある | L4 review |

### 手動確認の最小手順

1. マウスを使わず、画面の目的を完了する。
2. focus の位置と順序、Dialog を閉じた後の復帰先を確認する。
3. screen reader で control name、error、status update を確認する。
4. light / dark と全対応 theme で contrast を確認する。
5. reduced motion、200% zoom、mobile viewport を確認する。

## Motion craft

操作フィードバックとオーバーレイの動きは [motion-craft.md](./L1-foundations/motion-craft.md) に従う。

- キーボード起点や高頻度操作にアニメを付けない。
- 入退場は `var(--motion-easing-decelerate)`。accelerate（ease-in）は使わない。
- 操作待ちに `motion.duration.slow` を使わない。
- `transform` / `opacity` 以外のレイアウトプロパティを動かさない。
- レビューは Before / After / Why の表で返す。

深掘り: https://github.com/emilkowalski/skills（開発用スキルは Private）

## Component acceptance

- public props と DOM contract が文書化されている。
- default、disabled、loading、error、empty など該当状態を Docs site の demo / MDX で確認できる。
- pointer 以外の操作を手動で確認している。
- semantic / component token だけを使う。
- theme / mode による崩れがない。
- error や destructive action が [L3 パターン](./L3-patterns.md)に従う。

詳細は Docs site の component MDX を参照してください。

## Performance

消費者プロダクトでは Core Web Vitals の good threshold を最低目標とします。

| Metric | 目標 | 主な対策 |
|--------|------|----------|
| LCP | 2.5s 以下 | font / hero asset、critical CSS |
| INP | 200ms 以下 | event handler、hydration、long task |
| CLS | 0.1 以下 | size reservation、font、Skeleton |

共有 component の変更では、不要な dependency、client hydration、巨大 asset を追加しないことを確認します。背景表現は本文の LCP と操作応答を妨げないよう遅延・縮退させます。

## 対応環境

- desktop: Chrome、Firefox、Safari、Edge の現行と一つ前の major。
- mobile: iOS Safari、Android Chrome の現行と一つ前の major。
- JavaScript 無効時の保証は製品要件で定義する。
- browser 固有の例外は issue と fallback を記録する。

## Visual review

P0 と Landing Canvas は Chromatic baseline を持ちます。差分は次を確認してから accept します。

- 変更対象以外の component / theme へ波及していないか。
- text wrapping、focus、disabled、loading が崩れていないか。
- light / dark で surface と text の関係が維持されるか。
- viewport 差で content が切れないか。

## リリース判定

blocker は raw token value、keyboard で完了不能、重大な contrast 違反、public API の未記載 breaking change、Docs site / Storybook の build 失敗です。既知の軽微な制約は issue、回避策、対象 version を明記した場合に限り持ち越せます。
