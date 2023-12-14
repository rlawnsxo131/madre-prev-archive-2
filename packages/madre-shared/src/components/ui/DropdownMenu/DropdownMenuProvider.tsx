import type { ContextType, PropsWithChildren, ReactNode } from 'react';
import { createContext, useState } from 'react';

export const DropdownMenuContext = createContext<{
  visible: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
} | null>(null);

export type DropdownMenuContext = (
  props: ContextType<typeof DropdownMenuContext>,
) => ReactNode;

export function DropdownMenuProvider({ children }: PropsWithChildren) {
  const [visible, setVisible] = useState(false);

  return (
    <DropdownMenuContext.Provider
      value={{
        visible,
        open: () => setVisible(true),
        close: () => setVisible(false),
        toggle: () => setVisible((visible) => !visible),
      }}
    >
      {children}
    </DropdownMenuContext.Provider>
  );
}
