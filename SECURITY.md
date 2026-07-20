# セキュリティ方針

## 報告

脆弱性や秘密情報の漏洩が疑われる場合は、**Public リポジトリの Issue に書かないでください。**

Sound Labbit Technology 社内メンバーは、次のいずれかで Private リポジトリ側へ報告してください。

1. Private リポジトリ（`SLT-Design-System`）の **Security advisory**（GitHub）
2. 社内のセキュリティ担当 / DS Facilitator への直接連絡

外部の方は、契約上の窓口または製品サポート経由で社内担当へ取り次いでください。Public ミラー（`SLT-Design-System-public`）では Issue を受け付けていません。

## 公開面について

- Public ミラーは配布用スナップショットです。貢献（PR）は社内の Private 正本のみです。
- Docs site（GitHub Pages）は静的配信です。秘密鍵や認証情報をドキュメントやサンプルに含めません。
- 依存関係の更新は Dependabot（Public）および社内 CI で監視します。

## 対応方針

報告を受けた owner は影響範囲を切り分け、必要なら Private で修正 → Public へ export / tag 更新の順で反映します。既存 tag は上書きしません。
