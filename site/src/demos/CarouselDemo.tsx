import { Carousel } from "@soundlabbit/design-system/ui";

export default function CarouselDemo() {
  return (
    <Carousel
      aria-label="お知らせ"
      slides={[
        <p key="1">スライド 1 — お知らせ本文</p>,
        <p key="2">スライド 2 — お知らせ本文</p>,
        <p key="3">スライド 3 — お知らせ本文</p>,
      ]}
    />
  );
}
