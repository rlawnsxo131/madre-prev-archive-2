import { DrawerContent } from './DrawerContent';
import { DrawerItem } from './DrawerItem';
import { DrawerProvider } from './DrawerProvider';
import { DrawerRoot } from './DrawerRoot';
import { DrawerTrigger } from './DrawerTrigger';

export const Drawer = Object.assign(DrawerProvider, {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Content: DrawerContent,
  Item: DrawerItem,
});
