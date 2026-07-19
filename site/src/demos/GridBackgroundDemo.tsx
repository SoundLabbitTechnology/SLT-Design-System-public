import { BRAND_BACKGROUNDS, GridBackground } from "@soundlabbit/design-system/ui";

const soundLabEntry = BRAND_BACKGROUNDS["sound-laboratory"];

export default function GridBackgroundDemo() {
  if (soundLabEntry.kind !== "grid") return null;

  return (
    <div className="docs-bg-stage">
      <GridBackground spec={soundLabEntry.grid} colorMode="light" />
    </div>
  );
}
