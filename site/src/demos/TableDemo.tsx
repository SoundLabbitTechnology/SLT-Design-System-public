import { useState } from "react";
import { DataTable, type DataTableColumn, type SortDirection } from "@soundlabbit/design-system/ui";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
}

const TRACKS: Track[] = [
  { id: "1", title: "夜明けのメロディ", artist: "Sound Labbit", duration: "3:42" },
  { id: "2", title: "光のかけら", artist: "AI-DASH Session", duration: "4:10" },
  { id: "3", title: "波の記憶", artist: "Sound Labbit", duration: "3:15" },
];

const COLUMNS: DataTableColumn<Track>[] = [
  { key: "title", header: "曲名", sortable: true },
  { key: "artist", header: "アーティスト", sortable: true },
  { key: "duration", header: "再生時間" },
];

export default function TableDemo() {
  const [sortKey, setSortKey] = useState<string>("title");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  const rows = [...TRACKS].sort((a, b) => {
    const dir = sortDirection === "asc" ? 1 : -1;
    return a[sortKey as keyof Track] > b[sortKey as keyof Track] ? dir : -dir;
  });

  const handleSort = (key: string) => {
    if (key === sortKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  return (
    <DataTable
      columns={COLUMNS}
      rows={rows}
      getRowKey={(row) => row.id}
      caption="セットリスト"
      sortKey={sortKey}
      sortDirection={sortDirection}
      onSort={handleSort}
      selectable
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      rowLabel={(row) => row.title}
    />
  );
}
