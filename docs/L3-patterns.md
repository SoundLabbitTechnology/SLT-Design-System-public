# L3. パターンとテンプレート

文書番号: SLT-DS-001 §6

L3 は複数の L2 コンポーネントを組み合わせ、利用者の目的を完了させる標準を定めます。

## パターン選択の原則

1. [L0 原則](./L0-principles.md)で目的と優先順位を決める。
2. [L2 コンポーネント](./L2-components/README.md)の標準 API を組み合わせる。
3. loading、empty、error、success、permission denied を正常系と同時に設計する。
4. マウス、キーボード、タッチ、支援技術で同じ目的を完了できるようにする。
5. 製品固有の business logic と routing はパターン側に閉じ込め、共有 component へ入れない。

## UX 参照モデル（Laws of UX）

パターンの「なぜこの標準か」は [Laws of UX](https://lawsofux.com/) を UX 参照モデルとして明示する（[ADR-004](./decisions/ADR-004-laws-of-ux.md)）。L0 恒常原則との接続は [L0 対応表](./L0-principles.md#ux-参照モデルlaws-of-ux)。DADS は構造・a11y（[ADR-003](./decisions/ADR-003-dads-alignment.md)）。

| パターン領域 | 主な法則 | 標準への含意 |
|--------------|----------|--------------|
| フォーム | Proximity、Postel、Hick | Label 常時表示・近接配置。blur/submit 後 validation。選択肢が多いときは Select、少ないときは Radio |
| 破壊的操作 | Hick、Peak-End、Jakob | Dialog で選択肢を絞り、cancel を安全側に置く。影響のピークを言語化する |
| 非同期状態 | Doherty、Zeigarnik | 短い待機はちらつかせない。1 秒以上は Skeleton。成功・失敗を結果として残す |
| Empty state | Hick、Chunking | 次にできる行動は原則 1 つ。装飾で認知負荷を増やさない |
| ナビゲーション | Jakob、Fitts、Serial Position | 慣習レイアウト、十分なタップ領域、現在地の明示 |
| データ表示 | Prägnanz、Similarity | Table / Card の使い分けを単純化し、似た行・列は視覚的に揃える |
| AI 体験 | Postel、A-4 | 提案は寛容に編集可能、確定・外部送信は保守的（人間確認） |

## フォーム

| 項目 | 標準 |
|------|------|
| Label | 常に表示し、placeholder で代替しない |
| 近接 | label↔control・hint/error は密（`.slt-field` 内 `space.xs`）。項目間は `.slt-field-stack`（`space.md`）で広く（Law of Proximity） |
| Hint | 入力前に必要な制約だけを提示する |
| Validation | field blur または submit 後。入力途中に過剰な error を出さない |
| Error | 対象 field、原因、修正方法を関連付ける |
| Submit | 主送信は `primary` を 1 つ。loading 中は二重送信を防ぎ、入力値を保持する |
| Summary | 複数 error は先頭に summary を置き、該当 field へ移動できるようにする |

成功時は次の状態が分かる短い feedback を出します。別ページへ移動した場合は Toast だけに依存せず、移動先にも完了状態を残します。

## 破壊的操作

`danger` action は必ず中止手段と組み合わせます。

1. trigger で対象と操作を明示する。
2. Dialog で対象名、影響、復元可否を説明する。
3. cancel を先に安全な選択肢として置く。
4. 実行中は閉じる・二重実行を防ぐ。
5. 完了後は結果と復帰手段を表示する。

取り消せる操作は、確認 Dialog より undo を優先できます。権限変更、外部送信、課金など影響が広い操作は人間の明示確認を省略しません。

## 非同期状態

| 状態 | 表示 | 避けること |
|------|------|------------|
| 短い待機 | 原則として表示を増やさない。反応は 400ms 未満（Doherty） | spinner のちらつき、無反応の待ち |
| 1 秒以上 | Skeleton または進捗 | layout shift |
| 進捗が測れる | 現在値、全体、残りの意味 | 終了時刻の根拠ない断定 |
| 成功 | 結果と次 action（Toast は補助） | Toast だけで重要結果を消す |
| 失敗 | 原因、影響、再試行 / 問合せ | 「エラーが発生しました」だけ |
| offline | 保存状況、再接続時の挙動 | 入力内容の消失 |

インタラクションの transition は `motion.duration.fast`（150ms）または `base`（300ms）を使う。`slow` は Skeleton 等の環境アニメに限り、操作フィードバックの待ちには使わない。入退場の easing・頻度ゲートは [motion-craft](./L1-foundations/motion-craft.md) を参照。

Skeleton は最終レイアウトの形に合わせ、`aria-busy` と loading label はコンテンツの親に付けます。

## Empty state

Empty state は「何もない理由」と「次にできる一つの行動」を示します。

- 初回利用: 作成や import への primary action。
- 検索結果なし: 条件を緩める、filter を解除する。
- 権限なし: 必要な権限と依頼先を示す。
- 削除後: 完了結果を示し、同じ対象の作成を強制しない。

装飾イラストだけで占有せず、見出し、短い説明、action の順で構成します。

## ナビゲーション

- page navigation は link、状態変更は button を使う。
- `SiteHeader` は `logo` / `nav` / `actions` の slot API を使う。
- 現在地は `aria-current` と視覚表現の両方で示す。
- mobile と desktop で同じ nav 定義を再利用する。
- focus order は表示順と一致させ、skip link を提供する。

設計決定は [ADR-002](./decisions/ADR-002-site-header-slots.md) を参照してください。

## データ表示

| 状況 | 推奨 |
|------|------|
| 比較・走査が中心 | Table / DataTable |
| 項目ごとの物語や visual が中心 | Card list |
| 少数の key-value | Definition list |
| 時系列・傾向 | 専用 chart pattern（table 代替を併記） |

Table は caption または近接見出し、列見出し、sort 状態、選択状態を持ちます。行 click だけに action を持たせず、keyboard で到達できる control を用意します。狭い画面では重要列を残し、単純な横縮小で可読性を失わせません。

## AI 体験

AI を組み込む画面は [L0 A-4「人間が主役」](./L0-principles.md#a-デザイン恒常原則core-values-の-ui-翻訳) を実装します。

| 段階 | 必須情報 / 操作 |
|------|-----------------|
| 入力 | 何が送信され、どの範囲で使われるか |
| 生成中 | 生成中であること、中止、必要なら部分出力 |
| 出力 | AI 生成であること、出典 / 根拠 / 不確実性 |
| 修正 | 編集、再生成、feedback |
| 実行 | 影響範囲の preview と人間の確認 |
| 完了 | 実行結果、監査可能な記録、undo / recovery |

AI の提案と確定済みデータを同じ見た目にしません。重要な外部送信、削除、権限、課金は自動確定させません。

## ページ構成

| Template | 構成 | 主な theme |
|----------|------|------------|
| Marketing | SiteHeader → hero → value → evidence → CTA → footer | ai-dash / sound-laboratory / slt-corporate |
| Dashboard | header / side nav → summary → filters → data → feedback | ai-dash / admin |
| Settings | page heading → sectioned form → save / cancel | admin / ai-dash |
| List-detail | search / filters → list or table → detail pane | admin |

Storybook の Landing Canvas は視覚判断用 sample であり、製品へそのまま export する template ではありません。製品化するパターンは利用実績と差分をレビューしてから L3 に昇格します。
