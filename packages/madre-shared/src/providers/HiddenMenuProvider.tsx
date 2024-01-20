import {
  createContext,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useSafeContext } from '../hooks/useSafeContext';

// state
const HiddenMenuStateContext = createContext<{ visible: boolean } | null>(null);
HiddenMenuStateContext.displayName = 'HiddenMenuStateContext';

// actions
const HiddenMenuActionsContext = createContext<{
  set: (visible: boolean) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
} | null>(null);
HiddenMenuActionsContext.displayName = 'HiddenMenuActionsContext';

export type HiddneMenuProviderProps<
  F extends (...args: any[]) => any = (...args: any[]) => any,
> = {
  children: ReactNode;
  lifeCycle?: {
    beforeOpen?: F;
    beforeClose?: F;
  };
};

export function HiddenMenuProvider({
  children,
  lifeCycle,
}: HiddneMenuProviderProps) {
  const [visible, setVisible] = useState(false);
  const prevVisible = useRef(visible);

  const actions = useMemo(
    () => ({
      set: async (visible: boolean) =>
        await Promise.resolve(
          (visible ? lifeCycle?.beforeOpen : lifeCycle?.beforeClose)?.(),
        ).then((_) => setVisible(visible)),
      open: async () =>
        await Promise.resolve(lifeCycle?.beforeOpen?.()).then(() =>
          setVisible(true),
        ),
      close: async () =>
        await Promise.resolve(lifeCycle?.beforeClose?.()).then(() =>
          setVisible(false),
        ),
      toggle: async () => {
        const nextState = !prevVisible.current;
        return await Promise.resolve(
          (nextState ? lifeCycle?.beforeOpen : lifeCycle?.beforeClose)?.(),
        ).then(() => setVisible(nextState));
      },
    }),
    [lifeCycle],
  );

  useEffect(() => {
    prevVisible.current = visible;
  }, [visible]);

  return (
    <HiddenMenuStateContext.Provider value={{ visible }}>
      <HiddenMenuActionsContext.Provider value={actions}>
        {children}
      </HiddenMenuActionsContext.Provider>
    </HiddenMenuStateContext.Provider>
  );
}

export function useHiddenMenu() {
  const state = useSafeContext(HiddenMenuStateContext);
  const actions = useSafeContext(HiddenMenuActionsContext);
  return [state, actions] as const;
}

export function useHiddenMenuState() {
  return useSafeContext(HiddenMenuStateContext);
}

export function useHiddenMenuActions() {
  return useSafeContext(HiddenMenuActionsContext);
}
