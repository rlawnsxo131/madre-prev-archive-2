import { createContext, type ReactNode } from 'react';

import {
  type ContextStore,
  useContextStore,
  useInitContextStore,
} from '../../../contexts/hooks/useContextStore';
import { useIsomorphicLayoutEffect } from '../../../hooks/useIsomorphicLayoutEffect';
import { matchPreferseColorSchemeDark } from '../../../lib/utils/dom';
import { THEME, type Theme } from '../models';
import { themeService } from '../services';

export const ThemeContext = createContext<ContextStore<{
  theme: Theme;
}> | null>(null);
ThemeContext.displayName = 'ThemeContext';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const store = useInitContextStore({
    theme: THEME.light as Theme,
  });

  /**
   * 첫 로드시 theme 상태와 동기화
   */
  useIsomorphicLayoutEffect(() => {
    const theme = themeService.getPriority();
    store.set({ theme });
    themeService.setPriority(theme);
  }, []);

  /**
   * preferseColorScheme change 이벤트 동기화
   */
  useIsomorphicLayoutEffect(() => {
    const handler = (e: MediaQueryListEvent) => {
      const theme = e.matches ? THEME.dark : THEME.light;
      store.set({ theme });
      themeService.setPriority(theme);
    };

    matchPreferseColorSchemeDark().addEventListener('change', handler);

    return () => {
      matchPreferseColorSchemeDark().removeEventListener('change', handler);
    };
  }, []);

  return (
    <ThemeContext.Provider value={store}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const [{ theme }, set] = useContextStore(ThemeContext);

  const toggle = () =>
    set(({ theme }) => {
      const newTheme = themeService.getToggle(theme);
      themeService.setStorage(newTheme);
      themeService.setRoot(newTheme);
      return {
        theme: newTheme,
      };
    });

  return {
    theme,
    toggle,
  };
}
