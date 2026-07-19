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
    loader: glob({
      base: "./src/content/docs",
      pattern: [
        "L0-principles.md",
        "L3-patterns.md",
        "L4-content.md",
        "L4-terminology.md",
        "L5-quality.md",
        "L6-governance.md",
        "CONTRIBUTING.md",
        "DOCUMENTATION.md",
        "RELEASING.md",
      ],
    }),
  }),
  tokenGuides: defineCollection({
    loader: glob({
      base: "./src/content/docs/L1-foundations",
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
