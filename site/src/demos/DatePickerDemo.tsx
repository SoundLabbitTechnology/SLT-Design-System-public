import { DatePicker } from "@soundlabbit/design-system/ui";

export default function DatePickerDemo() {
  return (
    <div className="docs-field-stack">
      <DatePicker label="開始日" defaultValue="2026-07-20" showCalendar hint="カレンダーでも選べます" />
    </div>
  );
}
