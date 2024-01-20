import { createContext, type ReactNode, useMemo } from 'react';

import { useSafeContext } from '../../../hooks/useSafeContext';
import {
  HiddenMenuProvider,
  type HiddneMenuProviderProps,
  useHiddenMenuActions,
  useHiddenMenuState,
} from '../../../providers/HiddenMenuProvider';
import { type NonNullableProperties } from '../../../types/types';

export type DrawerProps = HiddneMenuProviderProps & {
  children: ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  duration?: number;
  withOverlay?: boolean;
  withScrollLock?: boolean;
};

const DrawerContext = createContext<NonNullableProperties<{
  position: DrawerProps['position'];
  duration: DrawerProps['duration'];
  withOverlay: DrawerProps['withOverlay'];
  withScrollLock: DrawerProps['withScrollLock'];
}> | null>(null);
DrawerContext.displayName = 'DrawerContext';

export function DrawerProvider({
  children,
  lifeCycle,
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
    <HiddenMenuProvider lifeCycle={lifeCycle}>
      <DrawerContext.Provider value={options}>
        {children}
      </DrawerContext.Provider>
    </HiddenMenuProvider>
  );
}

export function useDrawerState() {
  return useHiddenMenuState();
}

export function useDrawerActions() {
  return useHiddenMenuActions();
}

export function useDrawerOptions() {
  return useSafeContext(DrawerContext);
}
