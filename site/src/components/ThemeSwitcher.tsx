import { useEffect, useState } from "react";
import {
  type Brand,
  type ColorMode,
  DEFAULT_BRAND,
  DEFAULT_MODE,
  modesForBrand,
  THEME_OPTIONS,
  THEME_STORAGE_KEY,
} from "../lib/theme";

function applyTheme(brand: Brand, mode: ColorMode) {
  const root = document.documentElement;
  root.setAttribute("data-theme", brand);
  root.setAttribute("data-color-mode", mode);
  localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ brand, mode }));
}

export default function ThemeSwitcher() {
  const [brand, setBrand] = useState<Brand>(DEFAULT_BRAND);
  const [mode, setMode] = useState<ColorMode>(DEFAULT_MODE);

  useEffect(() => {
    const root = document.documentElement;
    setBrand((root.getAttribute("data-theme") as Brand) ?? DEFAULT_BRAND);
    setMode((root.getAttribute("data-color-mode") as ColorMode) ?? DEFAULT_MODE);
  }, []);

  const handleBrandChange = (nextBrand: Brand) => {
    const modes = modesForBrand(nextBrand);
    const nextMode = modes.includes(mode) ? mode : modes[0];
    setBrand(nextBrand);
    setMode(nextMode);
    applyTheme(nextBrand, nextMode);
  };

  const handleModeChange = (nextMode: ColorMode) => {
    setMode(nextMode);
    applyTheme(brand, nextMode);
  };

  const availableModes = modesForBrand(brand);

  return (
    <div className="docs-theme-switcher">
      <label className="docs-theme-switcher__field">
        <span className="docs-theme-switcher__label">ブランド</span>
        <select
          className="slt-input docs-theme-switcher__select"
          value={brand}
          onChange={(e) => handleBrandChange(e.target.value as Brand)}
        >
          {THEME_OPTIONS.map((option) => (
            <option key={option.brand} value={option.brand}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label className="docs-theme-switcher__field">
        <span className="docs-theme-switcher__label">モード</span>
        <select
          className="slt-input docs-theme-switcher__select"
          value={mode}
          onChange={(e) => handleModeChange(e.target.value as ColorMode)}
          disabled={availableModes.length < 2}
        >
          {availableModes.map((m) => (
            <option key={m} value={m}>
              {m === "dark" ? "ダーク" : "ライト"}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
