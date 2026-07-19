import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@soundlabbit/design-system/ui";

export default function DescriptionListDemo() {
  return (
    <DescriptionList>
      <DescriptionTerm>申請者</DescriptionTerm>
      <DescriptionDetails>山田 太郎</DescriptionDetails>
      <DescriptionTerm>受付日</DescriptionTerm>
      <DescriptionDetails>2026年7月16日</DescriptionDetails>
    </DescriptionList>
  );
}
