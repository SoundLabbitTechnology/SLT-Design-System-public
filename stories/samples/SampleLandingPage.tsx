import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  BrandBackground,
  Button,
  Card,
  DataTable,
  Dialog,
  Input,
  SiteHeader,
  SiteHeaderLink,
  SkeletonList,
  Textarea,
  ToastProvider,
  useToast,
  type BadgeVariant,
  type BrandId,
  type ButtonVariant,
  type DataTableColumn,
} from "../../src/index";
import {
  resolveColorModeFromDom,
  resolveThemedHost,
  type ColorMode,
} from "../../src/lib/resolve-brand-context";
import { getSampleCopy, type SampleBrand } from "./sample-landing-content";
import { SOUND_LAB_HERO } from "./sound-laboratory-home-content";
import { SoundLaboratoryFooter, SoundLaboratoryHome } from "./SoundLaboratoryHome";
import "./sample-landing.css";

export type SampleLandingVariant = "marketing" | "admin";

export interface SampleLandingPageProps {
  /** Storybook Theme と揃えるブランド */
  brand?: SampleBrand;
  /** marketing = LP 構成 / admin = データ密度寄り */
  variant?: SampleLandingVariant;
}

type DemoRow = { name: string; status: string; updated: string } & Record<string, unknown>;

const DEMO_ROWS: DemoRow[] = [
  { name: "オンボーディング導線", status: "進行中", updated: "2026-07-08" },
  { name: "トークン準拠チェック", status: "完了", updated: "2026-07-07" },
  { name: "gold semantic 整合", status: "完了", updated: "2026-07-09" },
];

const STATUS_BADGE: Record<string, BadgeVariant> = {
  完了: "success",
  進行中: "info",
  待ち: "warning",
};

const BUTTON_VARIANTS: ButtonVariant[] = ["primary", "secondary", "ghost", "danger"];
const BADGE_VARIANTS: BadgeVariant[] = ["default", "success", "warning", "danger", "info"];

function brandForBackground(brand: SampleBrand): BrandId {
  return brand === "admin" ? "ai-dash" : brand;
}

function SampleLandingInner({
  brand = "ai-dash",
  variant = "marketing",
}: SampleLandingPageProps) {
  const { toast } = useToast();
  const [colorMode, setColorMode] = useState<ColorMode>("dark");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [loadingPreview, setLoadingPreview] = useState(false);

  useEffect(() => {
    const sync = () => setColorMode(resolveColorModeFromDom());
    sync();
    const root = document.documentElement;
    const host = resolveThemedHost(root);
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme", "data-color-mode"] });
    if (host !== root) {
      observer.observe(host, { attributes: true, attributeFilter: ["data-theme", "data-color-mode"] });
    }
    return () => observer.disconnect();
  }, []);

  const copy = useMemo(() => getSampleCopy(brand, variant), [brand, variant]);

  const sortedRows = useMemo(() => {
    return [...DEMO_ROWS].sort((a, b) => {
      const av = String(a[sortKey as keyof DemoRow]);
      const bv = String(b[sortKey as keyof DemoRow]);
      return sortDirection === "asc"
        ? av.localeCompare(bv, "ja")
        : bv.localeCompare(av, "ja");
    });
  }, [sortDirection, sortKey]);

  const demoColumns: DataTableColumn<DemoRow>[] = useMemo(
    () => [
      { key: "name", header: "項目", sortable: true },
      {
        key: "status",
        header: "状態",
        sortable: true,
        render: (row) => (
          <Badge variant={STATUS_BADGE[row.status] ?? "default"}>{row.status}</Badge>
        ),
      },
      { key: "updated", header: "更新日", sortable: true },
    ],
    [],
  );

  const showBrandBackground = brand !== "admin";
  const isAdmin = variant === "admin";
  const isSoundLab = brand === "sound-laboratory" && !isAdmin;
  const useGlassCard = variant === "marketing" && colorMode === "dark" && !isSoundLab;
  const showTable = isAdmin;
  const showHeaderActions = isAdmin;
  const headerVariant = variant === "marketing" && !isAdmin ? "marketing" : "default";
  const linkVariant = headerVariant === "marketing" ? "marketing" : "default";
  const heroDisplay = isSoundLab ? SOUND_LAB_HERO.displayName : copy.label;
  const heroHeadline = isSoundLab ? SOUND_LAB_HERO.headline : copy.headline;
  const heroLede = isSoundLab ? SOUND_LAB_HERO.lede : copy.lede;

  const headerNav = isSoundLab ? (
    <>
      <SiteHeaderLink href="#top" active variant={linkVariant}>
        Home
      </SiteHeaderLink>
      <SiteHeaderLink href="#about" variant={linkVariant}>
        About
      </SiteHeaderLink>
      <SiteHeaderLink href="#latest" variant={linkVariant}>
        Contents
      </SiteHeaderLink>
      <SiteHeaderLink href="#projects" variant={linkVariant}>
        Projects
      </SiteHeaderLink>
      <SiteHeaderLink href="#contact" variant={linkVariant}>
        Contact
      </SiteHeaderLink>
    </>
  ) : (
    <>
      <SiteHeaderLink href="#top" active variant={linkVariant}>
        トップ
      </SiteHeaderLink>
      <SiteHeaderLink href="#features" variant={linkVariant}>
        特徴
      </SiteHeaderLink>
      <SiteHeaderLink href="#parts" variant={linkVariant}>
        パーツ
      </SiteHeaderLink>
      <SiteHeaderLink href="#contact" variant={linkVariant}>
        問い合わせ
      </SiteHeaderLink>
      {showTable ? (
        <SiteHeaderLink href="#ops" variant={linkVariant}>
          運用
        </SiteHeaderLink>
      ) : null}
    </>
  );

  return (
    <div
      className={`slt-sample-lp${isAdmin ? " slt-sample-lp--admin" : ""}${colorMode === "light" ? " slt-sample-lp--light" : ""}${isSoundLab ? " slt-sample-lp--sound-lab" : ""}`}
    >
      {showBrandBackground ? (
        <div className="slt-sample-lp__bg" aria-hidden="true">
          <BrandBackground brand={brandForBackground(brand)} />
        </div>
      ) : null}

      <div className="slt-sample-lp__shell">
        <div className="slt-sample-lp__header">
          <SiteHeader
            variant={headerVariant}
            logo={<a href="#top">{heroDisplay}</a>}
            nav={headerNav}
            actions={
              showHeaderActions ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      toast({ title: "下書きを保存しました", variant: "success" })
                    }
                  >
                    下書き保存
                  </Button>
                  <Button variant="secondary">ログイン</Button>
                </>
              ) : undefined
            }
          />
        </div>

        <main id="top" className="slt-sample-lp__main">
          <div className="slt-sample-lp__container">
            <section
              id={isSoundLab ? "about" : "top"}
              className="slt-sample-lp__hero"
              aria-labelledby="sample-hero-title"
            >
            <p className="slt-sample-lp__brand slt-sample-typo--display">{heroDisplay}</p>
            <h1 id="sample-hero-title" className="slt-sample-lp__headline slt-sample-typo--hero">
              {heroHeadline}
            </h1>
            <p className="slt-sample-lp__lede slt-sample-typo--lede">{heroLede}</p>
            <div className="slt-sample-lp__cta">
              {isSoundLab ? (
                SOUND_LAB_HERO.ctas.map((cta) => (
                  <Button key={cta.label} variant={cta.variant} asChild>
                    <a href={cta.href}>{cta.label}</a>
                  </Button>
                ))
              ) : (
                <>
                  <Button
                    variant="primary"
                    onClick={() =>
                      toast({
                        title: "デモを開始しました",
                        description: "Toast のトーンと配置を確認してください。",
                        variant: "info",
                      })
                    }
                  >
                    デモを見る
                  </Button>
                  <Dialog
                    trigger={<Button variant="secondary">詳しく知る</Button>}
                    title="このページの使い方"
                    description="Theme / Mode を切り替えながら、ヒーロー・カード・フォーム・テーブルのバランスを見てください。パーツの是非は Issue コメントか audits に残します。"
                    confirmLabel="了解"
                    onConfirm={() =>
                      toast({ title: "判断メモを残しましょう", variant: "default" })
                    }
                  />
                </>
              )}
            </div>
          </section>
          </div>

          {isSoundLab ? <SoundLaboratoryHome /> : null}

          {!isSoundLab ? (
          <div className="slt-sample-lp__container slt-sample-lp__sections">
          <section
            id="features"
            className="slt-sample-lp__section"
            aria-labelledby="sample-features-title"
          >
            <div className="slt-sample-lp__section-head">
              <h2 id="sample-features-title" className="slt-sample-lp__section-title slt-sample-typo--panel-title">
                いま使えるパーツ
              </h2>
              <p className="slt-sample-lp__section-desc slt-sample-typo--section-lede">
                P0〜P2 を同じ文脈に並べています。余白・コントラスト・ブランド差が気になる箇所をメモしてください。
              </p>
            </div>
            <div className="slt-sample-lp__grid">
              <Card>
                <h3 className="slt-sample-lp__card-title slt-sample-typo--card-title">トークン駆動</h3>
                <p className="slt-sample-lp__card-body slt-sample-typo--card-body">
                  色・余白・角丸は semantic / component トークンのみ。raw hex は使いません。
                </p>
                <div className="slt-sample-lp__badges">
                  <Badge variant="info">L1</Badge>
                  <Badge>semantic</Badge>
                </div>
              </Card>
              <Card variant={useGlassCard ? "glass" : "default"}>
                <h3 className="slt-sample-lp__card-title">ブランド背景</h3>
                <p className="slt-sample-lp__card-body">
                  Wave / Grid は BrandBackground 経由。admin ではフラット面を優先します。
                </p>
                <div className="slt-sample-lp__badges">
                  <Badge variant="success">P1</Badge>
                </div>
              </Card>
              <Card>
                <h3 className="slt-sample-lp__card-title">確認とフィードバック</h3>
                <p className="slt-sample-lp__card-body">
                  Dialog で破壊的操作を止め、Toast で結果を返します。人間が主役の導線です。
                </p>
                <div className="slt-sample-lp__badges">
                  <Badge variant="danger">danger+cancel</Badge>
                  <Badge variant="info">Toast</Badge>
                </div>
              </Card>
            </div>
          </section>

          <section
            id="parts"
            className="slt-sample-lp__section"
            aria-labelledby="sample-parts-title"
          >
            <div className="slt-sample-lp__section-head">
              <h2 id="sample-parts-title" className="slt-sample-lp__section-title">
                パーツ一覧（判断用）
              </h2>
              <p className="slt-sample-lp__section-desc">
                Button / Badge / Toast の全バリアントを並べています。ブランド切替で色味の差を確認してください。
              </p>
            </div>
            <Card>
              <h3 className="slt-sample-lp__card-title">Button</h3>
              <div className="slt-sample-lp__swatch-row">
                {BUTTON_VARIANTS.map((v) => (
                  <Button key={v} variant={v}>
                    {v}
                  </Button>
                ))}
              </div>
              <h3 className="slt-sample-lp__card-title slt-sample-lp__card-title--spaced">
                Badge
              </h3>
              <div className="slt-sample-lp__badges">
                {BADGE_VARIANTS.map((v) => (
                  <Badge key={v} variant={v}>
                    {v}
                  </Badge>
                ))}
              </div>
              <h3 className="slt-sample-lp__card-title slt-sample-lp__card-title--spaced">
                Toast
              </h3>
              <div className="slt-sample-lp__swatch-row">
                {(["success", "warning", "danger", "info", "default"] as const).map((v) => (
                  <Button
                    key={v}
                    variant="secondary"
                    onClick={() =>
                      toast({
                        title: `${v} の例`,
                        description: "5 秒で自動 dismiss します。",
                        variant: v,
                      })
                    }
                  >
                    {v}
                  </Button>
                ))}
              </div>
            </Card>
          </section>

          <section
            id="contact"
            className="slt-sample-lp__section"
            aria-labelledby="sample-contact-title"
          >
            <div className="slt-sample-lp__panel">
              <Card className="slt-sample-lp__panel-form">
                <div className="slt-sample-lp__section-head">
                  <h2 id="sample-contact-title" className="slt-sample-lp__section-title">
                    問い合わせ（フォーム部品）
                  </h2>
                  <p className="slt-sample-lp__section-desc">
                    Input / Textarea / Button の並び。Sound Laboratory では投げ銭 UI に転用しないこと（L0 B-3）。
                  </p>
                </div>
                <form
                  className="slt-sample-lp__form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    toast({
                      title: "送信しました",
                      description: "本番では API に接続します。",
                      variant: "success",
                    });
                  }}
                >
                  <Input label="お名前" name="name" autoComplete="name" required />
                  <Input
                    label="メール"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                  <Textarea
                    label="メッセージ"
                    name="message"
                    rows={4}
                    hint="短い一文で意図が伝わるか確認してください。"
                  />
                  <div className="slt-sample-lp__form-actions">
                    <Button type="submit" variant="primary">
                      送信する
                    </Button>
                    <Dialog
                      trigger={
                        <Button type="button" variant="danger">
                          下書きを破棄
                        </Button>
                      }
                      title="下書きを破棄しますか？"
                      description="この操作は取り消せません。キャンセルと破棄を必ず併置しています。"
                      destructive
                      confirmLabel="破棄する"
                      cancelLabel="キャンセル"
                      onConfirm={() =>
                        toast({ title: "下書きを破棄しました", variant: "warning" })
                      }
                    />
                  </div>
                </form>
              </Card>
              <aside className="slt-sample-lp__panel-aside" aria-label="フォーム補助">
                <Card>
                  <h3 className="slt-sample-lp__card-title">判断メモ</h3>
                  <p className="slt-sample-lp__aside-text">
                    glass Card は dark のみ / admin は背景なしで密度優先 /
                    ヘッダー Primary は置かずヒーローに 1 つだけ、など。
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setLoadingPreview(true);
                      window.setTimeout(() => setLoadingPreview(false), 1600);
                    }}
                  >
                    Skeleton を試す
                  </Button>
                  {loadingPreview ? (
                    <div aria-busy="true" aria-label="読み込み中">
                      <SkeletonList count={3} />
                    </div>
                  ) : null}
                </Card>
              </aside>
            </div>
          </section>

          {showTable ? (
            <section
              id="ops"
              className="slt-sample-lp__section"
              aria-labelledby="sample-ops-title"
            >
              <div className="slt-sample-lp__section-head">
                <h2 id="sample-ops-title" className="slt-sample-lp__section-title">
                  運用一覧（Table）
                </h2>
                <p className="slt-sample-lp__section-desc">
                  ソート・行選択・Badge 付き DataTable。高密度 UI の是非をここで見ます。
                </p>
              </div>
              <Card>
                <DataTable
                  columns={demoColumns}
                  rows={sortedRows}
                  getRowKey={(row) => row.name}
                  selectable
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys}
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onSort={(key) => {
                    if (key === sortKey) {
                      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
                    } else {
                      setSortKey(key);
                      setSortDirection("asc");
                    }
                  }}
                />
              </Card>
            </section>
          ) : null}

          <aside
            className="slt-sample-lp__judge"
            aria-label="パーツ判断チェックリスト"
          >
            <p className="slt-sample-lp__judge-title">パーツ判断チェックリスト</p>
            <ul className="slt-sample-lp__judge-list">
              <li>ヒーロー: Primary CTA は 1 つだけか（ヘッダーは secondary / ghost）。</li>
              <li>背景: Wave / Grid / なし — ブランドに合っているか。</li>
              <li>Card: glass は dark のみ。light では default に落ちているか。</li>
              <li>パーツ一覧: Button / Badge / Toast の色味はテーマに沿っているか。</li>
              <li>フォーム: ラベル・ヒント・danger+cancel は守れているか。</li>
              <li>admin: Table 密度と Badge 可読性は業務画面として足りるか。</li>
              <li>不足: Empty State / 決済 UI など、次に欲しいものをメモ。</li>
            </ul>
          </aside>
          </div>
          ) : null}
        </main>

        {isSoundLab ? (
          <SoundLaboratoryFooter />
        ) : (
        <footer className="slt-sample-lp__footer">
          <div className="slt-sample-lp__container slt-sample-typo--footer">
            Sample Landing — Storybook 判断用キャンバス（製品配布外） · Theme / Mode を切り替えて確認
          </div>
        </footer>
        )}
      </div>
    </div>
  );
}

/** Storybook 専用の一枚ものサンプル LP。本番パッケージには含めない。 */
export function SampleLandingPage(props: SampleLandingPageProps) {
  return (
    <ToastProvider>
      <SampleLandingInner {...props} />
    </ToastProvider>
  );
}
