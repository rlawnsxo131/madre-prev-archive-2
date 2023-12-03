import { RootLayoutContainer } from './RootLayoutContainer';
import { RootLayoutHeader } from './RootLayoutHeader';
import { RootLayoutMain } from './RootLayoutMain';

export const RootLayout = Object.assign(RootLayoutContainer, {
  Header: RootLayoutHeader,
  Main: RootLayoutMain,
});
