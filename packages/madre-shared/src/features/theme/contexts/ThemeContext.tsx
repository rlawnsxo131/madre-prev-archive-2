import { createContext, type ReactNode, useEffect } from 'react';

import {
  createExternalStoreContext,
  type ExternalStoreContext,
  useExternalStoreContext,
} from '../../../hooks/useExternalStoreContext';
import { useIsomorphicLayoutEffect } from '../../../hooks/useIsomorphicLayoutEffect';
import { matchPrefersColorSchemeDark } from '../../../lib/utils/dom';
import { THEME, type Theme } from '../models';
import { themeService } from '../services';

export const ThemeContext = createContext<ExternalStoreContext<{
  theme: Theme;
}> | null>(null);
ThemeContext.displayName = 'ThemeContext';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const store = createExternalStoreContext({
    theme: THEME.light as Theme,
  });

  /**
   * 첫 로드시 theme 상태와 동기화
   */
  useIsomorphicLayoutEffect(() => {
    const theme = themeService.getPriority();
    store.set({ theme });
    themeService.setPriority(theme);
  }, [store]);

  /**
   * preferseColorScheme change 이벤트 동기화
   */
  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => {
      const theme = e.matches ? THEME.dark : THEME.light;
      store.set({ theme });
      themeService.setPriority(theme);
    };

    matchPrefersColorSchemeDark().addEventListener('change', handler);

    return () => {
      matchPrefersColorSchemeDark().removeEventListener('change', handler);
    };
  }, [store]);

  return (
    <ThemeContext.Provider value={store}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const [{ theme }, set] = useExternalStoreContext(ThemeContext);

  return [
    theme,
    {
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
  ] as const;
}
