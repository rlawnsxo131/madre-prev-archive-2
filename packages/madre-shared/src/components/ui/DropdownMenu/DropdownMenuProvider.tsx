import { createContext, type ReactNode, useMemo } from 'react';

import { useSafeContext } from '../../../hooks/useSafeContext';
import {
  useVisibleActions,
  useVisibleState,
  VisibleProvider,
} from '../../../providers/VisibleProvider';
import { type PortalProps } from '../../utility/Portal';

export type DropdownMenuProps = {
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
    <VisibleProvider>
      <DropdownMenuContext.Provider value={options}>
        {children}
      </DropdownMenuContext.Provider>
    </VisibleProvider>
  );
}

export function useDropdownMenuState() {
  return useVisibleState();
}

export function useDropdownMenuActions() {
  return useVisibleActions();
}

export function useDropdownMenuOptions() {
  return useSafeContext(DropdownMenuContext);
}
