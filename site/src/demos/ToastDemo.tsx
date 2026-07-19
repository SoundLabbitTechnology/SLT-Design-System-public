import { Button, ToastProvider, useToast } from "@soundlabbit/design-system/ui";

function ToastButtons() {
  const { toast } = useToast();

  return (
    <div className="docs-demo-row">
      <Button variant="secondary" onClick={() => toast({ title: "保存しました", variant: "success" })}>
        成功
      </Button>
      <Button variant="secondary" onClick={() => toast({ title: "通信が不安定です", variant: "warning" })}>
        警告
      </Button>
      <Button variant="secondary" onClick={() => toast({ title: "保存に失敗しました", variant: "danger" })}>
        エラー
      </Button>
    </div>
  );
}

export default function ToastDemo() {
  return (
    <ToastProvider>
      <ToastButtons />
    </ToastProvider>
  );
}
