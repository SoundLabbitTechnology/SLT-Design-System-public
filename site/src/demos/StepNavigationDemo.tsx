import { StepNavigation } from "@soundlabbit/design-system/ui";

export default function StepNavigationDemo() {
  return (
    <StepNavigation
      current={2}
      steps={[
        { label: "申請内容", description: "基本情報の入力" },
        { label: "確認", description: "内容の確認" },
        { label: "完了", description: "受付完了" },
      ]}
    />
  );
}
