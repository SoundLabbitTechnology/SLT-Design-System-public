import { Button, Dialog } from "@soundlabbit/design-system/ui";

export default function DialogDemo() {
  return (
    <Dialog
      trigger={<Button variant="danger">削除する</Button>}
      title="本当に削除しますか？"
      description="この操作は取り消せません。関連するデータもすべて削除されます。"
      destructive
      confirmLabel="削除する"
      cancelLabel="キャンセル"
      onConfirm={() => {}}
    />
  );
}
