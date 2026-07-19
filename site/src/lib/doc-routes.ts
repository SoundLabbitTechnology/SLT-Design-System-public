// site/src/content/docs の canonical Markdown → Docs site route。
// remark-doc-links.mjs と documentation contract gate が利用する。
export const DOC_ROUTES: Record<string, string> = {
  "site/src/content/docs/L0-principles.md": "/principles/",
  "site/src/content/docs/L1-foundations/tokens.md": "/foundations/tokens/",
  "site/src/content/docs/L1-foundations/colors.md": "/foundations/colors/",
  "site/src/content/docs/L1-foundations/typography.md": "/foundations/typography/",
  "site/src/content/docs/L1-foundations/spacing-motion.md": "/foundations/spacing/",
  "site/src/content/docs/L1-foundations/motion-craft.md": "/foundations/motion/",
  "site/src/content/docs/L3-patterns.md": "/guidelines/patterns/",
  "site/src/content/docs/L4-content.md": "/guidelines/content/",
  "site/src/content/docs/L4-terminology.md": "/guidelines/terminology/",
  "site/src/content/docs/L5-quality.md": "/guidelines/quality/",
  "site/src/content/docs/L6-governance.md": "/guidelines/governance/",
  "site/src/content/docs/CONTRIBUTING.md": "/guidelines/contributing/",
  "site/src/content/docs/DOCUMENTATION.md": "/guidelines/documentation/",
  "site/src/content/docs/RELEASING.md": "/guidelines/releasing/",
};

export const GITHUB_BASE = "https://github.com/SoundLabbitTechnology/SLT-Design-System-public/";
