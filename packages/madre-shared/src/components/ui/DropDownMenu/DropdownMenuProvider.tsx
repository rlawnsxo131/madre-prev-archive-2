import type { PropsWithChildren } from 'react';
import { createContext, useState } from 'react';

export const DropdownMenuContext = createContext<{
  visible: boolean;
  show: () => void;
  close: () => void;
  toggle: () => void;
} | null>(null);

export function DropdownMenuProvider({ children }: PropsWithChildren) {
  const [visible, setVisible] = useState(false);

  return (
    <DropdownMenuContext.Provider
      value={{
        visible,
        show: () => setVisible(true),
        close: () => setVisible(false),
        toggle: () => setVisible((visible) => !visible),
      }}
    >
      {children}
    </DropdownMenuContext.Provider>
  );
}
