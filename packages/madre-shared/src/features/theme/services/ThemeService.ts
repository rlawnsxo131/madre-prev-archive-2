import { safeLocalStorage } from '../../../lib/storage/safeStorage';
import type { Theme } from '../models';
import { ThemeModel } from '../models';

class _ThemeService {
  #root = ':root';
  #dataTheme = 'data-theme';

  getCurrentTheme(): Theme {
    return this.#getCurrentTheme();
  }

  set(theme: Theme) {
    return this.#setThemeData(theme);
  }

  toggle(): Theme {
    const currentTheme = this.#getCurrentTheme();

    const newTheme =
      currentTheme === ThemeModel.themes.light
        ? ThemeModel.themes.dark
        : ThemeModel.themes.light;

    this.#setThemeData(newTheme);

    return newTheme;
  }

  #getCurrentTheme(): Theme {
    const madreTheme = safeLocalStorage.get(ThemeModel.key) as Theme | null;

    if (madreTheme) {
      return madreTheme;
    }

    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    return systemPrefersDark ? ThemeModel.themes.dark : ThemeModel.themes.light;
  }

  #setThemeData(theme: Theme) {
    document.querySelector(this.#root)?.setAttribute(this.#dataTheme, theme);
    safeLocalStorage.set(ThemeModel.key, theme);
  }
}

export const ThemeService = new _ThemeService();
