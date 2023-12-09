export const ThemeModel = {
  key: 'theme',
  themes: {
    light: 'light',
    dark: 'dark',
  },
} as const;

export type Theme = keyof typeof ThemeModel.themes;
