# L0. デザイン原則

画面づくりで判断が割れたとき、**何を優先するか**の順番です。
専門用語は [用語と命名](./L4-terminology.md#基盤運用用語) を参照してください。

| 項目 | 内容 |
|------|------|
| 版数 | v1.0 |
| 更新日 | 2026-07-20 |
| 位置づけ | デザインシステム標準 §3。UI・体験の**品質判断**の優先順位 |
| 実装正本 | [`design-tokens/`](../design-tokens/) |

---

## A. デザイン恒常原則

デザイン上の判断が割れた場合、以下を**上から順に**適用します。

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

認知・操作の共通語彙は [Laws of UX](https://lawsofux.com/) を参照モデルとする。**恒常原則 A を置き換えず補強する。** 構造・網羅・a11y の参照はデジタル庁デザインシステム（DADS）とする。

| Laws of UX | 主に補強する恒常原則 | SLT での体現（要約） |
|------------|----------------------|----------------------|
| Fitts's Law | A-1 | タップターゲット最小 44px（Button / Input / control） |
| Hick's Law / Choice Overload | A-1 | Select は選択肢が多いとき、Dialog の action は絞る（L2 guides） |
| Jakob's Law | A-1 | 慣習的 Header / Form 見た目 |
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
- **準拠**: トークンの共通形式（DTCG）、WCAG 2.2 AA、SemVer 2.0
- **マルチブランド**: 用途つき変数の名前を共有し、`data-theme` と `data-color-mode` で値を切り替える（[`design-tokens/`](../design-tokens/)）

## 基本方針（実装）

1. **単一の正本** — 色・余白などの決定は `design-tokens/` に集約する
2. **複数ブランド・一つの語彙** — 見た目は違っても、変数の名前は揃える
3. **機械にも読める** — 機械可読な導入ガイドを用意する（社内開発用）
4. **アクセシビリティを最初から** — タップ領域 44px、フォーカスの輪郭など
5. **挙動と見た目を分ける** — 操作の骨格は Radix、見た目は `styles/components.css`

## 関連

- 導入: Docs site `/getting-started/` / ルート [README](../README.md)
