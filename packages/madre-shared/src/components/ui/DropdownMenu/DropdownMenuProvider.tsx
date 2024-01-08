import { createContext, type ReactNode, useMemo } from 'react';

import { useSafeContext } from '../../../hooks/useSafeContext';
import {
  useVisibleActions,
  useVisibleState,
  VisibleProvider,
} from '../../../providers/VisibleProvider';
import { type PortalProps } from '../../utility/Portal';

type Props = {
  children: ReactNode;
  align?: 'left' | 'right';
  duration?: number;
  isPortal?: boolean;
  portalProps?: Omit<PortalProps, 'children'>;
};

const DropdownMenuContext = createContext<{
  align: NonNullable<Props['align']>;
  duration: NonNullable<Props['duration']>;
  isPortal: Props['isPortal'];
  portalProps: Props['portalProps'];
} | null>(null);

export function DropdownMenuProvider({
  children,
  align = 'left',
  duration = 0.15,
  isPortal,
  portalProps,
}: Props) {
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
