import { RootHeaderDesktopMenu } from './RootHeaderDesktopMenu';
import styles from './RootHeaderMenu.module.scss';
import { RootHeaderMobileMenu } from './RootHeaderMobileMenu';

export function RootHeaderMenu() {
  return (
    <div className={styles.RootHeaderMenu}>
      <RootHeaderDesktopMenu />
      <RootHeaderMobileMenu />
    </div>
  );
}
