export interface ComponentNavEntry {
  slug: string;
  titleJa: string;
  tier: "P0" | "P1" | "P2";
  order: number;
}

// 公開 component の順序。一覧ページ、static paths、sidebar で共有する。
export const COMPONENT_NAV: ComponentNavEntry[] = [
  { slug: "button", titleJa: "ボタン", tier: "P0", order: 1 },
  { slug: "input", titleJa: "インプット", tier: "P0", order: 2 },
  { slug: "textarea", titleJa: "テキストエリア", tier: "P0", order: 3 },
  { slug: "card", titleJa: "カード", tier: "P0", order: 4 },
  { slug: "dialog", titleJa: "ダイアログ", tier: "P0", order: 5 },
  { slug: "badge", titleJa: "バッジ", tier: "P0", order: 6 },
  { slug: "checkbox", titleJa: "チェックボックス", tier: "P0", order: 7 },
  { slug: "radio", titleJa: "ラジオボタン", tier: "P0", order: 8 },
  { slug: "select", titleJa: "セレクト", tier: "P0", order: 9 },
  { slug: "switch", titleJa: "スイッチ", tier: "P0", order: 10 },
  { slug: "heading", titleJa: "見出し", tier: "P0", order: 11 },
  { slug: "divider", titleJa: "ディバイダー", tier: "P0", order: 12 },
  { slug: "notice-block", titleJa: "注釈ブロック", tier: "P0", order: 13 },
  { slug: "brand-background", titleJa: "ブランド背景", tier: "P1", order: 14 },
  { slug: "wave-background", titleJa: "ウェーブ背景", tier: "P1", order: 15 },
  { slug: "grid-background", titleJa: "グリッド背景", tier: "P1", order: 16 },
  { slug: "toast", titleJa: "トースト", tier: "P1", order: 17 },
  { slug: "site-header", titleJa: "サイトヘッダー", tier: "P1", order: 18 },
  { slug: "breadcrumb", titleJa: "パンくずリスト", tier: "P1", order: 19 },
  { slug: "tabs", titleJa: "タブ", tier: "P1", order: 20 },
  { slug: "accordion", titleJa: "アコーディオン", tier: "P1", order: 21 },
  { slug: "disclosure", titleJa: "ディスクロージャー", tier: "P1", order: 22 },
  { slug: "list", titleJa: "箇条書きリスト", tier: "P1", order: 23 },
  { slug: "description-list", titleJa: "説明リスト", tier: "P1", order: 24 },
  { slug: "blockquote", titleJa: "引用ブロック", tier: "P1", order: 25 },
  { slug: "chip", titleJa: "チップタグ", tier: "P1", order: 26 },
  { slug: "page-navigation", titleJa: "ページナビゲーション", tier: "P1", order: 27 },
  { slug: "step-navigation", titleJa: "ステップナビゲーション", tier: "P1", order: 28 },
  { slug: "progress-indicator", titleJa: "プログレスインジケーター", tier: "P1", order: 29 },
  { slug: "search-box", titleJa: "検索ボックス", tier: "P1", order: 30 },
  { slug: "skeleton", titleJa: "スケルトン", tier: "P2", order: 31 },
  { slug: "table", titleJa: "テーブル", tier: "P2", order: 32 },
  { slug: "scroll-top-button", titleJa: "スクロールトップボタン", tier: "P2", order: 33 },
  { slug: "utility-link", titleJa: "ユーティリティリンク", tier: "P2", order: 34 },
  { slug: "hamburger-menu-button", titleJa: "ハンバーガーメニューボタン", tier: "P2", order: 35 },
  { slug: "drawer", titleJa: "ドロワー", tier: "P2", order: 36 },
  { slug: "file-upload", titleJa: "ファイルアップロード", tier: "P2", order: 37 },
  { slug: "table-of-contents", titleJa: "目次", tier: "P2", order: 38 },
  { slug: "resource-list", titleJa: "リソースリスト", tier: "P2", order: 39 },
  { slug: "image", titleJa: "画像", tier: "P2", order: 40 },
  { slug: "horizontal-menu", titleJa: "水平メニュー", tier: "P2", order: 41 },
  { slug: "menu-list", titleJa: "メニューリスト", tier: "P2", order: 42 },
  { slug: "bottom-navigation", titleJa: "ボトムナビゲーション", tier: "P2", order: 43 },
  { slug: "mobile-menu", titleJa: "モバイルメニュー", tier: "P2", order: 44 },
];

export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  links: NavLink[];
}

export const SIDEBAR: NavGroup[] = [
  {
    label: "概要",
    links: [
      { label: "はじめに", href: "/" },
      { label: "導入方法", href: "/getting-started/" },
      { label: "デザイン原則", href: "/principles/" },
    ],
  },
  {
    label: "スタイル",
    links: [
      { label: "概要", href: "/foundations/" },
      { label: "色", href: "/foundations/colors/" },
      { label: "タイポグラフィ", href: "/foundations/typography/" },
      { label: "余白・形状・モーション", href: "/foundations/spacing/" },
      { label: "モーションクラフト", href: "/foundations/motion/" },
      { label: "トークンの使い方", href: "/foundations/tokens/" },
    ],
  },
  {
    label: "コンポーネント",
    links: [
      { label: "一覧", href: "/components/" },
      ...COMPONENT_NAV.map((component) => ({
        label: component.titleJa,
        href: `/components/${component.slug}/`,
      })),
    ],
  },
  {
    label: "ガイドライン",
    links: [
      { label: "概要", href: "/guidelines/" },
      { label: "パターン", href: "/guidelines/patterns/" },
      { label: "コンテンツ", href: "/guidelines/content/" },
      { label: "用語と命名", href: "/guidelines/terminology/" },
      { label: "品質基準", href: "/guidelines/quality/" },
    ],
  },
  {
    label: "開発と運用",
    links: [
      { label: "Storybook 標準", href: "/guidelines/storybook/" },
      { label: "ドキュメント運用", href: "/guidelines/documentation/" },
      { label: "コントリビューション", href: "/guidelines/contributing/" },
      { label: "リリース", href: "/guidelines/releasing/" },
      { label: "ハーネス", href: "/guidelines/harness/" },
      { label: "ガバナンス", href: "/guidelines/governance/" },
    ],
  },
];

export const GUIDELINE_SLUGS = [
  "patterns",
  "content",
  "terminology",
  "quality",
  "storybook",
  "documentation",
  "contributing",
  "releasing",
  "harness",
  "governance",
] as const;

export type GuidelineSlug = (typeof GUIDELINE_SLUGS)[number];

export interface GuidelineEntry {
  id: string;
  source: string;
  title: string;
}

export const GUIDELINES: Record<GuidelineSlug, GuidelineEntry> = {
  patterns: { id: "l3-patterns", source: "L3-patterns.md", title: "パターン" },
  content: { id: "l4-content", source: "L4-content.md", title: "コンテンツ" },
  terminology: { id: "l4-terminology", source: "L4-terminology.md", title: "用語と命名" },
  quality: { id: "l5-quality", source: "L5-quality.md", title: "品質基準" },
  storybook: {
    id: "l2-components/storybook",
    source: "L2-components/storybook.md",
    title: "Storybook 標準",
  },
  documentation: { id: "documentation", source: "DOCUMENTATION.md", title: "ドキュメント運用" },
  contributing: { id: "contributing", source: "CONTRIBUTING.md", title: "コントリビューション" },
  releasing: { id: "releasing", source: "RELEASING.md", title: "リリース" },
  harness: { id: "l6-harness-and-loops", source: "L6-harness-and-loops.md", title: "ハーネス" },
  governance: { id: "l6-governance", source: "L6-governance.md", title: "ガバナンス" },
};
