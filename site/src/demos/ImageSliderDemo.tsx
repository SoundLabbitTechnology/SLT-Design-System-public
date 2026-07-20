import { ImageSlider } from "@soundlabbit/design-system/ui";

export default function ImageSliderDemo() {
  return (
    <ImageSlider
      images={[
        { src: "https://placehold.co/640x360/png?text=1", alt: "サンプル 1", caption: "1枚目" },
        { src: "https://placehold.co/640x360/png?text=2", alt: "サンプル 2", caption: "2枚目" },
      ]}
    />
  );
}
