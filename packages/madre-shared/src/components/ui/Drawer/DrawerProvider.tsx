import { createContext, type ReactNode, useMemo } from 'react';

import { useSafeContext } from '../../../hooks/useSafeContext';
import {
  useVisibleActions,
  useVisibleState,
  VisibleProvider,
} from '../../../providers/VisibleProvider';
import { type NonNullableProperties } from '../../../types/types';

export type DrawerProps = {
  children: ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  duration?: number;
  withOverlay?: boolean;
  withScrollLock?: boolean;
};

const DrawerContext = createContext<NonNullableProperties<
  Omit<DrawerProps, 'children'>
> | null>(null);
DrawerContext.displayName = 'DrawerContext';

export function DrawerProvider({
  children,
  position = 'bottom',
  duration = 0.15,
  withOverlay = true,
  withScrollLock = false,
}: DrawerProps) {
  /**
   * 현재 useDrawerOptions hook 을 통해, DrawerContent 에서만 사용됩니다.
   */
  const options = useMemo(
    () => ({
      position,
      duration,
      withOverlay,
      withScrollLock,
    }),
    [position, duration, withOverlay, withScrollLock],
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
