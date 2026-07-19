'use client';

import { useEffect, useRef } from "react";
import { cn } from "../../lib/cn";
import { resolveCssVarColor } from "../../lib/resolve-css-color";
import { resolveThemedHost, type ColorMode } from "../../lib/resolve-brand-context";
import type { GridBackgroundSpec } from "../brand-backgrounds";

export interface GridBackgroundProps {
  spec: GridBackgroundSpec;
  colorMode?: ColorMode;
  className?: string;
}

/** 1px line along `direction` (explicit stops — degenerate `color 1px, transparent 1px` drops horizontal lines in multi-layer stacks). */
function gridLineGradient(direction: "to bottom" | "to right", color: string): string {
  return `linear-gradient(${direction}, ${color} 0, ${color} 1px, transparent 1px, transparent 100%)`;
}

/** Official site pattern: minor/major × horizontal + vertical (sound-laboratory-official-site/index.css) */
function gridBackgroundImage(minor: string, major: string): string {
  return [
    gridLineGradient("to bottom", minor),
    gridLineGradient("to right", minor),
    gridLineGradient("to bottom", major),
    gridLineGradient("to right", major),
  ].join(", ");
}

/** Per-axis repeat interval — `25px 25px` on all four layers suppresses horizontal lines in Chromium. */
function gridBackgroundSize(minorPx: number, majorPx: number): string {
  const minor = `${minorPx}px`;
  const major = `${majorPx}px`;
  return [`100% ${minor}`, `${minor} 100%`, `100% ${major}`, `${major} 100%`].join(", ");
}

export function GridBackground({ spec, colorMode = "light", className }: GridBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const applyGrid = () => {
      const host = resolveThemedHost();
      const colors = spec[colorMode];
      const minor = resolveCssVarColor(colors.minorVar, host);
      const major = resolveCssVarColor(colors.majorVar, host);

      el.style.backgroundColor = resolveCssVarColor(spec.surfaceVar, host);
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

  useEffect(() => {
    const el = ref.current;
    if (!el || spec.parallaxMax <= 0) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const onMove = (event: MouseEvent) => {
      const xOffset = (event.clientX / window.innerWidth - 0.5) * spec.parallaxMax;
      const yOffset = (event.clientY / window.innerHeight - 0.5) * spec.parallaxMax;
      const pos = `${-xOffset}px ${-yOffset}px`;
      el.style.backgroundPosition = `${pos}, ${pos}, ${pos}, ${pos}`;
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [spec.parallaxMax]);

  return (
    <div
      ref={ref}
      data-color-mode={colorMode}
      className={cn("slt-grid-bg", className)}
      aria-hidden="true"
    />
  );
}
