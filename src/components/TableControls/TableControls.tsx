import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { SearchBox } from "../SearchBox/SearchBox";

export interface TableControlsSearchProps {
  label: string;
  hideLabel?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
}

export interface TableControlsProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** ツールバー全体の accessible name */
  "aria-label"?: string;
  /** 左側の見出し（件数など） */
  title?: ReactNode;
  /** 右側アクション（追加・エクスポート等） */
  actions?: ReactNode;
  /** 検索ボックスを内蔵する場合 */
  search?: TableControlsSearchProps;
  /** フィルタチップ等 */
  children?: ReactNode;
}

/** DataTable 上部の検索・フィルタ・アクション帯 */
export function TableControls({
  title,
  actions,
  search,
  children,
  className,
  "aria-label": ariaLabel = "テーブル操作",
  ...props
}: TableControlsProps) {
  return (
    <div
      className={cn("slt-table-controls", className)}
      role="toolbar"
      aria-label={ariaLabel}
      {...props}
    >
      <div className="slt-table-controls__row">
        {title ? <div className="slt-table-controls__title">{title}</div> : null}
        {search ? (
          <div className="slt-table-controls__search">
            <SearchBox
              label={search.label}
              hideLabel={search.hideLabel ?? true}
              value={search.value}
              defaultValue={search.defaultValue}
              onValueChange={search.onValueChange}
              onSearch={search.onSearch}
              placeholder={search.placeholder}
            />
          </div>
        ) : null}
        {actions ? <div className="slt-table-controls__actions">{actions}</div> : null}
      </div>
      {children ? <div className="slt-table-controls__filters">{children}</div> : null}
    </div>
  );
}
