/** Production: `<html data-theme>`. Storybook: themed decorator div. */
function resolveThemedHost(root: HTMLElement = document.documentElement): HTMLElement {
 if (root.hasAttribute("data-theme")) return root;
 const themed = root.querySelector("[data-theme]");
 if (themed instanceof HTMLElement) return themed;
 return root;
}

/** Resolve a CSS color custom property to RGB (browser only). */
export function resolveCssVarRgb(
 varName: string,
 host?: HTMLElement,
): { r: number; g: number; b: number; a?: number } {
 if (typeof document === "undefined") {
 return { r: 0, g: 0, b: 0 };
 }
 const el = host ?? resolveThemedHost;
 const probe = document.createElement("span");
 probe.style.color = `var(${varName})`;
 probe.style.position = "absolute";
 probe.style.visibility = "hidden";
 el.appendChild(probe);
 const computed = getComputedStyle(probe).color;
 el.removeChild(probe);
 const rgbaMatch = computed.match(
 /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/,
 );
 if (rgbaMatch) {
 return {
 r: Number(rgbaMatch[1]),
 g: Number(rgbaMatch[2]),
 b: Number(rgbaMatch[3]),
 a: rgbaMatch[4] !== undefined ? Number(rgbaMatch[4]) : 1,
 };
 }

 const raw = getComputedStyle(el).getPropertyValue(varName).trim;
 const hex = raw.startsWith("#") ? raw.slice(1) : null;
 if (hex) {
 const full =
 hex.length === 3
 ? hex
 .split("")
 .map((c) => c + c)
 .join("")
 : hex.slice(0, 6);
 return {
 r: Number.parseInt(full.slice(0, 2), 16),
 g: Number.parseInt(full.slice(2, 4), 16),
 b: Number.parseInt(full.slice(4, 6), 16),
 };
 }

 return { r: 0, g: 0, b: 0 };
}

export function resolveCssVarColor(varName: string, host?: HTMLElement): string {
 if (typeof document === "undefined") return "transparent";
 const el = host ?? resolveThemedHost;
 const probe = document.createElement("span");
 probe.style.color = `var(${varName})`;
 probe.style.position = "absolute";
 probe.style.visibility = "hidden";
 el.appendChild(probe);
 const computed = getComputedStyle(probe).color;
 el.removeChild(probe);
 if (computed && computed !== "rgba(0, 0, 0, 0)") return computed;

 const { r, g, b, a = 1 } = resolveCssVarRgb(varName, host);
 return a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
}
