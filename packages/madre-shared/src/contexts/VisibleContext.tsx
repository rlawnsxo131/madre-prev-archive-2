import { type ReactNode } from 'react';

import { createStoreContext } from '../lib/external-store';

const { Provider, useStoreContext } = createStoreContext<{
  visible: boolean;
  actions: {
    set: (visible: boolean) => void;
    show: () => void;
    hide: () => void;
    toggle: () => void;
  };
}>('VisibleContext');

export function VisibleContextProvider({ children }: { children: ReactNode }) {
  return (
    <Provider
      createState={(set) => ({
        visible: false,
        actions: {
          set: (visible: boolean) => set({ visible }),
          show: () => set({ visible: true }),
          hide: () => set({ visible: false }),
          toggle: () => set((state) => ({ visible: !state.visible })),
        },
      })}
    >
      {children}
    </Provider>
  );
}

export function useVisibleContext() {
  const { visible, actions } = useStoreContext();

  return [visible, actions] as const;
}

export function useVisibleState() {
  return useStoreContext((state) => state.visible);
}

export function useVisibleActions() {
  return useStoreContext((state) => state.actions);
}
