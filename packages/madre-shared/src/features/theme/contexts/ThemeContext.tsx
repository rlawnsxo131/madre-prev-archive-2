import { type ReactNode, useEffect } from 'react';

import { useIsomorphicLayoutEffect } from '../../../hooks/useIsomorphicLayoutEffect';
import { createStoreContext } from '../../../lib/external-store';
import { matchPrefersColorSchemeDark } from '../../../lib/utils/dom';
import { THEME, type Theme } from '../models';
import { themeService } from '../services';

const { Provider, useStoreContext } = createStoreContext<{
  theme: Theme;
  actions: {
    set: (theme: Theme) => void;
    toggle: () => void;
  };
}>('ThemeContext');

export function ThemeProvider({ children }: { children: ReactNode }) {
  const ThemeInitializer = ({ children }: { children: ReactNode }) => {
    const {
      actions: { set },
    } = useStoreContext();
    /**
     * 첫 로드시 theme 상태와 동기화
     */
    useIsomorphicLayoutEffect(() => {
      const theme = themeService.getPriority();
      set(theme);
      themeService.setPriority(theme);
    }, []);

    /**
     * preferseColorScheme change 이벤트 동기화
     */
    useEffect(() => {
      const handler = (e: MediaQueryListEvent) => {
        const theme = e.matches ? THEME.dark : THEME.light;
        set(theme);
        themeService.setPriority(theme);
      };

      matchPrefersColorSchemeDark().addEventListener('change', handler);

      return () => {
        matchPrefersColorSchemeDark().removeEventListener('change', handler);
      };
    }, [set]);

    return children;
  };

  return (
    <Provider
      createState={(set) => ({
        theme: themeService.getPriority(),
        actions: {
          set: (theme) => set({ theme }),
          toggle: () =>
            set(({ theme }) => {
              const newTheme = themeService.getToggle(theme);
              themeService.setStorage(newTheme);
              themeService.setRoot(newTheme);
              return {
                theme: newTheme,
              };
            }),
        },
      })}
    >
      <ThemeInitializer>{children}</ThemeInitializer>
    </Provider>
  );
}

export function useTheme() {
  const { theme, actions } = useStoreContext();
  return [theme, actions] as const;
}

export function useThemeState() {
  return useStoreContext((state) => state.theme);
}

export function useThemeActions() {
  return useStoreContext((state) => state.actions);
}
