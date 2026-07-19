import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

export const collections = {
  components: defineCollection({
    loader: glob({ base: "./src/content/components", pattern: "*.mdx" }),
    schema: z.object({
      title: z.string(),
      titleJa: z.string(),
      tier: z.enum(["P0", "P1", "P2"]),
      description: z.string(),
      order: z.number(),
      tokenPrefix: z.string(),
      props: z
        .array(
          z.object({
            name: z.string(),
            type: z.string(),
            default: z.string().optional(),
            description: z.string(),
          }),
        )
        .default([]),
    }),
  }),
  guidelines: defineCollection({
    // docs/ は site/ の外にあるが、content layer の glob loader は base を
    // 任意の相対パスに向けられる（symlink / コピースクリプト不要）。
    loader: glob({
      base: "../docs",
      pattern: [
        "L0-principles.md",
        "L2-components/storybook.md",
        "L3-patterns.md",
        "L4-content.md",
        "L4-terminology.md",
        "L5-quality.md",
        "L6-governance.md",
        "L6-harness-and-loops.md",
        "CONTRIBUTING.md",
        "DOCUMENTATION.md",
        "RELEASING.md",
      ],
    }),
  }),
  tokenGuides: defineCollection({
    loader: glob({
      base: "../docs/L1-foundations",
      pattern: [
        "tokens.md",
        "colors.md",
        "typography.md",
        "spacing-motion.md",
        "motion-craft.md",
      ],
    }),
  }),
};
