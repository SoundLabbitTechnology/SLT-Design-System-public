import { Combobox } from "@soundlabbit/design-system/ui";

const options = [
  { value: "hokkaido", label: "北海道" },
  { value: "tokyo", label: "東京都" },
  { value: "osaka", label: "大阪府" },
  { value: "fukuoka", label: "福岡県" },
  { value: "okinawa", label: "沖縄県" },
];

export default function ComboboxDemo() {
  return (
    <div className="docs-field-stack">
      <Combobox
        label="都道府県"
        hint="入力で候補を絞り込みます"
        options={options}
        placeholder="都道府県を検索"
      />
    </div>
  );
}
