import { RootHeaderDesktopMenu } from './RootHeaderDesktopMenu/RootHeaderDesktopMenu';
import styles from './RootHeaderMenu.module.scss';
import { RootHeaderMobileMenu } from './RootHeaderMobileMenu/RootHeaderMobileMenu';

type RootHeaderMenuProps = {};

export function RootHeaderMenu(props: RootHeaderMenuProps) {
  return (
    <div className={styles.RootHeaderMenu}>
      <RootHeaderDesktopMenu />
      <RootHeaderMobileMenu />
    </div>
  );
}
