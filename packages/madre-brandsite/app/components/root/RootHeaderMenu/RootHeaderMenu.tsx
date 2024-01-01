import {
  ThemeServiceProvider,
  withThemeChangeEventListener,
} from '@madre/shared';

import { RootHeaderDesktopMenu } from './RootHeaderDesktopMenu';
import styles from './RootHeaderMenu.module.scss';
import { RootHeaderMobileMenu } from './RootHeaderMobileMenu';

export function RootHeaderMenu() {
  const Comp = withThemeChangeEventListener({
    Component: () => (
      <>
        <RootHeaderDesktopMenu />
        <RootHeaderMobileMenu />
      </>
    ),
  });

  return (
    <div className={styles.RootHeaderMenu}>
      <ThemeServiceProvider>
        <Comp />
      </ThemeServiceProvider>
    </div>
  );
}
