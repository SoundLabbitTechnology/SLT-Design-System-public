# Override → backlog template

同一種類の token / CSS override が **3 回以上**（`@harness-allow` 含む）観測されたときに起票する。

## Issue title

`[Tokens|Components|Patterns] <短い現象> の 3× override → 正本候補`

## Body

```markdown
## Signal
- metrics run: <YYYY-MM-DD / compare range>
- exceptionLines or rawValueViolationLines: <n>
- representative files:
  - `path/a`
  - `path/b`
  - `path/c`

## Pattern
同じ逸脱の種類（例: 同系の arbitrary width、同色の raw hex、同コンポーネントの局所上書き）:

## Proposed ratchet
- [ ] semantic / component token 追加
- [ ] L2 component API 拡張
- [ ] L3 pattern 文書化
- [ ] harness rule（G1 等）追加

## Evidence
- `metrics/history/<date>.json`
- related PRs / consumer repos

## Non-goals
一度きりの例外、期限付き `@harness-allow` で足りるもの。
```

参照: [L6 harness L3](../docs/L6-harness-and-loops.md#l3--operations-loop) / [ADR-004](../docs/decisions/ADR-004-laws-of-ux.md) は UX 参照。本テンプレは token/compliance の ratchet。
