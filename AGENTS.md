# AGENTS.md — SLT Design System

Cursor / Copilot 等のエージェント向けルール。詳細は [CLAUDE.md](./CLAUDE.md) と同一。

**Version**: v0.4.5

## Quick Rules

1. **Semantic tokens only** — `var(--color-surface-primary)`, not `#0F172A`
2. **Do not read** `design-tokens/primitives.json`（ビルド用に同梱。AI は値を使わない）
3. **After changes**: `npm run check` (iterate: `npm run check:fast`)
4. **Theme**: `data-theme` + `data-color-mode` on `<html>`
5. **No** `--spacing-*` in Tailwind `@theme`

## Token Sources

```
design-tokens/
├── semantic.ai-dash.{light,dark}.json    ← AI may read
├── semantic.sound-laboratory.{light,dark}.json
├── semantic.slt-corporate.dark.json
├── semantic.admin.light.json
├── components.json                       ← AI may read
└── primitives.json                       ← shipped for build; AI must not read values
```

## Default Theme

- Brand: `ai-dash`
- Mode: `dark`
- CSS: `dist/slt-tokens.css` or `dist/ai-dash/dark/tokens.css`

## UI Components (`@soundlabbit/design-system/ui`)

| Tier | Components |
|------|------------|
| P0 | Button, Input, Textarea, Card, Dialog, Badge, Checkbox, Radio, Select, Switch, Heading, Divider, NoticeBlock |
| P1 | BrandBackground, WaveBackground, GridBackground, Toast, SiteHeader, Breadcrumb, Tabs, Accordion, Disclosure, List, DescriptionList, Blockquote, Chip, PageNavigation, StepNavigation, ProgressIndicator, SearchBox |
| P2 | Skeleton, Table (DataTable), ScrollTopButton, UtilityLink, HamburgerMenuButton, Drawer, FileUpload, TableOfContents, ResourceList, Image, HorizontalMenu, MenuList, BottomNavigation, MobileMenu |

Index: [docs/L2-components/README.md](./docs/L2-components/README.md)

## Component Constraints

- `button.danger` → always pair with cancel button
- Min height 44px for buttons/inputs
- WCAG 2.2 AA focus rings
- Motion: [docs/L1-foundations/motion-craft.md](./docs/L1-foundations/motion-craft.md)（頻度ゲート、decelerate、GPU、reduced motion）

## Documentation

| Layer | Path |
|-------|------|

| L1 | docs/L1-foundations/（含 [motion-craft](./docs/L1-foundations/motion-craft.md)） |
| L2 | docs/L2-components/ |
| L3-L6 | docs/L3-patterns.md 〜 L6-governance.md / L6-harness-and-loops.md |
| Motion source | docs/reference/emilkowalski-skills/ |
| Docs site | `npm run docs:dev` → site/（当面ローカルのみ。[site/README.md](./site/README.md)） |
| Roadmap | docs/ROADMAP.md |
| Authoring | docs/CONTRIBUTING.md / docs/DOCUMENTATION.md |

## Spacing Warning

Tailwind v4: custom `--spacing-md` in `@theme` breaks `max-w-md`. Use Tailwind defaults or `--space-*` vars.
