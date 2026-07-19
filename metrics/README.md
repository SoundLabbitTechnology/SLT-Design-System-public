# metrics/

L3 operations の diff-only compliance proxy。

| Path | Role |
|------|------|
| `thresholds.json` | soft alert 閾値 |
| `history/YYYY-MM-DD.json` | `--save` で蓄積する週次スナップショット |
| `OVERRIDE_BACKLOG_TEMPLATE.md` | 3× override → backlog 起票テンプレ |

```bash
npm run metrics -- --since=1.week.ago --save
```

手順の正本: [L6 harness](../site/src/content/docs/L6-harness-and-loops.md#l3--operations-loop)
