"use client";

import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Carousel, type CarouselProps } from "../Carousel/Carousel";
import { Image } from "../Image/Image";

export interface ImageSliderItem {
  src: string;
  alt: string;
  caption?: ReactNode;
}

export interface ImageSliderProps
  extends Omit<CarouselProps, "slides"> {
  images: ImageSliderItem[];
}

/** 画像専用カルーセル（Carousel + Image） */
export function ImageSlider({
  images,
  className,
  "aria-label": ariaLabel = "イメージスライダー",
  getDotLabel = (i) => `${i + 1}枚目の画像`,
  ...props
}: ImageSliderProps) {
  const slides = images.map((image) => (
    <Image
      key={image.src}
      src={image.src}
      alt={image.alt}
      caption={image.caption}
      className="slt-image-slider__image"
    />
  ));

  return (
    <Carousel
      {...props}
      className={cn("slt-image-slider", className)}
      aria-label={ariaLabel}
      getDotLabel={getDotLabel}
      slides={slides}
    />
  );
}
