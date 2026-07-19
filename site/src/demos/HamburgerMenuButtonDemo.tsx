import { useState } from "react";
import { HamburgerMenuButton } from "@soundlabbit/design-system/ui";

export default function HamburgerMenuButtonDemo() {
  const [open, setOpen] = useState(false);
  return <HamburgerMenuButton open={open} onClick={() => setOpen((v) => !v)} />;
}
