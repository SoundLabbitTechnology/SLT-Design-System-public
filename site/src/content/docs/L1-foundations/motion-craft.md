# モーションクラフト（Design Engineering）

文書番号: SLT-DS-001 §4.4.1

正本トークン: [spacing-motion.md](./spacing-motion.md)  
出典: [Emil Kowalski — Skills for Design Engineers](https://github.com/emilkowalski/skills)（MIT）。エージェント用の深掘りはリポ内 `.cursor/skills/`（upstream と同系）。

SLT の UI・コンポーネント・消費者画面で **動きと触感** を決めるときの判断基準です。トークン名と duration の上限は SLT が優先。曲線・頻度・物理性の感覚は本ガイドと Cursor スキルに従います。

## AI エージェント向け

| やりたいこと | 読むもの |
|--------------|----------|
| 実装・レビューの最短ルール | この文書 |
| 厳密なアニメーションレビュー | `.cursor/skills/review-animations/` |
| コードベース横断の改善計画 | `.cursor/skills/improve-animations/` |
| 「動かす／動かさない」の提案だけ | `.cursor/skills/find-animation-opportunities/` |
| 効果の名前を探す | `.cursor/skills/animation-vocabulary/` |
| ジェスチャ・スプリングの深掘り | `.cursor/skills/apple-design/` |
| 総合クラフト | `.cursor/skills/emil-design-eng/` |
| SLT トークン対応の最短 | `.cursor/skills/slt-motion-craft/` |

レビュー結果は Before / After / Why の表形式にする（原本 `emil-design-eng` と同じ）。

## SLT トークン対応

| 用途 | SLT 変数 | Emil 側の意図 |
|------|----------|---------------|
| 入退場・開閉 | `var(--motion-easing-decelerate)` | strong ease-out（応答を先に見せる） |
| 画面上の移動・モーフ | `var(--motion-easing-standard)` | ease-in-out 相当 |
| ホバー色など軽い変化 | `var(--motion-easing-standard)` | ease 相当 |
| 一定速度（進捗・装飾ループ） | `linear`（例外） | linear |
| 押下フィードバック | `var(--motion-duration-fast)` | 100–160ms 帯 |
| Dialog / Drawer / Toast | `var(--motion-duration-base)`（必要時 `fast`） | おおむね &lt;300ms、上限は Doherty の &lt;400ms |
| Skeleton / 装飾ループ | `var(--motion-duration-slow)` | 操作待ちに使わない |
| reduced motion | `var(--motion-duration-none)` とメディアクエリ | 移動を止め、理解に必要な変化は残す |

**禁止に近いもの**

- UI 入退場に `var(--motion-easing-accelerate)`（ease-in）を使わない。最初が遅く感じる。
- `transition: all` を使わない。プロパティを明示する。
- `scale(0)` からの出現を使わない。`scale(0.9–0.97)` + opacity から始める（Dialog 中央出現は origin center 可）。
- キーボード起動や 1 日 100 回超の操作にアニメを付けない。

## 動かすか決める（頻度ゲート）

| 頻度 | 判定 |
|------|------|
| 1 日 100 回超（ショートカット、コマンドパレット、主要ナビ切替） | アニメなし |
| 1 日数十回（hover、リスト移動） | なし、またはほぼ知覚できない速さ |
| たまに（Dialog、Drawer、Toast、設定） | 標準（`fast` / `base`） |
| 稀・初回（オンボーディング、成功、祝福） | delight 可。ただしトークン範囲内 |

目的は次のいずれかであること: 空間の一貫性、状態の伝達、説明、フィードバック、唐突さの防止。「かっこいいだけ」で頻出 UI を動かさない。

## 必須スタンダード（10）

1. **正当な目的** — 上記ゲートと目的を満たす。
2. **頻度に合う** — キーボード起点は原則アニメ禁止。
3. **応答的な easing** — 入退場は decelerate / 強い ease-out。accelerate はブロック。
4. **UI は短く** — 操作フィードバックは `fast` / `base`。`slow` は待たせに使わない（Doherty の &lt;400ms を上限の目安とする）。
5. **物理性** — Popover / メニューはトリガー側の `transform-origin`。Modal / Dialog は中央可。`scale(0)` 禁止。
6. **中断可能** — Toast・トグル・ジェスチャは CSS transition か spring。キーフレームの先頭リセットを避ける。
7. **GPU 向き** — `transform` / `opacity` のみ。`width` / `height` / `top` / `margin` 等は避ける。
8. **a11y** — `prefers-reduced-motion` を尊重。hover アニメは `@media (hover: hover) and (pointer: fine)`。
9. **非対称タイミング** — ユーザーの決断はゆっくり、システムの応答は速く。
10. **ブランド cohesive** — `admin` / 業務 UI は crisp で速い。装飾 bounce は製品ブランドの稀な場面に限る。

## コンポーネント別の指針

| 部品 | 方針 |
|------|------|
| Button / 押下可能要素 | `:active` で軽い scale（0.95–0.98）。`fast` + decelerate |
| Select / メニュー | トリガー origin。`fast`〜`base` |
| Dialog | 中央 origin。`base` 以下。オーバーレイと同期 |
| Drawer | 端からの slide。`base`。ジェスチャなら中断可能に |
| Toast | 入退場の方向を揃え、連続追加に耐える transition |
| Tabs / Accordion | レイアウトジャンプを避ける。高さアニメは慎重に |
| Skeleton | `slow` 可。操作完了の待ち時間演出に使わない |
| BrandBackground | 装飾。本文 LCP / INP を妨げない。reduced motion で縮退 |

## 押下フィードバック（例）

```css
.slt-button {
  transition: transform var(--motion-duration-fast) var(--motion-easing-decelerate);
}

.slt-button:active:not(:disabled) {
  transform: scale(0.97);
}

@media (prefers-reduced-motion: reduce) {
  .slt-button {
    transition: none;
  }
  .slt-button:active:not(:disabled) {
    transform: none;
  }
}
```

## レビュー観点（短縮）

- [ ] この動きは頻度ゲートを通るか
- [ ] easing が decelerate / standard か（accelerate ではないか）
- [ ] duration が `fast` / `base` か（操作待ちに `slow` していないか）
- [ ] `transform` / `opacity` 以外を動かしていないか
- [ ] origin がトリガー／中央のどちらか意図通りか
- [ ] reduced motion と hover ゲートがあるか
- [ ] 連続操作でキーフレームが頭から再生されていないか

詳細値・曲線・デバッグ手順は upstream を参照。SLT では曲線の「強さ」の参考にしつつ、公開変数は上表の `--motion-easing-*` を使う。

## 関連

- [余白・形状・モーション](./spacing-motion.md)
- [L5 品質](../L5-quality.md)
- [L3 パターン](../L3-patterns.md)
- 原本リポジトリ: https://github.com/emilkowalski/skills
- コース: https://animations.dev/
