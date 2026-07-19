import type { Preview } from "@storybook/react-vite";
import "../dist/slt-tokens.css";
import "../styles/components.css";

/** slt-corporate は semantic.dark のみ。Storybook で Light 選択時は :root 固定 — tokens.md 参照 */
const preview: Preview = {
  parameters: {
    layout: "padded",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: import.meta.env.VITEST || import.meta.env.CI ? "error" : "todo",
    },
    docs: {
      toc: true,
    },
    backgrounds: {
      grid: { disable: true },
    },
    options: {
      storySort: {
        order: [
          "SLT Design System",
          ["Introduction", "L1 Foundations", "Samples", "L2 Components"],
          "Samples",
          ["Landing Canvas"],
          "L2 Components",
          ["P0", "P1", "P2"],
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      description: "ブランドテーマ",
      toolbar: {
        title: "Theme",
        items: [
          { value: "ai-dash", title: "AI-DASH" },
          { value: "sound-laboratory", title: "Sound Laboratory" },
          { value: "slt-corporate", title: "SLT Corporate" },
          { value: "admin", title: "Admin" },
        ],
        dynamicTitle: true,
      },
    },
    colorMode: {
      description: "カラーモード",
      toolbar: {
        title: "Mode",
        items: [
          { value: "dark", title: "Dark" },
          { value: "light", title: "Light" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "ai-dash",
    colorMode: "dark",
    // Storybook のレイアウト用グリッド（縦線のみ）と方眼紙背景が混同されないよう既定で OFF
    backgrounds: { grid: false },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as string) ?? "ai-dash";
      const colorMode = (context.globals.colorMode as string) ?? "dark";
      const layout = (context.parameters.layout as string) ?? "padded";

      const isFullscreen = layout === "fullscreen";
      const isCentered = layout === "centered";

      const fontFamily =
        theme === "slt-corporate"
          ? "var(--font-family-corporate, system-ui, sans-serif)"
          : theme === "admin"
            ? "var(--font-family-admin, system-ui, sans-serif)"
            : "var(--font-family-display, system-ui, sans-serif)";

      return (
        <div
          data-theme={theme}
          data-color-mode={colorMode}
          style={{
            minHeight: "100vh",
            padding: isFullscreen ? 0 : "2rem",
            display: isCentered ? "flex" : "block",
            alignItems: isCentered ? "center" : undefined,
            justifyContent: isCentered ? "center" : undefined,
            background: "var(--color-surface-primary)",
            color: "var(--color-text-primary)",
            fontFamily,
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
