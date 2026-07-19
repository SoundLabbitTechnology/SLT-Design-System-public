import type { Meta, StoryObj } from "@storybook/react-vite";
import { storyParameters } from "../../../.storybook/story-meta";
import { BRAND_BACKGROUNDS } from "../brand-backgrounds";
import { GridBackground } from "./GridBackground";

const soundLaboratory = BRAND_BACKGROUNDS["sound-laboratory"];

if (soundLaboratory.kind !== "grid") {
  throw new Error("sound-laboratory must provide a grid background");
}

const meta = {
  title: "SLT Design System/L2 Components/P1/GridBackground",
  component: GridBackground,
  tags: ["autodocs"],
  parameters: {
    ...storyParameters("P1", "GridBackground", "fullscreen"),
    docs: {
      description: {
        component:
          "Low-level Sound Laboratory grid treatment. Prefer BrandBackground when the active brand should select the background automatically.",
      },
    },
  },
  args: {
    spec: soundLaboratory.grid,
  },
  argTypes: {
    spec: { control: false },
    colorMode: {
      control: "radio",
      options: ["light", "dark"],
    },
  },
} satisfies Meta<typeof GridBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: { colorMode: "light" },
  globals: { theme: "sound-laboratory", colorMode: "light" },
};

export const Dark: Story = {
  args: { colorMode: "dark" },
  globals: { theme: "sound-laboratory", colorMode: "dark" },
};
