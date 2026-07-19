import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { storyParameters } from "../../../.storybook/story-meta";
import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableCheckboxCell,
  TableHead,
  TableHeader,
  TableRow,
  type SortDirection,
} from "./Table";

const meta = {
  title: "SLT Design System/L2 Components/P2/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: storyParameters("P2", "Table", "padded"),
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

type UserRow = { name: string; email: string; role: string };

const sampleRows: UserRow[] = [
  { name: "山田 太郎", email: "taro@example.com", role: "Admin" },
  { name: "佐藤 花子", email: "hanako@example.com", role: "Editor" },
  { name: "鈴木 一郎", email: "ichiro@example.com", role: "Viewer" },
];

const columns = [
  { key: "name", header: "名前", sortable: true },
  { key: "email", header: "メール", sortable: true },
  { key: "role", header: "ロール" },
] as const;

function sortRows(rows: UserRow[], key: string, direction: SortDirection) {
  return [...rows].sort((a, b) => {
    const av = String(a[key as keyof UserRow]);
    const bv = String(b[key as keyof UserRow]);
    return direction === "asc" ? av.localeCompare(bv, "ja") : bv.localeCompare(av, "ja");
  });
}

function DataTableDemo() {
  const [sortKey, setSortKey] = useState("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const rows = sortRows(sampleRows, sortKey, sortDirection);

  return (
    <DataTable
      caption="チームメンバー一覧"
      columns={[...columns]}
      rows={rows}
      getRowKey={(row) => row.email}
      rowLabel={(row) => row.name}
      sortKey={sortKey}
      sortDirection={sortDirection}
      onSort={handleSort}
      selectable
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
    />
  );
}

export const Basic: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>名前</TableHead>
          <TableHead>メール</TableHead>
          <TableHead>ロール</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleRows.map((row) => (
          <TableRow key={row.email}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Striped: Story = {
  render: () => (
    <Table striped>
      <TableHeader>
        <TableRow>
          <TableHead>名前</TableHead>
          <TableHead>メール</TableHead>
          <TableHead>ロール</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleRows.map((row) => (
          <TableRow key={row.email}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const CellSpan: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>区分</TableHead>
          <TableHead>項目</TableHead>
          <TableHead>値</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell rowSpan={2}>申請者</TableCell>
          <TableCell>氏名</TableCell>
          <TableCell>山田 太郎</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>メール</TableCell>
          <TableCell>taro@example.com</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2}>備考</TableCell>
          <TableCell>特になし</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const SortAndSelect: Story = {
  render: () => <DataTableDemo />,
};

export const KeyboardSort: Story = {
  render: () => <DataTableDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const sortBtn = canvas.getByRole("button", { name: /名前/ });
    sortBtn.focus();
    await userEvent.keyboard("{Enter}");
    await waitFor(() => {
      expect(sortBtn.closest("th")).toHaveAttribute("aria-sort", "descending");
    });
  },
};

export const KeyboardSelection: Story = {
  render: () => <DataTableDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rowCheckbox = canvas.getByRole("checkbox", {
      name: "山田 太郎 を選択",
    });
    rowCheckbox.focus();
    await userEvent.keyboard(" ");
    await expect(rowCheckbox).toBeChecked();
    await userEvent.keyboard(" ");
    await expect(rowCheckbox).not.toBeChecked();
  },
};

export const CompoundWithSelection: Story = {
  render: () => {
    function CompoundDemo() {
      const [selected, setSelected] = useState(false);
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              <TableHead>名前</TableHead>
              <TableHead>ステータス</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow selected={selected}>
              <TableCheckboxCell
                checked={selected}
                onChange={setSelected}
                label="山田 太郎 を選択"
              />
              <TableCell>山田 太郎</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
    }
    return <CompoundDemo />;
  },
};
