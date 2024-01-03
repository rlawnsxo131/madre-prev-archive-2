import { createContext, type ReactNode, useRef } from 'react';

import {
  createExternalStore,
  type ExternalStore,
  useExternalStoreContext,
} from '../hooks/useExternalStoreContext';

export const VisibleContext = createContext<ExternalStore<{
  visible: boolean;
}> | null>(null);
VisibleContext.displayName = 'VisibleContext';

export function VisibleContextProvider({ children }: { children: ReactNode }) {
  const store = useRef(createExternalStore({ visible: false }));

  return (
    <VisibleContext.Provider value={store.current}>
      {children}
    </VisibleContext.Provider>
  );
}

export function useVisibleContext() {
  const [{ visible }, set] = useExternalStoreContext(VisibleContext);

  return [
    visible,
    {
      setVisible: (visible: boolean) => set({ visible }),
      open: () => set({ visible: false }),
      close: () => set({ visible: false }),
      toggle: () => set((prev) => ({ visible: !prev.visible })),
    },
  ] as const;
}
