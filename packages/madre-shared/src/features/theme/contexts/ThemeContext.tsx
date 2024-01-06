import {
  type ReactNode,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react';

import { makeContext } from '../../../contexts/makeContext';
import { useIsomorphicLayoutEffect } from '../../../hooks/useIsomorphicLayoutEffect';
import { matchPrefersColorSchemeDark } from '../../../lib/utils/selectors';
import { THEME, type Theme } from '../models';
import { themeService } from '../services';

const { Provider: StateProvider, useContext: useStateContext } = makeContext<{
  theme: Theme;
  isPending: boolean;
}>('ThemeStateContext');

const { Provider: ActionProvider, useContext: useActionContext } = makeContext<{
  set: (theme: Theme) => void;
  toggle: () => void;
}>('ThemeActionContext');

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isPending, startTransition] = useTransition();
  const [theme, setTheme] = useState<Theme>(THEME.light);

  const actions = useMemo(
    () => ({
      set: setTheme,
      toggle: () =>
        setTheme((theme) => {
          const newTheme = themeService.getToggle(theme);
          themeService.setStorage(newTheme);
          themeService.setRoot(newTheme);
          return newTheme;
        }),
    }),
    [],
  );

  /**
   * 첫 로드시 theme 상태와 동기화
   */
  useIsomorphicLayoutEffect(() => {
    startTransition(() => {
      const theme = themeService.getPriority();
      setTheme(theme);
      themeService.setPriority(theme);
    });
  }, []);

  /**
   * preferseColorScheme change 이벤트 동기화
   */
  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => {
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
    <StateProvider value={{ theme, isPending }}>
      <ActionProvider value={{ ...actions }}>{children}</ActionProvider>
    </StateProvider>
  );
}

export function useTheme() {
  const state = useStateContext();
  const actions = useActionContext();
  return { state, actions };
}

export function useThemeState() {
  return useStateContext();
}

export function useThemeActions() {
  return useActionContext();
}
