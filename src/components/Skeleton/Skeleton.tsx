import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Card } from "../Card/Card";

export type SkeletonVariant = "rect" | "text" | "circle";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
}

const variantDefaults: Record<SkeletonVariant, CSSProperties> = {
  rect: { width: "100%", height: "var(--space-8, 32px)" },
  text: { width: "100%", height: "1em" },
  circle: { width: "var(--space-10, 40px)", height: "var(--space-10, 40px)" },
};

export function Skeleton({
  variant = "rect",
  width,
  height,
  className,
  style,
  "aria-hidden": ariaHidden = true,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "slt-skeleton",
        variant === "text" && "slt-skeleton--text",
        variant === "circle" && "slt-skeleton--circle",
        className,
      )}
      style={{ ...variantDefaults[variant], width, height, ...style }}
      aria-hidden={ariaHidden}
      {...props}
    />
  );
}

export interface SkeletonListProps {
  count?: number;
  className?: string;
  /** ローディング領域の accessible name（既定: 読み込み中） */
  label?: string;
}

/** リスト行のローディングプレースホルダ */
export function SkeletonList({ count = 3, className, label = "読み込み中" }: SkeletonListProps) {
  return (
    <div className={cn("slt-skeleton-list", className)} aria-busy="true" aria-label={label}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="slt-skeleton-list__item">
          <Skeleton variant="circle" />
          <div className="slt-skeleton-list__lines">
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="70%" />
          </div>
        </div>
      ))}
    </div>
  );
}

export interface SkeletonCardProps {
  className?: string;
  /** ローディング領域の accessible name（既定: 読み込み中） */
  label?: string;
}

/** Card 内コンテンツのローディングプレースホルダ */
export function SkeletonCard({ className, label = "読み込み中" }: SkeletonCardProps) {
  return (
    <Card className={cn("slt-skeleton-card", className)} aria-busy="true" aria-label={label}>
      <Skeleton variant="text" width="55%" height="var(--font-size-xl, 24px)" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="rect" height="var(--space-10, 40px)" />
    </Card>
  );
}
