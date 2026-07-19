import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface StepNavigationItem {
  label: ReactNode;
  description?: ReactNode;
}

export interface StepNavigationProps extends HTMLAttributes<HTMLElement> {
  steps: StepNavigationItem[];
  /** 1-based current step */
  current: number;
}

export function StepNavigation({
  steps,
  current,
  className,
  "aria-label": ariaLabel = "ステップナビゲーション",
  ...props
}: StepNavigationProps) {
  return (
    <nav aria-label={ariaLabel} className={cn("slt-step-nav", className)} {...props}>
      <ol className="slt-step-nav__list">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const state =
            stepNumber < current ? "complete" : stepNumber === current ? "current" : "upcoming";
          return (
            <li
              key={index}
              className={cn("slt-step-nav__item", `slt-step-nav__item--${state}`)}
              aria-current={state === "current" ? "step" : undefined}
            >
              <span className="slt-step-nav__index" aria-hidden="true">
                {stepNumber}
              </span>
              <span className="slt-step-nav__body">
                <span className="slt-step-nav__label">{step.label}</span>
                {step.description ? (
                  <span className="slt-step-nav__description">{step.description}</span>
                ) : null}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
