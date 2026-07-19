import { TableOfContents } from "@soundlabbit/design-system/ui";

export default function TableOfContentsDemo() {
  return (
    <TableOfContents
      items={[
        { id: "intro", label: "はじめに", level: 2 },
        { id: "tokens", label: "トークン", level: 2 },
        { id: "colors", label: "色", level: 3 },
      ]}
    />
  );
}
