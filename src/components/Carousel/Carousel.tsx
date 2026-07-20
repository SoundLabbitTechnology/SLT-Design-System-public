"use client";

import {
  useEffect,
  useId,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";

export interface CarouselProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  slides: ReactNode[];
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  /** 自動送り ms。0 / 未指定で無効。reduced motion では無効化 */
  autoPlayMs?: number;
  previousLabel?: string;
  nextLabel?: string;
  "aria-label"?: string;
  showDots?: boolean;
  getDotLabel?: (index: number) => string;
}

export function Carousel({
  slides,
  index: indexProp,
  defaultIndex = 0,
  onIndexChange,
  autoPlayMs = 0,
  previousLabel = "前のスライド",
  nextLabel = "次のスライド",
  "aria-label": ariaLabel = "カルーセル",
  showDots = true,
  getDotLabel = (i) => `${i + 1}枚目`,
  className,
  ...props
}: CarouselProps) {
  const baseId = useId();
  const isControlled = indexProp !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultIndex);
  const index = Math.min(
    Math.max(0, isControlled ? (indexProp as number) : uncontrolled),
    Math.max(0, slides.length - 1),
  );

  const go = (next: number) => {
    if (slides.length === 0) return;
    const wrapped = ((next % slides.length) + slides.length) % slides.length;
    if (!isControlled) setUncontrolled(wrapped);
    onIndexChange?.(wrapped);
  };

  useEffect(() => {
    if (!autoPlayMs || autoPlayMs < 1 || slides.length < 2) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => go(index + 1), autoPlayMs);
    return () => window.clearInterval(id);
  }, [autoPlayMs, index, slides.length]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    }
  };

  return (
    <div
      className={cn("slt-carousel", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKeyDown}
      {...props}
    >
      <div className="slt-carousel__viewport">
        {slides.map((slide, i) => (
          <div
            key={i}
            id={`${baseId}-slide-${i}`}
            className={cn("slt-carousel__slide", i === index && "slt-carousel__slide--active")}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${slides.length}`}
            aria-hidden={i === index ? undefined : true}
            hidden={i !== index}
          >
            {slide}
          </div>
        ))}
      </div>
      {slides.length > 1 ? (
        <div className="slt-carousel__controls">
          <button
            type="button"
            className="slt-carousel__nav"
            aria-label={previousLabel}
            onClick={() => go(index - 1)}
          >
            ‹
          </button>
          {showDots ? (
            <div className="slt-carousel__dots" role="tablist" aria-label="スライド選択">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  className={cn(
                    "slt-carousel__dot",
                    i === index && "slt-carousel__dot--active",
                  )}
                  aria-label={getDotLabel(i)}
                  aria-selected={i === index}
                  tabIndex={i === index ? 0 : -1}
                  onClick={() => go(i)}
                />
              ))}
            </div>
          ) : (
            <span className="slt-carousel__status">
              {index + 1} / {slides.length}
            </span>
          )}
          <button
            type="button"
            className="slt-carousel__nav"
            aria-label={nextLabel}
            onClick={() => go(index + 1)}
          >
            ›
          </button>
        </div>
      ) : null}
    </div>
  );
}
