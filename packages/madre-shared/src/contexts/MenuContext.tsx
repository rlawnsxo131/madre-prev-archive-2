import { type ReactNode } from 'react';

import { makeContext } from './makeContext';

const { Provider, useContext } = makeContext('MenuContext');

export function MenuProvider({ children }: { children: ReactNode }) {
  return <Provider value={{}}>{children}</Provider>;
}

export function useMenu() {
  return useContext();
}
