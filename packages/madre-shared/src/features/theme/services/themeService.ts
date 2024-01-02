import { safeLocalStorage } from '../../../lib/storage/safeStorage';
import { $, matchMedia } from '../../../lib/utils/dom';
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

  setRoot(theme: Theme) {
    this.#setRoot(theme);
    return this;
  }

  setPriority(theme: Theme) {
    if (this.#getStorage()) {
      this.#setStorage(theme);
    }
    this.#setRoot(theme);

    return this;
  }

  getMedia() {
    return this.#getMedia();
  }

  getPriority() {
    return this.#getStorage() || this.#getMedia();
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
    return matchMedia(THEME_SELECTOR.preferseColorSchemeDark).matches
      ? THEME.dark
      : THEME.light;
  }
}

export const themeService = Object.freeze(new ThemeService());
