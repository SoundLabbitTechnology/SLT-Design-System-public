import { Skeleton, SkeletonCard, SkeletonList } from "@soundlabbit/design-system/ui";

export default function SkeletonDemo() {
  return (
    <div className="docs-demo-row docs-demo-row--top">
      <div className="docs-field-stack docs-field-stack--narrow">
        <Skeleton variant="circle" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </div>
      <SkeletonCard />
      <SkeletonList count={3} />
    </div>
  );
}
