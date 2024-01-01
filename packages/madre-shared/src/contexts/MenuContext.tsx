import { createContext, type ReactNode, useRef, useState } from 'react';

const MenuContext = createContext<{} | null>(null);

export function MenuContextProvider({ children }: { children: ReactNode }) {
  const triggerRef = useRef<HTMLElement>(null);

  return <MenuContext.Provider value={null}>{children}</MenuContext.Provider>;
}
