import {
  createContext,
  useCallback,
  useContext,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";

type AccordionType = "single" | "multiple";

type AccordionContextValue = {
  type: AccordionType;
  openValues: Set<string>;
  toggle: (value: string) => void;
  baseId: string;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<{ value: string; open: boolean } | null>(null);

function useAccordion(component: string): AccordionContextValue {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error(`${component} must be used within <Accordion>`);
  return ctx;
}

function useAccordionItem(component: string) {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) throw new Error(`${component} must be used within <AccordionItem>`);
  return ctx;
}

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> {
  type?: AccordionType;
  /** single: 開いている value。multiple: 開いている value の配列 */
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  children: ReactNode;
}

function toSet(input: string | string[] | undefined): Set<string> {
  if (input == null) return new Set();
  return new Set(Array.isArray(input) ? input : [input]);
}

function fromSet(type: AccordionType, set: Set<string>): string | string[] {
  if (type === "single") return [...set][0] ?? "";
  return [...set];
}

export function Accordion({
  type = "multiple",
  value: valueProp,
  defaultValue,
  onValueChange,
  className,
  children,
  ...props
}: AccordionProps) {
  const baseId = useId();
  const controlled = valueProp !== undefined;
  const [uncontrolled, setUncontrolled] = useState(() => toSet(defaultValue));
  const openValues = controlled ? toSet(valueProp) : uncontrolled;

  const toggle = useCallback(
    (itemValue: string) => {
      const next = new Set(openValues);
      const isOpen = next.has(itemValue);
      if (type === "single") {
        next.clear();
        if (!isOpen) next.add(itemValue);
      } else if (isOpen) {
        next.delete(itemValue);
      } else {
        next.add(itemValue);
      }
      if (!controlled) setUncontrolled(next);
      onValueChange?.(fromSet(type, next));
    },
    [controlled, onValueChange, openValues, type],
  );

  return (
    <AccordionContext.Provider value={{ type, openValues, toggle, baseId }}>
      <div className={cn("slt-accordion", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
}

export function AccordionItem({ value, className, children, ...props }: AccordionItemProps) {
  const { openValues } = useAccordion("AccordionItem");
  const open = openValues.has(value);

  return (
    <AccordionItemContext.Provider value={{ value, open }}>
      <div
        className={cn("slt-accordion__item", open && "slt-accordion__item--open", className)}
        data-state={open ? "open" : "closed"}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export interface AccordionTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function AccordionTrigger({ className, children, ...props }: AccordionTriggerProps) {
  const { toggle, baseId } = useAccordion("AccordionTrigger");
  const { value, open } = useAccordionItem("AccordionTrigger");
  const triggerId = `${baseId}-trigger-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  return (
    <h3 className="slt-accordion__heading">
      <button
        type="button"
        id={triggerId}
        className={cn("slt-accordion__trigger", className)}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => toggle(value)}
        {...props}
      >
        <span className="slt-accordion__trigger-label">{children}</span>
        <span className="slt-accordion__icon" aria-hidden="true" />
      </button>
    </h3>
  );
}

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  forceMount?: boolean;
}

export function AccordionContent({
  className,
  children,
  forceMount = false,
  ...props
}: AccordionContentProps) {
  const { baseId } = useAccordion("AccordionContent");
  const { value, open } = useAccordionItem("AccordionContent");
  const triggerId = `${baseId}-trigger-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  if (!open && !forceMount) return null;

  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={triggerId}
      hidden={!open}
      className={cn("slt-accordion__content", className)}
      {...props}
    >
      <div className="slt-accordion__content-inner">{children}</div>
    </div>
  );
}
