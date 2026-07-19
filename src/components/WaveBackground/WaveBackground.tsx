'use client';

import { useEffect, useRef } from "react";
import { cn } from "../../lib/cn";
import { resolveThemedHost } from "../../lib/resolve-brand-context";
import {
  resolvePalette,
  WAVE_PALETTE_RENDER,
  WAVE_PALETTE_VARS,
  type WavePalette,
} from "./wave-palettes";

export interface WaveBackgroundProps {
  /** Token-based preset; reads CSS vars from active theme */
  palette?: WavePalette;
  /** Override with CSS variable names, e.g. `--color-action-secondary` */
  colorVars?: string[];
  className?: string;
}

export function WaveBackground({
  palette = "ai-dash",
  colorVars,
  className,
}: WaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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
    const points: { x: number; y: number; z: number }[] = [];

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
          const colorIdx =
            Math.floor(Math.abs(Math.sin(t * 0.2 + ix * 0.1)) * rgbColors.length) %
            rgbColors.length;
          const c = rgbColors[colorIdx]!;
          const opacity = Math.min(
            1,
            Math.max(render.minOpacity, scale * render.opacityScale),
          );
          ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${opacity})`;

          if (ix < cols - 1) {
            const pRight = points[(ix + 1) * rows + iy]!;
            const scaleR = fov / (fov + pRight.z + viewDistance);
            if (scaleR > 0) {
              ctx.beginPath();
              ctx.moveTo(x2d, y2d);
              ctx.lineTo(pRight.x * scaleR + width / 2, pRight.y * scaleR + height / 2);
              ctx.stroke();
            }
          }

          if (iy < rows - 1) {
            const pDown = points[ix * rows + (iy + 1)]!;
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

  return (
    <div className={cn("slt-wave-bg-wrap", className)} aria-hidden="true">
      <div className="slt-wave-bg-fill" />
      <canvas ref={canvasRef} className="slt-wave-bg" />
    </div>
  );
}
