import { Heading } from "@soundlabbit/design-system/ui";

export default function HeadingDemo() {
  return (
    <div className="docs-field-stack">
      <Heading as={1}>ページ見出し</Heading>
      <Heading as={2}>セクション見出し</Heading>
      <Heading as={3}>小見出し</Heading>
    </div>
  );
}
