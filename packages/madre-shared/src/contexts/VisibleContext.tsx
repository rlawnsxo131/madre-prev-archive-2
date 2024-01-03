import { createContext, type ReactNode } from 'react';

import {
  type ContextStore,
  createExternalStoreContext,
  useExternalStoreContext,
} from '../hooks/useExternalStoreContext';

export const VisibleContext = createContext<ContextStore<{
  visible: boolean;
}> | null>(null);
VisibleContext.displayName = 'VisibleContext';

export function VisibleContextProvider({ children }: { children: ReactNode }) {
  return (
    <VisibleContext.Provider
      value={createExternalStoreContext({ visible: false })}
    >
      {children}
    </VisibleContext.Provider>
  );
}

export function useVisibleContext() {
  const [{ visible }, set] = useExternalStoreContext(VisibleContext);

  return [
    visible,
    {
      setVisible(visible: boolean) {
        return set({ visible });
      },
      open() {
        return set({ visible: false });
      },
      close() {
        return set({ visible: false });
      },
      toggle() {
        return set((prev) => ({ visible: !prev.visible }));
      },
    },
  ] as const;
}
