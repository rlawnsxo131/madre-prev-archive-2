import { safeLocalStorage } from '../../../lib/storage/safeStorage';
import type { Theme } from '../models/models';
import { ThemeModel } from '../models/models';

class ThemeService {
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
    let theme: Theme = ThemeModel.themes.light;

    const madreTheme = safeLocalStorage.get(ThemeModel.key) as Theme | null;

    if (madreTheme) {
      theme = madreTheme;
    } else {
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      theme = systemPrefersDark
        ? ThemeModel.themes.dark
        : ThemeModel.themes.light;
    }

    return theme;
  }

  #setThemeData(theme: Theme) {
    document.querySelector(this.#root)?.setAttribute(this.#dataTheme, theme);
    safeLocalStorage.set(ThemeModel.key, theme);
  }
}

export const themeService = new ThemeService();
