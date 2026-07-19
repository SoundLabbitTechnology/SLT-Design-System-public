# AGENTS.md — SLT Design System

Cursor / Copilot 等のエージェント向け最短ルール。詳細は [CLAUDE.md](./CLAUDE.md)。

**Version**: v0.4.5

## Quick Rules

1. **Semantic tokens only** — `var(--color-surface-primary)`, not `#0F172A`
2. **Do not read** `design-tokens/primitives.json`（ビルド用に同梱。AI は値を使わない）
3. **After changes**: `npm run check` (iterate: `npm run check:fast`)
4. **Theme**: `data-theme` + `data-color-mode` on `<html>`
5. **No** `--spacing-*` in Tailwind `@theme`
6. **Public docs** = Docs site only — `docs/` は `DOC_ROUTES` / site content から辿れるものに限る

## Token Sources

```
design-tokens/
├── semantic.*.json   ← AI may read
├── components.json   ← AI may read
└── primitives.json   ← shipped for build; AI must not read values
```

## Default Theme

- Brand: `ai-dash` / Mode: `dark`
- CSS: `dist/slt-tokens.css` or `dist/ai-dash/dark/tokens.css`

## Components

`import { … } from '@soundlabbit/design-system/ui'` — 一覧は Docs site `/components/` または Storybook。

- `button.danger` → pair with cancel
- Min height 44px, WCAG 2.2 AA focus rings
- Motion: [docs/L1-foundations/motion-craft.md](./docs/L1-foundations/motion-craft.md); deep dive `.cursor/skills/`

## Docs entry

`npm run docs:dev` → [site/README.md](./site/README.md). Index: [docs/README.md](./docs/README.md).

## Spacing Warning

Tailwind v4: custom `--spacing-md` in `@theme` breaks `max-w-md`. Use Tailwind defaults or `--space-*` vars.
