# L4. 用語と命名

プロダクト内の語彙、コード上の名称、ブランド表示名を揃えるための正本です。固有機能名は各プロダクトで管理し、横断語彙だけをここへ追加します。

**正本 locale は `ja`。** locale 拡張・翻訳 ownership の方針は ADR-005（Private ADR） と [L6 i18n](./L6-governance.md#i18n--用語拡張) を正とする。`en` 列は推奨訳（UI / 文書で英語を出すときの揃え方）であり、定義の正本は常に `ja` です。

このページの構成:

- [ブランド表示](#ブランド表示)
- [共通 UI 用語](#共通-ui-用語)
- [AI 体験の用語](#ai-体験の用語)
- [基盤・運用用語](#基盤運用用語) — デザインシステムの技術語（導入ドキュメントで使う言葉）
- [命名ルール](#命名ルール)

コンポーネント既定の accessible name / ボタン文言は [既定文言 inventory](./L2-components/default-copy-inventory.md) を参照してください。

---

## ブランド表示

| コード上の ID | 表示名 (`ja` / 共通) | `en`（推奨） | 備考 |
|---------------|----------------------|--------------|------|
| `ai-dash` | AI-DASH | AI-DASH | 英字は大文字、ハイフンあり |
| `sound-laboratory` | Sound Laboratory | Sound Laboratory | `Sound Lab` への省略は狭いUIに限定 |
| `slt-corporate` | Sound Labbit Technology | Sound Labbit Technology | 初出は正式名 |
| `admin` | Admin | Admin | ユーザー向けには機能名を優先 |

表示名をコードに重複定義せず、React では `BRAND_DISPLAY_NAMES` / `getBrandDisplayName` を使います。

## 共通 UI 用語

| 推奨 (`ja`) | `en`（推奨） | 避ける | 使い分け |
|-------------|--------------|--------|----------|
| 保存 | Save | 登録、更新の混在 / Register（既存の確定時） | 既存データの確定は「保存」 |
| 作成 | Create | 新規登録 / Sign up（新規対象の作成時） | 新しい対象を生む操作 |
| 削除 | Delete | 消去、破棄の混在 / Erase | 復元できない操作。確認文に対象名を含める |
| キャンセル | Cancel | 戻る / Back（操作中止時） | 実行前の操作中止 |
| 閉じる | Close | キャンセル / Cancel（表示を閉じるだけ） | 読み終えた表示を閉じるだけの場合 |
| 再試行 | Retry | リトライ（一般利用者向け） | 一般利用者向け文言では日本語を優先（`en` UI では Retry） |
| 確認 | Confirm | OK の多用 | 人間が内容・影響を見て確定する操作 |
| 検索 | Search | 探す | キーワード検索の CTA |
| 前へ | Previous | 戻る（ページ送り） | ページ送りの前方向 |
| 次へ | Next | 進む（ページ送り） | ページ送りの次方向 |
| メニューを開く | Open menu | — | ハンバーガー等の開く |
| メニューを閉じる | Close menu | — | ハンバーガー等の閉じる |

## AI 体験の用語

| 用語 (`ja`) | `en`（推奨） | 定義 |
|-------------|--------------|------|
| 提案 | Suggestion | AI が示し、人間が採否を決める出力 |
| 下書き | Draft | 編集・確認を前提とし、未確定である出力 |
| 生成中 | Generating | ストリーミングを含む処理中状態 |
| 出典 | Source | 出力の根拠として利用者がたどれる情報 |
| 確認 | Confirm | 人間が内容・影響範囲を見て確定する工程 |

AI の出力を「決定」「確定」と呼ばず、重要操作は人間の確認後に完了したことが分かる文言にします。

## 基盤・運用用語

導入・実装の説明で出てくる言葉です。画面のボタン文言ではないので、利用者向け UI にはそのまま載せません。

| 用語 (`ja`) | `en`（推奨） | やさしい言い方 | 定義 |
|-------------|--------------|----------------|------|
| セマンティックトークン（semantic token） | Semantic token | 用途つきのデザイン変数 | 「背景」「本文色」など**用途名**の CSS 変数。例: `--color-surface-primary` |
| コンポーネントトークン（component token） | Component token | 部品用の変数 | Button など部品専用の値。例: `button.primary.bg` |
| プリミティブ（primitive） | Primitive | 内部の生の色・数値 | ビルド専用。アプリの UI コードからは参照しない |
| テーマ（`data-theme`） | Theme (`data-theme`) | ブランドの見た目 | `ai-dash` など。トークン名は共通で、値だけ切り替わる |
| カラーモード（`data-color-mode`） | Color mode (`data-color-mode`) | 明るさの切替 | `light` / `dark` |
| Public ミラー | Public mirror | 配布用リポジトリ | 自社アプリが参照する公開パッケージ置き場（`SLT-Design-System-public`） |
| Private（開発正本） | Private (canonical) | 社内の開発リポジトリ | 実装・テスト・社内文書の正本。アプリの依存には使わない |
| DTCG | DTCG | トークンの共通形式 | Design Tokens Community Group のファイル形式 |
| ハーネス | Harness | 自動チェック一式 | 変更が安全か機械的に確かめる仕組み（社内開発用） |
| G0〜G5 | G0–G5 | チェックの段階 | 品質ゲートの番号。数字が上がるほど広い範囲を見る（詳細は [品質](./L5-quality.md)） |
| Docs contract | Docs contract | 文書の約束ごと | Docs のリンクやコンポーネント案内が実装と食い違っていないかの検査 |
| DADS | DADS | デジタル庁デザインシステム | 参照する外部のデザイン指針（構造・名称の揃え方）。Digital Agency Design System |

導入ページでは、初出で「やさしい言い方」を先に書き、括弧で用語を添えます。以降は本表へリンクして構いません。

## 命名ルール

- ボタンは動詞から始める: 「保存する」「一覧へ戻る」（`en`: “Save”, “Back to list”）。
- ページ見出しは対象を表す名詞にする: 「プロジェクト設定」（`en`: “Project settings”）。
- boolean props は状態・能力が読める名前にする: `disabled`, `loading`, `selectable`。
- セマンティックトークンは用途で命名し、色名やブランド名を含めない。
- 同じ概念に別の日本語・英語を混在させない（`ja` と `en` 列を揃える）。

## 追加・変更・locale 同期

1. 既存画面、サポート文書、分析イベントへの影響を検索する。
2. 推奨語、避ける語、定義、具体例を同時に追加する（定義の正本は日本語）。`en` 推奨訳も同 PR で入れる。
3. 公開 UI の変更は [L4 コンテンツ](./L4-content.md) と [L5 品質](./L5-quality.md) を確認する。
4. 広範な置換は移行期間と互換ラベルを [CHANGELOG](../CHANGELOG.md) に記録する。
5. **product glossary との境界** — 製品固有機能名は各 product の glossary が正本。2 製品以上で同じ意味で使う、または DS コンポーネント既定文言に載せる語だけを本表へ昇格する。差分確認は **DS content + 対象 product 各 1 名**（AI-Dash / Homepages など）。
6. **`en` 列（#39）** — `ja` 定義と同じ PR で推奨訳を入れる。訳だけ後追いで変えない。未翻訳は空欄より「TBD + owner」を残す。
7. **DADS 名称** — 四半期 #35 で名称差分が出たら、本表の対応（推奨 / 避ける / `en`）を同サイクルで更新する。
