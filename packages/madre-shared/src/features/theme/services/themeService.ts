import { safeLocalStorage } from '../../../lib/storage/safeStorage';
import { $, matchPrefersColorSchemeDark } from '../../../lib/utils/selectors';
import { THEME, type Theme, THEME_MODE, THEME_SELECTOR } from '../models';

class ThemeService {
  constructor() {}

  public set(theme: Theme) {
    this.#setStorage(theme);
    this.#setRoot(theme);
    return this;
  }

  public getPriority() {
    return this.#getStorage() || this.#getMedia() || THEME.light;
  }

  public setPriority(theme: Theme) {
    if (this.#getMode() === THEME_MODE.custom) {
      this.#setStorage(theme);
    }
    this.#setRoot(theme);

    return this;
  }

  public getToggle(theme: Theme) {
    return theme === THEME.dark ? THEME.light : THEME.dark;
  }

  public getMode() {
    return this.#getMode();
  }

  #getStorage() {
    return safeLocalStorage.get(THEME.key) as Theme | null;
  }

  #setStorage(theme: Theme) {
    return safeLocalStorage.set(THEME.key, theme);
  }

  #setRoot(theme: Theme) {
    return $(THEME_SELECTOR.root)?.setAttribute(
      THEME_SELECTOR.dataTheme,
      theme,
    );
  }

  #getMedia() {
    return matchPrefersColorSchemeDark().matches ? THEME.dark : THEME.light;
  }

  #getMode() {
    return safeLocalStorage.get(THEME.key)
      ? THEME_MODE.custom
      : THEME_MODE.system;
  }
}

export const themeService = Object.freeze(new ThemeService());
