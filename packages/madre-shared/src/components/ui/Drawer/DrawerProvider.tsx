import { createContext, type ReactNode, useMemo } from 'react';

import { useSafeContext } from '../../../hooks/useSafeContext';
import {
  useVisibleActions,
  useVisibleState,
  VisibleProvider,
} from '../../../providers/VisibleProvider';

type Props = {
  children: ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  rootMargin?: string | number;
  duration?: number;
};

const DrawerContext = createContext<{
  position: NonNullable<Props['position']>;
  rootMargin: NonNullable<Props['rootMargin']>;
  duration: NonNullable<Props['duration']>;
} | null>(null);

export function DrawerProvider({
  children,
  position = 'bottom',
  rootMargin = 0,
  duration = 0.15,
}: Props) {
  const options = useMemo(
    () => ({
      position,
      rootMargin,
      duration,
    }),
    [position, rootMargin, duration],
  );

  return (
    <VisibleProvider>
      <DrawerContext.Provider value={options}>
        {children}
      </DrawerContext.Provider>
    </VisibleProvider>
  );
}

export function useDrawerState() {
  return useVisibleState();
}

export function useDrawerActions() {
  return useVisibleActions();
}

export function useDrawerOptions() {
  return useSafeContext(DrawerContext);
}
