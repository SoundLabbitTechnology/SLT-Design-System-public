import type { ReactNode } from "react";
import { BottomNavigation } from "@soundlabbit/design-system/ui";

function NavIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="1.25em"
      height="1.25em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const homeIcon = (
  <NavIcon>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </NavIcon>
);

const searchIcon = (
  <NavIcon>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </NavIcon>
);

const bellIcon = (
  <NavIcon>
    <path d="M6 9a6 6 0 0 1 12 0c0 7 3 7 3 7H3s3 0 3-7" />
    <path d="M10 21a2 2 0 0 0 4 0" />
  </NavIcon>
);

const userIcon = (
  <NavIcon>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
  </NavIcon>
);

export default function BottomNavigationDemo() {
  return (
    <BottomNavigation
      items={[
        { label: "ホーム", href: "#", current: true, icon: homeIcon },
        { label: "検索", href: "#", icon: searchIcon },
        { label: "通知", href: "#", icon: bellIcon },
        { label: "マイページ", href: "#", icon: userIcon },
      ]}
    />
  );
}
