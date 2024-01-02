import { safeLocalStorage } from '../../../lib/storage/safeStorage';
import { $, matchMedia } from '../../../lib/utils/dom';
import { THEME, type Theme } from '../models';

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

  #getStorage() {
    return safeLocalStorage.get(THEME.key) as Theme | null;
  }

  #setStorage(theme: Theme) {
    return safeLocalStorage.set(THEME.key, theme);
  }

  #setRoot(theme: Theme) {
    return $(THEME.selectors.root)?.setAttribute(
      THEME.selectors.dataTheme,
      theme,
    );
  }

  #getMedia() {
    return matchMedia(THEME.selectors.preferseColorSchemeDark).matches
      ? THEME.themes.dark
      : THEME.themes.light;
  }
}

export const themeService = Object.freeze(new ThemeService());
