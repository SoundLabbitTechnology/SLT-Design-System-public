import { SiteHeader, SiteHeaderLink } from "@soundlabbit/design-system/ui";
import ThemeSwitcher from "./ThemeSwitcher";

export interface HeaderNavProps {
  currentPath: string;
  base: string;
}

const TOP_LINKS = [
  { label: "スタイル", href: "/foundations/" },
  { label: "コンポーネント", href: "/components/" },
  { label: "ガイドライン", href: "/guidelines/" },
];

export default function HeaderNav({ currentPath, base }: HeaderNavProps) {
  const withBase = (href: string) => `${base.replace(/\/$/, "")}${href}`;

  return (
    <SiteHeader
      contentMaxWidth="var(--docs-content-max)"
      logo={
        <a href={withBase("/")}>
          <strong>SLT Design System</strong>
        </a>
      }
      nav={TOP_LINKS.map((link) => (
        <SiteHeaderLink
          key={link.href}
          href={withBase(link.href)}
          active={currentPath.startsWith(link.href)}
        >
          {link.label}
        </SiteHeaderLink>
      ))}
      actions={<ThemeSwitcher />}
    />
  );
}
