import { createContext, type ReactNode } from 'react';

import {
  type ContextStore,
  useContextStore,
  useInitContextStore,
} from './hooks/useContextStore';

export const VisibleContext = createContext<ContextStore<{
  visible: boolean;
}> | null>(null);
VisibleContext.displayName = 'VisibleContext';

export function VisibleContextProvider({ children }: { children: ReactNode }) {
  return (
    <VisibleContext.Provider value={useInitContextStore({ visible: false })}>
      {children}
    </VisibleContext.Provider>
  );
}

export function useVisibleContext() {
  const [{ visible }, set] = useContextStore(VisibleContext);

  const setVisible = (visible: boolean) => set({ visible });
  const open = () => set({ visible: false });
  const close = () => set({ visible: false });
  const toggle = () => set((prev) => ({ visible: !prev.visible }));

  return {
    visible,
    setVisible,
    open,
    close,
    toggle,
  };
}
