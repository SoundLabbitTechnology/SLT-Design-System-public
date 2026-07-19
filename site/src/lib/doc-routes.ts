// docs/ の canonical Markdown → Docs site route（当面はローカル閲覧）。
// remark-doc-links.mjs と documentation contract gate が利用する。
export const DOC_ROUTES: Record<string, string> = {
  "docs/L0-principles.md": "/principles/",
  "docs/L1-foundations/tokens.md": "/foundations/tokens/",
  "docs/L1-foundations/colors.md": "/foundations/colors/",
  "docs/L1-foundations/typography.md": "/foundations/typography/",
  "docs/L1-foundations/spacing-motion.md": "/foundations/spacing/",
  "docs/L1-foundations/motion-craft.md": "/foundations/motion/",
  "docs/L2-components/storybook.md": "/guidelines/storybook/",
  "docs/L3-patterns.md": "/guidelines/patterns/",
  "docs/L4-content.md": "/guidelines/content/",
  "docs/L4-terminology.md": "/guidelines/terminology/",
  "docs/L5-quality.md": "/guidelines/quality/",
  "docs/L6-governance.md": "/guidelines/governance/",
  "docs/L6-harness-and-loops.md": "/guidelines/harness/",
  "docs/CONTRIBUTING.md": "/guidelines/contributing/",
  "docs/DOCUMENTATION.md": "/guidelines/documentation/",
  "docs/RELEASING.md": "/guidelines/releasing/",
};

export const GITHUB_BASE = "https://github.com/SoundLabbitTechnology/SLT-Design-System-public/";
