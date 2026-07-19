import {
  createContext,
  useContext,
  type HTMLAttributes,
  type LiHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";

export type ListVariant = "bullet" | "numbered";

const ListVariantContext = createContext<ListVariant>("bullet");

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  /**
   * `bullet`: リストマーク。
   * `numbered`: 項番は CSS カウンタではなく、各 ListItem の `marker` を地のテキストとして表示（DADS）。
   */
  variant?: ListVariant;
  children: ReactNode;
}

export function List({ variant = "bullet", className, children, ...props }: ListProps) {
  return (
    <ListVariantContext.Provider value={variant}>
      <ul
        className={cn(
          "slt-list",
          variant === "numbered" && "slt-list--numbered",
          className,
        )}
        {...props}
      >
        {children}
      </ul>
    </ListVariantContext.Provider>
  );
}

export interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  /** numbered 時の項番テキスト（例: "1." / "（1）"）。bullet では無視 */
  marker?: ReactNode;
  children: ReactNode;
}

export function ListItem({ marker, className, children, ...props }: ListItemProps) {
  const variant = useContext(ListVariantContext);

  return (
    <li className={cn("slt-list__item", className)} {...props}>
      {variant === "numbered" && marker != null ? (
        <span className="slt-list__marker">{marker}</span>
      ) : null}
      <span className="slt-list__body">{children}</span>
    </li>
  );
}
