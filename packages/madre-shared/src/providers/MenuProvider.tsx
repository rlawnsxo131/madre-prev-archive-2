import { createContext, type ReactNode } from 'react';

import { useSafeContext } from '../hooks/useSafeContext';

export type MenuLifeCycleCallback<
  Callback extends (...args: any[]) => any = (...args: any[]) => any,
> = Callback;

export type MenuContextObject = {
  didOpen?: MenuLifeCycleCallback;
  didClose?: MenuLifeCycleCallback;
};

const MenuContext = createContext<MenuContextObject | null>(null);
MenuContext.displayName = 'MenuContext';

export function MenuProvider({
  children,
  ...props
}: { children: ReactNode } & MenuContextObject) {
  return (
    <MenuContext.Provider value={{ ...props }}>{children}</MenuContext.Provider>
  );
}

export function useMenu() {
  return useSafeContext(MenuContext);
}
