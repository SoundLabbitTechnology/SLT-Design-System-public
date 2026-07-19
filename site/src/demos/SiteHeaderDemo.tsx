import { SiteHeader, SiteHeaderLink } from "@soundlabbit/design-system/ui";

export default function SiteHeaderDemo() {
  return (
    <div className="docs-site-header-stage">
      <SiteHeader
        logo={<strong>Product</strong>}
        nav={[
          <SiteHeaderLink key="home" href="#" active>
            ホーム
          </SiteHeaderLink>,
          <SiteHeaderLink key="docs" href="#">
            ドキュメント
          </SiteHeaderLink>,
        ]}
      />
    </div>
  );
}
