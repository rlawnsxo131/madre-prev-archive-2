import { ThemeButton } from '@madre/shared';

import { RootHeaderDesktopMenu } from './RootHeaderDesktopMenu/RootHeaderDesktopMenu';
import styles from './RootHeaderMenu.module.scss';
import { RootHeaderMobileMenu } from './RootHeaderMobileMenu/RootHeaderMobileMenu';

type RootHeaderMenuProps = {};

export function RootHeaderMenu(props: RootHeaderMenuProps) {
  return (
    <div className={styles.container}>
      <RootHeaderDesktopMenu />
      <RootHeaderMobileMenu />
      <ThemeButton />
    </div>
  );
}
