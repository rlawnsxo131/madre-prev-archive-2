import { createContext, type ReactNode } from 'react';

import {
  HiddenMenuProvider,
  useHiddenMenuActions,
  useHiddenMenuState,
} from '../../../providers/HiddenMenuProvider';

const AccordionContext = createContext<null>(null);
AccordionContext.displayName = 'AccordionContext';

export function AccordionProvider({ children }: { children: ReactNode }) {
  return (
    <HiddenMenuProvider>
      <AccordionContext.Provider value={null}>
        {children}
      </AccordionContext.Provider>
    </HiddenMenuProvider>
  );
}

export function useAccordionState() {
  return useHiddenMenuState();
}

export function useAccordionActions() {
  return useHiddenMenuActions();
}
