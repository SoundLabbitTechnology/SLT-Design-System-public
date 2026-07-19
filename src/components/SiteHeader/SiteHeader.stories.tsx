import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { storyParameters } from "../../../.storybook/story-meta";
import { BRAND_DISPLAY_NAMES } from "../../lib/brand-labels";
import { Button } from "../Button/Button";
import { SiteHeader, SiteHeaderLink } from "./SiteHeader";

const meta = {
  title: "SLT Design System/L2 Components/P1/SiteHeader",
  component: SiteHeader,
  tags: ["autodocs"],
  parameters: storyParameters("P1", "SiteHeader", "fullscreen"),
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleNav = (
  <>
    <SiteHeaderLink href="#home" active>
      ホーム
    </SiteHeaderLink>
    <SiteHeaderLink href="#features">機能</SiteHeaderLink>
    <SiteHeaderLink href="#pricing">料金</SiteHeaderLink>
  </>
);

export const Marketing: Story = {
  name: "Marketing (LP)",
  args: {
    logo: <a href="#home">{BRAND_DISPLAY_NAMES["sound-laboratory"]}</a>,
    nav: (
      <>
        <SiteHeaderLink href="#home" active variant="marketing">
          Home
        </SiteHeaderLink>
        <SiteHeaderLink href="#about" variant="marketing">
          About
        </SiteHeaderLink>
        <SiteHeaderLink href="#contents" variant="marketing">
          Contents
        </SiteHeaderLink>
        <SiteHeaderLink href="#projects" variant="marketing">
          Projects
        </SiteHeaderLink>
        <SiteHeaderLink href="#contact" variant="marketing">
          Contact
        </SiteHeaderLink>
      </>
    ),
    variant: "marketing",
  },
};

export const Default: Story = {
  args: {
    logo: <a href="#home">{BRAND_DISPLAY_NAMES["ai-dash"]}</a>,
    nav: sampleNav,
    actions: <Button variant="primary">ログイン</Button>,
  },
};

export const LogoOnly: Story = {
  args: {
    logo: <a href="#home">{BRAND_DISPLAY_NAMES["sound-laboratory"]}</a>,
  },
};

export const WithNavOnly: Story = {
  args: {
    logo: <a href="#home">{BRAND_DISPLAY_NAMES["slt-corporate"]}</a>,
    nav: sampleNav,
  },
};

export const MobileDrawer: Story = {
  args: {
    logo: <a href="#home">{BRAND_DISPLAY_NAMES["ai-dash"]}</a>,
    nav: sampleNav,
    actions: (
      <>
        <Button variant="secondary">お問い合わせ</Button>
        <Button variant="primary">始める</Button>
      </>
    ),
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const menuBtn = canvas.getByRole("button", { name: "メニューを開く" });
    await userEvent.click(menuBtn);
    await expect(canvas.getByRole("navigation", { name: "モバイルメニュー" })).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "メニューを閉じる" }));
    await expect(canvas.queryByRole("navigation", { name: "モバイルメニュー" })).toBeNull();
  },
};
