export const THEME = {
  key: 'theme',
  themes: {
    light: 'light',
    dark: 'dark',
  },
  selectors: {
    root: ':root',
    dataTheme: 'data-theme',
    preferseColorSchemeDark: '(prefers-color-scheme: dark)',
  },
} as const;

export const THEME_SELECTOR = {
  root: ':root',
  dataTheme: 'data-theme',
  preferseColorSchemeDark: '(prefers-color-scheme: dark)',
};

export const ROOT = ':root';
export const DATA_THEME = 'data-theme';
export const PREFERSE_COLOR_SCHEME_DARK = '(prefers-color-scheme: dark)';

export type Theme = keyof typeof THEME.themes;
