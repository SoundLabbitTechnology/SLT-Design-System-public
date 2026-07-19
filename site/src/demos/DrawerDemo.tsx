import { Button, Drawer } from "@soundlabbit/design-system/ui";

export default function DrawerDemo() {
  return (
    <Drawer
      title="設定"
      description="表示や通知の設定を変更できます。"
      trigger={<Button variant="secondary">ドロワーを開く</Button>}
    >
      <p>ドロワー本文のコンテンツです。</p>
    </Drawer>
  );
}
