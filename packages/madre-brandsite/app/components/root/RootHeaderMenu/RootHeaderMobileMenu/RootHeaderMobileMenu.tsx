import { ThemeButton } from '@madre/shared';

// import { NavLink } from '@remix-run/react';
// import classNames from 'classnames';
// import { DISPLAY_ROUTES } from '@/routes';
// import linkStyles from '../RootHeaderLink.module.scss';
import styles from './RootHeaderMobileMenu.module.scss';

export function RootHeaderMobileMenu() {
  return (
    <div className={styles.RootHeaderMobileMenu}>
      <ThemeButton />
      {/* @TODO HeaderNav */}
    </div>
  );
}
