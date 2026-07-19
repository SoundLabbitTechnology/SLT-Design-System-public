import { Textarea } from "@soundlabbit/design-system/ui";

export default function TextareaDemo() {
  return (
    <div className="docs-field-stack">
      <Textarea label="お問い合わせ内容" hint="1000文字以内でご記入ください" rows={4} />
    </div>
  );
}
