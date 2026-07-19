import { Radio, RadioGroup } from "@soundlabbit/design-system/ui";

export default function RadioDemo() {
  return (
    <div className="docs-field-stack">
      <RadioGroup legend="連絡方法" name="demo-contact">
        <Radio name="demo-contact" label="メール" value="email" defaultChecked />
        <Radio name="demo-contact" label="電話" value="phone" />
        <Radio name="demo-contact" label="あてはまるものはない" value="none" />
      </RadioGroup>
    </div>
  );
}
