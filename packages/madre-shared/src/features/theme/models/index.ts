export const THEME_MODEL = {
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

export type Theme = keyof typeof THEME_MODEL.themes;
