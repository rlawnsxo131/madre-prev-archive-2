import { ThemeButton } from '@madre/shared';

import { RootHeaderDesktopMenu } from './RootHeaderDesktopMenu';
import styles from './RootHeaderMenu.module.scss';
import { RootHeaderMobileMenu } from './RootHeaderMobileMenu';

type RootHeaderMenuProps = {};

export function RootHeaderMenu(props: RootHeaderMenuProps) {
  return (
    <div className={styles.root}>
      <RootHeaderDesktopMenu />
      <RootHeaderMobileMenu />
      <ThemeButton />
    </div>
  );
}
