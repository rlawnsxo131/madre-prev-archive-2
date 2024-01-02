export const THEME = {
  key: 'theme',
  light: 'light',
  dark: 'dark',
} as const;

export const THEME_SELECTOR = {
  root: ':root',
  dataTheme: 'data-theme',
  preferseColorSchemeDark: '(prefers-color-scheme: dark)',
};

export const ROOT = ':root';
export const DATA_THEME = 'data-theme';
export const PREFERSE_COLOR_SCHEME_DARK = '(prefers-color-scheme: dark)';

export type Theme = keyof Pick<typeof THEME, 'light' | 'dark'>;
