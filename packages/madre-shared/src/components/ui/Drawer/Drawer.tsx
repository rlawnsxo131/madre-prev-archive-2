import { type ReactNode } from 'react';

import { VisibleProvider } from '../../../contexts/VisibleContext';
import { DrawerContent } from './DrawerContent/DrawerContent';
import { DrawerItem } from './DrawerItem/DrawerItem';
import { DrawerRoot } from './DrawerRoot/DrawerRoot';
import { DrawerTrigger } from './DrawerTrigger/DrawerTrigger';

function Container({ children }: { children: ReactNode }) {
  return <VisibleProvider>{children}</VisibleProvider>;
}

export const Drawer = Object.assign(Container, {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Content: DrawerContent,
  Item: DrawerItem,
});
