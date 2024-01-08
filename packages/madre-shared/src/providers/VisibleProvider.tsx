import { createContext, type ReactNode, useMemo, useState } from 'react';

import { useSafeContext } from '../hooks/useSafeContext';

const VisibleStateContext = createContext<{ visible: boolean } | null>(null);
const VisibleActionsContext = createContext<{
  set: (visible: boolean) => void;
  show: () => void;
  hide: () => void;
  toggle: () => void;
} | null>(null);
VisibleStateContext.displayName = 'VisibleStateContext';
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
  return {
    state: useSafeContext(VisibleStateContext),
    actions: useSafeContext(VisibleActionsContext),
  };
}

export function useVisibleState() {
  return useSafeContext(VisibleStateContext);
}

export function useVisibleActions() {
  return useSafeContext(VisibleActionsContext);
}
