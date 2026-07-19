import { NoticeBlock } from "@soundlabbit/design-system/ui";

export default function NoticeBlockDemo() {
  return (
    <div className="docs-field-stack">
      <NoticeBlock title="本人確認書類の例">
        運転免許証、マイナンバーカード、在留カードのいずれか1点をご用意ください。
      </NoticeBlock>
      <NoticeBlock variant="warning" title="注意">
        期限が近いため、早めの提出をおすすめします。
      </NoticeBlock>
    </div>
  );
}
