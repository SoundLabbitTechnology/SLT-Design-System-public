import type { Meta, StoryObj } from "@storybook/react-vite";
import { storyParameters } from "../../../.storybook/story-meta";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "./DescriptionList";

const meta = {
  title: "SLT Design System/L2 Components/P1/DescriptionList",
  component: DescriptionList,
  tags: ["autodocs"],
  parameters: storyParameters("P1", "DescriptionList", "padded"),
} satisfies Meta<typeof DescriptionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: null },
  render: () => (
    <DescriptionList>
      <DescriptionTerm>申請者</DescriptionTerm>
      <DescriptionDetails>山田 太郎</DescriptionDetails>
      <DescriptionTerm>受付日</DescriptionTerm>
      <DescriptionDetails>2026年7月16日</DescriptionDetails>
      <DescriptionTerm>状態</DescriptionTerm>
      <DescriptionDetails>審査中</DescriptionDetails>
    </DescriptionList>
  ),
};
