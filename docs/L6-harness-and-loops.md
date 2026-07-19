# L6. ハーネスと4重ループ

文書番号: SLT-DS-001 §9.1

AI と人間が、同じ失敗を繰り返さず設計知識を正本へ戻すための品質ループです。

## 全体像

```text
L1 Generation（変更ごと）
  build → code/token/story/docs gates → 修正 → green
        ↓
L2 Integration（PR / main）
  static artifacts → visual diff → human review → publish
        ↓
L3 Operations（週次 / release）
  exceptions / compliance / adoption → backlog or ratchet rule
        ↓
L4 Principles（四半期）
  evidence → L0 strategic principles の反証 → investment decision
```

各ループの出力が次のループの入力になります。失敗をコメントだけで回避せず、token、component、pattern、documentation、gate のいずれかへ知識を戻します。

## L1 — Generation loop

### コマンド

| Command | 使う時点 | 内容 |
|---------|----------|------|
| `npm run check:fast` | 実装中 | build + G0/G1/G2 + docs contract + isotc |
| `npm run check` | handoff 前 | fast の内容 + G3 Storybook / a11y |
| `npm run check:docs` | 文書同期だけ確認 | links、canonical docs、version、component/story/site/nav |
| `npm run test:stories` | interaction の反復 | G3 のみ |
| `npm run check:g4` | visual diff を明示実行 | G4、token 必須 |

`check:fast` も build を先に行います。生成物の古さで gate を誤判定しないためです。

### Gate

| Gate | 実装 | 契約 |
|------|------|------|
| G0 Token | `gate-g0-tokens.mjs` | reference 解決、semantic key parity、raw value 禁止、dist |
| G1 Source | `gate-g1-no-raw-values.mjs` | `src/` / `styles/` の raw color と arbitrary value 禁止 |
| G2 Types | token type generation + `tsc` | token key と public TypeScript の整合 |
| G3 Story | Vitest browser + Storybook | render、axe、play interaction |
| Docs contract | `gate-docs.mjs` | local links、必須正本、version、component/story/site/nav/public route |
| Structure | `isotc verify` | layer dependency と構造 |
| G4 Visual | Chromatic | P0 + Landing Canvas の visual baseline |
| G5 Product | consumer repository | Lighthouse / E2E / 実データ |

Docs contract は新しい番号 gate ではなく、すべての layer を公開面までつなぐ横断契約です。

### 自己修正手順

1. 最初に失敗した gate と `file:line` を読む。
2. `Fix:` がある場合、その意図を満たす最小の正本変更を行う。
3. 生成物を直接編集せず、source を直す。
4. 失敗した小さい command で再確認する。
5. 最後に元の `check:fast` または `check` を再実行する。

| Exit | 意味 | 対応 |
|------|------|------|
| 0 | green | 次の loop へ進む |
| 1 | build / test / contract failure | 出力の最初の原因を修正 |
| 2 | isotc の修正可能な構造違反 | `Fix:` を読み自己修正 |

同じ理由で 2 回失敗したら、場当たり的な修正ではなく正本・rule・前提を再確認します。

## L2 — Integration loop

CI の `npm run ci` は以下を行います。

1. `npm run check` で package と正本の契約を検証する。
2. Storybook static artifact を build する。
3. Docs site static artifact を build する。
4. 別 workflow の Chromatic で visual diff を作る。
5. 人間が L0、visual、content、breaking impact をレビューする。

自動化の責務は再現可能な規則、人間の責務は審美、文脈、戦略、意図した差分です。

### 公開 artifact

| Artifact | Gate | Review |
|----------|------|--------|
| package / CSS / types | G0〜G2、isotc | API と SemVer |
| Storybook | G3、static build、G4 | state、interaction、visual |
| Docs site | docs contract、static build | task completion、navigation、content |

## G4 — Chromatic

| 項目 | 現行契約 |
|------|----------|
| Baseline | P0 component + Landing Canvas |
| CI | `.github/workflows/chromatic.yml` |
| Local | `CHROMATIC_PROJECT_TOKEN=… npm run check:g4` |
| PR | 意図しない差分があれば failure |
| main | 承認済み baseline を更新 |

P1 / P2 を対象外にすることは品質免除ではありません。高リスク化した component は snapshot 対象へ昇格します。

## G5 — 代表消費者プロダクト

| 項目 | 現行契約 |
|------|----------|
| 実行場所 | 消費者リポジトリ（DS 本体の `check` には含めない） |
| 代表 | アプリ型・LP 型の P1 |
| 検証 | Lighthouse CI（performance / a11y / CWV）+ E2E smoke 最小 3 本 |
| Cadence | PR gate（目標）、release 前、週次 L3 と併用 |
| 正本 | [`templates/consumer-g5/`](../templates/consumer-g5/)（#37） |
| テンプレ | 同上 |

失敗時の DS vs product ownership とエスカレーションは Runbook が正本。L3 の `npm run metrics`（#4）は diff-only の token compliance proxy — G5 と併用して採用・実画面品質を見る。

## L3 — Operations loop

### 週次 Runbook（手動）

| Step | Command / action |
|------|------------------|
| 1 | `npm run metrics -- --since=1.week.ago --save` |
| 2 | JSON の `alerts` と `trend` を読む（`metrics/history/YYYY-MM-DD.json`） |
| 3 | `rawValueViolationLines` / 低 `tokenComplianceProxy` → PR または G1 修正候補を issue 化 |
| 4 | 同一種類の override が 3 回以上 → [`metrics/OVERRIDE_BACKLOG_TEMPLATE.md`](../metrics/OVERRIDE_BACKLOG_TEMPLATE.md) で backlog |
| 5 | consumer の採用・例外を定性メモ（issue コメント可）。G5 失敗があれば [`templates/consumer-g5/`](../templates/consumer-g5/) と DS / product 責務で切り分け |
| 6 | release 週は加えて Chromatic 失敗・未文書 API・exception allow の期限を確認 |

```bash
npm run metrics
npm run metrics -- --since=1.week.ago --save
npm run metrics -- --base=origin/main
```

変更差分から semantic token reference と raw value violation の **proxy** を出力します。閾値は [`metrics/thresholds.json`](../metrics/thresholds.json)。alert があっても L1 gate は fail しません（soft signal）。

| Metric | 意味 |
|--------|------|
| `tokenComplianceProxy` | `tokenRefs / (tokenRefs + rawViolations)`。分母 0 なら `null` |
| `rawValueViolationLines` | 追加行の raw hex / Tailwind arbitrary |
| `exceptionLines` | `@harness-allow` 追加行 |
| `designSystemImportLines` | `@soundlabbit/design-system/ui` 参照追加（adoption の粗い proxy） |
| `alerts` | 閾値割れの soft warn |
| `trend` | 直近 `metrics/history/` との差分 |

release / 週次ごとに、例外、visual failure、consumer feedback、未文書 API を確認し、次のいずれかへ変換します。

- 一度だけの修正: issue / patch。
- 再発する逸脱: harness rule を追加。
- 3 回以上の override: token / component / pattern 候補（テンプレ起票）。
- 複数 product の利用: adoption metric と昇格判断。

metric は評価目的ではなく、設計システムの不足を見つける signal として使います。
## L4 — Principles loop

四半期に [公開 L0 恒常原則](./L0-principles.md) と Laws of UX 対応、公開文書の機微混入を確認します。a11y 最低ラインは短期指標で引き下げません。事業戦略・投資の反証は社内方針文書（本ミラー・site 非掲載）で行います。

| 問い（公開リポ） | 証拠 |
|------|------|
| 恒常原則 A と DoD / 実装にずれはないか | Storybook、監査、issue |
| Laws of UX アンカーに追随漏れはないか | [ADR-004](./decisions/ADR-004-laws-of-ux.md) |
| 公開ドキュメントに社内戦略・PII が混入していないか | [DOCUMENTATION](./DOCUMENTATION.md) / [MIRROR](./MIRROR.md) |

結果は date 付き audit または ADR に残し、変更する場合は公開 L0 から downstream docs、token、component、gate へ反映します。

手順・参加者・アジェンダ・DADS 同期は [L6 四半期ガバナンス Runbook](./L6-governance.md#四半期ガバナンスクラスタ)（#17 / #35）が正本。

## Ratchet rule

1. 新しい逸脱を見つけたら、最も早い loop で検出する rule を一つ追加する。
2. allow marker は reason、issue、期限を必須にする。
3. 既存違反を一括許可せず、baseline と新規違反を分ける。
4. gate が誤検知する場合も削除せず、契約を明確化して test case を残す。

関連: [ガバナンス](./L6-governance.md) / [CONTRIBUTING](./CONTRIBUTING.md) / [DOCUMENTATION](./DOCUMENTATION.md)
