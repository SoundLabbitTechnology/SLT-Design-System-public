import type { Meta, StoryObj } from "@storybook/react-vite";
import { storyParameters } from "../../../.storybook/story-meta";
import { WaveBackground } from "./WaveBackground";

const meta = {
  title: "SLT Design System/L2 Components/P1/WaveBackground",
  component: WaveBackground,
  tags: ["autodocs"],
  parameters: {
    ...storyParameters("P1", "WaveBackground", "fullscreen"),
    docs: {
      description: {
        component:
          "Low-level 3D wave mesh (canvas). Prefer `BrandBackground` for brand-aware backgrounds — Sound Laboratory uses grid, not wave.",
      },
    },
  },
  argTypes: {
    palette: {
      control: "select",
      options: ["ai-dash", "slt-corporate"],
    },
  },
} satisfies Meta<typeof WaveBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AiDash: Story = {
  args: { palette: "ai-dash" },
};

export const SltCorporate: Story = {
  args: { palette: "slt-corporate" },
  globals: {
    theme: "slt-corporate",
    colorMode: "dark",
  },
};
