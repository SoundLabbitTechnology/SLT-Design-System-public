import { Button, Chip, TableControls } from "@soundlabbit/design-system/ui";

export default function TableControlsDemo() {
  return (
    <TableControls
      title="12 件"
      search={{ label: "検索", placeholder: "名前で検索" }}
      actions={<Button variant="primary">追加</Button>}
    >
      <Chip selected>有効</Chip>
      <Chip>下書き</Chip>
    </TableControls>
  );
}
