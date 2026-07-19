import type { Meta, StoryObj } from "@storybook/react-vite";
import { storyParameters } from "../../../.storybook/story-meta";
import { BrandBackground } from "./BrandBackground";

const meta = {
  title: "SLT Design System/L2 Components/P1/BrandBackground",
  component: BrandBackground,
  tags: ["autodocs"],
  parameters: storyParameters("P1", "BrandBackground", "fullscreen"),
  argTypes: {
    brand: {
      control: "select",
      options: ["ai-dash", "sound-laboratory", "slt-corporate"],
    },
  },
} satisfies Meta<typeof BrandBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 3D wave mesh — AI-DASH */
export const AiDash: Story = {
  args: { brand: "ai-dash" },
  globals: { theme: "ai-dash", colorMode: "dark" },
};

/** 2D graph-paper grid + parallax — Sound Laboratory 公式サイト準拠 */
export const SoundLaboratory: Story = {
  args: { brand: "sound-laboratory" },
  globals: { theme: "sound-laboratory", colorMode: "light" },
};

export const SoundLaboratoryDark: Story = {
  args: { brand: "sound-laboratory" },
  globals: { theme: "sound-laboratory", colorMode: "dark" },
};

/** 3D wave mesh — SLT Corporate */
export const SltCorporate: Story = {
  args: { brand: "slt-corporate" },
  globals: { theme: "slt-corporate", colorMode: "dark" },
};
