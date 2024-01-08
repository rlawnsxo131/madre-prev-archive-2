import {
  createContext,
  type ReactNode,
  startTransition,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useIsomorphicLayoutEffect } from '../../../hooks/useIsomorphicLayoutEffect';
import { useSafeContext } from '../../../hooks/useSafeContext';
import { matchPrefersColorSchemeDark } from '../../../lib/utils';
import { THEME, type Theme, THEME_MODE, type ThemeMode } from '../models';
import { themeService } from '../services';

const ThemeStateContext = createContext<{
  theme: Theme;
  mode: ThemeMode;
  isSynced: boolean;
} | null>(null);
const ThemeActionsContext = createContext<{
  set: (theme: Theme) => void;
  reset: () => void;
  toggle: () => void;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(THEME.light);
  const [mode, setMode] = useState<ThemeMode>(THEME_MODE.system);
  const [isSynced, setIsSynced] = useState(false);

  const actions = useMemo(
    () => ({
      set: (theme: Theme) => {
        const mode = themeService.set(theme).getMode();
        setTheme(theme);
        setMode(mode);
      },
      reset: () => {
        const theme = themeService.reset().getMedia();
        const mode = themeService.getMode();
        setTheme(theme);
        setMode(mode);
      },
      toggle: () =>
        setTheme((theme) => {
          const nextTheme = themeService.getToggle(theme);
          themeService.set(nextTheme);
          return nextTheme;
        }),
    }),
    [],
  );

  /**
   * 첫 로드시 theme 상태와 동기화
   */
  useIsomorphicLayoutEffect(() => {
    const theme = themeService.getPriority();
    const mode = themeService.getMode();
    themeService.setPriority(theme);
    startTransition(() => {
      setTheme(theme);
      setMode(mode);
      setIsSynced(true);
    });
  }, []);

  /**
   * preferseColorScheme change 이벤트 동기화
   */
  useEffect(() => {
    const handler = (e: MediaQueryListEvent) =>
      themeService.getMode() !== THEME_MODE.custom &&
      ((theme) => {
        setTheme(theme);
        themeService.setRoot(theme);
      })(e.matches ? THEME.dark : THEME.light);

    matchPrefersColorSchemeDark().addEventListener('change', handler);
    return () => {
      matchPrefersColorSchemeDark().removeEventListener('change', handler);
    };
  }, []);

  return (
    <ThemeStateContext.Provider value={{ theme, mode, isSynced }}>
      <ThemeActionsContext.Provider value={actions}>
        {children}
      </ThemeActionsContext.Provider>
    </ThemeStateContext.Provider>
  );
}

export function useTheme() {
  return {
    state: useSafeContext(ThemeStateContext),
    actions: useSafeContext(ThemeActionsContext),
  };
}

export function useThemeState() {
  return useSafeContext(ThemeStateContext);
}

export function useThemeActions() {
  return useSafeContext(ThemeActionsContext);
}
