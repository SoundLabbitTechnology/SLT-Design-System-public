import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@soundlabbit/design-system/ui";

export default function AccordionDemo() {
  return (
    <Accordion type="multiple" defaultValue={["q1"]}>
      <AccordionItem value="q1">
        <AccordionTrigger>申請には何が必要ですか？</AccordionTrigger>
        <AccordionContent>
          本人確認書類と、申請内容に応じた添付資料が必要です。
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="q2">
        <AccordionTrigger>審査にはどのくらい時間がかかりますか？</AccordionTrigger>
        <AccordionContent>通常は受付から5〜10営業日程度です。</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
