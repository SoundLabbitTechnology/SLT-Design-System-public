/**
 * Sound Laboratory 公式ホーム（sound-laboratory.org）のコピー正本。
 * Storybook Landing Canvas 専用 — 製品配布外。
 *
 * タイポグラフィ役割: stories/samples/sound-laboratory-typography.md
 */

export interface SoundLabCta {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "ghost";
}

export interface SoundLabContentItem {
  title: string;
  category: string;
  meta: string;
}

export interface SoundLabLinkCard {
  title: string;
  description: string;
}

export interface SoundLabProjectCard {
  title: string;
  subtitle: string;
  description: string;
}

export interface SoundLabFaqItem {
  question: string;
  answer: string;
}

export interface SoundLabHomeSection {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
}

export const SOUND_LAB_HERO = {
  displayName: "Sound Laboratory",
  headline: "音楽とテクノロジーの力で、人と人、人とアイデアをつなぐ。",
  lede:
    "感性と論理を掛け合わせ、研究・発信・ものづくりを通じて音楽文化の新しいつながりを設計する音楽メディアです。",
  ctas: [
    { label: "サウラボについて", href: "#about", variant: "primary" },
    { label: "研究を見る", href: "#media", variant: "secondary" },
    { label: "プロジェクトを見る", href: "#projects", variant: "secondary" },
  ] satisfies SoundLabCta[],
} as const;

export const SOUND_LAB_SECTIONS = {
  latest: {
    id: "latest",
    eyebrow: "NEW CONTENT",
    title: "新着コンテンツ",
    description:
      "Sound Laboratoryの最新情報をお届けします。研究、ツール、プロジェクト、イベント、そしてNoteやYouTubeなど、多岐にわたる活動のアップデートをチェックしてください。",
  },
  social: {
    id: "social",
    eyebrow: "SOCIAL MEDIA",
    title: "公式SNS",
    description:
      "Sound Laboratoryは複数のSNSプラットフォームで活動しています。それぞれのプラットフォームの特性を活かして、音楽の魅力を多角的に発信しています。お気に入りのプラットフォームでフォローして、最新情報をお見逃しなく！",
    subtitle: "各SNSで異なる音楽体験を",
  },
  media: {
    id: "media",
    eyebrow: "MEDIA",
    title: "音楽メディア",
    description:
      "音楽メディアとして、研究・コラム・動画・Podcast・イベント記録を発信しています。音楽の「なぜ？」を多様なフォーマットで届けます。",
  },
  projects: {
    id: "projects",
    eyebrow: "PROJECTS",
    title: "プロジェクト",
    description:
      "研究や発信で培った知見を、プロダクト開発・音楽教育・クリエイティブの3つのプロジェクトとして形にしています。感性と論理を掛け合わせ、音楽の現場に新しいつながりを届けます。",
  },
  faq: {
    id: "faq",
    eyebrow: "FAQ",
    title: "よくある質問",
    description: "",
  },
} as const satisfies Record<string, SoundLabHomeSection & { subtitle?: string }>;

/** 本番ホーム「新着コンテンツ」掲載順（2026-07 時点） */
export const SOUND_LAB_LATEST_ITEMS: SoundLabContentItem[] = [
  {
    category: "Business",
    title: "Sound Lab Products",
    meta: "Sound Laboratory · 2026/2/1",
  },
  {
    category: "Business",
    title: "Sound Lab Education",
    meta: "Sound Laboratory · 2026/2/1",
  },
  {
    category: "Business",
    title: "Sound Lab Works",
    meta: "Sound Laboratory · 2026/2/1",
  },
  {
    category: "Workshop",
    title: "生成AIで学ぶシンセサイザー",
    meta: "Sound Laboratory · 2025/11/10",
  },
  {
    category: "Tool",
    title: "#1 音楽プロフィールメーカー",
    meta: "Sound Laboratory · 2025/11/1",
  },
  {
    category: "Research",
    title: "#1 「親の車理論」は本当か？",
    meta: "Sound Laboratory · 2025/10/15",
  },
];

export const SOUND_LAB_SNS_ITEMS: SoundLabLinkCard[] = [
  {
    title: "X (旧Twitter)",
    description: "最新の研究結果やイベント情報を発信",
  },
  {
    title: "Instagram",
    description: "ビジュアルで音楽の世界を表現",
  },
  {
    title: "Discord（サウラボ秘密基地）",
    description: "コミュニティ「サウラボ秘密基地」で仲間とリアルタイム交流",
  },
  {
    title: "mixi2",
    description: "音楽コミュニティでの交流と発見",
  },
  {
    title: "TikTok",
    description: "短い動画で音楽の魅力を伝える",
  },
];

export const SOUND_LAB_MEDIA_ITEMS: SoundLabLinkCard[] = [
  {
    title: "Research",
    description: "音楽の「なぜ？」を探求する研究プロジェクト",
  },
  {
    title: "Note",
    description: "サウラボの思考を覗く実験ノート",
  },
  {
    title: "Youtube",
    description: "アーティストの哲学に触れるインタビュー動画",
  },
  {
    title: "Podcast",
    description: "音楽についてゆるやかに語り合う「さうらじ！」",
  },
  {
    title: "Tools",
    description: "音楽活動を助ける便利な道具を開発・公開",
  },
  {
    title: "Events",
    description: "最高の音楽体験を創造するライブイベント",
  },
];

export const SOUND_LAB_PROJECT_ITEMS: SoundLabProjectCard[] = [
  {
    title: "Sound Lab Products",
    subtitle: "プロダクト開発",
    description:
      "テクノロジーとものづくりを掛け合わせ、音楽体験の新しい道具と仕組みを開発しています。",
  },
  {
    title: "Sound Lab Education",
    subtitle: "音楽教育",
    description:
      "体験とテクノロジーを掛け合わせ、手を動かして学ぶ音楽・STEAM教育プログラムを届けています。",
  },
  {
    title: "Sound Lab Works",
    subtitle: "クリエイティブ",
    description:
      "アーティストと共に、映像・イベント・Webなど音楽の世界観を形にするクリエイティブを手がけています。",
  },
];

export const SOUND_LAB_FAQ_ITEMS: SoundLabFaqItem[] = [
  {
    question: "Sound Laboratoryとは何ですか？",
    answer:
      "Sound Laboratoryは、音楽とテクノロジーの力で人と人、人とアイデアをつなぐ音楽メディアです。研究・発信を行うメディア活動に加え、プロダクト開発・音楽教育・クリエイティブの3つのプロジェクトを展開しています。",
  },
  {
    question: "どのようなプロジェクトを行っていますか？",
    answer:
      "Sound Lab Products（プロダクト開発）、Sound Lab Education（音楽教育）、Sound Lab Works（クリエイティブ）の3つです。研究や発信で培った知見を、音楽体験の道具・学びの場・クリエイティブとして形にしています。",
  },
  {
    question: "Sound Laboratoryのプロジェクトは有料ですか？",
    answer:
      "メディアで公開している研究・コンテンツや、基本的なツールは無料でご利用いただけます。各プロジェクトのご相談やクリエイティブのご依頼については、個別にご相談ください。",
  },
];

export const SOUND_LAB_FOOTER = {
  contactLabel: "連絡先",
  email: "hello@example.com",
  operator:
    "Sound Laboratory は、株式会社 Sound Labbit Technology が運営する音楽メディアです。",
  copyright: "© 2026 Sound Laboratory. All rights reserved.",
  legal:
    "本サイトに掲載の文章・画像・音声・映像等の著作権は、運営者または正当な権利者に帰属します。無断転載・二次利用を禁じます。",
} as const;
