import { Select } from "@soundlabbit/design-system/ui";

export default function SelectDemo() {
  return (
    <div className="docs-field-stack">
      <Select label="都道府県" hint="6件以上の選択肢にセレクトを使います">
        <option value="">選択してください</option>
        <option value="hokkaido">北海道</option>
        <option value="tokyo">東京都</option>
        <option value="osaka">大阪府</option>
        <option value="fukuoka">福岡県</option>
        <option value="okinawa">沖縄県</option>
        <option value="other">その他</option>
      </Select>
    </div>
  );
}
