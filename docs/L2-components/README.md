# L2. コンポーネント

`@soundlabbit/design-system/ui` から配布する React コンポーネントの索引です。public API の正本は [`src/index.ts`](../../src/index.ts)、挙動の正本は各 component 実装です。

## 使い始める

```css
@import '@soundlabbit/design-system/tokens.css';
@import '@soundlabbit/design-system/components.css';
```

```tsx
import { Button, Card, Input } from '@soundlabbit/design-system/ui';
```

用途と禁止パターンは [使用ガイド](./guides.md)、実際の props と状態は Storybook または Docs site（`npm run docs:dev`）で確認します。

## 一覧

| Tier | Component | 主な用途 | Storybook title |
|------|-----------|----------|-----------------|
| P0 | Button | action、loading、destructive trigger | `L2 Components/P0/Button` |
| P0 | Input | 単一行入力 | `L2 Components/P0/Input` |
| P0 | Textarea | 複数行入力 | `L2 Components/P0/Textarea` |
| P0 | Card | content grouping | `L2 Components/P0/Card` |
| P0 | Dialog | 確認、短い modal task | `L2 Components/P0/Dialog` |
| P0 | Badge | status、category | `L2 Components/P0/Badge` |
| P0 | Checkbox | 単一 / 複数選択の真偽値入力 | `L2 Components/P0/Checkbox` |
| P0 | Radio | 排他的な単一選択 | `L2 Components/P0/Radio` |
| P0 | Select | ドロップダウン選択 | `L2 Components/P0/Select` |
| P0 | Switch | 即時反映の設定トグル | `L2 Components/P0/Switch` |
| P0 | Heading | ページ / セクション見出し | `L2 Components/P0/Heading` |
| P0 | Divider | セクション間の視覚区切り | `L2 Components/P0/Divider` |
| P0 | NoticeBlock | 強調された補足情報 | `L2 Components/P0/NoticeBlock` |
| P1 | BrandBackground | theme 対応の背景選択 | `L2 Components/P1/BrandBackground` |
| P1 | WaveBackground | 低レベル wave treatment | `L2 Components/P1/WaveBackground` |
| P1 | GridBackground | Sound Laboratory grid treatment | `L2 Components/P1/GridBackground` |
| P1 | Toast | 一時的な操作 feedback | `L2 Components/P1/Toast` |
| P1 | SiteHeader | top navigation shell | `L2 Components/P1/SiteHeader` |
| P1 | Breadcrumb | 階層位置と上位への回遊 | `L2 Components/P1/Breadcrumb` |
| P1 | Tabs | 関連パネルの切り替え | `L2 Components/P1/Tabs` |
| P1 | Accordion | 同種セクションの連続折りたたみ | `L2 Components/P1/Accordion` |
| P1 | Disclosure | セクション内の補足折りたたみ | `L2 Components/P1/Disclosure` |
| P1 | List | 箇条書き（bullet / 項番テキスト） | `L2 Components/P1/List` |
| P1 | DescriptionList | 用語と説明の対 | `L2 Components/P1/DescriptionList` |
| P1 | Blockquote | 引用 | `L2 Components/P1/Blockquote` |
| P1 | Chip | フィルタ / カテゴリタグ | `L2 Components/P1/Chip` |
| P1 | PageNavigation | ページ送り | `L2 Components/P1/PageNavigation` |
| P1 | StepNavigation | 手続きステップ | `L2 Components/P1/StepNavigation` |
| P1 | ProgressIndicator | 処理進捗 | `L2 Components/P1/ProgressIndicator` |
| P1 | SearchBox | キーワード検索 | `L2 Components/P1/SearchBox` |
| P2 | Skeleton | loading placeholder | `L2 Components/P2/Skeleton` |
| P2 | Table / DataTable | tabular data、sort、selection | `L2 Components/P2/Table` |
| P2 | ScrollTopButton | ページ上部へ戻る | `L2 Components/P2/ScrollTopButton` |
| P2 | UtilityLink | フッター等の補助リンク | `L2 Components/P2/UtilityLink` |
| P2 | HamburgerMenuButton | モバイルメニュー開閉 | `L2 Components/P2/HamburgerMenuButton` |
| P2 | Drawer | 側面パネル | `L2 Components/P2/Drawer` |
| P2 | FileUpload | ファイル選択 | `L2 Components/P2/FileUpload` |
| P2 | TableOfContents | ページ内目次 | `L2 Components/P2/TableOfContents` |
| P2 | ResourceList | 関連リソース一覧 | `L2 Components/P2/ResourceList` |
| P2 | Image | キャプション付き画像 | `L2 Components/P2/Image` |
| P2 | HorizontalMenu | 水平ナビ | `L2 Components/P2/HorizontalMenu` |
| P2 | MenuList | 縦メニュー項目 | `L2 Components/P2/MenuList` |
| P2 | BottomNavigation | モバイル下部タブ | `L2 Components/P2/BottomNavigation` |
| P2 | MobileMenu | ハンバーガー複合メニュー | `L2 Components/P2/MobileMenu` |

Tier は優先度を表します。P2 も試験的 API という意味ではありません。

## 関連ドキュメント

| ドキュメント | 用途 |
|--------------|------|
| [guides.md](./guides.md) | いつ使う / 使わない、Do/Don't |
| [dod.md](./dod.md) | anatomy、API、states、a11y、test の完成条件 |
| [storybook.md](./storybook.md) | story の命名、coverage、公開基準 |
| [figma-props-mapping.md](./figma-props-mapping.md) | Figma variants と props の対応 |
| [brand-backgrounds.md](./brand-backgrounds.md) | background registry と使い分け |

## API 方針

- native HTML props を可能な限り継承する。
- behavior と a11y は headless primitive、見た目は token に分離する。
- product 固有 URL、data fetching、business logic を含めない。
- variant は見た目ではなく利用意図を表す。
- breaking change は [L6 ガバナンス](../L6-governance.md) と [RELEASING](../RELEASING.md) に従う。

## 背景 component

複数ブランドを扱う画面は `BrandBackground` を優先します。`WaveBackground` と `GridBackground` は低レベル API で、単一 treatment を明示的に使う場合だけ選びます。Admin は装飾背景を持ちません。

## 追加・変更

public component は、実装、story、site component page、使用ガイド、export を同じ変更で同期します。詳細は [CONTRIBUTING](../CONTRIBUTING.md) と [DoD](./dod.md) を参照してください。
