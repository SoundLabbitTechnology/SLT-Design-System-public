# L2. コンポーネント完成の定義

文書番号: SLT-DS-001 §5.1

コンポーネントは実装だけでなく、利用判断、状態、アクセシビリティ、テスト、公開情報が揃ったときに完成とみなします。

## 1. Purpose と anatomy

- 解決する利用者 task と、使わない場面が書かれている。
- slots / subcomponents / content の境界が説明されている。
- 既存 component の variant では解けない理由がある。
- product 固有 logic を含めない。

## 2. API

- public props と型が `src/index.ts` から export される。
- native element の semantics と props を保つ。
- controlled / uncontrolled、default、event timing が明確である。
- boolean と variant の組み合わせが不正状態を作らない。
- Figma variant がある場合は [props mapping](./figma-props-mapping.md) と一致する。

## 3. States

該当する状態を実装し、Storybook で確認できるようにします。

| 基本 | 非同期 | Validation | Interaction |
|------|--------|------------|-------------|
| default | loading | error | hover |
| disabled | success | warning | active |
| empty | retry | valid | focus-visible |

すべての component にすべての状態を強制しません。該当しない状態を見た目だけ追加しないでください。

## 4. Token と theme

- semantic / component token だけを使う。
- `data-theme` / `data-color-mode` に追従する。
- component 内部の寸法を利用側の任意値に依存させない。
- light / dark と全対応 theme で content が読める。
- reduced motion で意味と操作を保つ。

## 5. Accessibility

- native semantics、accessible name、role、state が正しい。
- keyboard だけで操作でき、focus order と focus return が正しい。
- focus ring が全 theme で見える。
- target size は原則 44px 以上。
- error / feedback は色だけに依存しない。
- overlay は initial focus、trap、Escape、return focus を持つ。

詳細は [L5 品質基準](../L5-quality.md) を参照してください。

## 6. Storybook

- `Default` または代表 story がある。
- props / variants / states を過不足なく確認できる。
- keyboard や複雑な behavior は `play` test を持つ。
- Storybook docs に purpose と低レベル API の注意がある。
- visual regression 対象かを tier とリスクで判断する。

命名と構成は [Storybook 標準](./storybook.md) を正とします。

## 7. Public Docs site

各 component page に以下を含めます。

- 一文の purpose と tier
- live demo と最小コード
- 使う / 使わない、または Do/Don't
- public props の要約
- component token prefix（該当する場合）
- 関連 pattern / ADR / component へのリンク

API の全文を Markdown に複製せず、コードと Storybook に追従可能な粒度で要約します。

## 8. Verification

```bash
npm run check
npm run storybook:check
npm run docs:check
```

P0 または広い視覚影響がある変更は Chromatic 差分を確認します。release 前の全体基準は [RELEASING](../RELEASING.md) を参照してください。

## 特別な制約

- `danger` Button は cancel / undo / confirmation のいずれかと組み合わせる。
- **`primary` Button は 1 ビュー（画面または Dialog 内）に原則 1 つ**（Von Restorff / Hick — [ADR-004](../decisions/ADR-004-laws-of-ux.md)）。並置が必要なときは secondary / ghost に落とす。
- Button / Input 系 control は最小 44px の target を持つ（Fitts）。
- Form field は label↔control を近接させ、項目間は `slt-field-stack` で広く取る（Proximity）。
- 操作フィードバックの transition は `motion.duration.fast` / `base`（&lt;400ms）を使い、`slow` を待たせに使わない（Doherty）。
- モーションは [motion-craft](../L1-foundations/motion-craft.md) の頻度ゲート・decelerate 優先・GPU 制約・reduced motion を満たす。
- `BrandBackground` を優先し、低レベル background を product 側で再実装しない。
- sample や page template を `@soundlabbit/design-system/ui` から export しない。
