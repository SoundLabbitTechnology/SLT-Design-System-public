---
name: slt-motion-craft
description: >-
  Applies SLT Design System motion craft rules mapped to semantic motion tokens.
  Use when implementing, reviewing, or auditing UI animations, transitions,
  drawers, dialogs, toasts, press feedback, or when the user mentions motion,
  animation, easing, or prefers-reduced-motion in this repository.
---

# SLT Motion Craft

## Required reading (in order)

1. [docs/L1-foundations/motion-craft.md](../../../docs/L1-foundations/motion-craft.md) — SLT token mapping and non-negotiables
2. [docs/L1-foundations/spacing-motion.md](../../../docs/L1-foundations/spacing-motion.md) — token categories
3. Deep dive from vendored Emil skills under `.cursor/skills/` when needed

## Hard constraints (this repo)

- Prefer `var(--motion-duration-*)` and `var(--motion-easing-*)` over raw ms / cubic-bezier in product CSS
- Enter/exit UI → `--motion-easing-decelerate` (not accelerate / ease-in)
- Interactive waits stay on `fast` / `base`; never use `slow` to stall the user
- No `design-tokens/primitives.json`, no raw hex/px
- Honor `prefers-reduced-motion`
- Review findings as a markdown table: Before | After | Why

## Skill routing

| User intent | Skill folder |
|-------------|--------------|
| General polish / component feel | `emil-design-eng` |
| Strict review of motion in a diff | `review-animations` (+ `STANDARDS.md`) |
| Codebase-wide audit → plans only | `improve-animations` |
| Suggest what to animate (read-only) | `find-animation-opportunities` |
| Name an effect | `animation-vocabulary` |
| Springs / gestures / sheets | `apple-design` |
