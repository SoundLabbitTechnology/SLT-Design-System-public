# L0. デザイン原則

| 項目 | 内容 |
|------|------|
| Visibility | **public（Docs site）** / 戦略は社内方針（本ミラー外） |
| 文書番号 | SLT-DS-001-L0v1.0 |
| 版数 | v1.0（公開面: 恒常原則） |
| 更新日 | 2026-07-19 |
| 位置づけ | デザインシステム標準 §3。UI・体験の**品質判断**の優先順位 |
| 実装正本 | [`design-tokens/`](../../../../design-tokens/) |
| 公開面 | Docs site（`npm run docs:dev`）— サイトに載せる文書のみ |

---

## A. デザイン恒常原則

デザイン上の**品質判断**が割れた場合、以下を**上から順に**適用する。

| 優先 | 原則 | 判断基準 |
|------|------|----------|
| A-1 | **明瞭さは装飾に優先する** | 迷ったら情報の伝達効率が高い方を選ぶ。認知負荷を下げる。 |
| A-2 | **感性は数値で裏付ける** | 情緒的な表現の採否はユーザーリサーチ・データで検証する。 |
| A-3 | **共鳴を設計する** | 機能的充足の先で、ユーザーの感情が動く瞬間を意図して作る。 |
| A-4 | **人間が主役である** | AI が生成・提示する体験でも、重要な判断と主導権は常に人間に置く。 |

A-4 とアクセシビリティ最低ラインは、いかなるプロダクト判断でも下回らない。

### L2 での表現

| 恒常原則 | L2 実装 |
|----------|---------|
| A-1 明瞭さ | admin 高密度 Table、Input ラベル必須、エラー 3 点セット（[L3](./L3-patterns.md)） |
| A-2 数値裏付け | Storybook a11y / G3 テスト、コントラスト注記（[L5](./L5-quality.md)） |
| A-3 共鳴 | BrandBackground、Card `glass`、Grid パララックス |
| A-4 人間が主役 | Dialog 確認、danger+キャンセル併置、Table 選択の明示、AI 人間承認フロー（[L3](./L3-patterns.md)） |

### UX 参照モデル（Laws of UX）

認知・操作の共通語彙は [Laws of UX](https://lawsofux.com/) を参照モデルとする（方針: [Laws of UX](https://lawsofux.com/)）。**恒常原則 A を置き換えず補強する。** 構造・網羅・a11y の参照は DADS（[CHANGELOG](../../../../CHANGELOG.md)）。

| Laws of UX | 主に補強する恒常原則 | SLT での体現（要約） |
|------------|----------------------|----------------------|
| Fitts's Law | A-1 | タップターゲット最小 44px（Button / Input / control） |
| Hick's Law / Choice Overload | A-1 | Select は選択肢が多いとき、Dialog の action は絞る（Docs site `/components/`） |
| Jakob's Law | A-1 | 慣習的 Header / Form 見た目（Docs site `/components/site-header/`） |
| Von Restorff Effect | A-1 / A-3 | Primary Button は 1 ビュー 1 つ、目立つ色は主 action に限定 |
| Law of Proximity / Common Region | A-1 | Label↔field 近接、Card / Dialog の境界でグループ化 |
| Doherty Threshold | A-1 | 操作フィードバックを待たせない（motion &lt;400ms 方針、Toast / loading） |
| Postel's Law | A-4 | 入力は寛容に受け、出力・表示は保守的（ガイド。正規化は主に consumer） |
| Peak-End / Zeigarnik 等 | A-3 / A-4 | 完了・未完了の feedback、確認 Dialog、undo（[L3](./L3-patterns.md)） |

パターンへの詳細な落とし込みは [L3 の対応表](./L3-patterns.md#ux-参照モデルlaws-of-ux) を正とする。モーションのクラフト判断は [motion-craft.md](./L1-foundations/motion-craft.md)。

---

## ブランド表現の使い分け

トークン名・コンポーネント・a11y 基準は共通。見た目と密度だけがテーマで変わる。

| 観点 | AI-DASH (B2B) | Sound Laboratory (B2C) | SLT Corporate | Admin |
|------|---------------|------------------------|---------------|-------|
| 性格 | 論理的・信頼・専門性 | 温かみ・創造性・遊び心 | コーポレート・権威 | 業務効率・可読性 |
| 基調色 | スレート + ゴールド CTA | コーラル + ゴールド（**仮値**） | スレート + ゴールド | ライト + ブルー |
| 背景 | 3D wave | 方眼紙グリッド | 3D wave | なし（フラット） |
| 密度 | 高密度 | 低密度 | 中 | 高密度 |
| デフォルトモード | dark | dark | dark | light |

トークン値: [L1 colors.md](./L1-foundations/colors.md)

## スコープ定義

- **対象**: 本デザインシステムを採用するデジタル UI（Web / 関連プロダクト画面）
- **準拠**: W3C DTCG / WCAG 2.2 AA / SemVer 2.0
- **マルチブランド**: トークン名共有 + `data-theme` + `data-color-mode`（[`design-tokens/`](../../../../design-tokens/)）

## 基本方針（実装）

1. **単一の真実源** — デザイン決定は `design-tokens/` に集約
2. **N ブランド 1 システム** — 複数テーマが同一 semantic 語彙を共有
3. **AI 可読性** — semantic / component 正本と Docs site を入口にする（開発用エージェント規則は Private）
4. **a11y 内包** — トークン注記・DoD（44px、フォーカス）
5. **Headless + トークン** — 挙動 Radix、見た目 `styles/components.css`

## 関連

- 導入: Docs site `/getting-started/` / ルート [README](../../../../README.md)
