# SLT Design Tokens

Sound Labbit Technology の DTCG token source（配布ミラー）です。

利用者向けの概念とコード例は Docs site の [トークン標準](../site/src/content/docs/L1-foundations/tokens.md) と
[用語と命名](../site/src/content/docs/L4-terminology.md) を正とします。

## 公開レイヤー

| Source | 役割 | アプリからの参照 |
|--------|------|------------------|
| `semantic.{brand}.{mode}.json` | 用途つきの共有語彙 | 可（生成 CSS / JSON 経由が標準） |
| `components.json` | 部品固有の決定 | 部品実装で参照可 |
| primitive source | ビルド内部の生値 | 参照しない |

## Theme matrix

| Theme | Mode | 既定 |
|-------|------|------|
| `ai-dash` | light / dark | dark |
| `sound-laboratory` | light / dark | dark |
| `slt-corporate` | dark | dark |
| `admin` | light | light |

変更は Private 正本で行い、本ミラーへ export します。外部からの PR は受け付けません。
