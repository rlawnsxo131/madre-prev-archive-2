import { safeLocalStorage } from '../../../lib/storage/safeStorage';
import { $, matchPrefersColorSchemeDark } from '../../../lib/utils/dom';
import { isServer } from '../../../lib/utils/isServer';
import { THEME, type Theme, THEME_SELECTOR } from '../models';

class ThemeService {
  constructor() {}

  getStorage() {
    return this.#getStorage();
  }

  setStorage(theme: Theme) {
    this.#setStorage(theme);
    return this;
  }

  getPriority() {
    return this.#getStorage() || this.#getMedia();
  }

  setPriority(theme: Theme) {
    if (this.#getStorage()) {
      this.#setStorage(theme);
    }
    this.#setRoot(theme);

    return this;
  }

  setRoot(theme: Theme) {
    this.#setRoot(theme);
    return this;
  }

  getMedia() {
    return this.#getMedia();
  }

  getToggle(theme: Theme) {
    return theme === THEME.dark ? THEME.light : THEME.dark;
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
    if (isServer()) return THEME.light;
    return matchPrefersColorSchemeDark().matches ? THEME.dark : THEME.light;
  }
}

export const themeService = Object.freeze(new ThemeService());
