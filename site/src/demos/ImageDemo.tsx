import { Image } from "@soundlabbit/design-system/ui";

const SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360'%3E%3Crect width='100%25' height='100%25' fill='silver'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='black' font-family='sans-serif'%3ESample%3C/text%3E%3C/svg%3E";

export default function ImageDemo() {
  return <Image src={SRC} alt="サンプル画像" caption="キャプション付きの画像例" width={640} height={360} />;
}
