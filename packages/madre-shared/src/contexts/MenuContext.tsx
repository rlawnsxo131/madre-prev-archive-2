import { createContext, type ReactNode } from 'react';

const MenuContext = createContext<{} | null>(null);

export function MenuContextProvider({ children }: { children: ReactNode }) {
  return <MenuContext.Provider value={null}>{children}</MenuContext.Provider>;
}
