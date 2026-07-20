import type {
  HTMLAttributes,
  ReactNode,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";
import { useEffect, useRef } from "react";
import { cn } from "../../lib/cn";

export type SortDirection = "asc" | "desc";

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /** DADS ストライプ行 */
  striped?: boolean;
}

export function Table({
  striped = false,
  className,
  children,
  ...props
}: TableProps) {
  return (
    <div className="slt-table-wrap">
      <table className={cn("slt-table", striped && "slt-table--striped", className)} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={cn("slt-table__head", className)} {...props}>
      {children}
    </thead>
  );
}

export function TableBody({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={cn("slt-table__body", className)} {...props}>
      {children}
    </tbody>
  );
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
}

export function TableRow({
  selected = false,
  className,
  children,
  ...props
}: TableRowProps) {
  return (
    <tr
      className={cn("slt-table__row", selected && "slt-table__row--selected", className)}
      aria-selected={selected || undefined}
      {...props}
    >
      {children}
    </tr>
  );
}

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: SortDirection | false;
  onSort?: () => void;
}

export function TableHead({
  sortable = false,
  sortDirection = false,
  onSort,
  className,
  children,
  ...props
}: TableHeadProps) {
  const ariaSort =
    sortable && sortDirection === "asc"
      ? "ascending"
      : sortable && sortDirection === "desc"
        ? "descending"
        : sortable
          ? "none"
          : undefined;

  return (
    <th
      scope="col"
      className={cn("slt-table__head-cell", className)}
      aria-sort={ariaSort}
      {...props}
    >
      {sortable ? (
        <button type="button" className="slt-table__sort" onClick={onSort}>
          <span>{children}</span>
          <span className="slt-table__sort-icon" aria-hidden="true">
            {sortDirection === "asc" ? "↑" : sortDirection === "desc" ? "↓" : "↕"}
          </span>
        </button>
      ) : (
        children
      )}
    </th>
  );
}

export function TableCell({
  className,
  children,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn("slt-table__cell", className)} {...props}>
      {children}
    </td>
  );
}

export interface TableCheckboxCellProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  label: string;
}

export function TableCheckboxCell({
  checked = false,
  indeterminate = false,
  onChange,
  label,
}: TableCheckboxCellProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <TableCell className="slt-table__cell--checkbox">
      <input
        ref={inputRef}
        type="checkbox"
        className="slt-table__checkbox"
        checked={checked}
        aria-label={label}
        onChange={(e) => onChange?.(e.target.checked)}
      />
    </TableCell>
  );
}

export interface DataTableColumn<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => ReactNode;
}

export interface DataTableProps<T extends Record<string, unknown>> {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  caption?: string;
  sortKey?: string;
  sortDirection?: SortDirection;
  onSort?: (key: string) => void;
  selectable?: boolean;
  selectedKeys?: Set<string>;
  onSelectionChange?: (keys: Set<string>) => void;
  rowLabel?: (row: T) => string;
  /** ヘッダ「すべて選択」チェックの accessible name（既定: すべて選択） */
  selectAllLabel?: string;
  striped?: boolean;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  getRowKey,
  caption,
  sortKey,
  sortDirection,
  onSort,
  selectable = false,
  selectedKeys = new Set(),
  onSelectionChange,
  rowLabel,
  selectAllLabel = "すべて選択",
  striped = false,
}: DataTableProps<T>) {
  const allKeys = rows.map(getRowKey);
  const allSelected = allKeys.length > 0 && allKeys.every((k) => selectedKeys.has(k));
  const someSelected = allKeys.some((k) => selectedKeys.has(k));

  const toggleAll = (checked: boolean) => {
    onSelectionChange?.(checked ? new Set(allKeys) : new Set());
  };

  const toggleRow = (key: string, checked: boolean) => {
    const next = new Set(selectedKeys);
    if (checked) next.add(key);
    else next.delete(key);
    onSelectionChange?.(next);
  };

  return (
    <Table striped={striped}>
      {caption ? <caption className="slt-table__caption">{caption}</caption> : null}
      <TableHeader>
        <TableRow>
          {selectable ? (
            <TableCheckboxCell
              checked={allSelected}
              indeterminate={!allSelected && someSelected}
              onChange={toggleAll}
              label={selectAllLabel}
            />
          ) : null}
          {columns.map((col) => (
            <TableHead
              key={col.key}
              sortable={col.sortable}
              sortDirection={sortKey === col.key ? sortDirection : false}
              onSort={col.sortable ? () => onSort?.(col.key) : undefined}
            >
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => {
          const key = getRowKey(row);
          const label = rowLabel?.(row) ?? key;
          return (
            <TableRow key={key} selected={selectedKeys.has(key)}>
              {selectable ? (
                <TableCheckboxCell
                  checked={selectedKeys.has(key)}
                  onChange={(checked) => toggleRow(key, checked)}
                  label={`${label} を選択`}
                />
              ) : null}
              {columns.map((col) => (
                <TableCell key={col.key}>
                  {col.render ? col.render(row) : String(row[col.key] ?? "")}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
