import {
  type ComponentType,
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

import { useIsomorphicLayoutEffect } from '../../../hooks/useIsomorphicLayoutEffect';
import { type Theme, THEME_MODEL } from '../models';
import { ThemeService } from './ThemeService';

const ThemeServiceContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
} | null>(null);

export function ThemeServiceProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(ThemeService.theme);

  return (
    <ThemeServiceContext.Provider value={{ theme: theme, setTheme }}>
      {children}
    </ThemeServiceContext.Provider>
  );
}

function useThemeServiceContext() {
  const context = useContext(ThemeServiceContext);

  if (!context) {
    throw new Error(
      'useThemeServiceContext should be used within ThemeServiceContextProvider',
    );
  }

  return context;
}

export function useThemeService() {
  const { theme, setTheme } = useThemeServiceContext();

  const actions = useMemo(
    () => ({
      toggle() {
        const theme = ThemeService.toggleTheme;
        setTheme(theme);

        ThemeService.setStorage(theme);
        ThemeService.setRootElement(theme);
      },
    }),
    [setTheme],
  );

  useIsomorphicLayoutEffect(() => {
    const theme = ThemeService.priorityTheme;
    setTheme(theme);
    ThemeService.setPriorityTheme(theme);
  }, [setTheme]);

  return {
    theme,
    actions,
  };
}

export type WithThemeChangeEventListenerProps<T> = {
  Component: ComponentType<T>;
};

export function withThemeChangeEventListener<
  ComponentProps extends Record<string, unknown> = Record<string, never>,
>({ Component }: WithThemeChangeEventListenerProps<ComponentProps>) {
  return function (componentProps: ComponentProps) {
    const { setTheme } = useThemeServiceContext();

    useIsomorphicLayoutEffect(() => {
      const handler = (e: MediaQueryListEvent) => {
        const theme = e.matches
          ? THEME_MODEL.themes.dark
          : THEME_MODEL.themes.light;

        setTheme(theme);
        ThemeService.setPriorityTheme(theme);
      };

      window
        .matchMedia(THEME_MODEL.selectors.preferseColorSchemeDark)
        .addEventListener('change', handler);

      return () => {
        window
          .matchMedia(THEME_MODEL.selectors.preferseColorSchemeDark)
          .removeEventListener('change', handler);
      };
    }, [setTheme]);

    return <Component {...componentProps} />;
  };
}
