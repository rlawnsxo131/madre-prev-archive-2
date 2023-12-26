import { safeLocalStorage } from '../../../lib/storage/safeStorage';
import { type Theme, ThemeModel } from '../models';

class _ThemeService {
  #root = ':root';
  #dataTheme = 'data-theme';

  getCurrentTheme(): Promise<Theme> {
    return this.#getCurrentTheme();
  }

  set(theme: Theme): Promise<Theme> {
    return this.#setThemeData(theme);
  }

  toggle(): Promise<Theme> {
    return this.#getCurrentTheme().then((theme) =>
      this.#setThemeData(
        theme === ThemeModel.themes.light
          ? ThemeModel.themes.dark
          : ThemeModel.themes.light,
      ),
    );
  }

  #getCurrentTheme(): Promise<Theme> {
    return new Promise((resolve) => {
      const madreTheme = safeLocalStorage.get(ThemeModel.key) as Theme | null;

      if (madreTheme) {
        resolve(madreTheme);
      }

      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;

      resolve(
        systemPrefersDark ? ThemeModel.themes.dark : ThemeModel.themes.light,
      );
    });
  }

  #setThemeData(theme: Theme): Promise<Theme> {
    return new Promise((resolve) => {
      document.querySelector(this.#root)?.setAttribute(this.#dataTheme, theme);
      safeLocalStorage.set(ThemeModel.key, theme);
      resolve(theme);
    });
  }
}

export const ThemeService = Object.freeze(new _ThemeService());
