import { createVisbleContextProvider } from '../../../contexts/visibleContext';
import { DrawerContent } from './DrawerContent/DrawerContent';
import { DrawerItem } from './DrawerItem/DrawerItem';
import { DrawerRoot } from './DrawerRoot/DrawerRoot';
import { DrawerTrigger } from './DrawerTrigger/DrawerTrigger';

export const Drawer = Object.assign(createVisbleContextProvider(), {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Content: DrawerContent,
  Item: DrawerItem,
});
