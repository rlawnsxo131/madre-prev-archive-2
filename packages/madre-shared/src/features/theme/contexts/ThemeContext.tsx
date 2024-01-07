import {
  type ReactNode,
  startTransition,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { makeContext } from '../../../contexts/makeContext';
import { useIsomorphicLayoutEffect } from '../../../hooks/useIsomorphicLayoutEffect';
import { matchPrefersColorSchemeDark } from '../../../lib/utils/selectors';
import { THEME, type Theme, THEME_MODE, type ThemeMode } from '../models';
import { themeService } from '../services';

type State = {
  theme: Theme;
  mode: ThemeMode;
  isSynced: boolean;
};

type Actions = {
  set: (theme: Theme) => void;
  toggle: () => void;
};

const { Provider: StateProvider, useContext: useStateContext } =
  makeContext<State>('ThemeStateContext');

const { Provider: ActionsProvider, useContext: useActionsContext } =
  makeContext<Actions>('ThemeActionContext');

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(THEME.light);
  const [mode, setMode] = useState<ThemeMode>(THEME_MODE.system);
  const [isSynced, setIsSynced] = useState(false);

  const actions = useMemo<Actions>(
    () => ({
      set: (theme: Theme) => {
        themeService.setStorage(theme).setRoot(theme);
        setTheme(theme);
      },
      toggle: () =>
        setTheme((theme) => {
          const nextTheme = themeService.getToggle(theme);
          themeService.setStorage(nextTheme).setRoot(nextTheme);
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
    const handler = (e: MediaQueryListEvent) => {
      if (themeService.getMode() === 'custom') return;
      const theme = e.matches ? THEME.dark : THEME.light;
      setTheme(theme);
      themeService.setPriority(theme);
    };

    matchPrefersColorSchemeDark().addEventListener('change', handler);

    return () => {
      matchPrefersColorSchemeDark().removeEventListener('change', handler);
    };
  }, []);

  return (
    <StateProvider value={{ theme, mode, isSynced }}>
      <ActionsProvider value={actions}>{children}</ActionsProvider>
    </StateProvider>
  );
}

export function useTheme() {
  const state = useStateContext();
  const actions = useActionsContext();
  return { state, actions };
}

export function useThemeState() {
  return useStateContext();
}

export function useThemeActions() {
  return useActionsContext();
}
