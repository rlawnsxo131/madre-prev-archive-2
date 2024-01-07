export const THEME = {
  key: 'theme',
  light: 'light',
  dark: 'dark',
} as const;

export const THEME_MODE = {
  system: 'system',
  custom: 'custom',
} as const;

export const THEME_SELECTOR = {
  root: ':root',
  dataTheme: 'data-theme',
};

export type Theme = keyof Pick<typeof THEME, 'light' | 'dark'>;
export type ThemeMode = keyof typeof THEME_MODE;
