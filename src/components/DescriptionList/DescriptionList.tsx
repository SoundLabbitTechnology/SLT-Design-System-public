import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {
  children: ReactNode;
}

export function DescriptionList({ className, children, ...props }: DescriptionListProps) {
  return (
    <dl className={cn("slt-description-list", className)} {...props}>
      {children}
    </dl>
  );
}

export interface DescriptionTermProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function DescriptionTerm({ className, children, ...props }: DescriptionTermProps) {
  return (
    <dt className={cn("slt-description-list__term", className)} {...props}>
      {children}
    </dt>
  );
}

export interface DescriptionDetailsProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function DescriptionDetails({
  className,
  children,
  ...props
}: DescriptionDetailsProps) {
  return (
    <dd className={cn("slt-description-list__details", className)} {...props}>
      {children}
    </dd>
  );
}
