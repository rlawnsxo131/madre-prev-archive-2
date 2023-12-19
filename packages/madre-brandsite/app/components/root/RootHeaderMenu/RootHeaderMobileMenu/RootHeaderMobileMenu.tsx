import { Icons, ThemeButton } from '@madre/shared';

// import { DISPLAY_ROUTES } from '@/routes';
// import linkStyles from '../RootHeaderLink.module.scss';
import styles from './RootHeaderMobileMenu.module.scss';

export function RootHeaderMobileMenu() {
  return (
    <div className={styles.RootHeaderMobileMenu}>
      <ThemeButton />
      <button className={styles['menu-button']}>
        <Icons type="menu" />
      </button>
      {/* @TODO Drawer */}
    </div>
  );
}
