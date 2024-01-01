import { safeLocalStorage } from '../../../lib/storage/safeStorage';
import { type Theme, THEME_MODEL } from '../models';

class _ThemeService {
  static #instance: _ThemeService | null;

  #theme: Theme;

  private constructor() {
    this.#theme = THEME_MODEL.themes.light;
  }

  static of() {
    if (!this.#instance) {
      return (this.#instance = new this());
    }
    return this.#instance;
  }

  get theme() {
    return this.#theme;
  }

  get priorityTheme() {
    return this.storageTheme || this.mediaTheme || this.#theme;
  }

  get storageTheme() {
    return safeLocalStorage.get(THEME_MODEL.key) as Theme | null;
  }

  get mediaTheme() {
    return window.matchMedia(THEME_MODEL.selectors.preferseColorSchemeDark)
      .matches
      ? THEME_MODEL.themes.dark
      : THEME_MODEL.themes.light;
  }

  get toggleTheme() {
    return this.#theme === THEME_MODEL.themes.dark
      ? THEME_MODEL.themes.light
      : THEME_MODEL.themes.dark;
  }

  setPriorityTheme(theme: Theme) {
    this.#theme = theme;
    if (this.storageTheme) {
      safeLocalStorage.set(THEME_MODEL.key, theme);
    }
    document
      .querySelector(THEME_MODEL.selectors.root)
      ?.setAttribute(THEME_MODEL.selectors.dataTheme, theme);

    return this;
  }

  setStorage(theme: Theme) {
    this.#theme = theme;
    safeLocalStorage.set(THEME_MODEL.key, theme);
    return this;
  }

  setRootElement(theme: Theme) {
    this.#theme = theme;
    document
      .querySelector(THEME_MODEL.selectors.root)
      ?.setAttribute(THEME_MODEL.selectors.dataTheme, theme);
    return this;
  }
}

export const ThemeService = Object.freeze(_ThemeService.of());
