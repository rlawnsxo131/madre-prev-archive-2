import { RootHeaderDesktopMenu } from './RootHeaderDesktopMenu/RootHeaderDesktopMenu';
import styles from './RootHeaderMenu.module.scss';
import { RootHeaderMobileMenu } from './RootHeaderMobileMenu/RootHeaderMobileMenu';

export function RootHeaderMenu() {
  return (
    <div className={styles.RootHeaderMenu}>
      <RootHeaderDesktopMenu />
      <RootHeaderMobileMenu />
    </div>
  );
}
