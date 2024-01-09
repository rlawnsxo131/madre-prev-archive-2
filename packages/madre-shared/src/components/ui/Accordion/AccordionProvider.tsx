import { type ReactNode } from 'react';

import {
  useVisibleActions,
  useVisibleState,
  VisibleProvider,
} from '../../../providers/VisibleProvider';

export function AccordionProvider({ children }: { children: ReactNode }) {
  return <VisibleProvider>{children}</VisibleProvider>;
}

export function useAccordionState() {
  return useVisibleState();
}

export function useAccordionActions() {
  return useVisibleActions();
}
