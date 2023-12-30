import { type ReactNode } from 'react';

import { VisibleContextProvider } from '../../../contexts/VisibleContext';
import { DropdownMenuContent } from './DropdownMenuContent';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DropdownMenuRoot } from './DropdownMenuRoot';
import { DropdownMenuTrigger } from './DropdownMenuTrigger';

function Container({ children }: { children: ReactNode }) {
  return <VisibleContextProvider>{children}</VisibleContextProvider>;
}

export const DropdownMenu = Object.assign(Container, {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
});
