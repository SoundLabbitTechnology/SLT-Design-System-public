# Emil Kowalski — Skills for Design Engineers（vendored）

SLT Design System が AI / 人間向けに取り込む、モーション＆UI クラフトの原本です。

| 項目 | 値 |
|------|-----|
| 上流 | https://github.com/emilkowalski/skills |
| ライセンス | [MIT](./LICENSE) © 2026 Emil Kowalski |
| SLT 正本（トークン対応） | [docs/L1-foundations/motion-craft.md](../../L1-foundations/motion-craft.md) |
| Cursor スキル | `.cursor/skills/`（同内容をプロジェクトスキルとして配置） |

## スキル一覧

| スキル | 役割 |
|--------|------|
| [emil-design-eng](./skills/emil-design-eng/SKILL.md) | UI ポリッシュ・アニメ判断の総合 |
| [review-animations](./skills/review-animations/SKILL.md) | diff / 実装の厳格レビュー（[STANDARDS](./skills/review-animations/STANDARDS.md)） |
| [improve-animations](./skills/improve-animations/SKILL.md) | コードベース監査 → 実行可能な計画 |
| [find-animation-opportunities](./skills/find-animation-opportunities/SKILL.md) | 動かす候補の提案（実装しない） |
| [animation-vocabulary](./skills/animation-vocabulary/SKILL.md) | 効果名の逆引き |
| [apple-design](./skills/apple-design/SKILL.md) | 流体インタフェース・ジェスチャ |

## SLT との優先順位

1. **semantic / component トークン**（`var(--motion-duration-*)` / `var(--motion-easing-*)`）をハードコード値より優先する
2. raw hex / raw px / `primitives.json` 直読みは禁止（[AGENTS.md](../../../AGENTS.md)）
3. duration の製品上限は Doherty（操作フィードバック &lt;400ms）。詳細は [motion-craft.md](../../L1-foundations/motion-craft.md)
4. 原本の cubic-bezier 例は「強さの参考」。公開 CSS では SLT の `--motion-easing-*` にマップする

上流の更新を取り込むときは、このディレクトリと `.cursor/skills/` を同期し、[motion-craft.md](../../L1-foundations/motion-craft.md) のトークン対応表を見直してください。
