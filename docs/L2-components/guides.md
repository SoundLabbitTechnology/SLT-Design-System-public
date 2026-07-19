# L2. コンポーネント使用ガイド

## Button

**いつ使う**: 主要アクション（送信・保存）、副次アクション（キャンセル）、破壊的操作（削除）。

**いつ使わない**: ナビゲーションリンク → `<a>` / Link。トグル → checkbox / switch。

| Do | Don't |
|----|-------|
| **Primary は 1 ビュー（画面 / Dialog）に 1 つ**（Von Restorff / Hick） | 複数 Primary を並置して選択を迷わせる |
| `danger` は必ず `secondary`（キャンセル）と併置 | 削除ボタンの単独配置 |
| `loading` で非同期処理中を示す（&lt;400ms で状態が変わること） | 二重送信を防がない / 無反応のまま待たせる |
| 価値物語（セットリスト等）に紐づく購入 CTA | 投げ銭・抽象サポート UI（課金方針は社内文書。公開面は要約のみ） |

主 action が複数見える場合は、最も重要な 1 つだけ `primary`、他は `secondary` / `ghost` にする（[ADR-004](../decisions/ADR-004-laws-of-ux.md)）。

```tsx
<Button variant="secondary">キャンセル</Button>
<Button variant="danger">削除する</Button>
```

**状態**: `disabled` / `loading` は props。hover / active / focus は CSS（`:focus-visible`）。

## Input

**いつ使う**: 単一行テキスト・メール・パスワード等。

| Do | Don't |
|----|-------|
| `label` を必ず付与し、control と近接させる（Proximity） | placeholder のみでラベル代用 |
| 複数 field は `.slt-field-stack` で項目間を広く取る | field 同士をラベル間隔と同じ密さで並べる |
| エラー時は `error` + `errorMessage` | 色だけ変えてメッセージなし |

**状態**: `error` / `disabled` / `readOnly`。`layout="horizontal"` でラベル横並び（DADS 作例）。focus はキーボード操作で確認（Storybook `KeyboardFocus`）。

```tsx
<div className="slt-field-stack">
  <Input label="氏名" />
  <Input label="メール" type="email" />
</div>
```

**入力の寛容さ（Postel's Law）**: 受け入れる形式は広めに（ハイフン有無・全半角など）。表示・送信値は保守的に正規化する。正規化ロジックは DS ではなく **consumer** が持つ。DS は「エラーを入力途中で過剰に出さない」「修正方法を errorMessage で示す」までを標準とする（[ADR-004](../decisions/ADR-004-laws-of-ux.md)）。

## Textarea

**いつ使う**: 複数行入力（問い合わせ・コメント）。

Input と同じフィールド API（`label` / `hint` / `error` / `disabled`）。

## Checkbox

**いつ使う**: 単一項目の真偽値、または複数選択リストの各項目。

| Do | Don't |
|----|-------|
| `label` を付与しクリック領域を広げる | ラベルなしでアイコンのみの意味を持たせる |
| 関連グループは `fieldset` / `legend` | 単一排他選択に使う（Radio を使う） |

## Radio

**いつ使う**: 複数の選択肢から1つだけを選ぶとき。

| Do | Don't |
|----|-------|
| `RadioGroup` で同じ `name` をまとめる | 複数回答できる設問に使う |
| 任意項目では「あてはまるものはない」を用意 | 選択解除できないまま任意項目にする |

## Select

**いつ使う**: おおむね6個以上の選択肢から1つを選ぶとき。リスト見た目は OS 標準。

| Do | Don't |
|----|-------|
| 長いリストは事前質問で選択肢を減らす | 5個以下の選択肢に使う（Radio 推奨） |
| `label` で入力項目を端的に表す | placeholder だけでラベル代用 |

## Switch

**いつ使う**: 切り替えたら即座に反映される設定。

| Do | Don't |
|----|-------|
| 結果がその場で目視できる設定に使う | 送信後反映の同意チェックに使う |
| `label` でオンになる内容を明示する | 結果が画面上で分からない項目に使う |

## Heading

**いつ使う**: ページ冒頭やセクション前の主題表示。

| Do | Don't |
|----|-------|
| 文書構造に合わせて階層を飛ばさない | 装飾目的だけで見出し要素を使う |
| 見た目とセマンティクスを分けるときは `as` + `level` | 本文の強調に Heading を使う |

## Divider

**いつ使う**: 異なるセクション / コンテンツ群の視覚的区切り。

| Do | Don't |
|----|-------|
| 意味の境界に使う | 装飾のためだけに多用する |
| 必要なら短い `label` で関係を補足 | 見出しの代わりに使う |

## NoticeBlock

**いつ使う**: 入力例・必要書類など、手続きに役立つ補足の強調表示。

| Do | Don't |
|----|-------|
| 具体的なサンプルや資料例に使う | 本文の代わりに長い説明を載せる |
| 意味に合った `variant` を選ぶ | 一時的な操作結果通知に使う（Toast） |

## Breadcrumb

**いつ使う**: サイト / アプリの階層内で現在位置を示し、上位へ戻る。

| Do | Don't |
|----|-------|
| ヘッダーと見出しの間に置く | 装飾だけの短いパンくずを置く |
| 長いときは `wrap`、押し下げ回避は `scroll`（下部に wrap 併置を検討） | ページ内 TOC の代わりに使う |

## Tabs

**いつ使う**: 同じ画面内で関連パネルを切り替える。

| Do | Don't |
|----|-------|
| `TabList` に accessible name を付ける | ページ遷移そのものに Tabs を使う |
| キーボード（矢印 / Home / End）で操作可能にする | 選択肢が 2 つだけの設定 UI に多用する |

## Accordion

**いつ使う**: FAQ など同種セクションが連続し、各ボディを折りたたみたいとき。

| Do | Don't |
|----|-------|
| ヘッダーだけで概要が分かるようにする | 領域節約だけを目的に使う |
| 重要な情報は折りたたまず表示する | 単一補足に使う（Disclosure） |

## Disclosure

**いつ使う**: メイン情報に対する追加・補足・詳細オプションを折りたたむとき。

| Do | Don't |
|----|-------|
| 展開せずとも最低限の情報が伝わる構成にする | 必須情報を隠す |
| ネイティブ `details` の意味を保つ | セクション全体の連続折りたたみに使う（Accordion） |

## List

**いつ使う**: 項目の列挙。項番が情報のときは `numbered` + `marker`。

| Do | Don't |
|----|-------|
| 常に `ul` ベースにする | `ol` / CSS counter で項番を自動生成する |
| 規約・条文の項番は地のテキストにする | コピー不能な装飾番号にする |

## DescriptionList

**いつ使う**: 用語と説明の対（メタ情報）。

| Do | Don't |
|----|-------|
| `dl` / `dt` / `dd` の意味を保つ | 長い本文や手続きフローに使う |

## Blockquote

**いつ使う**: 他者の発言・文書の引用。

| Do | Don't |
|----|-------|
| 出典があるときは `attribution` | 見出し強調の代わりに使う |

## Chip

**いつ使う**: フィルタ条件やカテゴリの短いラベル。

| Do | Don't |
|----|-------|
| ステータスは Badge を優先 | 長い説明を載せる |

## PageNavigation

**いつ使う**: 一覧のページ分割。

| Do | Don't |
|----|-------|
| 現在ページを `aria-current` で示す | 無限スクロールの無理な代替にする |

## StepNavigation

**いつ使う**: 申請などの段階的手続きの位置表示。

| Do | Don't |
|----|-------|
| ステップ数を少なく保つ | ページ番号ナビの代わりに使う |

## ProgressIndicator

**いつ使う**: アップロード等の定量進捗。

| Do | Don't |
|----|-------|
| 不明な待ちは indeterminate | ステップ進捗に使う |

## SearchBox

**いつ使う**: キーワード検索の入力と実行。

| Do | Don't |
|----|-------|
| 必ず label（hideLabel 可） | 汎用 Input の代わりに使う |

## ScrollTopButton

**いつ使う**: 長いページで上部へ戻る。

| Do | Don't |
|----|-------|
| スクロール閾値を超えてから表示 | 短いページで常時表示 |

## UtilityLink

**いつ使う**: フッター等の補助リンク。

| Do | Don't |
|----|-------|
| 主要 CTA と区別する | 本文の主リンクの代わりに使う |

## HamburgerMenuButton

**いつ使う**: モバイルメニューの開閉トリガー。

| Do | Don't |
|----|-------|
| `aria-expanded` と label を同期 | 見た目だけのアイコンにする |

## Drawer

**いつ使う**: 側面から開く設定・ナビパネル。

| Do | Don't |
|----|-------|
| 短い確認は Dialog | ページ全体を Drawer だけで構成 |

## FileUpload

**いつ使う**: フォームのファイル添付。

| Do | Don't |
|----|-------|
| 受け入れ形式を hint で示す | 選択結果を視覚表示しない |

## TableOfContents

**いつ使う**: 長い文書のページ内見出しナビ。

| Do | Don't |
|----|-------|
| 実在する見出し id にリンク | サイト全体ナビの代わりに使う |

## ResourceList

**いつ使う**: 関連ドキュメント・ツールへの導線一覧。

| Do | Don't |
|----|-------|
| タイトルで到達先が分かるようにする | 通常の箇条書き（List）の代わりに使う |

## Image

**いつ使う**: キャプション付き・装飾画像。

| Do | Don't |
|----|-------|
| 情報画像には具体的な alt | テキスト情報を画像だけに閉じ込める |

## HorizontalMenu

**いつ使う**: ヘッダー等の水平主ナビ。

| Do | Don't |
|----|-------|
| 現在地に `aria-current` | モバイル専用ナビを無理に水平へ載せる |

## MenuList

**いつ使う**: ドロワー内などの縦メニュー項目。

| Do | Don't |
|----|-------|
| リンクとボタンを用途で分ける | listbox 選択 UI と混同する |

## BottomNavigation

**いつ使う**: モバイルの主要画面への下部タブ。

| Do | Don't |
|----|-------|
| 項目は 4〜5 程度 | デスクトップ主ナビの代わりにする |

## MobileMenu

**いつ使う**: ハンバーガー + ドロワー + メニューリストの複合。

| Do | Don't |
|----|-------|
| 開閉状態を同期する | 深いメガメニューを押し込む |

## Card

**いつ使う**: 関連コンテンツのグルーピング。`glass` はヒーロー・強調セクション。

| Do | Don't |
|----|-------|
| `variant="glass"` を暗色背景上で使う | 情報量の多いフォーム全体を Card でネストしすぎる |
| 読み込み中は `aria-busy` | クリック可能な Card に `button` 語彙を使わない（`<a>` / `Button` を内包） |

**状態**: `default` / `glass` / `aria-busy`（loading 見た目）。

## Dialog

**いつ使う**: 確認・破壊的操作の再確認・短い通知。

| Do | Don't |
|----|-------|
| 破壊的操作は `destructive` + キャンセル | 長文フォームを Dialog に詰め込む |
| `confirmLoading` で保存中を表示 | 処理中に閉じられる UI |
| Esc で閉じられる（Radix 標準） | フォーカストラップなしの独自モーダル |

**状態**: `destructive` / `confirmLoading` / `confirmDisabled`。キーボードは `KeyboardEscape` / `KeyboardFocusTrap` ストーリーで検証。

## Badge

**いつ使う**: ステータス・カテゴリの短いラベル（「新着」「完了」）。

**いつ使わない**: ボタン代わり・長文・数値の主表示（メトリクスは別 UI）。

| Do | Don't |
|----|-------|
| 1〜3 語の短いラベル | 段落テキストを入れる |
| 意味に合った `variant`（success / warning 等） | 装飾だけの色分け |

**状態**: 5 トーン + `aria-disabled`。

## Toast

**いつ使う**: 操作結果の短いフィードバック（保存完了・エラー通知）。

**いつ使わない**: 重要な確認 → Dialog。常時表示のステータス → Badge / インライン文言。

| Do | Don't |
|----|-------|
| アプリルートを `ToastProvider` でラップ | Provider なしで `useToast` |
| 成功 / 警告 / エラーに `variant` を使う | 長文やフォーム全体を Toast に入れる |
| 複数件はスタックで表示（自動） | 同時に大量の Toast を発火 |

```tsx
<ToastProvider>
  <App />
</ToastProvider>

const { toast } = useToast();
toast({ title: "保存しました", variant: "success" });
```

**状態**: 5 トーン。デフォルト 5 秒 auto-dismiss。スワイプ / Close ボタン / キーボードで閉じる。

## SiteHeader

**いつ使う**: プロダクト共通のトップナビゲーションシェル。

| Do | Don't |
|----|-------|
| `logo` / `nav` / `actions` スロットで composition | DS 内にプロダクト固有 URL をハードコード |
| `SiteHeaderLink` で現在地表示（`active`） | モバイル用に別リンクセットを二重定義 |
| 本文揃えは `contentMaxWidth` + `--site-header-padding-x` | コンポーネント CSS を Docs で denser/taller に上書き |

**レイアウト（推奨）**: sticky full-bleed の `<header>` + 内側バー。縦は `height`（64px）と flex 中央寄せ、横だけ `padding-x`。上下 padding で膨らませない。

**トークン / API**: `site-header.height`（64px）、`padding-x`（`space.md`）。Docs は `contentMaxWidth="var(--docs-content-max)"` と `--site-header-padding-x: var(--docs-gutter)` で本文と揃える。

設計: [ADR-002](../decisions/ADR-002-site-header-slots.md)

## Skeleton

**いつ使う**: 1 秒以上の読み込み（[L3 パターン](../L3-patterns.md)）。Card / リストのプレースホルダ。

| Do | Don't |
|----|-------|
| `SkeletonCard` / `SkeletonList` でレイアウトを維持 | 1 秒未満のちらつき用スピナー |
| `aria-busy` + `aria-label` を親に付与 | Skeleton だけでエラー文言を代替 |

**状態**: `rect` / `text` / `circle`。`prefers-reduced-motion` でアニメーション停止。

## Table

**いつ使う**: Admin / ダッシュボードの一覧データ。

| Do | Don't |
|----|-------|
| `DataTable` でソート・選択の最小 API | 複雑なフィルタ UI を Table に内包 |
| `TableHead` の `sortable` + `aria-sort` | ソート可能な見た目だけ（ボタンなし） |
| `TableCheckboxCell` で行選択 | 行クリックのみで選択（キーボード不可） |
| `striped` / `colSpan`・`rowSpan` で DADS 差分を表現 | ストライプや結合を CSS ハードコード |

```tsx
<DataTable
  columns={[{ key: "name", header: "名前", sortable: true }]}
  rows={rows}
  getRowKey={(row) => row.id}
  selectable
  selectedKeys={selected}
  onSelectionChange={setSelected}
/>
```

**状態**: ソート asc/desc、行選択、ヘッダー全選択（indeterminate 対応）。

---

詳細 DoD: [dod.md](./dod.md) / Figma 対応: [figma-props-mapping.md](./figma-props-mapping.md)
