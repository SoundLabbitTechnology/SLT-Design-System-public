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
}

/** リスト行のローディングプレースホルダ */
export function SkeletonList({ count = 3, className }: SkeletonListProps) {
  return (
    <div className={cn("slt-skeleton-list", className)} aria-busy="true" aria-label="読み込み中">
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

/** Card 内コンテンツのローディングプレースホルダ */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <Card className={cn("slt-skeleton-card", className)} aria-busy="true" aria-label="読み込み中">
      <Skeleton variant="text" width="55%" height="var(--font-size-xl, 24px)" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="rect" height="var(--space-10, 40px)" />
    </Card>
  );
}
