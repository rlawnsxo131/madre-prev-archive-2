import { type IconsProps } from '../../../components/ui/Icons';

export const ThemeModel = {
  key: 'theme',
  themes: {
    light: 'light',
    dark: 'dark',
  },
} as const;

export type Theme = keyof typeof ThemeModel.themes;

export type ThemeIcon = Extract<IconsProps['type'], 'sun' | 'crescent-moon'>;
