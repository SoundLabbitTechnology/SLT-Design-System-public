"use client";

// src/components/Button/Button.tsx
import { Slot } from "@radix-ui/react-slot";

// src/lib/cn.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Button/Button.tsx
import { jsx } from "react/jsx-runtime";
function Button({
  variant = "primary",
  asChild = false,
  loading = false,
  disabled,
  className,
  children,
  type = "button",
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      type: asChild ? void 0 : type,
      className: cn(
        "slt-btn",
        `slt-btn--${variant}`,
        loading && "slt-btn--loading",
        className
      ),
      disabled: disabled || loading,
      "aria-busy": loading || void 0,
      ...props,
      children
    }
  );
}

// src/components/Input/Input.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function Input({
  label,
  hint,
  error = false,
  errorMessage,
  layout = "vertical",
  id,
  className,
  "aria-describedby": ariaDescribedBy,
  ...props
}) {
  const inputId = id ?? (label ? `slt-input-${label.replace(/\s+/g, "-").toLowerCase()}` : void 0);
  const hintId = hint && inputId ? `${inputId}-hint` : void 0;
  const errorId = errorMessage && inputId ? `${inputId}-error` : void 0;
  const describedBy = [ariaDescribedBy, hintId, errorId].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ jsxs("div", { className: cn("slt-field", layout === "horizontal" && "slt-field--horizontal"), children: [
    label ? /* @__PURE__ */ jsx2("label", { className: "slt-field__label", htmlFor: inputId, children: label }) : null,
    /* @__PURE__ */ jsx2(
      "input",
      {
        id: inputId,
        className: cn("slt-input", error && "slt-input--error", className),
        "aria-invalid": error || void 0,
        "aria-describedby": describedBy,
        ...props
      }
    ),
    errorMessage ? /* @__PURE__ */ jsx2("span", { id: errorId, className: "slt-field__error", role: "alert", children: errorMessage }) : hint ? /* @__PURE__ */ jsx2("span", { id: hintId, className: "slt-field__hint", children: hint }) : null
  ] });
}

// src/components/Textarea/Textarea.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function Textarea({
  label,
  hint,
  error = false,
  errorMessage,
  id,
  className,
  "aria-describedby": ariaDescribedBy,
  ...props
}) {
  const inputId = id ?? (label ? `slt-textarea-${label.replace(/\s+/g, "-").toLowerCase()}` : void 0);
  const hintId = hint && inputId ? `${inputId}-hint` : void 0;
  const errorId = errorMessage && inputId ? `${inputId}-error` : void 0;
  const describedBy = [ariaDescribedBy, hintId, errorId].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ jsxs2("div", { className: "slt-field", children: [
    label ? /* @__PURE__ */ jsx3("label", { className: "slt-field__label", htmlFor: inputId, children: label }) : null,
    /* @__PURE__ */ jsx3(
      "textarea",
      {
        id: inputId,
        className: cn("slt-textarea", error && "slt-textarea--error", className),
        "aria-invalid": error || void 0,
        "aria-describedby": describedBy,
        ...props
      }
    ),
    errorMessage ? /* @__PURE__ */ jsx3("span", { id: errorId, className: "slt-field__error", role: "alert", children: errorMessage }) : hint ? /* @__PURE__ */ jsx3("span", { id: hintId, className: "slt-field__hint", children: hint }) : null
  ] });
}

// src/components/Checkbox/Checkbox.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function Checkbox({
  label,
  hint,
  error = false,
  errorMessage,
  id,
  className,
  "aria-describedby": ariaDescribedBy,
  ...props
}) {
  const inputId = id ?? (label ? `slt-checkbox-${label.replace(/\s+/g, "-").toLowerCase()}` : void 0);
  const hintId = hint && inputId ? `${inputId}-hint` : void 0;
  const errorId = errorMessage && inputId ? `${inputId}-error` : void 0;
  const describedBy = [ariaDescribedBy, hintId, errorId].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ jsxs3("div", { className: "slt-field", children: [
    /* @__PURE__ */ jsxs3("span", { className: "slt-checkbox-row", children: [
      /* @__PURE__ */ jsx4(
        "input",
        {
          type: "checkbox",
          id: inputId,
          className: cn("slt-checkbox", error && "slt-checkbox--error", className),
          "aria-invalid": error || void 0,
          "aria-describedby": describedBy,
          ...props
        }
      ),
      label ? /* @__PURE__ */ jsx4("label", { className: "slt-checkbox-row__label", htmlFor: inputId, children: label }) : null
    ] }),
    errorMessage ? /* @__PURE__ */ jsx4("span", { id: errorId, className: "slt-field__error", role: "alert", children: errorMessage }) : hint ? /* @__PURE__ */ jsx4("span", { id: hintId, className: "slt-field__hint", children: hint }) : null
  ] });
}

// src/components/Radio/Radio.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function Radio({
  label,
  error = false,
  id,
  className,
  ...props
}) {
  const inputId = id ?? (label ? `slt-radio-${label.replace(/\s+/g, "-").toLowerCase()}` : void 0);
  return /* @__PURE__ */ jsxs4("span", { className: "slt-radio-row", children: [
    /* @__PURE__ */ jsx5(
      "input",
      {
        type: "radio",
        id: inputId,
        className: cn("slt-radio", error && "slt-radio--error", className),
        "aria-invalid": error || void 0,
        ...props
      }
    ),
    label ? /* @__PURE__ */ jsx5("label", { className: "slt-radio-row__label", htmlFor: inputId, children: label }) : null
  ] });
}
function RadioGroup({
  legend,
  name,
  children,
  hint,
  error = false,
  errorMessage,
  className
}) {
  const hintId = hint ? `slt-radio-group-${name}-hint` : void 0;
  const errorId = errorMessage ? `slt-radio-group-${name}-error` : void 0;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ jsxs4(
    "fieldset",
    {
      className: cn("slt-radio-group", className),
      "aria-describedby": describedBy,
      "aria-invalid": error || void 0,
      children: [
        /* @__PURE__ */ jsx5("legend", { className: "slt-radio-group__legend", children: legend }),
        /* @__PURE__ */ jsxs4("div", { className: "slt-field", role: "presentation", children: [
          children,
          errorMessage ? /* @__PURE__ */ jsx5("span", { id: errorId, className: "slt-field__error", role: "alert", children: errorMessage }) : hint ? /* @__PURE__ */ jsx5("span", { id: hintId, className: "slt-field__hint", children: hint }) : null
        ] })
      ]
    }
  );
}

// src/components/Select/Select.tsx
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
function Select({
  label,
  hint,
  error = false,
  errorMessage,
  layout = "vertical",
  id,
  className,
  children,
  "aria-describedby": ariaDescribedBy,
  ...props
}) {
  const selectId = id ?? (label ? `slt-select-${label.replace(/\s+/g, "-").toLowerCase()}` : void 0);
  const hintId = hint && selectId ? `${selectId}-hint` : void 0;
  const errorId = errorMessage && selectId ? `${selectId}-error` : void 0;
  const describedBy = [ariaDescribedBy, hintId, errorId].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ jsxs5("div", { className: cn("slt-field", layout === "horizontal" && "slt-field--horizontal"), children: [
    label ? /* @__PURE__ */ jsx6("label", { className: "slt-field__label", htmlFor: selectId, children: label }) : null,
    /* @__PURE__ */ jsx6("span", { className: "slt-select-wrap", children: /* @__PURE__ */ jsx6(
      "select",
      {
        id: selectId,
        className: cn("slt-select", error && "slt-select--error", className),
        "aria-invalid": error || void 0,
        "aria-describedby": describedBy,
        ...props,
        children
      }
    ) }),
    errorMessage ? /* @__PURE__ */ jsx6("span", { id: errorId, className: "slt-field__error", role: "alert", children: errorMessage }) : hint ? /* @__PURE__ */ jsx6("span", { id: hintId, className: "slt-field__hint", children: hint }) : null
  ] });
}

// src/components/Switch/Switch.tsx
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
function Switch({
  label,
  hint,
  id,
  className,
  "aria-describedby": ariaDescribedBy,
  ...props
}) {
  const inputId = id ?? (label ? `slt-switch-${label.replace(/\s+/g, "-").toLowerCase()}` : void 0);
  const hintId = hint && inputId ? `${inputId}-hint` : void 0;
  const describedBy = [ariaDescribedBy, hintId].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ jsxs6("div", { className: "slt-field", children: [
    /* @__PURE__ */ jsxs6("span", { className: "slt-switch-row", children: [
      /* @__PURE__ */ jsx7(
        "input",
        {
          type: "checkbox",
          role: "switch",
          id: inputId,
          className: cn("slt-switch", className),
          "aria-describedby": describedBy,
          ...props
        }
      ),
      label ? /* @__PURE__ */ jsx7("label", { className: "slt-switch-row__label", htmlFor: inputId, children: label }) : null
    ] }),
    hint ? /* @__PURE__ */ jsx7("span", { id: hintId, className: "slt-field__hint", children: hint }) : null
  ] });
}

// src/components/Heading/Heading.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
function Heading({
  level,
  as = 2,
  className,
  children,
  ...props
}) {
  const Tag = `h${as}`;
  const visualLevel = level ?? as;
  return /* @__PURE__ */ jsx8(Tag, { className: cn("slt-heading", `slt-heading--${visualLevel}`, className), ...props, children });
}

// src/components/Divider/Divider.tsx
import { jsx as jsx9 } from "react/jsx-runtime";
function Divider({
  label,
  orientation = "horizontal",
  className,
  ...props
}) {
  const isVertical = orientation === "vertical";
  return /* @__PURE__ */ jsx9(
    "div",
    {
      role: "separator",
      "aria-orientation": orientation,
      className: cn(
        "slt-divider",
        !label && "slt-divider--plain",
        isVertical && "slt-divider--vertical",
        className
      ),
      ...props,
      children: label ? /* @__PURE__ */ jsx9("span", { className: "slt-divider__label", children: label }) : null
    }
  );
}

// src/components/NoticeBlock/NoticeBlock.tsx
import { jsx as jsx10, jsxs as jsxs7 } from "react/jsx-runtime";
function NoticeBlock({
  variant = "info",
  title,
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs7(
    "aside",
    {
      className: cn("slt-notice", `slt-notice--${variant}`, className),
      ...props,
      children: [
        title ? /* @__PURE__ */ jsx10("p", { className: "slt-notice__title", children: title }) : null,
        /* @__PURE__ */ jsx10("div", { className: "slt-notice__body", children })
      ]
    }
  );
}

// src/components/Breadcrumb/Breadcrumb.tsx
import { jsx as jsx11, jsxs as jsxs8 } from "react/jsx-runtime";
function Breadcrumb({
  items,
  separator = "\u203A",
  overflow = "wrap",
  className,
  "aria-label": ariaLabel = "\u30D1\u30F3\u304F\u305A\u30EA\u30B9\u30C8",
  ...props
}) {
  if (items.length === 0) return null;
  return /* @__PURE__ */ jsx11(
    "nav",
    {
      "aria-label": ariaLabel,
      className: cn(
        "slt-breadcrumb",
        overflow === "scroll" && "slt-breadcrumb--scroll",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx11("ol", { className: "slt-breadcrumb__list", children: items.map((item, index) => {
        const isLast = index === items.length - 1;
        return /* @__PURE__ */ jsxs8("li", { className: "slt-breadcrumb__item", children: [
          index > 0 ? /* @__PURE__ */ jsx11("span", { className: "slt-breadcrumb__separator", "aria-hidden": "true", children: separator }) : null,
          isLast || !item.href ? /* @__PURE__ */ jsx11(
            "span",
            {
              className: cn("slt-breadcrumb__current", !isLast && "slt-breadcrumb__text"),
              "aria-current": isLast ? "page" : void 0,
              children: item.label
            }
          ) : /* @__PURE__ */ jsx11("a", { className: "slt-breadcrumb__link", href: item.href, children: item.label })
        ] }, index);
      }) })
    }
  );
}

// src/components/Tabs/Tabs.tsx
import {
  createContext,
  useCallback,
  useContext,
  useId,
  useState
} from "react";
import { jsx as jsx12 } from "react/jsx-runtime";
var TabsContext = createContext(null);
function useTabsContext(component) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error(`${component} must be used within <Tabs>`);
  return ctx;
}
function Tabs({
  value: valueProp,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  className,
  children,
  ...props
}) {
  const baseId = useId();
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? "");
  const controlled = valueProp !== void 0;
  const value = controlled ? valueProp : uncontrolled;
  const setValue = useCallback(
    (next) => {
      if (!controlled) setUncontrolled(next);
      onValueChange?.(next);
    },
    [controlled, onValueChange]
  );
  return /* @__PURE__ */ jsx12(TabsContext.Provider, { value: { value, setValue, baseId, orientation }, children: /* @__PURE__ */ jsx12(
    "div",
    {
      className: cn(
        "slt-tabs",
        orientation === "vertical" && "slt-tabs--vertical",
        className
      ),
      "data-orientation": orientation,
      ...props,
      children
    }
  ) });
}
function TabList({ className, children, onKeyDown, ...props }) {
  const { orientation, setValue } = useTabsContext("TabList");
  const handleKeyDown = (event) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    const list = event.currentTarget;
    const tabs = Array.from(
      list.querySelectorAll('[role="tab"]:not([disabled])')
    );
    if (tabs.length === 0) return;
    const active = document.activeElement;
    const index = Math.max(
      0,
      tabs.findIndex((tab) => tab === active || tab.contains(active))
    );
    const horizontal = orientation === "horizontal";
    let nextIndex = null;
    if (horizontal && event.key === "ArrowRight" || !horizontal && event.key === "ArrowDown") {
      nextIndex = (index + 1) % tabs.length;
    } else if (horizontal && event.key === "ArrowLeft" || !horizontal && event.key === "ArrowUp") {
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
  return /* @__PURE__ */ jsx12(
    "div",
    {
      role: "tablist",
      "aria-orientation": orientation,
      className: cn("slt-tabs__list", className),
      onKeyDown: handleKeyDown,
      ...props,
      children
    }
  );
}
function Tab({ value, className, disabled, children, ...props }) {
  const { value: selected, setValue, baseId } = useTabsContext("Tab");
  const selectedTab = selected === value;
  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;
  return /* @__PURE__ */ jsx12(
    "button",
    {
      type: "button",
      role: "tab",
      id: tabId,
      "data-slt-tab": value,
      "aria-selected": selectedTab,
      "aria-controls": panelId,
      tabIndex: selectedTab ? 0 : -1,
      disabled,
      className: cn("slt-tabs__tab", selectedTab && "slt-tabs__tab--selected", className),
      onClick: () => {
        if (!disabled) setValue(value);
      },
      ...props,
      children
    }
  );
}
function TabPanel({
  value,
  className,
  children,
  forceMount = false,
  ...props
}) {
  const { value: selected, baseId } = useTabsContext("TabPanel");
  const selectedPanel = selected === value;
  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;
  if (!selectedPanel && !forceMount) return null;
  return /* @__PURE__ */ jsx12(
    "div",
    {
      role: "tabpanel",
      id: panelId,
      "aria-labelledby": tabId,
      hidden: !selectedPanel,
      tabIndex: 0,
      className: cn("slt-tabs__panel", className),
      ...props,
      children
    }
  );
}

// src/components/Accordion/Accordion.tsx
import {
  createContext as createContext2,
  useCallback as useCallback2,
  useContext as useContext2,
  useId as useId2,
  useState as useState2
} from "react";
import { jsx as jsx13, jsxs as jsxs9 } from "react/jsx-runtime";
var AccordionContext = createContext2(null);
var AccordionItemContext = createContext2(null);
function useAccordion(component) {
  const ctx = useContext2(AccordionContext);
  if (!ctx) throw new Error(`${component} must be used within <Accordion>`);
  return ctx;
}
function useAccordionItem(component) {
  const ctx = useContext2(AccordionItemContext);
  if (!ctx) throw new Error(`${component} must be used within <AccordionItem>`);
  return ctx;
}
function toSet(input) {
  if (input == null) return /* @__PURE__ */ new Set();
  return new Set(Array.isArray(input) ? input : [input]);
}
function fromSet(type, set) {
  if (type === "single") return [...set][0] ?? "";
  return [...set];
}
function Accordion({
  type = "multiple",
  value: valueProp,
  defaultValue,
  onValueChange,
  className,
  children,
  ...props
}) {
  const baseId = useId2();
  const controlled = valueProp !== void 0;
  const [uncontrolled, setUncontrolled] = useState2(() => toSet(defaultValue));
  const openValues = controlled ? toSet(valueProp) : uncontrolled;
  const toggle = useCallback2(
    (itemValue) => {
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
    [controlled, onValueChange, openValues, type]
  );
  return /* @__PURE__ */ jsx13(AccordionContext.Provider, { value: { type, openValues, toggle, baseId }, children: /* @__PURE__ */ jsx13("div", { className: cn("slt-accordion", className), ...props, children }) });
}
function AccordionItem({ value, className, children, ...props }) {
  const { openValues } = useAccordion("AccordionItem");
  const open = openValues.has(value);
  return /* @__PURE__ */ jsx13(AccordionItemContext.Provider, { value: { value, open }, children: /* @__PURE__ */ jsx13(
    "div",
    {
      className: cn("slt-accordion__item", open && "slt-accordion__item--open", className),
      "data-state": open ? "open" : "closed",
      ...props,
      children
    }
  ) });
}
function AccordionTrigger({ className, children, ...props }) {
  const { toggle, baseId } = useAccordion("AccordionTrigger");
  const { value, open } = useAccordionItem("AccordionTrigger");
  const triggerId = `${baseId}-trigger-${value}`;
  const panelId = `${baseId}-panel-${value}`;
  return /* @__PURE__ */ jsx13("h3", { className: "slt-accordion__heading", children: /* @__PURE__ */ jsxs9(
    "button",
    {
      type: "button",
      id: triggerId,
      className: cn("slt-accordion__trigger", className),
      "aria-expanded": open,
      "aria-controls": panelId,
      onClick: () => toggle(value),
      ...props,
      children: [
        /* @__PURE__ */ jsx13("span", { className: "slt-accordion__trigger-label", children }),
        /* @__PURE__ */ jsx13("span", { className: "slt-accordion__icon", "aria-hidden": "true" })
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children,
  forceMount = false,
  ...props
}) {
  const { baseId } = useAccordion("AccordionContent");
  const { value, open } = useAccordionItem("AccordionContent");
  const triggerId = `${baseId}-trigger-${value}`;
  const panelId = `${baseId}-panel-${value}`;
  if (!open && !forceMount) return null;
  return /* @__PURE__ */ jsx13(
    "div",
    {
      id: panelId,
      role: "region",
      "aria-labelledby": triggerId,
      hidden: !open,
      className: cn("slt-accordion__content", className),
      ...props,
      children: /* @__PURE__ */ jsx13("div", { className: "slt-accordion__content-inner", children })
    }
  );
}

// src/components/Disclosure/Disclosure.tsx
import { useState as useState3 } from "react";
import { jsx as jsx14, jsxs as jsxs10 } from "react/jsx-runtime";
function Disclosure({
  summary,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  onToggle,
  ...props
}) {
  const controlled = openProp !== void 0;
  const [uncontrolledOpen, setUncontrolledOpen] = useState3(defaultOpen);
  const open = controlled ? openProp : uncontrolledOpen;
  return /* @__PURE__ */ jsxs10(
    "details",
    {
      className: cn("slt-disclosure", className),
      open,
      onToggle: (event) => {
        onToggle?.(event);
        const next = event.currentTarget.open;
        if (!controlled) setUncontrolledOpen(next);
        onOpenChange?.(next);
      },
      ...props,
      children: [
        /* @__PURE__ */ jsxs10("summary", { className: "slt-disclosure__summary", children: [
          /* @__PURE__ */ jsx14("span", { className: "slt-disclosure__summary-label", children: summary }),
          /* @__PURE__ */ jsx14("span", { className: "slt-disclosure__icon", "aria-hidden": "true" })
        ] }),
        /* @__PURE__ */ jsx14("div", { className: "slt-disclosure__content", children })
      ]
    }
  );
}

// src/components/List/List.tsx
import {
  createContext as createContext3,
  useContext as useContext3
} from "react";
import { jsx as jsx15, jsxs as jsxs11 } from "react/jsx-runtime";
var ListVariantContext = createContext3("bullet");
function List({ variant = "bullet", className, children, ...props }) {
  return /* @__PURE__ */ jsx15(ListVariantContext.Provider, { value: variant, children: /* @__PURE__ */ jsx15(
    "ul",
    {
      className: cn(
        "slt-list",
        variant === "numbered" && "slt-list--numbered",
        className
      ),
      ...props,
      children
    }
  ) });
}
function ListItem({ marker, className, children, ...props }) {
  const variant = useContext3(ListVariantContext);
  return /* @__PURE__ */ jsxs11("li", { className: cn("slt-list__item", className), ...props, children: [
    variant === "numbered" && marker != null ? /* @__PURE__ */ jsx15("span", { className: "slt-list__marker", children: marker }) : null,
    /* @__PURE__ */ jsx15("span", { className: "slt-list__body", children })
  ] });
}

// src/components/DescriptionList/DescriptionList.tsx
import { jsx as jsx16 } from "react/jsx-runtime";
function DescriptionList({ className, children, ...props }) {
  return /* @__PURE__ */ jsx16("dl", { className: cn("slt-description-list", className), ...props, children });
}
function DescriptionTerm({ className, children, ...props }) {
  return /* @__PURE__ */ jsx16("dt", { className: cn("slt-description-list__term", className), ...props, children });
}
function DescriptionDetails({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx16("dd", { className: cn("slt-description-list__details", className), ...props, children });
}

// src/components/Blockquote/Blockquote.tsx
import { jsx as jsx17, jsxs as jsxs12 } from "react/jsx-runtime";
function Blockquote({
  className,
  children,
  attribution,
  ...props
}) {
  return /* @__PURE__ */ jsxs12("figure", { className: cn("slt-blockquote", className), children: [
    /* @__PURE__ */ jsx17("blockquote", { className: "slt-blockquote__quote", ...props, children }),
    attribution ? /* @__PURE__ */ jsx17("figcaption", { className: "slt-blockquote__attribution", children: attribution }) : null
  ] });
}

// src/components/Chip/Chip.tsx
import { jsx as jsx18, jsxs as jsxs13 } from "react/jsx-runtime";
function Chip({
  children,
  selected = false,
  onRemove,
  removeLabel = "\u524A\u9664",
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs13(
    "span",
    {
      className: cn(
        "slt-chip",
        selected && "slt-chip--selected",
        onRemove && "slt-chip--removable",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx18("span", { className: "slt-chip__label", children }),
        onRemove ? /* @__PURE__ */ jsx18(
          "button",
          {
            type: "button",
            className: "slt-chip__remove",
            "aria-label": removeLabel,
            onClick: onRemove,
            children: "\xD7"
          }
        ) : null
      ]
    }
  );
}

// src/components/PageNavigation/PageNavigation.tsx
import { jsx as jsx19, jsxs as jsxs14 } from "react/jsx-runtime";
function range(start, end) {
  const out = [];
  for (let i = start; i <= end; i += 1) out.push(i);
  return out;
}
function buildPages(page, total, sibling) {
  if (total <= 1) return [1];
  const start = Math.max(2, page - sibling);
  const end = Math.min(total - 1, page + sibling);
  const pages = [1];
  if (start > 2) pages.push("ellipsis");
  pages.push(...range(start, end));
  if (end < total - 1) pages.push("ellipsis");
  if (total > 1) pages.push(total);
  return pages;
}
function PageNavigation({
  page,
  totalPages,
  onPageChange,
  previousLabel = "\u524D\u3078",
  nextLabel = "\u6B21\u3078",
  siblingCount = 1,
  className,
  "aria-label": ariaLabel = "\u30DA\u30FC\u30B8\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3",
  ...props
}) {
  const total = Math.max(1, totalPages);
  const current = Math.min(Math.max(1, page), total);
  const pages = buildPages(current, total, siblingCount);
  const go = (next) => {
    if (next < 1 || next > total || next === current) return;
    onPageChange?.(next);
  };
  return /* @__PURE__ */ jsx19("nav", { "aria-label": ariaLabel, className: cn("slt-page-nav", className), ...props, children: /* @__PURE__ */ jsxs14("ul", { className: "slt-page-nav__list", children: [
    /* @__PURE__ */ jsx19("li", { children: /* @__PURE__ */ jsx19(
      "button",
      {
        type: "button",
        className: "slt-page-nav__btn",
        disabled: current <= 1,
        onClick: () => go(current - 1),
        children: previousLabel
      }
    ) }),
    pages.map(
      (item, index) => item === "ellipsis" ? /* @__PURE__ */ jsx19("li", { className: "slt-page-nav__ellipsis", "aria-hidden": "true", children: "\u2026" }, `e-${index}`) : /* @__PURE__ */ jsx19("li", { children: /* @__PURE__ */ jsx19(
        "button",
        {
          type: "button",
          className: cn(
            "slt-page-nav__btn",
            "slt-page-nav__page",
            item === current && "slt-page-nav__page--current"
          ),
          "aria-current": item === current ? "page" : void 0,
          "aria-label": `${item}\u30DA\u30FC\u30B8`,
          onClick: () => go(item),
          children: item
        }
      ) }, item)
    ),
    /* @__PURE__ */ jsx19("li", { children: /* @__PURE__ */ jsx19(
      "button",
      {
        type: "button",
        className: "slt-page-nav__btn",
        disabled: current >= total,
        onClick: () => go(current + 1),
        children: nextLabel
      }
    ) })
  ] }) });
}

// src/components/StepNavigation/StepNavigation.tsx
import { jsx as jsx20, jsxs as jsxs15 } from "react/jsx-runtime";
function StepNavigation({
  steps,
  current,
  className,
  "aria-label": ariaLabel = "\u30B9\u30C6\u30C3\u30D7\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3",
  ...props
}) {
  return /* @__PURE__ */ jsx20("nav", { "aria-label": ariaLabel, className: cn("slt-step-nav", className), ...props, children: /* @__PURE__ */ jsx20("ol", { className: "slt-step-nav__list", children: steps.map((step, index) => {
    const stepNumber = index + 1;
    const state = stepNumber < current ? "complete" : stepNumber === current ? "current" : "upcoming";
    return /* @__PURE__ */ jsxs15(
      "li",
      {
        className: cn("slt-step-nav__item", `slt-step-nav__item--${state}`),
        "aria-current": state === "current" ? "step" : void 0,
        children: [
          /* @__PURE__ */ jsx20("span", { className: "slt-step-nav__index", "aria-hidden": "true", children: stepNumber }),
          /* @__PURE__ */ jsxs15("span", { className: "slt-step-nav__body", children: [
            /* @__PURE__ */ jsx20("span", { className: "slt-step-nav__label", children: step.label }),
            step.description ? /* @__PURE__ */ jsx20("span", { className: "slt-step-nav__description", children: step.description }) : null
          ] })
        ]
      },
      index
    );
  }) }) });
}

// src/components/ProgressIndicator/ProgressIndicator.tsx
import { jsx as jsx21, jsxs as jsxs16 } from "react/jsx-runtime";
function ProgressIndicator({
  value,
  max = 100,
  label,
  showValueLabel = true,
  className,
  id,
  ...props
}) {
  const determinate = value != null && Number.isFinite(value);
  const clamped = determinate ? Math.min(Math.max(0, value), max) : void 0;
  const percent = determinate && max > 0 ? Math.round(clamped / max * 100) : void 0;
  return /* @__PURE__ */ jsxs16("div", { className: cn("slt-progress", className), children: [
    (label || showValueLabel && percent != null) && /* @__PURE__ */ jsxs16("div", { className: "slt-progress__meta", children: [
      label ? /* @__PURE__ */ jsx21("span", { className: "slt-progress__label", id: id ? `${id}-label` : void 0, children: label }) : /* @__PURE__ */ jsx21("span", {}),
      showValueLabel && percent != null ? /* @__PURE__ */ jsxs16("span", { className: "slt-progress__value", children: [
        percent,
        "%"
      ] }) : null
    ] }),
    /* @__PURE__ */ jsx21(
      "progress",
      {
        id,
        className: "slt-progress__bar",
        value: clamped,
        max,
        "aria-labelledby": label && id ? `${id}-label` : void 0,
        "aria-label": !label ? "\u9032\u6357" : void 0,
        ...props
      }
    )
  ] });
}

// src/components/SearchBox/SearchBox.tsx
import {
  useId as useId3
} from "react";
import { jsx as jsx22, jsxs as jsxs17 } from "react/jsx-runtime";
function SearchBox({
  label,
  hideLabel = false,
  placeholder = "\u30AD\u30FC\u30EF\u30FC\u30C9\u3092\u5165\u529B",
  defaultValue,
  value,
  onValueChange,
  onSearch,
  submitLabel = "\u691C\u7D22",
  className,
  inputProps,
  ...props
}) {
  const autoId = useId3();
  const inputId = inputProps?.id ?? autoId;
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const q = String(data.get("q") ?? "");
    onSearch?.(q);
  };
  return /* @__PURE__ */ jsxs17(
    "form",
    {
      role: "search",
      className: cn("slt-search", className),
      onSubmit: handleSubmit,
      ...props,
      children: [
        /* @__PURE__ */ jsx22(
          "label",
          {
            className: cn("slt-search__label", hideLabel && "slt-search__label--sr"),
            htmlFor: inputId,
            children: label
          }
        ),
        /* @__PURE__ */ jsxs17("div", { className: "slt-search__row", children: [
          /* @__PURE__ */ jsx22(
            "input",
            {
              ...inputProps,
              id: inputId,
              name: "q",
              type: "search",
              className: cn("slt-search__input", inputProps?.className),
              placeholder,
              defaultValue: value === void 0 ? defaultValue : void 0,
              value,
              onChange: (event) => onValueChange?.(event.target.value),
              enterKeyHint: "search"
            }
          ),
          /* @__PURE__ */ jsx22("button", { type: "submit", className: "slt-search__submit", children: submitLabel })
        ] })
      ]
    }
  );
}

// src/components/ScrollTopButton/ScrollTopButton.tsx
import { useEffect, useState as useState4 } from "react";
import { jsx as jsx23, jsxs as jsxs18 } from "react/jsx-runtime";
function ScrollTopButton({
  threshold = 400,
  label = "\u30DA\u30FC\u30B8\u4E0A\u90E8\u3078",
  className,
  onClick,
  ...props
}) {
  const [visible, setVisible] = useState4(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY >= threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  if (!visible) return null;
  return /* @__PURE__ */ jsxs18(
    "button",
    {
      type: "button",
      className: cn("slt-scroll-top", className),
      "aria-label": label,
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      },
      ...props,
      children: [
        /* @__PURE__ */ jsx23("span", { "aria-hidden": "true", className: "slt-scroll-top__icon" }),
        /* @__PURE__ */ jsx23("span", { className: "slt-scroll-top__label", children: label })
      ]
    }
  );
}

// src/components/UtilityLink/UtilityLink.tsx
import { jsx as jsx24 } from "react/jsx-runtime";
function UtilityLink({ className, children, ...props }) {
  return /* @__PURE__ */ jsx24("a", { className: cn("slt-utility-link", className), ...props, children });
}

// src/components/HamburgerMenuButton/HamburgerMenuButton.tsx
import { jsx as jsx25, jsxs as jsxs19 } from "react/jsx-runtime";
function HamburgerMenuButton({
  open = false,
  openLabel = "\u30E1\u30CB\u30E5\u30FC\u3092\u958B\u304F",
  closeLabel = "\u30E1\u30CB\u30E5\u30FC\u3092\u9589\u3058\u308B",
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx25(
    "button",
    {
      type: "button",
      className: cn("slt-hamburger", open && "slt-hamburger--open", className),
      "aria-expanded": open,
      "aria-label": open ? closeLabel : openLabel,
      ...props,
      children: /* @__PURE__ */ jsxs19("span", { className: "slt-hamburger__bars", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx25("span", { className: "slt-hamburger__bar" }),
        /* @__PURE__ */ jsx25("span", { className: "slt-hamburger__bar" }),
        /* @__PURE__ */ jsx25("span", { className: "slt-hamburger__bar" })
      ] })
    }
  );
}

// src/components/Drawer/Drawer.tsx
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { jsx as jsx26, jsxs as jsxs20 } from "react/jsx-runtime";
function Drawer({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  side = "right",
  showClose = true
}) {
  return /* @__PURE__ */ jsxs20(DialogPrimitive.Root, { open, defaultOpen, onOpenChange, children: [
    trigger ? /* @__PURE__ */ jsx26(DialogPrimitive.Trigger, { asChild: true, children: trigger }) : null,
    /* @__PURE__ */ jsxs20(DialogPrimitive.Portal, { children: [
      /* @__PURE__ */ jsx26(DialogPrimitive.Overlay, { className: "slt-drawer__overlay" }),
      /* @__PURE__ */ jsxs20(
        DialogPrimitive.Content,
        {
          className: cn("slt-drawer__content", `slt-drawer__content--${side}`),
          children: [
            /* @__PURE__ */ jsxs20("div", { className: "slt-drawer__header", children: [
              /* @__PURE__ */ jsx26(DialogPrimitive.Title, { className: "slt-drawer__title", children: title }),
              showClose ? /* @__PURE__ */ jsx26(DialogPrimitive.Close, { asChild: true, children: /* @__PURE__ */ jsx26(Button, { variant: "ghost", className: "slt-drawer__close", "aria-label": "\u9589\u3058\u308B", children: "\xD7" }) }) : null
            ] }),
            description ? /* @__PURE__ */ jsx26(DialogPrimitive.Description, { className: "slt-drawer__description", children: description }) : null,
            /* @__PURE__ */ jsx26("div", { className: "slt-drawer__body", children })
          ]
        }
      )
    ] })
  ] });
}
var DrawerClose = DialogPrimitive.Close;
var DrawerTrigger = DialogPrimitive.Trigger;

// src/components/FileUpload/FileUpload.tsx
import { useId as useId4, useState as useState5 } from "react";
import { jsx as jsx27, jsxs as jsxs21 } from "react/jsx-runtime";
function FileUpload({
  label,
  hint,
  error = false,
  errorMessage,
  onFilesChange,
  buttonLabel = "\u30D5\u30A1\u30A4\u30EB\u3092\u9078\u629E",
  id,
  className,
  disabled,
  "aria-describedby": ariaDescribedBy,
  ...props
}) {
  const autoId = useId4();
  const inputId = id ?? autoId;
  const hintId = hint ? `${inputId}-hint` : void 0;
  const errorId = errorMessage ? `${inputId}-error` : void 0;
  const describedBy = [ariaDescribedBy, hintId, errorId].filter(Boolean).join(" ") || void 0;
  const [fileName, setFileName] = useState5(null);
  const handleChange = (event) => {
    const files = event.target.files;
    onFilesChange?.(files);
    if (files && files.length > 0) {
      setFileName(
        files.length === 1 ? files[0].name : `${files.length} \u4EF6\u306E\u30D5\u30A1\u30A4\u30EB`
      );
    } else {
      setFileName(null);
    }
  };
  return /* @__PURE__ */ jsxs21("div", { className: cn("slt-field", "slt-file-upload", className), children: [
    /* @__PURE__ */ jsx27("span", { className: "slt-field__label", id: `${inputId}-label`, children: label }),
    /* @__PURE__ */ jsxs21("div", { className: cn("slt-file-upload__row", error && "slt-file-upload__row--error"), children: [
      /* @__PURE__ */ jsx27(
        "input",
        {
          ...props,
          id: inputId,
          type: "file",
          className: "slt-file-upload__input",
          disabled,
          "aria-invalid": error || void 0,
          "aria-describedby": describedBy,
          "aria-labelledby": `${inputId}-label`,
          onChange: handleChange
        }
      ),
      /* @__PURE__ */ jsx27("label", { htmlFor: inputId, className: "slt-file-upload__button", children: buttonLabel }),
      /* @__PURE__ */ jsx27("span", { className: "slt-file-upload__name", children: fileName ?? "\u9078\u629E\u3055\u308C\u3066\u3044\u307E\u305B\u3093" })
    ] }),
    errorMessage ? /* @__PURE__ */ jsx27("span", { id: errorId, className: "slt-field__error", role: "alert", children: errorMessage }) : hint ? /* @__PURE__ */ jsx27("span", { id: hintId, className: "slt-field__hint", children: hint }) : null
  ] });
}

// src/components/TableOfContents/TableOfContents.tsx
import { jsx as jsx28, jsxs as jsxs22 } from "react/jsx-runtime";
function TableOfContents({
  items,
  title = "\u76EE\u6B21",
  className,
  ...props
}) {
  if (items.length === 0) return null;
  return /* @__PURE__ */ jsxs22("nav", { "aria-label": title, className: cn("slt-toc", className), ...props, children: [
    /* @__PURE__ */ jsx28("p", { className: "slt-toc__title", children: title }),
    /* @__PURE__ */ jsx28("ol", { className: "slt-toc__list", children: items.map((item) => /* @__PURE__ */ jsx28(
      "li",
      {
        className: cn(
          "slt-toc__item",
          item.level === 3 && "slt-toc__item--l3",
          item.level === 4 && "slt-toc__item--l4"
        ),
        children: /* @__PURE__ */ jsx28("a", { className: "slt-toc__link", href: `#${item.id}`, children: item.label })
      },
      item.id
    )) })
  ] });
}

// src/components/ResourceList/ResourceList.tsx
import { jsx as jsx29, jsxs as jsxs23 } from "react/jsx-runtime";
function ResourceList({ items, className, ...props }) {
  return /* @__PURE__ */ jsx29("ul", { className: cn("slt-resource-list", className), ...props, children: items.map((item, index) => /* @__PURE__ */ jsx29("li", { className: "slt-resource-list__item", children: /* @__PURE__ */ jsxs23("a", { className: "slt-resource-list__link", href: item.href, children: [
    /* @__PURE__ */ jsx29("span", { className: "slt-resource-list__title", children: item.title }),
    item.description ? /* @__PURE__ */ jsx29("span", { className: "slt-resource-list__description", children: item.description }) : null,
    item.meta ? /* @__PURE__ */ jsx29("span", { className: "slt-resource-list__meta", children: item.meta }) : null
  ] }) }, index)) });
}

// src/components/Image/Image.tsx
import { jsx as jsx30, jsxs as jsxs24 } from "react/jsx-runtime";
function Image({
  caption,
  decorative = false,
  alt,
  className,
  ...props
}) {
  const resolvedAlt = decorative ? "" : alt ?? "";
  const img = /* @__PURE__ */ jsx30(
    "img",
    {
      className: cn("slt-image__img", !caption && className),
      alt: resolvedAlt,
      ...props
    }
  );
  if (!caption) {
    return img;
  }
  return /* @__PURE__ */ jsxs24("figure", { className: cn("slt-image", className), children: [
    img,
    /* @__PURE__ */ jsx30("figcaption", { className: "slt-image__caption", children: caption })
  ] });
}

// src/components/HorizontalMenu/HorizontalMenu.tsx
import { jsx as jsx31 } from "react/jsx-runtime";
function HorizontalMenu({
  items,
  className,
  "aria-label": ariaLabel = "\u30E1\u30A4\u30F3\u30E1\u30CB\u30E5\u30FC",
  ...props
}) {
  return /* @__PURE__ */ jsx31("nav", { "aria-label": ariaLabel, className: cn("slt-horizontal-menu", className), ...props, children: /* @__PURE__ */ jsx31("ul", { className: "slt-horizontal-menu__list", children: items.map((item, index) => /* @__PURE__ */ jsx31("li", { className: "slt-horizontal-menu__item", children: /* @__PURE__ */ jsx31(
    "a",
    {
      href: item.href,
      className: cn(
        "slt-horizontal-menu__link",
        item.current && "slt-horizontal-menu__link--current"
      ),
      "aria-current": item.current ? "page" : void 0,
      children: item.label
    }
  ) }, index)) }) });
}

// src/components/MenuList/MenuList.tsx
import { Fragment, jsx as jsx32 } from "react/jsx-runtime";
function MenuList({ items, className, ...props }) {
  return /* @__PURE__ */ jsx32("ul", { className: cn("slt-menu-list", className), ...props, children: items.map((item, index) => {
    const content = /* @__PURE__ */ jsx32(Fragment, { children: /* @__PURE__ */ jsx32("span", { className: "slt-menu-list__label", children: item.label }) });
    if (item.href && !item.disabled) {
      return /* @__PURE__ */ jsx32("li", { className: "slt-menu-list__item", children: /* @__PURE__ */ jsx32(
        "a",
        {
          href: item.href,
          className: cn(
            "slt-menu-list__action",
            item.current && "slt-menu-list__action--current"
          ),
          "aria-current": item.current ? "page" : void 0,
          children: content
        }
      ) }, index);
    }
    return /* @__PURE__ */ jsx32("li", { className: "slt-menu-list__item", children: /* @__PURE__ */ jsx32(
      "button",
      {
        type: "button",
        className: cn(
          "slt-menu-list__action",
          item.current && "slt-menu-list__action--current"
        ),
        disabled: item.disabled,
        "aria-current": item.current ? "true" : void 0,
        onClick: () => item.onSelect?.(),
        children: content
      }
    ) }, index);
  }) });
}

// src/components/BottomNavigation/BottomNavigation.tsx
import { jsx as jsx33, jsxs as jsxs25 } from "react/jsx-runtime";
function BottomNavigation({
  items,
  className,
  "aria-label": ariaLabel = "\u30DC\u30C8\u30E0\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3",
  ...props
}) {
  return /* @__PURE__ */ jsx33("nav", { "aria-label": ariaLabel, className: cn("slt-bottom-nav", className), ...props, children: /* @__PURE__ */ jsx33("ul", { className: "slt-bottom-nav__list", children: items.map((item, index) => /* @__PURE__ */ jsx33("li", { className: "slt-bottom-nav__item", children: /* @__PURE__ */ jsxs25(
    "a",
    {
      href: item.href,
      className: cn(
        "slt-bottom-nav__link",
        item.current && "slt-bottom-nav__link--current"
      ),
      "aria-current": item.current ? "page" : void 0,
      children: [
        item.icon ? /* @__PURE__ */ jsx33("span", { className: "slt-bottom-nav__icon", "aria-hidden": "true", children: item.icon }) : null,
        /* @__PURE__ */ jsx33("span", { className: "slt-bottom-nav__label", children: item.label })
      ]
    }
  ) }, index)) }) });
}

// src/components/MobileMenu/MobileMenu.tsx
import { useState as useState6 } from "react";
import { jsx as jsx34, jsxs as jsxs26 } from "react/jsx-runtime";
function MobileMenu({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  title = "\u30E1\u30CB\u30E5\u30FC",
  items,
  side = "right",
  className,
  triggerClassName,
  children
}) {
  const controlled = openProp !== void 0;
  const [uncontrolledOpen, setUncontrolledOpen] = useState6(defaultOpen);
  const open = controlled ? openProp : uncontrolledOpen;
  const handleOpenChange = (next) => {
    if (!controlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };
  return /* @__PURE__ */ jsx34("div", { className: cn("slt-mobile-menu", className), children: /* @__PURE__ */ jsxs26(
    Drawer,
    {
      open,
      onOpenChange: handleOpenChange,
      side,
      title,
      trigger: /* @__PURE__ */ jsx34(HamburgerMenuButton, { className: triggerClassName, open }),
      children: [
        /* @__PURE__ */ jsx34(MenuList, { items, "aria-label": title }),
        children
      ]
    }
  ) });
}

// src/components/Card/Card.tsx
import { jsx as jsx35 } from "react/jsx-runtime";
function Card({
  variant = "default",
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx35(
    "div",
    {
      className: cn("slt-card", variant === "glass" && "slt-card--glass", className),
      ...props,
      children
    }
  );
}

// src/components/Dialog/Dialog.tsx
import * as DialogPrimitive2 from "@radix-ui/react-dialog";
import { jsx as jsx36, jsxs as jsxs27 } from "react/jsx-runtime";
function Dialog({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  confirmLabel = "\u78BA\u8A8D",
  cancelLabel = "\u30AD\u30E3\u30F3\u30BB\u30EB",
  onConfirm,
  destructive = false,
  showClose = true,
  confirmLoading = false,
  confirmDisabled = false
}) {
  return /* @__PURE__ */ jsxs27(DialogPrimitive2.Root, { open, defaultOpen, onOpenChange, children: [
    trigger ? /* @__PURE__ */ jsx36(DialogPrimitive2.Trigger, { asChild: true, children: trigger }) : null,
    /* @__PURE__ */ jsxs27(DialogPrimitive2.Portal, { children: [
      /* @__PURE__ */ jsx36(DialogPrimitive2.Overlay, { className: "slt-dialog__overlay" }),
      /* @__PURE__ */ jsxs27(DialogPrimitive2.Content, { className: "slt-dialog__content", children: [
        showClose ? /* @__PURE__ */ jsx36(DialogPrimitive2.Close, { asChild: true, children: /* @__PURE__ */ jsx36(
          Button,
          {
            variant: "ghost",
            className: "slt-dialog__close",
            "aria-label": "\u9589\u3058\u308B",
            children: "\xD7"
          }
        ) }) : null,
        /* @__PURE__ */ jsx36(DialogPrimitive2.Title, { className: "slt-dialog__title", children: title }),
        description ? /* @__PURE__ */ jsx36(DialogPrimitive2.Description, { className: "slt-dialog__description", children: description }) : null,
        children,
        (onConfirm || cancelLabel) && /* @__PURE__ */ jsxs27("div", { className: "slt-dialog__actions", children: [
          /* @__PURE__ */ jsx36(DialogPrimitive2.Close, { asChild: true, children: /* @__PURE__ */ jsx36(Button, { variant: "secondary", children: cancelLabel }) }),
          onConfirm ? /* @__PURE__ */ jsx36(
            Button,
            {
              variant: destructive ? "danger" : "primary",
              onClick: onConfirm,
              loading: confirmLoading,
              disabled: confirmDisabled,
              children: confirmLabel
            }
          ) : null
        ] })
      ] })
    ] })
  ] });
}
var DialogClose = DialogPrimitive2.Close;
var DialogTrigger = DialogPrimitive2.Trigger;

// src/components/Badge/Badge.tsx
import { jsx as jsx37 } from "react/jsx-runtime";
function Badge({
  variant = "default",
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx37("span", { className: cn("slt-badge", `slt-badge--${variant}`, className), ...props, children });
}

// src/components/WaveBackground/WaveBackground.tsx
import { useEffect as useEffect2, useRef } from "react";

// src/lib/resolve-brand-context.ts
var BRAND_IDS = ["ai-dash", "sound-laboratory", "slt-corporate"];
function resolveThemedHost(root = document.documentElement) {
  if (root.hasAttribute("data-theme")) return root;
  const themed = root.querySelector("[data-theme]");
  if (themed instanceof HTMLElement) return themed;
  return root;
}
function resolveBrandFromDom(root = document.documentElement) {
  const host = resolveThemedHost(root);
  const theme = host.getAttribute("data-theme");
  if (theme && BRAND_IDS.includes(theme)) {
    return theme;
  }
  return "ai-dash";
}
function resolveColorModeFromDom(root = document.documentElement) {
  const host = resolveThemedHost(root);
  const mode = host.getAttribute("data-color-mode");
  if (mode === "light" || mode === "dark") return mode;
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "dark";
}

// src/lib/resolve-css-color.ts
function resolveThemedHost2(root = document.documentElement) {
  if (root.hasAttribute("data-theme")) return root;
  const themed = root.querySelector("[data-theme]");
  if (themed instanceof HTMLElement) return themed;
  return root;
}
function resolveCssVarRgb(varName, host) {
  if (typeof document === "undefined") {
    return { r: 0, g: 0, b: 0 };
  }
  const el = host ?? resolveThemedHost2();
  const probe = document.createElement("span");
  probe.style.color = `var(${varName})`;
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  el.appendChild(probe);
  const computed = getComputedStyle(probe).color;
  el.removeChild(probe);
  const rgbaMatch = computed.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/
  );
  if (rgbaMatch) {
    return {
      r: Number(rgbaMatch[1]),
      g: Number(rgbaMatch[2]),
      b: Number(rgbaMatch[3]),
      a: rgbaMatch[4] !== void 0 ? Number(rgbaMatch[4]) : 1
    };
  }
  const raw = getComputedStyle(el).getPropertyValue(varName).trim();
  const hex = raw.startsWith("#") ? raw.slice(1) : null;
  if (hex) {
    const full = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex.slice(0, 6);
    return {
      r: Number.parseInt(full.slice(0, 2), 16),
      g: Number.parseInt(full.slice(2, 4), 16),
      b: Number.parseInt(full.slice(4, 6), 16)
    };
  }
  return { r: 0, g: 0, b: 0 };
}
function resolveCssVarColor(varName, host) {
  if (typeof document === "undefined") return "transparent";
  const el = host ?? resolveThemedHost2();
  const probe = document.createElement("span");
  probe.style.color = `var(${varName})`;
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  el.appendChild(probe);
  const computed = getComputedStyle(probe).color;
  el.removeChild(probe);
  if (computed && computed !== "rgba(0, 0, 0, 0)") return computed;
  const { r, g, b, a = 1 } = resolveCssVarRgb(varName, host);
  return a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
}

// src/components/WaveBackground/wave-palettes.ts
var WAVE_PALETTE_VARS = {
  /** Matches tokens/brand.json ai-dash wavePalette: blue / copper / gold */
  "ai-dash": [
    "--color-action-secondary",
    "--color-action-primary-hover",
    "--color-action-primary"
  ],
  "slt-corporate": [
    "--color-action-primary",
    "--color-action-secondary",
    "--color-text-brand"
  ]
};
var WAVE_PALETTE_RENDER = {
  "ai-dash": { opacityScale: 0.85, minOpacity: 0.22, lineWidth: 1.25 },
  "slt-corporate": { opacityScale: 0.6, minOpacity: 0.1, lineWidth: 1 }
};
function resolvePalette(varNames, host) {
  return varNames.map((name) => resolveCssVarRgb(name, host));
}

// src/components/WaveBackground/WaveBackground.tsx
import { jsx as jsx38, jsxs as jsxs28 } from "react/jsx-runtime";
function WaveBackground({
  palette = "ai-dash",
  colorVars,
  className
}) {
  const canvasRef = useRef(null);
  useEffect2(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;
    let animationFrameId = 0;
    let t = 0;
    const varNames = colorVars ?? WAVE_PALETTE_VARS[palette];
    const render = WAVE_PALETTE_RENDER[palette];
    let rgbColors = resolvePalette(varNames, resolveThemedHost());
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      rgbColors = resolvePalette(varNames, resolveThemedHost());
    };
    const root = document.documentElement;
    const host = resolveThemedHost(root);
    const themeObserver = new MutationObserver(() => {
      rgbColors = resolvePalette(varNames, resolveThemedHost());
    });
    themeObserver.observe(root, { attributes: true, attributeFilter: ["data-theme", "data-color-mode"] });
    if (host !== root) {
      themeObserver.observe(host, { attributes: true, attributeFilter: ["data-theme", "data-color-mode"] });
    }
    window.addEventListener("resize", resize);
    resize();
    const cols = 40;
    const rows = 30;
    const spacing = 60;
    const points = [];
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const fov = 400;
      const viewDistance = 500;
      for (let ix = 0; ix < cols; ix++) {
        for (let iy = 0; iy < rows; iy++) {
          const x = (ix - cols / 2) * spacing;
          const y = (iy - rows / 2) * spacing;
          const distance = Math.sqrt(x * x + y * y);
          let z = Math.sin(distance * 0.01 - t * 0.5) * 50;
          z += Math.cos(ix * 0.2 + t) * 30;
          z += Math.sin(iy * 0.3 + t) * 30;
          const angleX = Math.PI / 3.5;
          const yRot = y * Math.cos(angleX) - z * Math.sin(angleX);
          const zRot = y * Math.sin(angleX) + z * Math.cos(angleX);
          const angleZ = t * 0.05;
          const xFinal = x * Math.cos(angleZ) - yRot * Math.sin(angleZ);
          const yFinal = x * Math.sin(angleZ) + yRot * Math.cos(angleZ);
          points[ix * rows + iy] = { x: xFinal, y: yFinal, z: zRot };
        }
      }
      ctx.lineWidth = render.lineWidth;
      for (let ix = 0; ix < cols; ix++) {
        for (let iy = 0; iy < rows; iy++) {
          const p = points[ix * rows + iy];
          const scale = fov / (fov + p.z + viewDistance);
          if (scale < 0) continue;
          const x2d = p.x * scale + width / 2;
          const y2d = p.y * scale + height / 2;
          const colorIdx = Math.floor(Math.abs(Math.sin(t * 0.2 + ix * 0.1)) * rgbColors.length) % rgbColors.length;
          const c = rgbColors[colorIdx];
          const opacity = Math.min(
            1,
            Math.max(render.minOpacity, scale * render.opacityScale)
          );
          ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${opacity})`;
          if (ix < cols - 1) {
            const pRight = points[(ix + 1) * rows + iy];
            const scaleR = fov / (fov + pRight.z + viewDistance);
            if (scaleR > 0) {
              ctx.beginPath();
              ctx.moveTo(x2d, y2d);
              ctx.lineTo(pRight.x * scaleR + width / 2, pRight.y * scaleR + height / 2);
              ctx.stroke();
            }
          }
          if (iy < rows - 1) {
            const pDown = points[ix * rows + (iy + 1)];
            const scaleD = fov / (fov + pDown.z + viewDistance);
            if (scaleD > 0) {
              ctx.beginPath();
              ctx.moveTo(x2d, y2d);
              ctx.lineTo(pDown.x * scaleD + width / 2, pDown.y * scaleD + height / 2);
              ctx.stroke();
            }
          }
        }
      }
      t += 0.02;
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      themeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [palette, colorVars]);
  return /* @__PURE__ */ jsxs28("div", { className: cn("slt-wave-bg-wrap", className), "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx38("div", { className: "slt-wave-bg-fill" }),
    /* @__PURE__ */ jsx38("canvas", { ref: canvasRef, className: "slt-wave-bg" })
  ] });
}

// src/components/BrandBackground/BrandBackground.tsx
import { useEffect as useEffect4, useState as useState7 } from "react";

// src/components/brand-backgrounds.ts
var BRAND_BACKGROUNDS = {
  "ai-dash": {
    kind: "wave-mesh",
    palette: "ai-dash"
  },
  "sound-laboratory": {
    kind: "grid",
    grid: {
      light: {
        minorVar: "--color-grid-minor-light",
        majorVar: "--color-grid-major-light"
      },
      dark: {
        minorVar: "--color-grid-minor-dark",
        majorVar: "--color-grid-major-dark"
      },
      minorSize: 25,
      majorSize: 100,
      parallaxMax: 20,
      surfaceVar: "--color-surface-primary"
    }
  },
  "slt-corporate": {
    kind: "wave-mesh",
    palette: "slt-corporate"
  }
};
function getBrandBackground(brand) {
  return BRAND_BACKGROUNDS[brand];
}

// src/components/GridBackground/GridBackground.tsx
import { useEffect as useEffect3, useRef as useRef2 } from "react";
import { jsx as jsx39 } from "react/jsx-runtime";
function gridLineGradient(direction, color) {
  return `linear-gradient(${direction}, ${color} 0, ${color} 1px, transparent 1px, transparent 100%)`;
}
function gridBackgroundImage(minor, major) {
  return [
    gridLineGradient("to bottom", minor),
    gridLineGradient("to right", minor),
    gridLineGradient("to bottom", major),
    gridLineGradient("to right", major)
  ].join(", ");
}
function gridBackgroundSize(minorPx, majorPx) {
  const minor = `${minorPx}px`;
  const major = `${majorPx}px`;
  return [`100% ${minor}`, `${minor} 100%`, `100% ${major}`, `${major} 100%`].join(", ");
}
function GridBackground({ spec, colorMode = "light", className }) {
  const ref = useRef2(null);
  useEffect3(() => {
    const el = ref.current;
    if (!el) return;
    const applyGrid = () => {
      const host2 = resolveThemedHost();
      const colors = spec[colorMode];
      const minor = resolveCssVarColor(colors.minorVar, host2);
      const major = resolveCssVarColor(colors.majorVar, host2);
      el.style.backgroundColor = resolveCssVarColor(spec.surfaceVar, host2);
      el.style.backgroundImage = gridBackgroundImage(minor, major);
      el.style.backgroundSize = gridBackgroundSize(spec.minorSize, spec.majorSize);
      el.style.backgroundRepeat = "repeat";
    };
    applyGrid();
    const root = document.documentElement;
    const host = resolveThemedHost(root);
    const observer = new MutationObserver(applyGrid);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme", "data-color-mode"] });
    if (host !== root) {
      observer.observe(host, { attributes: true, attributeFilter: ["data-theme", "data-color-mode"] });
    }
    return () => observer.disconnect();
  }, [spec, colorMode]);
  useEffect3(() => {
    const el = ref.current;
    if (!el || spec.parallaxMax <= 0) return;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;
    const onMove = (event) => {
      const xOffset = (event.clientX / window.innerWidth - 0.5) * spec.parallaxMax;
      const yOffset = (event.clientY / window.innerHeight - 0.5) * spec.parallaxMax;
      const pos = `${-xOffset}px ${-yOffset}px`;
      el.style.backgroundPosition = `${pos}, ${pos}, ${pos}, ${pos}`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [spec.parallaxMax]);
  return /* @__PURE__ */ jsx39(
    "div",
    {
      ref,
      "data-color-mode": colorMode,
      className: cn("slt-grid-bg", className),
      "aria-hidden": "true"
    }
  );
}

// src/components/BrandBackground/BrandBackground.tsx
import { jsx as jsx40 } from "react/jsx-runtime";
function BrandBackground({ brand: brandProp, colorVars, className }) {
  const [brand, setBrand] = useState7(brandProp ?? "ai-dash");
  const [colorMode, setColorMode] = useState7("dark");
  useEffect4(() => {
    const root = document.documentElement;
    const sync = () => {
      if (!brandProp) setBrand(resolveBrandFromDom(root));
      setColorMode(resolveColorModeFromDom(root));
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme", "data-color-mode"] });
    return () => observer.disconnect();
  }, [brandProp]);
  useEffect4(() => {
    if (brandProp) setBrand(brandProp);
  }, [brandProp]);
  const config = getBrandBackground(brand);
  if (config.kind === "wave-mesh") {
    return /* @__PURE__ */ jsx40(WaveBackground, { palette: config.palette, colorVars, className: cn(className) });
  }
  return /* @__PURE__ */ jsx40("div", { className: "slt-brand-bg-wrap", children: /* @__PURE__ */ jsx40(GridBackground, { spec: config.grid, colorMode, className: cn(className) }) });
}

// src/lib/brand-labels.ts
var BRAND_DISPLAY_NAMES = {
  "ai-dash": "AI-DASH",
  "sound-laboratory": "Sound Laboratory",
  "slt-corporate": "Sound Labbit Technology"
};
var ADMIN_DISPLAY_NAME = "AI-DASH Admin";
function getBrandDisplayName(brand) {
  return BRAND_DISPLAY_NAMES[brand];
}

// src/components/Toast/Toast.tsx
import * as ToastPrimitive from "@radix-ui/react-toast";
import {
  createContext as createContext4,
  useCallback as useCallback3,
  useContext as useContext4,
  useState as useState8
} from "react";
import { jsx as jsx41, jsxs as jsxs29 } from "react/jsx-runtime";
var ToastContext = createContext4(null);
var toastId = 0;
function ToastProvider({ children, duration = 5e3 }) {
  const [toasts, setToasts] = useState8([]);
  const dismiss = useCallback3((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  const toast = useCallback3((item) => {
    const id = String(++toastId);
    setToasts((prev) => [...prev, { ...item, id }]);
    return id;
  }, []);
  return /* @__PURE__ */ jsx41(ToastPrimitive.Provider, { duration, swipeDirection: "right", children: /* @__PURE__ */ jsxs29(ToastContext.Provider, { value: { toast, dismiss }, children: [
    children,
    toasts.map((item) => /* @__PURE__ */ jsx41(
      Toast,
      {
        ...item,
        onOpenChange: (open) => {
          item.onOpenChange?.(open);
          if (!open) dismiss(item.id);
        }
      },
      item.id
    )),
    /* @__PURE__ */ jsx41(ToastPrimitive.Viewport, { className: "slt-toast-viewport" })
  ] }) });
}
function useToast() {
  const ctx = useContext4(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}
function Toast({
  title,
  description,
  variant = "default",
  duration,
  open,
  defaultOpen = true,
  onOpenChange
}) {
  return /* @__PURE__ */ jsxs29(
    ToastPrimitive.Root,
    {
      className: cn("slt-toast", `slt-toast--${variant}`),
      duration,
      open,
      defaultOpen,
      onOpenChange,
      children: [
        /* @__PURE__ */ jsxs29("div", { className: "slt-toast__body", children: [
          /* @__PURE__ */ jsx41(ToastPrimitive.Title, { className: "slt-toast__title", children: title }),
          description ? /* @__PURE__ */ jsx41(ToastPrimitive.Description, { className: "slt-toast__description", children: description }) : null
        ] }),
        /* @__PURE__ */ jsx41(ToastPrimitive.Close, { className: "slt-toast__close", "aria-label": "\u9589\u3058\u308B", children: "\xD7" })
      ]
    }
  );
}

// src/components/SiteHeader/SiteHeader.tsx
import { useId as useId5, useState as useState9 } from "react";
import { jsx as jsx42, jsxs as jsxs30 } from "react/jsx-runtime";
function SiteHeader({
  logo,
  nav,
  actions,
  variant = "default",
  contentMaxWidth,
  className
}) {
  const [menuOpen, setMenuOpen] = useState9(false);
  const menuId = useId5();
  const barStyle = contentMaxWidth ? { maxWidth: contentMaxWidth } : void 0;
  return /* @__PURE__ */ jsxs30("header", { className: cn("slt-site-header", `slt-site-header--${variant}`, className), children: [
    /* @__PURE__ */ jsxs30("div", { className: "slt-site-header__bar", style: barStyle, children: [
      logo ? /* @__PURE__ */ jsx42("div", { className: "slt-site-header__logo", children: logo }) : null,
      nav ? /* @__PURE__ */ jsx42("nav", { className: "slt-site-header__nav", "aria-label": "\u30E1\u30A4\u30F3", children: nav }) : null,
      actions ? /* @__PURE__ */ jsx42("div", { className: "slt-site-header__actions", children: actions }) : null,
      (nav || actions) && /* @__PURE__ */ jsx42(
        "button",
        {
          type: "button",
          className: "slt-site-header__menu-btn",
          "aria-expanded": menuOpen,
          "aria-controls": menuId,
          onClick: () => setMenuOpen((open) => !open),
          children: /* @__PURE__ */ jsx42("span", { className: "slt-site-header__menu-label", children: menuOpen ? "\u30E1\u30CB\u30E5\u30FC\u3092\u9589\u3058\u308B" : "\u30E1\u30CB\u30E5\u30FC\u3092\u958B\u304F" })
        }
      )
    ] }),
    (nav || actions) && menuOpen ? /* @__PURE__ */ jsxs30(
      "div",
      {
        id: menuId,
        className: "slt-site-header__drawer",
        onClick: () => setMenuOpen(false),
        children: [
          nav ? /* @__PURE__ */ jsx42("nav", { className: "slt-site-header__drawer-nav", "aria-label": "\u30E2\u30D0\u30A4\u30EB\u30E1\u30CB\u30E5\u30FC", children: nav }) : null,
          actions ? /* @__PURE__ */ jsx42("div", { className: "slt-site-header__drawer-actions", children: actions }) : null
        ]
      }
    ) : null
  ] });
}
function SiteHeaderLink({
  active = false,
  variant = "default",
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx42(
    "a",
    {
      className: cn(
        "slt-site-header__link",
        variant === "marketing" && "slt-site-header__link--marketing",
        active && "slt-site-header__link--active",
        className
      ),
      "aria-current": active ? "page" : void 0,
      ...props
    }
  );
}

// src/components/Skeleton/Skeleton.tsx
import { jsx as jsx43, jsxs as jsxs31 } from "react/jsx-runtime";
var variantDefaults = {
  rect: { width: "100%", height: "var(--space-8, 32px)" },
  text: { width: "100%", height: "1em" },
  circle: { width: "var(--space-10, 40px)", height: "var(--space-10, 40px)" }
};
function Skeleton({
  variant = "rect",
  width,
  height,
  className,
  style,
  "aria-hidden": ariaHidden = true,
  ...props
}) {
  return /* @__PURE__ */ jsx43(
    "div",
    {
      className: cn(
        "slt-skeleton",
        variant === "text" && "slt-skeleton--text",
        variant === "circle" && "slt-skeleton--circle",
        className
      ),
      style: { ...variantDefaults[variant], width, height, ...style },
      "aria-hidden": ariaHidden,
      ...props
    }
  );
}
function SkeletonList({ count = 3, className }) {
  return /* @__PURE__ */ jsx43("div", { className: cn("slt-skeleton-list", className), "aria-busy": "true", "aria-label": "\u8AAD\u307F\u8FBC\u307F\u4E2D", children: Array.from({ length: count }, (_, i) => /* @__PURE__ */ jsxs31("div", { className: "slt-skeleton-list__item", children: [
    /* @__PURE__ */ jsx43(Skeleton, { variant: "circle" }),
    /* @__PURE__ */ jsxs31("div", { className: "slt-skeleton-list__lines", children: [
      /* @__PURE__ */ jsx43(Skeleton, { variant: "text", width: "40%" }),
      /* @__PURE__ */ jsx43(Skeleton, { variant: "text", width: "70%" })
    ] })
  ] }, i)) });
}
function SkeletonCard({ className }) {
  return /* @__PURE__ */ jsxs31(Card, { className: cn("slt-skeleton-card", className), "aria-busy": "true", "aria-label": "\u8AAD\u307F\u8FBC\u307F\u4E2D", children: [
    /* @__PURE__ */ jsx43(Skeleton, { variant: "text", width: "55%", height: "var(--font-size-xl, 24px)" }),
    /* @__PURE__ */ jsx43(Skeleton, { variant: "text" }),
    /* @__PURE__ */ jsx43(Skeleton, { variant: "text", width: "80%" }),
    /* @__PURE__ */ jsx43(Skeleton, { variant: "rect", height: "var(--space-10, 40px)" })
  ] });
}

// src/components/Table/Table.tsx
import { useEffect as useEffect5, useRef as useRef3 } from "react";
import { jsx as jsx44, jsxs as jsxs32 } from "react/jsx-runtime";
function Table({
  striped = false,
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx44("div", { className: "slt-table-wrap", children: /* @__PURE__ */ jsx44("table", { className: cn("slt-table", striped && "slt-table--striped", className), ...props, children }) });
}
function TableHeader({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx44("thead", { className: cn("slt-table__head", className), ...props, children });
}
function TableBody({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx44("tbody", { className: cn("slt-table__body", className), ...props, children });
}
function TableRow({
  selected = false,
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx44(
    "tr",
    {
      className: cn("slt-table__row", selected && "slt-table__row--selected", className),
      "aria-selected": selected || void 0,
      ...props,
      children
    }
  );
}
function TableHead({
  sortable = false,
  sortDirection = false,
  onSort,
  className,
  children,
  ...props
}) {
  const ariaSort = sortable && sortDirection === "asc" ? "ascending" : sortable && sortDirection === "desc" ? "descending" : sortable ? "none" : void 0;
  return /* @__PURE__ */ jsx44(
    "th",
    {
      scope: "col",
      className: cn("slt-table__head-cell", className),
      "aria-sort": ariaSort,
      ...props,
      children: sortable ? /* @__PURE__ */ jsxs32("button", { type: "button", className: "slt-table__sort", onClick: onSort, children: [
        /* @__PURE__ */ jsx44("span", { children }),
        /* @__PURE__ */ jsx44("span", { className: "slt-table__sort-icon", "aria-hidden": "true", children: sortDirection === "asc" ? "\u2191" : sortDirection === "desc" ? "\u2193" : "\u2195" })
      ] }) : children
    }
  );
}
function TableCell({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx44("td", { className: cn("slt-table__cell", className), ...props, children });
}
function TableCheckboxCell({
  checked = false,
  indeterminate = false,
  onChange,
  label
}) {
  const inputRef = useRef3(null);
  useEffect5(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);
  return /* @__PURE__ */ jsx44(TableCell, { className: "slt-table__cell--checkbox", children: /* @__PURE__ */ jsx44(
    "input",
    {
      ref: inputRef,
      type: "checkbox",
      className: "slt-table__checkbox",
      checked,
      "aria-label": label,
      onChange: (e) => onChange?.(e.target.checked)
    }
  ) });
}
function DataTable({
  columns,
  rows,
  getRowKey,
  caption,
  sortKey,
  sortDirection,
  onSort,
  selectable = false,
  selectedKeys = /* @__PURE__ */ new Set(),
  onSelectionChange,
  rowLabel,
  striped = false
}) {
  const allKeys = rows.map(getRowKey);
  const allSelected = allKeys.length > 0 && allKeys.every((k) => selectedKeys.has(k));
  const someSelected = allKeys.some((k) => selectedKeys.has(k));
  const toggleAll = (checked) => {
    onSelectionChange?.(checked ? new Set(allKeys) : /* @__PURE__ */ new Set());
  };
  const toggleRow = (key, checked) => {
    const next = new Set(selectedKeys);
    if (checked) next.add(key);
    else next.delete(key);
    onSelectionChange?.(next);
  };
  return /* @__PURE__ */ jsxs32(Table, { striped, children: [
    caption ? /* @__PURE__ */ jsx44("caption", { className: "slt-table__caption", children: caption }) : null,
    /* @__PURE__ */ jsx44(TableHeader, { children: /* @__PURE__ */ jsxs32(TableRow, { children: [
      selectable ? /* @__PURE__ */ jsx44(
        TableCheckboxCell,
        {
          checked: allSelected,
          indeterminate: !allSelected && someSelected,
          onChange: toggleAll,
          label: "\u3059\u3079\u3066\u9078\u629E"
        }
      ) : null,
      columns.map((col) => /* @__PURE__ */ jsx44(
        TableHead,
        {
          sortable: col.sortable,
          sortDirection: sortKey === col.key ? sortDirection : false,
          onSort: col.sortable ? () => onSort?.(col.key) : void 0,
          children: col.header
        },
        col.key
      ))
    ] }) }),
    /* @__PURE__ */ jsx44(TableBody, { children: rows.map((row) => {
      const key = getRowKey(row);
      const label = rowLabel?.(row) ?? key;
      return /* @__PURE__ */ jsxs32(TableRow, { selected: selectedKeys.has(key), children: [
        selectable ? /* @__PURE__ */ jsx44(
          TableCheckboxCell,
          {
            checked: selectedKeys.has(key),
            onChange: (checked) => toggleRow(key, checked),
            label: `${label} \u3092\u9078\u629E`
          }
        ) : null,
        columns.map((col) => /* @__PURE__ */ jsx44(TableCell, { children: col.render ? col.render(row) : String(row[col.key] ?? "") }, col.key))
      ] }, key);
    }) })
  ] });
}
export {
  ADMIN_DISPLAY_NAME,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  BRAND_BACKGROUNDS,
  BRAND_DISPLAY_NAMES,
  Badge,
  Blockquote,
  BottomNavigation,
  BrandBackground,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Chip,
  DataTable,
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
  Dialog,
  DialogClose,
  DialogTrigger,
  Disclosure,
  Divider,
  Drawer,
  DrawerClose,
  DrawerTrigger,
  FileUpload,
  GridBackground,
  HamburgerMenuButton,
  Heading,
  HorizontalMenu,
  Image,
  Input,
  List,
  ListItem,
  MenuList,
  MobileMenu,
  NoticeBlock,
  PageNavigation,
  ProgressIndicator,
  Radio,
  RadioGroup,
  ResourceList,
  ScrollTopButton,
  SearchBox,
  Select,
  SiteHeader,
  SiteHeaderLink,
  Skeleton,
  SkeletonCard,
  SkeletonList,
  StepNavigation,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Table,
  TableBody,
  TableCell,
  TableCheckboxCell,
  TableHead,
  TableHeader,
  TableOfContents,
  TableRow,
  Tabs,
  Textarea,
  Toast,
  ToastProvider,
  UtilityLink,
  WaveBackground,
  getBrandBackground,
  getBrandDisplayName,
  useToast
};
//# sourceMappingURL=index.js.map