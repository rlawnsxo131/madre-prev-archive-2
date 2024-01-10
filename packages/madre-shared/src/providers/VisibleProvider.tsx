import { createContext, type ReactNode, useMemo, useState } from 'react';

import { useSafeContext } from '../hooks/useSafeContext';

const VisibleStateContext = createContext<{ visible: boolean } | null>(null);
VisibleStateContext.displayName = 'VisibleStateContext';

const VisibleActionsContext = createContext<{
  set: (visible: boolean) => void;
  show: () => void;
  hide: () => void;
  toggle: () => void;
} | null>(null);
VisibleActionsContext.displayName = 'VisibleActionsContext';

export function VisibleProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  const actions = useMemo(
    () => ({
      set: setVisible,
      show: () => setVisible(true),
      hide: () => setVisible(false),
      toggle: () => setVisible((prev) => !prev),
    }),
    [],
  );

  return (
    <VisibleStateContext.Provider value={{ visible }}>
      <VisibleActionsContext.Provider value={actions}>
        {children}
      </VisibleActionsContext.Provider>
    </VisibleStateContext.Provider>
  );
}

export function useVisible() {
  const state = useSafeContext(VisibleStateContext);
  const actions = useSafeContext(VisibleActionsContext);
  return [state, actions] as const;
}

export function useVisibleState() {
  return useSafeContext(VisibleStateContext);
}

export function useVisibleActions() {
  return useSafeContext(VisibleActionsContext);
}
