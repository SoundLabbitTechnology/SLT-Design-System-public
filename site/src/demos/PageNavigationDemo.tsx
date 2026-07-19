import { useState } from "react";
import { PageNavigation } from "@soundlabbit/design-system/ui";

export default function PageNavigationDemo() {
  const [page, setPage] = useState(1);
  return <PageNavigation page={page} totalPages={10} onPageChange={setPage} />;
}
