import {
  createContext,
  useCallback,
  useContext,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";

type TabsContextValue = {
  value: string;
  setValue: (next: string) => void;
  baseId: string;
  orientation: "horizontal" | "vertical";
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error(`${component} must be used within <Tabs>`);
  return ctx;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  children: ReactNode;
}

export function Tabs({
  value: valueProp,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  className,
  children,
  ...props
}: TabsProps) {
  const baseId = useId();
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? "");
  const controlled = valueProp !== undefined;
  const value = controlled ? (valueProp as string) : uncontrolled;

  const setValue = useCallback(
    (next: string) => {
      if (!controlled) setUncontrolled(next);
      onValueChange?.(next);
    },
    [controlled, onValueChange],
  );

  return (
    <TabsContext.Provider value={{ value, setValue, baseId, orientation }}>
      <div
        className={cn(
          "slt-tabs",
          orientation === "vertical" && "slt-tabs--vertical",
          className,
        )}
        data-orientation={orientation}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function TabList({ className, children, onKeyDown, ...props }: TabListProps) {
  const { orientation, setValue } = useTabsContext("TabList");

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const list = event.currentTarget;
    const tabs = Array.from(
      list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
    );
    if (tabs.length === 0) return;

    const active = document.activeElement as HTMLElement | null;
    const index = Math.max(
      0,
      tabs.findIndex((tab) => tab === active || tab.contains(active)),
    );
    const horizontal = orientation === "horizontal";
    let nextIndex: number | null = null;

    if ((horizontal && event.key === "ArrowRight") || (!horizontal && event.key === "ArrowDown")) {
      nextIndex = (index + 1) % tabs.length;
    } else if (
      (horizontal && event.key === "ArrowLeft") ||
      (!horizontal && event.key === "ArrowUp")
    ) {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex === null) return;
    event.preventDefault();
    const next = tabs[nextIndex];
    const nextValue = next.getAttribute("data-slt-tab");
    if (!nextValue) return;
    setValue(nextValue);
    next.focus();
  };

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={cn("slt-tabs__list", className)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </div>
  );
}

export interface TabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: string;
  children: ReactNode;
}

export function Tab({ value, className, disabled, children, ...props }: TabProps) {
  const { value: selected, setValue, baseId } = useTabsContext("Tab");
  const selectedTab = selected === value;
  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  return (
    <button
      type="button"
      role="tab"
      id={tabId}
      data-slt-tab={value}
      aria-selected={selectedTab}
      aria-controls={panelId}
      tabIndex={selectedTab ? 0 : -1}
      disabled={disabled}
      className={cn("slt-tabs__tab", selectedTab && "slt-tabs__tab--selected", className)}
      onClick={() => {
        if (!disabled) setValue(value);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
  /** 非選択時も DOM に残す（既定は非選択でアンマウント） */
  forceMount?: boolean;
}

export function TabPanel({
  value,
  className,
  children,
  forceMount = false,
  ...props
}: TabPanelProps) {
  const { value: selected, baseId } = useTabsContext("TabPanel");
  const selectedPanel = selected === value;
  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  if (!selectedPanel && !forceMount) return null;

  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      hidden={!selectedPanel}
      tabIndex={0}
      className={cn("slt-tabs__panel", className)}
      {...props}
    >
      {children}
    </div>
  );
}
