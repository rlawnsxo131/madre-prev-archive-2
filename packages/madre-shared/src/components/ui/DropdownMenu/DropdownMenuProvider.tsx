import { createContext, type ReactNode, useMemo } from 'react';

import { useSafeContext } from '../../../hooks/useSafeContext';
import {
  HiddenMenuProvider,
  type HiddneMenuProviderProps,
  useHiddenMenuActions,
  useHiddenMenuState,
} from '../../../providers/HiddenMenuProvider';
import { type PortalProps } from '../../utility/Portal';

export type DropdownMenuProps = HiddneMenuProviderProps & {
  children: ReactNode;
  align?: 'left' | 'right';
  duration?: number;
  isPortal?: boolean;
  portalProps?: Omit<PortalProps, 'children'>;
};

const DropdownMenuContext = createContext<{
  align: NonNullable<DropdownMenuProps['align']>;
  duration: NonNullable<DropdownMenuProps['duration']>;
  isPortal: DropdownMenuProps['isPortal'];
  portalProps: DropdownMenuProps['portalProps'];
} | null>(null);
DropdownMenuContext.displayName = 'DropdownMenuContext';

export function DropdownMenuProvider({
  children,
  lifeCycle,
  align = 'left',
  duration = 0.15,
  isPortal,
  portalProps,
}: DropdownMenuProps) {
  /**
   * 현재 useDropdownMenuOptions hook 을 통해, DropdownMenuContent 에서만 사용됩니다.
   */
  const options = useMemo(
    () => ({
      align,
      duration,
      isPortal,
      portalProps,
    }),
    [align, duration, isPortal, portalProps],
  );

  return (
    <HiddenMenuProvider lifeCycle={lifeCycle}>
      <DropdownMenuContext.Provider value={options}>
        {children}
      </DropdownMenuContext.Provider>
    </HiddenMenuProvider>
  );
}

export function useDropdownMenuState() {
  return useHiddenMenuState();
}

export function useDropdownMenuActions() {
  return useHiddenMenuActions();
}

export function useDropdownMenuOptions() {
  return useSafeContext(DropdownMenuContext);
}
