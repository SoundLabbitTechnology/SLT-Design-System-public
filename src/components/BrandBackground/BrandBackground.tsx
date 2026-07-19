'use client';

import { useEffect, useState } from "react";
import { cn } from "../../lib/cn";
import {
  resolveBrandFromDom,
  resolveColorModeFromDom,
  type ColorMode,
} from "../../lib/resolve-brand-context";
import { getBrandBackground, type BrandId } from "../brand-backgrounds";
import { GridBackground } from "../GridBackground/GridBackground";
import { WaveBackground } from "../WaveBackground/WaveBackground";

export interface BrandBackgroundProps {
  /**
   * Brand preset. When omitted, reads `data-theme` on `<html>` (falls back to ai-dash).
   */
  brand?: BrandId;
  /** Override wave mesh colors (wave-mesh brands only) */
  colorVars?: string[];
  className?: string;
}

export function BrandBackground({ brand: brandProp, colorVars, className }: BrandBackgroundProps) {
  const [brand, setBrand] = useState<BrandId>(brandProp ?? "ai-dash");
  const [colorMode, setColorMode] = useState<ColorMode>("dark");

  useEffect(() => {
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

  useEffect(() => {
    if (brandProp) setBrand(brandProp);
  }, [brandProp]);

  const config = getBrandBackground(brand);

  if (config.kind === "wave-mesh") {
    return (
      <WaveBackground palette={config.palette} colorVars={colorVars} className={cn(className)} />
    );
  }

  return (
    <div className="slt-brand-bg-wrap">
      <GridBackground spec={config.grid} colorMode={colorMode} className={cn(className)} />
    </div>
  );
}
