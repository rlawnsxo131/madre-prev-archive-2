import { Icons, ThemeButton } from '@madre/shared';
import { motion } from 'framer-motion';

// import { NavLink } from '@remix-run/react';
// import classNames from 'classnames';
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
      <motion.div role="menu-list"></motion.div>
    </div>
  );
}
