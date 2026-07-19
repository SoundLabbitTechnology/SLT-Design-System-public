import * as react from 'react';
import { ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes, ReactNode, SelectHTMLAttributes, HTMLAttributes, DetailsHTMLAttributes, LiHTMLAttributes, BlockquoteHTMLAttributes, ProgressHTMLAttributes, FormHTMLAttributes, AnchorHTMLAttributes, ImgHTMLAttributes, CSSProperties, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    asChild?: boolean;
    loading?: boolean;
}
declare function Button({ variant, asChild, loading, disabled, className, children, type, ...props }: ButtonProps): react.JSX.Element;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    hint?: string;
    error?: boolean;
    errorMessage?: string;
    /** DADS ラベル横並び作例。既定は縦並び */
    layout?: "vertical" | "horizontal";
}
declare function Input({ label, hint, error, errorMessage, layout, id, className, "aria-describedby": ariaDescribedBy, ...props }: InputProps): react.JSX.Element;

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    hint?: string;
    error?: boolean;
    errorMessage?: string;
}
declare function Textarea({ label, hint, error, errorMessage, id, className, "aria-describedby": ariaDescribedBy, ...props }: TextareaProps): react.JSX.Element;

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    hint?: string;
    error?: boolean;
    errorMessage?: string;
}
declare function Checkbox({ label, hint, error, errorMessage, id, className, "aria-describedby": ariaDescribedBy, ...props }: CheckboxProps): react.JSX.Element;

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    error?: boolean;
}
declare function Radio({ label, error, id, className, ...props }: RadioProps): react.JSX.Element;
interface RadioGroupProps {
    legend: string;
    name: string;
    children: ReactNode;
    hint?: string;
    error?: boolean;
    errorMessage?: string;
    className?: string;
}
declare function RadioGroup({ legend, name, children, hint, error, errorMessage, className, }: RadioGroupProps): react.JSX.Element;

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    hint?: string;
    error?: boolean;
    errorMessage?: string;
    layout?: "vertical" | "horizontal";
}
declare function Select({ label, hint, error, errorMessage, layout, id, className, children, "aria-describedby": ariaDescribedBy, ...props }: SelectProps): react.JSX.Element;

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "role"> {
    label?: string;
    hint?: string;
}
declare function Switch({ label, hint, id, className, "aria-describedby": ariaDescribedBy, ...props }: SwitchProps): react.JSX.Element;

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    /** 見た目の階層。未指定時は `as` に合わせる */
    level?: HeadingLevel;
    /** セマンティックな見出し要素 */
    as?: HeadingLevel;
}
declare function Heading({ level, as, className, children, ...props }: HeadingProps): react.JSX.Element;

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
    label?: string;
    orientation?: "horizontal" | "vertical";
}
declare function Divider({ label, orientation, className, ...props }: DividerProps): react.JSX.Element;

type NoticeBlockVariant = "info" | "success" | "warning" | "danger";
interface NoticeBlockProps extends HTMLAttributes<HTMLElement> {
    variant?: NoticeBlockVariant;
    title?: string;
    children: ReactNode;
}
declare function NoticeBlock({ variant, title, className, children, ...props }: NoticeBlockProps): react.JSX.Element;

interface BreadcrumbItem {
    label: ReactNode;
    /** 省略または最終項目は現在地（リンクにしない） */
    href?: string;
}
interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
    items: BreadcrumbItem[];
    /** 項目間の区切り。既定は › */
    separator?: ReactNode;
    /**
     * はみ出し時の挙動（DADS 準拠）。
     * - `wrap`: 改行（既定。デスクトップ / モバイル改行仕様）
     * - `scroll`: 単一行の横スクロール（長い階層向け。ページ下部に wrap 版の併置を推奨）
     */
    overflow?: "wrap" | "scroll";
}
declare function Breadcrumb({ items, separator, overflow, className, "aria-label": ariaLabel, ...props }: BreadcrumbProps): react.JSX.Element | null;

interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    orientation?: "horizontal" | "vertical";
    children: ReactNode;
}
declare function Tabs({ value: valueProp, defaultValue, onValueChange, orientation, className, children, ...props }: TabsProps): react.JSX.Element;
interface TabListProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
declare function TabList({ className, children, onKeyDown, ...props }: TabListProps): react.JSX.Element;
interface TabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
    value: string;
    children: ReactNode;
}
declare function Tab({ value, className, disabled, children, ...props }: TabProps): react.JSX.Element;
interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
    children: ReactNode;
    /** 非選択時も DOM に残す（既定は非選択でアンマウント） */
    forceMount?: boolean;
}
declare function TabPanel({ value, className, children, forceMount, ...props }: TabPanelProps): react.JSX.Element | null;

type AccordionType = "single" | "multiple";
interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> {
    type?: AccordionType;
    /** single: 開いている value。multiple: 開いている value の配列 */
    value?: string | string[];
    defaultValue?: string | string[];
    onValueChange?: (value: string | string[]) => void;
    children: ReactNode;
}
declare function Accordion({ type, value: valueProp, defaultValue, onValueChange, className, children, ...props }: AccordionProps): react.JSX.Element;
interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
    children: ReactNode;
}
declare function AccordionItem({ value, className, children, ...props }: AccordionItemProps): react.JSX.Element;
interface AccordionTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}
declare function AccordionTrigger({ className, children, ...props }: AccordionTriggerProps): react.JSX.Element;
interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    forceMount?: boolean;
}
declare function AccordionContent({ className, children, forceMount, ...props }: AccordionContentProps): react.JSX.Element | null;

interface DisclosureProps extends Omit<DetailsHTMLAttributes<HTMLDetailsElement>, "open"> {
    /** トリガー文言（summary） */
    summary: ReactNode;
    /** 制御: 開閉状態 */
    open?: boolean;
    /** 非制御の初期開閉 */
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: ReactNode;
}
/**
 * メイン情報に対する追加・補足を折りたたむ（DADS ディスクロージャー）。
 * セクション全体の連続折りたたみは Accordion を使う。
 */
declare function Disclosure({ summary, open: openProp, defaultOpen, onOpenChange, className, children, onToggle, ...props }: DisclosureProps): react.JSX.Element;

type ListVariant = "bullet" | "numbered";
interface ListProps extends HTMLAttributes<HTMLUListElement> {
    /**
     * `bullet`: リストマーク。
     * `numbered`: 項番は CSS カウンタではなく、各 ListItem の `marker` を地のテキストとして表示（DADS）。
     */
    variant?: ListVariant;
    children: ReactNode;
}
declare function List({ variant, className, children, ...props }: ListProps): react.JSX.Element;
interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
    /** numbered 時の項番テキスト（例: "1." / "（1）"）。bullet では無視 */
    marker?: ReactNode;
    children: ReactNode;
}
declare function ListItem({ marker, className, children, ...props }: ListItemProps): react.JSX.Element;

interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {
    children: ReactNode;
}
declare function DescriptionList({ className, children, ...props }: DescriptionListProps): react.JSX.Element;
interface DescriptionTermProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
}
declare function DescriptionTerm({ className, children, ...props }: DescriptionTermProps): react.JSX.Element;
interface DescriptionDetailsProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
}
declare function DescriptionDetails({ className, children, ...props }: DescriptionDetailsProps): react.JSX.Element;

interface BlockquoteProps extends BlockquoteHTMLAttributes<HTMLQuoteElement> {
    children: ReactNode;
    /** 出典表示（視覚）。cite 属性とは別に渡す */
    attribution?: ReactNode;
}
declare function Blockquote({ className, children, attribution, ...props }: BlockquoteProps): react.JSX.Element;

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    /** 選択状態（フィルタ等） */
    selected?: boolean;
    /** 削除可能なとき。ボタンに accessible name を付ける */
    onRemove?: () => void;
    removeLabel?: string;
}
declare function Chip({ children, selected, onRemove, removeLabel, className, ...props }: ChipProps): react.JSX.Element;

interface PageNavigationProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
    page: number;
    totalPages: number;
    onPageChange?: (page: number) => void;
    previousLabel?: string;
    nextLabel?: string;
    /** 省略記号の前後に表示する隣ページ数（既定 1） */
    siblingCount?: number;
}
declare function PageNavigation({ page, totalPages, onPageChange, previousLabel, nextLabel, siblingCount, className, "aria-label": ariaLabel, ...props }: PageNavigationProps): react.JSX.Element;

interface StepNavigationItem {
    label: ReactNode;
    description?: ReactNode;
}
interface StepNavigationProps extends HTMLAttributes<HTMLElement> {
    steps: StepNavigationItem[];
    /** 1-based current step */
    current: number;
}
declare function StepNavigation({ steps, current, className, "aria-label": ariaLabel, ...props }: StepNavigationProps): react.JSX.Element;

interface ProgressIndicatorProps extends Omit<ProgressHTMLAttributes<HTMLProgressElement>, "value"> {
    /** 0〜max。省略時は indeterminate */
    value?: number;
    max?: number;
    /** 視覚ラベル（progress の accessible name にも使う） */
    label?: string;
    showValueLabel?: boolean;
}
declare function ProgressIndicator({ value, max, label, showValueLabel, className, id, ...props }: ProgressIndicatorProps): react.JSX.Element;

interface SearchBoxProps extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
    label: string;
    /** ラベルを視覚的に隠す（sr-only） */
    hideLabel?: boolean;
    placeholder?: string;
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    onSearch?: (value: string) => void;
    submitLabel?: ReactNode;
    inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue" | "onChange" | "placeholder" | "name">;
}
declare function SearchBox({ label, hideLabel, placeholder, defaultValue, value, onValueChange, onSearch, submitLabel, className, inputProps, ...props }: SearchBoxProps): react.JSX.Element;

interface ScrollTopButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** 表示を開始するスクロール量（px）。既定 400 */
    threshold?: number;
    label?: string;
}
declare function ScrollTopButton({ threshold, label, className, onClick, ...props }: ScrollTopButtonProps): react.JSX.Element | null;

interface UtilityLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    children: ReactNode;
}
/** フッター等の補助リンク（言語切替・ヘルプなど） */
declare function UtilityLink({ className, children, ...props }: UtilityLinkProps): react.JSX.Element;

interface HamburgerMenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    open?: boolean;
    openLabel?: string;
    closeLabel?: string;
}
declare function HamburgerMenuButton({ open, openLabel, closeLabel, className, ...props }: HamburgerMenuButtonProps): react.JSX.Element;

type DrawerSide = "left" | "right";
interface DrawerProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: ReactNode;
    title: string;
    description?: string;
    children?: ReactNode;
    side?: DrawerSide;
    showClose?: boolean;
}
declare function Drawer({ open, defaultOpen, onOpenChange, trigger, title, description, children, side, showClose, }: DrawerProps): react.JSX.Element;
declare const DrawerClose: react.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & react.RefAttributes<HTMLButtonElement>>;
declare const DrawerTrigger: react.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;

interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
    label: string;
    hint?: string;
    error?: boolean;
    errorMessage?: string;
    /** 選択ファイル名の表示（制御しない場合は内部表示） */
    onFilesChange?: (files: FileList | null) => void;
    buttonLabel?: ReactNode;
}
declare function FileUpload({ label, hint, error, errorMessage, onFilesChange, buttonLabel, id, className, disabled, "aria-describedby": ariaDescribedBy, ...props }: FileUploadProps): react.JSX.Element;

interface TableOfContentsItem {
    id: string;
    label: ReactNode;
    level?: 2 | 3 | 4;
}
interface TableOfContentsProps extends HTMLAttributes<HTMLElement> {
    items: TableOfContentsItem[];
    title?: string;
}
declare function TableOfContents({ items, title, className, ...props }: TableOfContentsProps): react.JSX.Element | null;

interface ResourceListItem {
    title: ReactNode;
    description?: ReactNode;
    href: string;
    meta?: ReactNode;
}
interface ResourceListProps extends HTMLAttributes<HTMLUListElement> {
    items: ResourceListItem[];
}
declare function ResourceList({ items, className, ...props }: ResourceListProps): react.JSX.Element;

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    /** キャプション（figcaption） */
    caption?: ReactNode;
    /** 装飾画像のとき true（空 alt を強制） */
    decorative?: boolean;
}
declare function Image({ caption, decorative, alt, className, ...props }: ImageProps): react.JSX.Element;

interface NavItem {
    label: ReactNode;
    href: string;
    current?: boolean;
}
interface HorizontalMenuProps extends HTMLAttributes<HTMLElement> {
    items: NavItem[];
    "aria-label"?: string;
}
/** ヘッダー等の水平ナビ。メガメニューは別途。 */
declare function HorizontalMenu({ items, className, "aria-label": ariaLabel, ...props }: HorizontalMenuProps): react.JSX.Element;

interface MenuListItem {
    label: ReactNode;
    href?: string;
    current?: boolean;
    disabled?: boolean;
    onSelect?: () => void;
}
interface MenuListProps extends HTMLAttributes<HTMLUListElement> {
    items: MenuListItem[];
    /** listbox 的な選択 UI ではなくナビ / アクション一覧 */
    "aria-label"?: string;
}
/** 縦並びのメニュー項目一覧（ドロワー・モバイルメニュー内など） */
declare function MenuList({ items, className, ...props }: MenuListProps): react.JSX.Element;

interface BottomNavigationItem {
    label: ReactNode;
    href: string;
    current?: boolean;
    /** アイコン等のスロット（任意） */
    icon?: ReactNode;
}
interface BottomNavigationProps extends HTMLAttributes<HTMLElement> {
    items: BottomNavigationItem[];
    "aria-label"?: string;
}
/** モバイル向け下部タブナビ（4〜5 項目想定） */
declare function BottomNavigation({ items, className, "aria-label": ariaLabel, ...props }: BottomNavigationProps): react.JSX.Element;

interface MobileMenuProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    title?: string;
    items: MenuListItem[];
    side?: "left" | "right";
    className?: string;
    triggerClassName?: string;
    children?: ReactNode;
}
/**
 * ハンバーガー + ドロワー + メニューリストの複合。
 * SiteHeader 内蔵ドロワーの代替として単体利用できる。
 */
declare function MobileMenu({ open: openProp, defaultOpen, onOpenChange, title, items, side, className, triggerClassName, children, }: MobileMenuProps): react.JSX.Element;

type CardVariant = "default" | "glass";
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: CardVariant;
}
declare function Card({ variant, className, children, ...props }: CardProps): react.JSX.Element;

interface DialogProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: ReactNode;
    title: string;
    description?: string;
    children?: ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm?: () => void;
    destructive?: boolean;
    showClose?: boolean;
    confirmLoading?: boolean;
    confirmDisabled?: boolean;
}
declare function Dialog({ open, defaultOpen, onOpenChange, trigger, title, description, children, confirmLabel, cancelLabel, onConfirm, destructive, showClose, confirmLoading, confirmDisabled, }: DialogProps): react.JSX.Element;
declare const DialogClose: react.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & react.RefAttributes<HTMLButtonElement>>;
declare const DialogTrigger: react.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
}
declare function Badge({ variant, className, children, ...props }: BadgeProps): react.JSX.Element;

declare const WAVE_PALETTE_VARS: {
    /** Matches tokens/brand.json ai-dash wavePalette: blue / copper / gold */
    readonly "ai-dash": readonly ["--color-action-secondary", "--color-action-primary-hover", "--color-action-primary"];
    readonly "slt-corporate": readonly ["--color-action-primary", "--color-action-secondary", "--color-text-brand"];
};
type WavePalette = keyof typeof WAVE_PALETTE_VARS;

interface WaveBackgroundProps {
    /** Token-based preset; reads CSS vars from active theme */
    palette?: WavePalette;
    /** Override with CSS variable names, e.g. `--color-action-secondary` */
    colorVars?: string[];
    className?: string;
}
declare function WaveBackground({ palette, colorVars, className, }: WaveBackgroundProps): react.JSX.Element;

/** Brands with a registered site background treatment */
type BrandId = "ai-dash" | "sound-laboratory" | "slt-corporate";
type BrandBackgroundKind = "wave-mesh" | "grid";
interface GridBackgroundSpec {
    light: {
        minorVar: string;
        majorVar: string;
    };
    dark: {
        minorVar: string;
        majorVar: string;
    };
    minorSize: number;
    majorSize: number;
    /** Mouse parallax max shift in px; 0 disables */
    parallaxMax: number;
    surfaceVar: string;
}
type BrandBackgroundEntry = {
    kind: "wave-mesh";
    palette: WavePalette;
} | {
    kind: "grid";
    grid: GridBackgroundSpec;
};
/**
 * Per-brand background registry.
 * - ai-dash / slt-corporate: 3D wave mesh (canvas)
 * - sound-laboratory: 2D graph-paper grid + parallax (official site pattern)
 *
 * Aligns with tokens/brand.json `wavePalette` for mesh brands;
 * Sound Laboratory uses grid per sound-laboratory-official-site.
 */
declare const BRAND_BACKGROUNDS: Record<BrandId, BrandBackgroundEntry>;
declare function getBrandBackground(brand: BrandId): BrandBackgroundEntry;

interface BrandBackgroundProps {
    /**
     * Brand preset. When omitted, reads `data-theme` on `<html>` (falls back to ai-dash).
     */
    brand?: BrandId;
    /** Override wave mesh colors (wave-mesh brands only) */
    colorVars?: string[];
    className?: string;
}
declare function BrandBackground({ brand: brandProp, colorVars, className }: BrandBackgroundProps): react.JSX.Element;

/** ヘッダーロゴ・ヒーロー eyebrow 等に使う正式ブランド名（省略形は使わない） */
declare const BRAND_DISPLAY_NAMES: Record<BrandId, string>;
declare const ADMIN_DISPLAY_NAME = "AI-DASH Admin";
declare function getBrandDisplayName(brand: BrandId): string;

type ColorMode = "light" | "dark";

interface GridBackgroundProps {
    spec: GridBackgroundSpec;
    colorMode?: ColorMode;
    className?: string;
}
declare function GridBackground({ spec, colorMode, className }: GridBackgroundProps): react.JSX.Element;

type ToastVariant = "default" | "success" | "warning" | "danger" | "info";
interface ToastItemProps {
    title: string;
    description?: string;
    variant?: ToastVariant;
    duration?: number;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}
interface ToastRecord extends ToastItemProps {
    id: string;
}
interface ToastContextValue {
    toast: (item: Omit<ToastRecord, "id">) => string;
    dismiss: (id: string) => void;
}
interface ToastProviderProps {
    children: ReactNode;
    /** デフォルトの自動 dismiss 時間（ms）。個別 toast で上書き可 */
    duration?: number;
}
declare function ToastProvider({ children, duration }: ToastProviderProps): react.JSX.Element;
declare function useToast(): ToastContextValue;
declare function Toast({ title, description, variant, duration, open, defaultOpen, onOpenChange, }: ToastItemProps): react.JSX.Element;

interface SiteHeaderProps {
    /** ロゴ・ブランドマーク（リンクは呼び出し側で内包） */
    logo?: ReactNode;
    /** デスクトップ / ドロワー共通のナビゲーション */
    nav?: ReactNode;
    /** 右端アクション（ログイン・CTA 等）。マーケ LP では通常省略 */
    actions?: ReactNode;
    /** marketing = 半透明ブラー・下線ナビ（sound-laboratory.org 等） */
    variant?: "default" | "marketing";
    /**
     * 内側バーの最大幅。本文コンテナと揃えるときに指定する（例: "75rem" / "var(--docs-content-max)"）。
     * 未指定時は full bleed 背景のままバーも全幅（padding-x のみ）。
     */
    contentMaxWidth?: string;
    className?: string;
}
declare function SiteHeader({ logo, nav, actions, variant, contentMaxWidth, className, }: SiteHeaderProps): react.JSX.Element;
interface SiteHeaderLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    active?: boolean;
    /** marketing = 下線アクティブ（公式サイト Header 準拠） */
    variant?: "default" | "marketing";
}
declare function SiteHeaderLink({ active, variant, className, ...props }: SiteHeaderLinkProps): react.JSX.Element;

type SkeletonVariant = "rect" | "text" | "circle";
interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    variant?: SkeletonVariant;
    width?: CSSProperties["width"];
    height?: CSSProperties["height"];
}
declare function Skeleton({ variant, width, height, className, style, "aria-hidden": ariaHidden, ...props }: SkeletonProps): react.JSX.Element;
interface SkeletonListProps {
    count?: number;
    className?: string;
}
/** リスト行のローディングプレースホルダ */
declare function SkeletonList({ count, className }: SkeletonListProps): react.JSX.Element;
/** Card 内コンテンツのローディングプレースホルダ */
declare function SkeletonCard({ className }: {
    className?: string;
}): react.JSX.Element;

type SortDirection = "asc" | "desc";
interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
    /** DADS ストライプ行 */
    striped?: boolean;
}
declare function Table({ striped, className, children, ...props }: TableProps): react.JSX.Element;
declare function TableHeader({ className, children, ...props }: HTMLAttributes<HTMLTableSectionElement>): react.JSX.Element;
declare function TableBody({ className, children, ...props }: HTMLAttributes<HTMLTableSectionElement>): react.JSX.Element;
interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
    selected?: boolean;
}
declare function TableRow({ selected, className, children, ...props }: TableRowProps): react.JSX.Element;
interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
    sortable?: boolean;
    sortDirection?: SortDirection | false;
    onSort?: () => void;
}
declare function TableHead({ sortable, sortDirection, onSort, className, children, ...props }: TableHeadProps): react.JSX.Element;
declare function TableCell({ className, children, ...props }: TdHTMLAttributes<HTMLTableCellElement>): react.JSX.Element;
interface TableCheckboxCellProps {
    checked?: boolean;
    indeterminate?: boolean;
    onChange?: (checked: boolean) => void;
    label: string;
}
declare function TableCheckboxCell({ checked, indeterminate, onChange, label, }: TableCheckboxCellProps): react.JSX.Element;
interface DataTableColumn<T> {
    key: string;
    header: string;
    sortable?: boolean;
    render?: (row: T) => ReactNode;
}
interface DataTableProps<T extends Record<string, unknown>> {
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
    striped?: boolean;
}
declare function DataTable<T extends Record<string, unknown>>({ columns, rows, getRowKey, caption, sortKey, sortDirection, onSort, selectable, selectedKeys, onSelectionChange, rowLabel, striped, }: DataTableProps<T>): react.JSX.Element;

export { ADMIN_DISPLAY_NAME, Accordion, AccordionContent, type AccordionContentProps, AccordionItem, type AccordionItemProps, type AccordionProps, AccordionTrigger, type AccordionTriggerProps, BRAND_BACKGROUNDS, BRAND_DISPLAY_NAMES, Badge, type BadgeProps, type BadgeVariant, Blockquote, type BlockquoteProps, BottomNavigation, type BottomNavigationItem, type BottomNavigationProps, BrandBackground, type BrandBackgroundEntry, type BrandBackgroundKind, type BrandBackgroundProps, type BrandId, Breadcrumb, type BreadcrumbItem, type BreadcrumbProps, Button, type ButtonProps, type ButtonVariant, Card, type CardProps, type CardVariant, Checkbox, type CheckboxProps, Chip, type ChipProps, DataTable, type DataTableColumn, type DataTableProps, DescriptionDetails, type DescriptionDetailsProps, DescriptionList, type DescriptionListProps, DescriptionTerm, type DescriptionTermProps, Dialog, DialogClose, type DialogProps, DialogTrigger, Disclosure, type DisclosureProps, Divider, type DividerProps, Drawer, DrawerClose, type DrawerProps, type DrawerSide, DrawerTrigger, FileUpload, type FileUploadProps, GridBackground, type GridBackgroundProps, HamburgerMenuButton, type HamburgerMenuButtonProps, Heading, type HeadingLevel, type HeadingProps, HorizontalMenu, type HorizontalMenuProps, Image, type ImageProps, Input, type InputProps, List, ListItem, type ListItemProps, type ListProps, type ListVariant, MenuList, type MenuListItem, type MenuListProps, MobileMenu, type MobileMenuProps, type NavItem, NoticeBlock, type NoticeBlockProps, type NoticeBlockVariant, PageNavigation, type PageNavigationProps, ProgressIndicator, type ProgressIndicatorProps, Radio, RadioGroup, type RadioGroupProps, type RadioProps, ResourceList, type ResourceListItem, type ResourceListProps, ScrollTopButton, type ScrollTopButtonProps, SearchBox, type SearchBoxProps, Select, type SelectProps, SiteHeader, SiteHeaderLink, type SiteHeaderLinkProps, type SiteHeaderProps, Skeleton, SkeletonCard, SkeletonList, type SkeletonListProps, type SkeletonProps, type SkeletonVariant, type SortDirection, StepNavigation, type StepNavigationItem, type StepNavigationProps, Switch, type SwitchProps, Tab, TabList, type TabListProps, TabPanel, type TabPanelProps, type TabProps, Table, TableBody, TableCell, TableCheckboxCell, type TableCheckboxCellProps, TableHead, type TableHeadProps, TableHeader, TableOfContents, type TableOfContentsItem, type TableOfContentsProps, type TableProps, TableRow, type TableRowProps, Tabs, type TabsProps, Textarea, type TextareaProps, Toast, type ToastItemProps, ToastProvider, type ToastProviderProps, type ToastVariant, UtilityLink, type UtilityLinkProps, WaveBackground, type WaveBackgroundProps, type WavePalette, getBrandBackground, getBrandDisplayName, useToast };
