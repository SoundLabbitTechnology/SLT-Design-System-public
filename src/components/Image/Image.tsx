import type { ImgHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** キャプション（figcaption） */
  caption?: ReactNode;
  /** 装飾画像のとき true（空 alt を強制） */
  decorative?: boolean;
}

export function Image({
  caption,
  decorative = false,
  alt,
  className,
  ...props
}: ImageProps) {
  const resolvedAlt = decorative ? "" : (alt ?? "");

  const img = (
    <img
      className={cn("slt-image__img", !caption && className)}
      alt={resolvedAlt}
      {...props}
    />
  );

  if (!caption) {
    return img;
  }

  return (
    <figure className={cn("slt-image", className)}>
      {img}
      <figcaption className="slt-image__caption">{caption}</figcaption>
    </figure>
  );
}
