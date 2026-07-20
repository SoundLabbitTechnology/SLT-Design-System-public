import { MegaMenu } from "@soundlabbit/design-system/ui";

export default function MegaMenuDemo() {
  return (
    <MegaMenu
      items={[
        { label: "ホーム", href: "#", current: true },
        {
          label: "製品",
          sections: [
            {
              title: "サービス",
              links: [
                { label: "AI-DASH", href: "#", description: "業務向けダッシュボード" },
                { label: "Sound Laboratory", href: "#" },
              ],
            },
          ],
        },
        { label: "お問い合わせ", href: "#" },
      ]}
    />
  );
}
